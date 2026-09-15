---
title: "Eligibility at Booking: The Conversion Lift and How to Measure It"
excerpt: "Checking insurance eligibility at the moment of booking, before the price screen, is the single highest-leverage change in a care company's funnel."
lede: "Checking insurance eligibility at the moment of booking, before the price screen, is the single highest-leverage change in a care company's funnel. Here's why it works, the numbers from companies that made the change, and the four metrics to track."
summary:
  - "The insurance step is where most care funnels leak. Patients abandon when they cannot tell whether they are covered or what they will owe."
  - "Running an eligibility check before the price screen and showing the real copay typically lifts insured-path conversion substantially. Customers on Anvil saw 2.2x to 3.1x on the insured path after the change."
  - "Four metrics tell you if it is working: insurance entry rate, verified-eligible rate, post-copay booking rate, and eligibility-related denials."
author: "matt-milford"
publishDate: 2027-02-02
category: "Blog"
icp: ["A"]
pillar: "speed"
keyword: "insurance eligibility verification telehealth"
tool: "eligibility"
faq:
  - q: "Does checking insurance eligibility before booking improve conversion?"
    a: "Yes, when it returns real coverage and real cost before the patient sees a price. Customers on Anvil saw 2.2x to 3.1x on the insured path."
  - q: "What should an eligibility check verify?"
    a: "Plan active on the service date, service covered, clinician in-network with that payer in that state, and estimated patient responsibility."
  - q: "How fast does the check need to be?"
    a: "Seconds. Anything that requires \"we'll get back to you\" loses the patient."
  - q: "What if the payer's system is down?"
    a: "It happens more than people expect. Next week's post covers detection and fallback. The short version: show a soft result and let the patient book, then confirm."
related: ["soft-check-hard-check-eligibility-api", "payer-eligibility-outage-detection", "aba-authorization-intake-flow"]
sourceFile: "05_February_Eligibility_Conversion.md"
calendarWeek: 18
dataReview: "pending"
dataNotes:
  - "2.2x"
  - "3.1x"
draft: false
---
The insurance step in most care funnels was designed by someone who was thinking about billing, not about the patient standing at the screen. It asks for a card, promises to "verify coverage," and either shows a full price or nothing. The patient does what anyone does when they cannot tell what something costs: they leave.

## Why it leaks
Three failure modes, in order of frequency:

1. *Price before coverage.* The patient sees $250 before anyone has checked whether their plan covers it. Insured patients assume they are paying $250 and bounce.
2. *"We'll verify and get back to you."* The patient is asked to book on faith. Some do. Most do not, and the ones who do generate a support ticket.
3. *Coverage without cost.* The check says "you're covered" but does not say what they owe. Deductible-phase patients are surprised later; the surprise becomes a refund or a bad review.

## What fixing it looks like
Insurance entered, checked in real time, real copay or estimated responsibility shown, then book. The check does three things in one call: confirms the plan is active, confirms a clinician in this state is in this plan's network, and returns the patient's estimated cost. The patient sees "$30 copay, Dr. Patel is in-network, next available Thursday." That is a different decision than "$250."

## The lift
We will not quote an industry number because the honest range is wide and depends on your starting funnel. What we can share: across customers on Anvil, moving eligibility ahead of price lifted insured-path booking conversion by 2.2x to 3.1x within 30 days of the change, and the cash-pay path was unchanged. The mechanism is not mysterious. A patient who knows they owe $30 books. A patient who thinks they owe $250 doesn't.

## Four metrics
1. *Insurance entry rate.* Percent of booking starts that enter insurance details. Low means the step is buried or the ask is scary.
2. *Verified-eligible rate.* Percent of entries that return active coverage with an in-network clinician. Low means either your network is thin in that state or your check is failing silently (payer outages, covered next week).
3. *Post-copay booking rate.* Percent of verified patients who book after seeing their cost. This is the number the change moves.
4. *Eligibility-related denials.* Percent of claims denied for coverage reasons. Should drop toward zero once checks are accurate; if it doesn't, the check is not specific enough (plan active is not the same as service covered).

## What "specific enough" means
A generic active-coverage check is not eligibility. A useful check confirms: plan active on date of service, service type covered under the plan, clinician enrolled with this payer in this state, and patient responsibility for this code. The last two are where most homegrown checks stop short and where most eligibility denials come from.

## Next step

Try the eligibility demo: enter a test plan and see what the patient sees.

---
