---
title: "Soft Check vs Hard Check: Designing an Insurance Step That Feels Like Checkout (Developer Edition)"
excerpt: "A developer's guide to building an insurance step that converts: the two-stage eligibility pattern (soft check for routing, hard check for coverage and."
lede: "A developer's guide to building an insurance step that converts: the two-stage eligibility pattern (soft check for routing, hard check for coverage and cost), what each call returns, where to put them in the flow, and how to handle the edge cases."
summary:
  - "Split eligibility into two calls. A soft check answers \"can we serve this patient at all?\" using payer, state, and clinician network data. A hard check answers \"is this plan active and what does it cost?\" using a live payer query."
  - "Run the soft check as early as possible, ideally on payer and state alone, before the patient types a member ID. Run the hard check once you have the ID, before the price screen."
  - "Handle three edge cases explicitly: payer system outages, plans that are active but do not cover the service, and multiple clinician types with different network status."
author: "matt-milford"
publishDate: 2027-02-09
category: "Blog"
icp: ["A"]
pillar: "developer"
keyword: "eligibility API"
tool: "docs"
faq:
  - q: "What is the difference between a soft and a hard eligibility check?"
    a: "A soft check uses payer, state, and your network data to answer \"can we serve this patient\" without a member ID or a live payer call. A hard check queries the payer with a member ID and returns coverage, service benefit, network status, and cost."
  - q: "When should eligibility be checked in a booking flow?"
    a: "Soft check as soon as payer and state are known. Hard check after member ID, before the price screen."
  - q: "What should happen if the payer's eligibility system is down?"
    a: "Distinguish system errors from policy errors. On system error, fall back to the soft result, allow booking with an estimated flag, and re-check when the payer recovers."
  - q: "Can an eligibility check tell me the patient's copay?"
    a: "A properly specified hard check returns copay, coinsurance, and deductible status. Some results are conditional; design the UI for that."
related: ["eligibility-at-booking-conversion-lift", "payer-eligibility-outage-detection", "aba-authorization-intake-flow"]
sourceFile: "05_February_Eligibility_Conversion.md"
calendarWeek: 19
dataReview: "cleared"
draft: false
---
This post is for the engineer who has been handed "add insurance to the booking flow" and would like to not learn every lesson the hard way.

## The two-call pattern
*Soft check.* Inputs: payer (from a dropdown), state (from the patient), optionally service type and clinician type. Output: whether your organization has clinicians enrolled with this payer in this state for this service. No member ID needed. No live payer call. Fast, deterministic, cacheable. Use it to route: if the answer is no, show the cash path or a waitlist immediately instead of collecting a card and disappointing later.

*Hard check.* Inputs: member ID, date of birth, payer, service type, date of service, clinician or clinician type. Output: plan active, service covered, network status for the clinician, and estimated patient responsibility (copay, coinsurance, deductible remaining). This is a live query to the payer, so it takes seconds and can fail. Use it right before the price screen.

## Where they go in the flow
1. Patient selects service.
2. Patient selects state and payer. Soft check runs. If no: cash path. If yes: continue.
3. Patient enters member ID and DOB. Hard check runs.
4. Result screen: "You're covered. Estimated cost $30. Dr. Patel is in-network. Next available: Thursday."
5. Book.

The price screen for the insured path is step 4. The patient never sees a cash price unless the soft check fails or they choose it.

## What the hard check should return (minimum)
- Coverage status on the date of service
- Whether the specific service type is a covered benefit
- Network status for the rendering clinician (or clinician type) with this payer in this state
- Estimated responsibility: copay, coinsurance percent, deductible remaining, out-of-pocket max remaining
- Policy-level errors, distinguished from system errors

That last item matters more than it sounds. "Member not found" and "payer system unavailable" should not produce the same screen.

## Three edge cases
*Payer outages.* Payer eligibility endpoints go down, sometimes for hours. If your hard check treats every failure as "not covered," you will turn away covered patients every time a payer has an incident. The pattern: on a system error (not a policy error), fall back to the soft check result, let the patient book with an "estimated" flag, and re-run the hard check when the payer recovers. Next week's post covers detection.

*Active plan, uncovered service.* Common in behavioral health (carve-outs to a separate behavioral health administrator) and in newer service types. The hard check must ask about the service, not just the plan. If it comes back active-but-not-covered, that is a cash-path patient or a different-payer patient, and the screen should say so plainly.

*Multiple clinician types.* A payer may have your psychiatric NPs in network and your therapists not, or vice versa, in a given state. If your booking flow offers both, the check should be per clinician type and the result should route to the ones who are in network.

## Conditional patient responsibility
Some plans return different responsibility depending on whether the visit is telehealth or in-person, or whether the deductible has been met. Design the result screen to show a range or a conditional ("$30 copay after deductible; you have $412 remaining") rather than a single number that will be wrong half the time.

## Webhooks and status
Enrollment status for your clinicians changes over time. Subscribe to enrollment events rather than polling, so a clinician who becomes in-network with a payer starts appearing in soft-check results the same day.

## Next step

Read the eligibility docs and try the sandbox.

---
