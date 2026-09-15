---
title: "Payer Eligibility Systems Go Down. Detect It Before Your Funnel Does"
excerpt: "Payer real-time eligibility endpoints fail more often than anyone admits, and most care companies find out from their conversion dashboard days later."
lede: "Payer real-time eligibility endpoints fail more often than anyone admits, and most care companies find out from their conversion dashboard days later. How to detect payer outages in minutes, what to show the patient, and how to recover."
summary:
  - "Payer eligibility systems have incidents: full outages, degraded latency, and silent bad responses. In our monitoring, 4 of the 10 largest payers had at least one multi-hour incident in the last quarter."
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
    a: "More often than most companies realize. In our monitoring, 4 of the 10 largest payers had at least one multi-hour incident last quarter, and degraded-latency events are more common than full outages."
  - q: "How do I know if a payer's eligibility API is down?"
    a: "Track error rate and latency per payer against a baseline, plus the ratio of not-covered results. Alert on deviation. Silent bad responses require the third signal."
  - q: "What should a patient see during a payer outage?"
    a: "A soft-check result, a plain explanation, and the ability to book with cost confirmed before the visit."
  - q: "Do outages cause claim denials?"
    a: "Only if you let patients book without a re-check. Queue fallback bookings and re-verify when the payer recovers, before the date of service."
related: ["eligibility-at-booking-conversion-lift", "soft-check-hard-check-eligibility-api", "aba-authorization-intake-flow"]
sourceFile: "05_February_Eligibility_Conversion.md"
calendarWeek: 20
dataReview: "pending"
dataNotes:
  - "4 of the 10"
draft: false
---
We started tracking this because a customer asked why their insured bookings in one state fell by half on a Tuesday afternoon. Their code was fine. A national payer's eligibility endpoint had been returning errors for six hours. Every patient with that plan saw "we couldn't verify your coverage" and left.

## What "down" looks like
Three patterns, and only one is obvious.

*Hard outage.* Every request errors. Easy to detect if you are looking; invisible if you are not.
*Degraded latency.* Responses take 20 to 40 seconds instead of 2. Your front end times out, the patient sees a spinner, then a failure. Your logs say "timeout," which looks like a network issue on your side.
*Silent bad responses.* The endpoint returns 200 with an empty or generic result. Your code interprets it as "not covered." No error is logged anywhere. This is the worst one and it is not rare.

## How to detect it
Per payer, track three series: request volume, error rate (system errors only, not policy errors like member-not-found), and p95 latency. Establish a rolling baseline per payer per hour of day. Alert when error rate or latency exceeds the baseline by a threshold for more than a few minutes. Separately, alert when the ratio of "not covered" results spikes relative to baseline for a payer, because that is the signature of silent bad responses.

If you have a small number of payers, this is an afternoon of work with any monitoring tool. If you have dozens, it is a real system. We run it across every payer we query and expose per-payer health in the dashboard so ops can see it without asking engineering.

## What to show the patient
When a payer is degraded, the worst outcome is "we couldn't verify your coverage, please try later." The right outcome:

"We're having trouble reaching Blue Cross right now. Based on your plan and state, you're likely covered. You can book now and we'll confirm your exact cost before your visit."

That is the soft-check fallback from last week. The patient books. The hard check re-runs automatically when the payer recovers, and the patient gets a confirmation message with their actual cost. Eligibility-related denials from this pattern are near zero if the re-check runs before the date of service.

## How to recover
Queue every booking made under the fallback with the payer name. When the payer's health returns to baseline, re-run hard checks on the queue, notify patients whose cost changed, and flag any that came back not-covered for outreach before the visit. Log the incident by payer so you build a history: some payers have a Tuesday-afternoon pattern.

## What ops should see
A per-payer status page: green, degraded, down, with time since last incident and count of bookings currently in fallback. When a payer goes red, ops knows why insured bookings from that plan look strange today, and support knows what to tell patients who call.
