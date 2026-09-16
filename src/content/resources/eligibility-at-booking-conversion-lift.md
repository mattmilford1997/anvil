---
title: "Eligibility at Booking: The Conversion Lift and How to Measure It"
excerpt: "Checking insurance eligibility before the price screen is the change that moves a care funnel most. Here is how to measure the lift in your own data."
lede: "Checking insurance eligibility at the moment of booking, before the price screen, is the single change that moves a care company's funnel most. Here is why it works, the range the industry commonly cites, and a method for measuring the lift in your own funnel so you do not have to take anyone's number on faith."
summary:
  - "The insurance step is where most care funnels leak. Patients abandon when they cannot tell whether they are covered or what they will owe."
  - "Running an eligibility check before the price screen and showing the real copay is commonly cited to lift insured-path conversion 2 to 5x. Your number depends on your starting funnel, so measure it."
  - "Four metrics tell you if it is working: insurance entry rate, verified-eligible rate, post-copay booking rate, and eligibility-related denials. A clean cohort design keeps them honest."
author: "matt-milford"
publishDate: 2027-02-02
category: "Blog"
icp: ["A"]
pillar: "speed"
keyword: "insurance eligibility verification telehealth"
tool: "eligibility"
faq:
  - q: "Does checking insurance eligibility before booking improve conversion?"
    a: "Yes, when it returns real coverage and real cost before the patient sees a price. Industry sources commonly cite a 2 to 5x lift on the insured path. The right answer for your company comes from measuring your own funnel."
  - q: "What should an eligibility check verify?"
    a: "Plan active on the service date, service covered, clinician in-network with that payer in that state, and estimated patient responsibility."
  - q: "How fast does the check need to be?"
    a: "Seconds. Anything that requires \"we'll get back to you\" loses the patient."
  - q: "What if the payer's system is down?"
    a: "It happens more than people expect. The short version: show a soft result with a distinct outage status, let the patient book, then confirm. Our outage detection post covers the detail."
related: ["soft-check-hard-check-eligibility-api", "payer-eligibility-outage-detection", "aba-authorization-intake-flow"]
sourceFile: "05_February_Eligibility_Conversion.md"
calendarWeek: 18
dataReview: "cleared"
draft: false
---
The insurance step in most care funnels was designed by someone who was thinking about billing, not about the patient standing at the screen. It asks for a card, promises to "verify coverage," and either shows a full price or nothing. The patient does what anyone does when they cannot tell what something costs: they leave.

## Why it leaks
Three failure modes, in order of frequency:

1. *Price before coverage.* The patient sees $250 before anyone has checked whether their plan covers it. Insured patients assume they are paying $250 and bounce.
2. *"We'll verify and get back to you."* The patient is asked to book on faith. Some do. Most do not, and the ones who do generate a support ticket.
3. *Coverage without cost.* The check says "you're covered" but does not say what they owe. Deductible-phase patients are surprised later; the surprise becomes a refund or a bad review.

## What fixing it looks like
Insurance entered, checked in real time, real copay or estimated responsibility shown, then book. The check does three things in one call: confirms the plan is active, confirms a clinician in this state is in this plan's network, and returns the patient's estimated cost. Picture the screen: "$30 copay, your clinician is in-network, next available Thursday." That is a different decision than "$250."

## The lift, and why we will not quote ours
Industry sources commonly cite a 2 to 5x lift in insured-path conversion when eligibility and cost move ahead of the price screen. The range is wide because the starting point varies. A funnel that already shows an estimated cost will move less than one that shows a full cash price to every insured patient.

The mechanism is not mysterious. A patient who knows they owe $30 books. A patient who thinks they owe $250 does not. But the size of the effect in your funnel is a measurement question, not a benchmark question. The rest of this post is the method.

## Step 1: Define the funnel
Write down the steps a patient passes through, and put a timestamp on each one. A typical insured-path funnel:

1. Booking start (landing page or intake begins)
2. Insurance entry (member ID and payer submitted)
3. Eligibility result returned (active, in-network, cost estimate)
4. Cost screen viewed
5. Appointment booked
6. Appointment attended
7. Claim adjudicated

