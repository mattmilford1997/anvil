---
title: "Payer Eligibility Systems Go Down. Detect It Before Your Funnel Does"
excerpt: "Payer real-time eligibility endpoints fail more often than anyone admits, and most care companies find out from their conversion dashboard days later."
lede: "Payer real-time eligibility endpoints fail more often than anyone admits, and most care companies find out from their conversion dashboard days later. How to detect payer outages in minutes, what to show the patient, and how to recover."
summary:
  - "Payer eligibility systems have incidents: full outages, degraded latency, and silent bad responses. The third is the hardest to see and the most expensive, because it looks like a normal 'not covered' result."
  - "Most companies detect outages by noticing that insured bookings dropped. That is days late and the patients are gone."
  - "Detection is a monitoring problem: error rate and latency per payer, compared to that payer's baseline, with alerts and an automatic fallback."
author: "matt-milford"
publishDate: 2027-02-16
category: "Blog"
icp: ["A"]
pillar: "developer"
keyword: "payer eligibility outage"
tool: "none"
faq:
  - q: "How often do payer eligibility systems go down?"
    a: "More often than most teams expect. Full outages are the rare case. Degraded latency and silent bad responses are more common, and neither shows up as an error in your logs unless you are looking for it."
  - q: "How do I know if a payer's eligibility API is down?"
    a: "Track error rate and latency per payer against a baseline, plus the ratio of not-covered results. Alert on deviation. Silent bad responses require the third signal."
  - q: "What should a patient see during a payer outage?"
    a: "A soft-check result, a plain explanation, and the ability to book with cost confirmed before the visit."
  - q: "Do outages cause claim denials?"
    a: "Only if you let patients book without a re-check. Queue fallback bookings and re-verify when the payer recovers, before the date of service."
related: ["eligibility-at-booking-conversion-lift", "soft-check-hard-check-eligibility-api", "aba-authorization-intake-flow"]
sourceFile: "05_February_Eligibility_Conversion.md"
calendarWeek: 20
dataReview: "cleared"
draft: false
---
Picture a Tuesday afternoon. Insured bookings in one state drop by half. Your code is fine. A national payer's eligibility endpoint has been returning errors for most of the afternoon. Every patient with that plan sees "we couldn't verify your coverage" and leaves. Nobody gets paged, because nothing on your side failed.

Eligibility at booking is commonly cited to lift insurance-funnel conversion 2 to 5x. An outage takes that lift to zero for that payer, for as long as it lasts, and your dashboard reports it as a conversion dip days later. The fix is not a better dashboard. It is treating payer availability as something you monitor, the same way you monitor your own services.

## What "down" looks like
Three patterns, and only one is obvious.

| Pattern | What the payer returns | What your logs say | What the patient sees |
|---|---|---|---|
| Hard outage | An error on every request | Error spike | "We couldn't verify your coverage" |
| Degraded latency | A response in 20 to 40 seconds instead of 2 | Timeouts, which look like your network | A spinner, then a failure |
| Silent bad responses | 200 with an empty or generic body | Nothing | "Not covered," which is false |

*Hard outage.* Easy to detect if you are looking. Invisible if you are not, because your error budget is per service and the payer is not one of your services.

*Degraded latency.* Your front end times out, the patient sees a spinner, then a failure. Your logs say "timeout," which looks like a network issue on your side. An engineer spends an hour checking your infrastructure before anyone thinks to check the payer.

*Silent bad responses.* The endpoint returns 200 with an empty or generic result. Your code interprets it as "not covered." No error is logged anywhere. The patient is told they are not covered when they are. This is the worst one, and it is not rare.

## How to detect it
Five parts, in order of how much they buy you.

1. *Track 3 series per payer.* Request volume, system error rate (system errors only, not policy errors like member-not-found), and p95 latency.
2. *Build a rolling baseline per payer per hour of day.* Payers have their own traffic shape. A latency number that is normal at 9 a.m. can be an incident at 2 p.m.
3. *Alert on sustained deviation.* Error rate or latency above the baseline by a set threshold for more than a few minutes. Short blips are noise. Sustained deviation is an incident.
4. *Track the not-covered ratio per payer.* Alert when it spikes relative to baseline. This is the only signal that catches silent bad responses, because nothing else changes.
5. *Treat a confirmed incident as a state, not an alert.* Flip the payer to "degraded" in a place your booking flow can read. Everything downstream branches on that state instead of on a raw error.

If you have a small number of payers, this is an afternoon of work with any monitoring tool. If you have dozens, it is a real system. Anvil monitors payer availability across every payer it queries and exposes per-payer health so ops can see it without asking engineering. See [/platform/eligibility](/platform/eligibility).

## Return an outage status, not a false negative
This is the single design decision that matters most. When a payer is degraded, the eligibility check should return a distinct status, "payer unavailable," separate from "covered" and "not covered." Your booking flow branches on it.

A check that returns "not covered" during an outage is a false negative, and false negatives are the expensive failure. The patient leaves, and your funnel data records a real "not covered" result, so the loss is invisible even after the fact. Anvil's eligibility API returns the distinct outage status instead of a false negative. Your booking flow then decides what to do with it: fall back to a cash price, or hold the booking for a later re-check.

## What to show the patient
When a payer is degraded, the worst outcome is "we couldn't verify your coverage, please try later." The right outcome:

"We're having trouble reaching Blue Cross right now. Based on your plan and state, you're likely covered. You can book now and we'll confirm your exact cost before your visit."

That is the [soft-check fallback](/resources/soft-check-hard-check-eligibility-api). The patient books. The hard check re-runs when the payer recovers, and the patient gets a confirmation message with their actual cost. If your model cannot carry that uncertainty, the other honest option is a clear cash price with a note that you will re-check coverage and refund the difference. Either is better than a dead end.

## How to recover
Queue every booking made under the fallback with the payer name and the timestamp. When the payer's health returns to baseline, re-run hard checks on the queue, notify patients whose cost changed, and flag any that came back not-covered for outreach before the visit. Eligibility-related denials from fallback bookings should be rare if the re-check runs before the date of service, and near zero if it also runs the morning of.

Log every incident by payer with start, end, pattern, and count of bookings affected. Over a few months you build a history. You may find that some payers have a recurring shape by day and hour, and you can pre-warm the fallback before it triggers.

## What ops should see
A per-payer status page: green, degraded, down, with time since last incident and count of bookings currently in fallback. When a payer goes red, ops knows why insured bookings from that plan look strange today, and support knows what to tell patients who call. Nobody has to ask engineering to check the logs.

## Two things not to do
*Do not retry aggressively into a degraded payer.* Hammering an endpoint that is already slow makes it slower and delays its recovery. Back off, mark the state, and let the fallback carry the booking.

*Do not let fallback bookings reach the date of service without a re-check.* That is how an outage becomes a denial. The queue in the recovery step exists so that no fallback booking is ever seen without a confirmed check.

## Next step

See how the eligibility API reports payer status and hands the fallback to your booking flow at [/platform/eligibility](/platform/eligibility).

---
