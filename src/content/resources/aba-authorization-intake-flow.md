---
title: "ABA Authorizations and Medicaid: Building an Intake Flow That Doesn't Stall"
excerpt: "ABA credentialing and authorization: diagnosis, assessment auth, treatment plan, and Medicaid MCO rules that vary by state."
lede: "ABA credentialing and authorization is the hardest behavioral health service to move from inquiry to first billable session: diagnosis requirements, assessment authorizations, treatment plan authorizations, and Medicaid MCO rules that vary by state. Here's the intake flow that keeps families moving."
summary:
  - "ABA intake stalls in three places: getting a qualifying diagnosis on file, getting the assessment authorized, and getting the treatment plan authorized. Each is a payer-specific gate."
  - "Eligibility for ABA is not \"plan active.\" It is plan active, ABA benefit present, diagnosis on file, authorization status, and provider type in network."
  - "The intake flow that works runs these checks in parallel from the first call and tracks each family by gate, not by \"status.\""
author: "matt-milford"
publishDate: 2027-02-23
category: "Blog"
icp: ["B"]
pillar: "depth"
keyword: "ABA credentialing and authorization"
tool: "none"
faq:
  - q: "What is ABA credentialing and authorization?"
    a: "ABA credentialing enrolls the rendering provider types (BCBA, BCaBA, RBT under supervision) with each payer. Authorization is the intake gate after that: qualifying diagnosis, assessment units, then treatment-plan hours. Both have to be in place before a billable session."
  - q: "How long does ABA authorization take?"
    a: "Assessment authorization commonly takes days to a few weeks depending on the payer; treatment plan authorization similar. Total inquiry-to-first-session time is often two to four months, most of it administrative and much of it avoidable with parallel intake."
  - q: "Does Medicaid cover ABA?"
    a: "In most states, yes, with age limits, provider type rules, and authorization requirements that vary by state and MCO."
  - q: "What does an eligibility check need to include for ABA?"
    a: "Plan active, ABA benefit present, age limits, diagnosis on file, authorization status and remaining units, and provider type network status."
  - q: "Why do ABA treatment plans get hours cut?"
    a: "Usually because the plan does not map clearly to the payer's medical-necessity criteria. Writing the plan with the authorization specialist involved reduces cuts and appeals."
related: ["/solutions/behavioral-health", "eligibility-at-booking-conversion-lift", "payer-eligibility-outage-detection"]
sourceFile: "05_February_Eligibility_Conversion.md"
calendarWeek: 21
dataReview: "cleared"
draft: false
---
Families seeking ABA have usually already waited months for a diagnosis. Then they hit intake, and many wait months again. Most of that second wait is administrative, and most of it is avoidable.

## The three gates
*Gate 1: Qualifying diagnosis.* Most payers require a documented autism diagnosis from a qualified evaluator before authorizing anything. Families often arrive with a school evaluation or a pediatrician's note that does not meet the payer's standard. Intake has to identify this on day one and route the family to a qualifying evaluation immediately, in parallel with everything else.

*Gate 2: Assessment authorization.* The initial functional behavior assessment (typically 97151) requires prior authorization from many payers, including most Medicaid MCOs. Submitting this requires the diagnosis, the referral, and payer-specific forms. Turnaround ranges from days to weeks by payer.

*Gate 3: Treatment plan authorization.* After the assessment, the treatment plan (hours per week by code, typically 97153, 97155, 97156) goes back to the payer for authorization. This is where hours get cut, where medical necessity is argued, and where a weak plan costs a family months.

## What "eligible" means for ABA
A generic eligibility check tells you the plan is active. For ABA you need: plan active; ABA benefit present (some plans, some states, and some self-funded employers exclude it); age limits on the benefit; the diagnosis on file with the payer; current authorization status and remaining units; and whether the rendering provider type (BCBA, BCaBA, RBT under supervision) is enrolled and in network in this state. Five of those six are not in a standard eligibility response. Your intake system has to hold them.

## Medicaid specifics
State Medicaid programs and their MCOs differ on: whether ABA is covered at all and to what age, which provider types can bill and under what supervision, whether the RBT must be enrolled individually, authorization forms and turnaround, and units per authorization period. A group operating in three states is running three different intake rulebooks. Encode them; do not rely on the intake coordinator's memory.

## The flow
1. *First call.* Capture payer, state, member details, diagnosis status and source, and school or medical records. Run the eligibility check for ABA benefit and provider network status the same day.
2. *Route the diagnosis.* If the diagnosis on file does not meet the payer standard, refer to a qualifying evaluator immediately. Do not wait for the rest of intake.
3. *Submit assessment authorization* the day the diagnosis is confirmed, using payer-specific templates.
4. *Schedule the assessment* for the first available slot after expected authorization, provisionally, so the family is not waiting again after approval.
5. *Submit the treatment plan* within days of the assessment, written to the payer's medical-necessity criteria. This is a clinical document with a billing consequence; the BCBA and the authorization specialist should write it together.
6. *Track every family by gate,* with days in gate and next action, not by a "status" column.
7. *Re-authorization calendar.* Authorizations expire. Start the renewal 30 days before, every time, automatically.

## Why generic platforms struggle here
ABA is authorization-driven, unit-based, supervision-dependent, and Medicaid-heavy. A platform built around visit-level eligibility and claim submission for telehealth visits does not have the objects (authorizations, units, provider hierarchies) to run it. Groups that do ABA well have intake tooling that models those objects, and we learned this from the ABA groups that bill through Anvil.