Most teams only log steps 1 and 5. You need every step, and you need the cash-pay path logged separately so it can serve as a control.

## Step 2: Design the cohort
The common mistake is comparing last month to this month. Marketing spend, seasonality, and a new clinician all move conversion, and you will attribute the change to the wrong thing.

Better options, in order of rigor:

| Design | How it works | When to use it |
|---|---|---|
| Randomized split | Half of booking starts see eligibility before price; half see the old flow. Compare within the same period. | You have enough volume to reach a few hundred booking starts per arm within 2 to 4 weeks. |
| Staggered rollout by state | Turn the new flow on in some states first. Compare turned-on states to not-yet states over the same weeks. | Volume is too thin for a split but you serve several states. |
| Before and after with a control path | Compare insured-path conversion before and after, and confirm cash-pay conversion did not move. | Volume is thin and you serve one state. Weakest design; state the caveat in the write-up. |

Whatever the design, fix the measurement window before you start. Two to four weeks is typical. Do not stop early because the number looks good.

## Step 3: The four metrics
1. *Insurance entry rate.* Booking starts that enter insurance details, divided by booking starts. Low means the step is buried or the ask is scary.
2. *Verified-eligible rate.* Entries that return active coverage with an in-network clinician, divided by entries. Low means either your network is thin in that state or your check is failing silently, which is why a distinct outage status matters.
3. *Post-copay booking rate.* Verified patients who book after seeing their cost, divided by verified patients. This is the number the change moves.
4. *Eligibility-related denials.* Claims denied for coverage reasons, divided by claims. Should drop toward zero once checks are accurate. If it does not, the check is not specific enough.

Insured-path conversion is the product of the first three. Report the components, not just the product, or you will not know which step moved.

## Step 4: A worked example with made-up numbers
Every number in this section is invented to show the arithmetic. Do not cite it.

Suppose a hypothetical company runs a randomized split over three weeks, 1,000 insured booking starts per arm.

| Metric | Old flow | New flow |
|---|---|---|
| Insurance entry rate | 60% (600) | 70% (700) |
| Verified-eligible rate | 80% (480) | 80% (560) |
| Post-copay booking rate | 20% (96) | 40% (224) |
| Insured-path conversion | 9.6% | 22.4% |

That is roughly a 2.3x lift on the insured path, sitting inside the commonly cited range. Notice which component moved: post-copay booking rate doubled, entry rate rose modestly, and verified-eligible rate did not change at all. That pattern is what you would expect if the change is working as intended. If verified-eligible rate had jumped, you would suspect the new check was returning false positives, and you would look at eligibility denials next.

Check the cash-pay path too. If cash conversion moved by the same amount, something other than the eligibility flow changed and the result is not yours to claim.

## Common measurement mistakes
1. *No control.* Before-and-after with no cash-pay comparison and no holdout. The most common mistake and the easiest to fix.
2. *Counting outage results as failures.* If the payer's system is down and your check returns "unknown," that patient did not fail eligibility. Give outages a distinct status and report them separately. The [outage detection post](/resources/payer-eligibility-outage-detection) covers how.
3. *Mixing soft and hard checks.* A soft check that says "likely covered" and a hard check that returns a cost estimate produce different behavior. Tag each result with which one ran. The [soft check versus hard check](/resources/soft-check-hard-check-eligibility-api) post explains the distinction.
4. *Stopping at the booking.* A booked patient whose claim later denies for eligibility was not a conversion. Follow the cohort through adjudication before you publish the number.
5. *Reporting only the product.* A 2x lift in conversion can hide a drop in one component and a spike in another. Report all four metrics.

## What "specific enough" means
A generic active-coverage check is not eligibility. A useful check confirms: plan active on date of service, service type covered under the plan, clinician enrolled with this payer in this state, and patient responsibility for this code. The last two are where most homegrown checks stop short and where most eligibility denials come from. On Anvil, the check runs at booking by API and returns those four items in one call, with a distinct outage status when the payer does not respond.

## Next step
See what the patient sees. Enter a test plan on the [eligibility page](/platform/eligibility), then set up the funnel logging above before you turn it on for real patients.

---
