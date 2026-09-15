---
title: "Cash-pay to in-network: the two-phase plan that doesn't crater your conversion"
excerpt: "Adding insurance to a cash-pay funnel usually kills booking conversion. Here is the two-phase plan that keeps it intact."
summary:
  - "Most cash-pay companies lose conversion when they add insurance because they add a card upload and a multi-day wait to the booking flow."
  - "Phase 1 launches in-network in your top states on a rented PC, with a soft eligibility check at booking and cash-pay kept as the fallback path."
  - "Phase 2 moves volume to your own PC and payer contracts as they come live, while the booking flow the patient sees stays exactly the same."
  - "Pick rollout states by covered lives and by where your clinicians already hold licenses, then measure conversion by cohort against your cash-pay baseline."
author: "matt-milford"
publishDate: 2026-10-19
category: "Blog"
icp: ["A"]
pillar: "speed"
keyword: "cash pay to insurance"
tool: "eligibility"
faq:
  - q: "Will adding insurance lower my booking conversion?"
    a: "It will if you add a card upload and a wait. If you run a soft eligibility check at booking and keep cash-pay as the fallback, most companies see conversion hold or rise, because the covered patient now sees a copay instead of a full cash price."
  - q: "What is a soft eligibility check?"
    a: "A real-time query to the payer using name, date of birth, and payer, with no card photo required. It returns whether the plan is active and, usually, the copay or coinsurance for the service type. It takes seconds, not days."
  - q: "Do I need my own payer contracts before I can accept insurance?"
    a: "No. You can launch in-network by enrolling your clinicians under an already-contracted professional corporation, then build your own contracts in parallel and move volume over as they come live."
  - q: "Which states should I launch insurance in first?"
    a: "Start where you already have licensed clinicians and where the covered lives are concentrated. A state with 3 licensed clinicians and a large commercial population beats a state with 1 clinician and a small one."
  - q: "What happens when a payer's eligibility system is down?"
    a: "Do not block the booking. Show the cash price with a note that insurance will be confirmed before the visit, book the patient, and re-run the check when the payer is back up."
  - q: "How long does it take to move from a rented PC to my own contracts?"
    a: "Your own PC and payer contracts typically come live over 6 to 18 months, one payer and state at a time. Volume moves as each contract goes live. The patient never sees the change."
related: ["when-to-accept-insurance-virtual-care", "cost-of-an-idle-credentialed-clinician", "renting-a-pc-vs-owning-one"]
draft: false
---

## The failure mode: an insurance step that kills the booking

You have a cash-pay funnel that works. Say you convert 8% of landing page visitors into a booked first visit. Someone on the team says the words "we should take insurance," and everyone nods, because the market is bigger and the cash price is capping growth.

Then the product team builds the obvious thing. A new step in booking: "Do you have insurance? Upload a photo of the front and back of your card. We will verify your coverage and email you within 2 to 3 business days."

Conversion drops. Not by a little. The patient who wanted to book tonight now has homework and a wait. The patient who would have paid cash sees the insurance option, picks it, and then never comes back after the 3-day hold. You have taken a funnel that closed in one session and turned it into a funnel that closes in three sessions across four days. A large share of patients do not survive that.

This is the most common way cash-pay companies hurt themselves when they go in-network. It is avoidable. The fix is not "don't take insurance." The fix is to sequence the work so the booking flow never gets worse.

## The two-phase plan

Two phases, run in parallel, with one rule: the patient-facing flow is designed once and does not change between phases.

### Phase 1: launch in-network on a rented PC with eligibility at booking

Getting your own payer contracts takes time. Credentialing alone is commonly cited at 90 to 120 days per payer when unmanaged, and contracting runs after that. Building in-house is commonly cited at 12 to 24 months to get national. You should not wait that long to start taking insurance, and you do not have to.

Phase 1 is:

1. Enroll your clinicians under an already-contracted 50-state professional corporation. This is a roster-add, not a new contract, so it runs in weeks.
2. Add a soft eligibility check at booking. No card upload. The patient enters name, date of birth, and picks their payer from a list. You query the payer in real time and show one of two messages: "You're covered. Estimated copay: $25" or "We couldn't confirm coverage. You can book today at our self-pay rate of $X and we will re-check before your visit."
3. Keep cash-pay as the fallback path on every branch. Nobody hits a dead end.
4. Launch in your top 3 to 5 states, not all 50. More on picking states below.
5. Measure conversion by cohort against the cash-pay baseline from the same period.

The eligibility check is the whole ballgame. Checking eligibility at booking is commonly cited to lift insurance-funnel conversion 2 to 5x compared to a flow that verifies after the fact. The mechanism is simple. A patient who sees "covered, $25 copay" in the same screen where they used to see "$180" is more likely to book, not less. You have turned insurance from a barrier into a discount.

### Phase 2: move volume to your own PC and contracts

While Phase 1 is live and producing revenue, Phase 2 runs underneath it:

1. Form your own professional corporation in each state where you operate, structured for that state's corporate practice of medicine rules.
2. Place a physician owner and stand up the management agreement.
3. Credential your clinicians under your own entity.
4. Contract your own entity with each payer, state by state.
5. As each contract comes live, route new bookings for that payer and state to your PC instead of the rented one.

This takes 6 to 18 months, one payer and state at a time. The point of the two-phase plan is that none of it touches the patient. The booking flow, the eligibility check, the copay message, the fallback path: all identical. The only thing that changes is which tax ID the claim goes out under.

If you do Phase 1 without Phase 2, you are renting forever and you never own the contracts or the rates. If you do Phase 2 without Phase 1, you are waiting a year to take your first insured patient. Do both.

## Booking-flow decisions

These are the decisions that determine whether conversion holds. Each one has a right answer for a company in this position.

| Decision | Wrong answer | Right answer | Why |
|---|---|---|---|
| Soft check vs hard check | Require card upload and manual verification before booking | Soft check at booking (name, DOB, payer), hard check before the visit | The soft check is instant and answers the only question the patient has right now: what will this cost me |
| When to collect member ID | Before the patient can see availability | After the patient has picked a slot, or skip it if the soft check succeeded | Every field before the calendar costs conversion. Member ID is needed for the claim, not for the decision to book |
| What to show on "covered" | "Coverage verified" with no number | "You're covered. Estimated copay: $25" | The number is what closes the booking. Verified without a price is still uncertainty |
| What to show on "not found" | An error and a dead end | "We couldn't confirm coverage. Book at $X self-pay and we'll re-check before your visit" | Not found is often a data entry issue or a payer that was not in the list. Do not lose the patient over it |
| Payer outage | Block booking until the payer responds | Book at self-pay, flag the record, re-run the check automatically when the payer is back | Outages are common and short. A blocked booking is a lost booking |
| Copay vs coinsurance vs deductible | Show nothing when the plan has a deductible | Show "Estimated cost: $X. You have $Y left on your deductible" | An honest estimate beats a surprise bill and beats a blank |
| Out-of-network payer | Hide the insurance option | Show "We're not in-network with this plan yet. Book at $X self-pay" and log the payer | The log tells you which contracts to prioritize in Phase 2 |
| Re-verification before visit | Skip it | Re-run the hard check 24 to 48 hours before the visit | Coverage changes. This catches terminations before you deliver care you cannot bill |

The pattern across every row: never make the patient wait, never make the patient do work the claim does not require, and always leave a path to book.

## What to measure

You cannot know whether insurance helped or hurt unless you define the funnel before launch and run it by cohort. Keep it simple.

### The funnel

1. **Visitor**: landed on the booking page.
2. **Started**: entered at least one field.
3. **Eligibility checked**: submitted the soft check (insurance cohort only).
4. **Priced**: saw a price, either a copay estimate or the cash rate.
5. **Booked**: confirmed a slot.
6. **Attended**: showed up to the first visit.
7. **Paid**: claim paid or cash collected.

### The cohorts

Split every metric three ways:

- **Cash-pay baseline**: patients who went through the flow before insurance launched, or who chose cash-pay after launch.
- **Insurance, covered**: patients who got a "you're covered" message.
- **Insurance, not found**: patients who got the fallback message.

The numbers you care about:

- Booked / Visitor, by cohort. This is the headline. If the insurance-covered cohort books at a lower rate than the cash baseline, something in the flow is wrong, and it is usually a field or a wait.
- Attended / Booked, by cohort. Insured patients with a $25 copay sometimes no-show more than cash patients who prepaid $180. A card-on-file at booking for the copay fixes most of this.
- Priced / Eligibility checked. This is your payer data quality. If 30% of checks come back "not found," your payer list is wrong, your inputs are wrong, or you have the wrong clearinghouse.
- Paid / Attended, by cohort. This is denial rate showing up in your funnel. First-year denial rates for teams doing it themselves commonly run 10% or more, against roughly 5% at steady state. If the insurance cohort's paid rate is far below the cash cohort's, the problem is in claims, not in booking.

Run the comparison weekly for the first 90 days. Set a trip-wire: if Booked / Visitor for the covered cohort falls below the cash baseline for 2 consecutive weeks, roll the flow back and find the field that caused it.

## Rollout order: which states first

Do not launch insurance in all 50 states on day one. Every state you add is a state where you need licensed clinicians, correct payer lists, and a denial workflow that handles that state's quirks. Pick 3 to 5 states for Phase 1 and expand from there.

### Rank states on two axes

1. **Covered lives you can reach.** For each state, estimate the commercial, Medicare Advantage, and Medicaid population that fits your service line. If you have demand data from your cash-pay funnel, use it: the states where cash patients already come from are the states where insured patients will come from.
2. **Clinicians already licensed.** For each state, count clinicians who hold an active license today. A state where you have 4 licensed clinicians can absorb volume the day the roster-add clears. A state where you have zero needs 60 to 120 days of licensing before insurance matters at all.

Score each state on both, then take the top of the list. A worked example, with hypothetical numbers:

Say you have 20 clinicians. 12 are licensed in State A, 6 in State B, 3 in State C, 1 in State D. Your cash-pay demand runs 35% from State A, 20% from State B, 15% from State C, 10% from State D, and the rest scattered. States A, B, and C are your Phase 1 launch. State D has demand but one clinician, so you start licensing more people there now and add it in wave two. The scattered 20% stays cash-pay until you have coverage.

### Within each state, sequence payers

Inside a launch state, not every payer is worth the same. Use the rate data before you sign. Look at what each payer actually pays for your top 5 CPT codes in that state, subtract your platform fee, and rank. A payer with a large share of covered lives and a rate that clears your unit economics goes first. A payer with a small share and a low rate goes last, or not at all. You can see this by state and code at [/rates](/rates).

Then check panels. Some payers close panels for some specialties in some markets. A closed panel in Phase 2 does not stop Phase 1, because your clinicians are enrolled under an existing contract. It does change how long Phase 2 takes for that payer, so know it early.

### Expansion waves

After the first 3 to 5 states are live and the funnel numbers are holding, add states in waves of 3 to 5 every 30 to 60 days. Each wave uses the same scoring. Each wave gets its own cohort in the funnel so you can see whether a new state is dragging the average.

## Three things that make this plan fail

1. **Letting the product team add "just one more field."** The booking flow is the asset. Every field before the calendar is a conversion tax. Member ID, group number, subscriber name, and card photos all belong after the slot is picked or in the pre-visit reminder, not in the booking path.
2. **Skipping the fallback.** If the soft check fails and the patient sees an error, you have lost a patient who would have paid cash. The fallback is not optional.
3. **Running Phase 1 and never starting Phase 2.** Renting is the right way to launch. It is the wrong way to run a company for five years. If you never form your own PC and contract your own entity, you never see the rate, never negotiate it, and start over if you ever switch vendors. Set the Phase 2 clock the same week Phase 1 goes live.

## Next step

The eligibility check is the piece that decides whether this plan works. See how the real-time check runs at booking, what it returns, and how the fallback path is built at [/platform/eligibility](/platform/eligibility).
