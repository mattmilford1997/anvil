---
title: "Six Months of Insurance Infrastructure: What We Would Tell a Founder Starting Today"
excerpt: "Six months of writing about credentialing, contracts, rates, eligibility, and compliance, condensed into lessons for a founder starting today."
lede: "Six months ago we started writing about how care companies get on insurance, own their contracts, and see what they are paid. This post condenses those 25 posts into the lessons we would give a founder starting today, organized by the six things we think a platform owes you."
summary:
  - "Speed is a sequencing problem. Roster-add gets you billing while your own enrollments run, and the two should start the same day."
  - "Ownership is the whole point. Form your own entity at signature, migrate volume to your own contracts, and make sure every claim shows the contracted rate and the platform fee as separate lines."
  - "The cheapest mistakes to avoid are the ones you can see coming: state rollout order, Medicaid variance, CPOM structure, and eligibility checks that are not specific enough."
author: "matt-milford"
publishDate: 2027-03-30
category: "Blog"
icp: ["A", "B", "C", "D", "E"]
pillar: "depth"
keyword: "Anvil (brand and recap)"
tool: "all"
faq:
  - q: "How fast can a care company start billing insurance?"
    a: "Weeks, if a platform can add your clinicians to existing contracts while your own enrollments run in parallel. Unmanaged credentialing is commonly cited at 90 to 120 days per clinician per payer, and building in-house typically takes 12 to 24 months."
  - q: "Should a care company own its own payer contracts?"
    a: "Yes, and the entity should be formed at signature, not later. Renting a network is a reasonable way to start. It is a poor place to end up, because you cannot negotiate a rate you are not party to."
  - q: "What does the platform publish?"
    a: "Reimbursement ranges by state and code in the rate lookup, pricing with a calculator, and the contracted rate and platform fee as separate lines on every claim."
  - q: "Where should a founder start?"
    a: "With the when-to-accept-insurance post, then the five workstreams post, then the rate lookup for your first two states."
related: ["oig-advisory-opinion-25-03-and-state-cpom", "state-cpom-telehealth-billing-map-2027", "health-plan-audits-virtual-care"]
sourceFile: "06_March_Compliance_Structure.md"
calendarWeek: 26
dataReview: "cleared"
draft: false
---
We launched this platform with a thesis: care companies should be able to bill insurance nationally in weeks and own their contracts within a year, with full visibility into what they are paid. Over six months we wrote 25 posts working through the details. This is the condensed version, written for a founder who is deciding this quarter.

The lessons are grouped under the six things we think a platform owes a care company: speed, ownership, transparency, risk, depth, and a real developer surface.

## Speed
*1. Decide whether insurance is worth it before you decide how.* Insurance is a demand channel with a fixed cost of entry. The [when to accept insurance](/resources/when-to-accept-insurance) post gives the test: if your patients have coverage and your cash price is the reason they do not book, the channel pays for itself. If neither is true, wait.

*2. Sequence the two-phase plan.* Roster-add onto existing contracts gets you billing while full enrollment for your own entity runs behind it. The [roster-add versus full enrollment](/resources/roster-add-vs-full-enrollment) post covers the tradeoff. Both should start the same day. Every week the second phase waits is a week added to the day you own your rates.

*3. Budget credentialing honestly.* Unmanaged credentialing is commonly cited at 90 to 120 days per clinician per payer. Managed well, with clean submissions and follow-up cadence, it is shorter, but it is never zero. The [credentialing benchmark](/resources/credentialing-timeline-benchmark-by-payer) and the [cost of delays](/resources/cost-of-credentialing-delays) posts give you the arithmetic for what each idle clinician-week costs.

## Ownership
*4. Form your own entity at signature.* Not after launch. Not when things settle down. The founders who regret the rental model are the ones who let formation slip because launch was busy. On Anvil, PC formation and physician-owner placement start in parallel with roster-add, so the migration path exists from day one. [Renting versus owning](/resources/renting-vs-owning-professional-corporation) explains why this matters more than it seems to at the start.

*5. Plan the migration before you need it.* Moving volume from a rented contract to your own is a payer-by-payer process with its own sequencing. The [migration post](/resources/migrating-from-rented-pc-to-own-contracts) lays out the order. Start with the payers where your own enrollment is complete and your volume is highest.

*6. Investors will ask.* The [investor diligence](/resources/investor-diligence-payer-contracts) post lists the questions. "Whose name is on the contract" is the first one, and "can you show me the contracted rate" is the second.

## Transparency
*7. Know the rate before you sign.* The same code pays differently by state and by payer, and the spread is knowable in advance. The [how to read reimbursement](/resources/behavioral-health-reimbursement-rates-by-state-q1-2027) post walks through 90837, 99214, and 96158 and how to build a rate ladder. The rate lookup publishes ranges by state and code so you can pick states with evidence.

*8. Demand two lines on every claim.* The contracted rate and the platform fee, shown separately. If you cannot see both, you cannot evaluate your economics, and you cannot negotiate a rate you are not party to. [Lease fee versus contracted rate](/resources/lease-fee-vs-contracted-rate) is the argument in full. Anvil shows both lines on every claim, and publishes pricing with a calculator so the fee is known before the conversation starts.

*9. Rate is a rollout input.* Pick first states on three inputs: where demand is, what the core codes pay, and how long the largest payers take to credential. The [largest payers by state](/resources/largest-payers-by-state-rollout-order) post covers the ordering.

## Risk
*10. Get the structure right for each state.* Corporate practice of medicine rules differ by state, and telehealth does not exempt you. The [CPOM map](/resources/state-cpom-telehealth-billing-map-2027) and the [OIG advisory opinion post](/resources/oig-advisory-opinion-25-03-and-state-cpom) cover what the structure has to look like and what the published guidance says about it.

*11. Assume you will be audited.* Health plans audit virtual care programs, and the ones that pass are the ones with documentation built into the workflow rather than reconstructed later. The [audit post](/resources/health-plan-audits-virtual-care) lists what they ask for.

*12. Treat eligibility outages as a state, not a failure.* Payer eligibility systems go down. If your check reports "unknown" as "not covered," you lose real patients. Give outages a distinct status, let the patient book on a soft result, and re-check. [Outage detection](/resources/payer-eligibility-outage-detection) covers how.

## Depth
*13. Medicaid is a state-by-state decision.* Fee schedules, MCO rate floors, carve-outs, and credentialing timelines all vary. The [Medicaid credentialing](/resources/medicaid-credentialing-behavioral-health-by-state) post shows how much. Do not write it off nationally; check the state.

*14. Specialty programs have their own intake.* ABA needs authorization before the first visit, and the intake flow has to collect what the authorization needs. The [ABA intake post](/resources/aba-authorization-intake-flow) is the worked version.

*15. Hybrid care changes the billing.* In-person visits bring place-of-service, facility questions, and a different set of state rules. [Hybrid care billing](/resources/hybrid-in-person-care-insurance-billing) covers the differences.

*16. Do not build this in-house unless it is your product.* Building the [five workstreams](/resources/five-workstreams-insurance-operations) internally is commonly cited at 12 to 24 months, and running them costs on the order of 20 to 25% of insured revenue. The [cost of in-house operations](/resources/cost-of-in-house-insurance-operations) post does the math. Expect first-year denial rates of 10% or more, falling toward about 5% as the process matures.

## Developer
*17. Eligibility belongs in the booking flow, by API.* Not in a back office queue. A check at booking that returns plan active, service covered, clinician in-network in that state, and estimated cost, in one call, is the single change that moves an insured funnel most. Industry sources commonly cite a 2 to 5x lift. The [conversion post](/resources/eligibility-at-booking-conversion-lift) shows how to measure your own number instead of trusting anyone's.

*18. Soft check and hard check are different calls.* Use the soft check to shape the flow and the hard check to commit to a cost. The [soft versus hard check](/resources/soft-check-hard-check-eligibility-api) post covers when each one runs.

## The whole thing in one table
| Pillar | The lesson | The post to start with |
|---|---|---|
| Speed | Start roster-add and own-entity enrollment the same day | [Roster-add vs full enrollment](/resources/roster-add-vs-full-enrollment) |
| Ownership | Form your PC at signature and plan the migration | [Migrating to your own contracts](/resources/migrating-from-rented-pc-to-own-contracts) |
| Transparency | Know the rate before you sign; see two lines on every claim | [How to read reimbursement by state](/resources/behavioral-health-reimbursement-rates-by-state-q1-2027) |
| Risk | Structure by state, document for audit, handle outages as a state | [State CPOM map](/resources/state-cpom-telehealth-billing-map-2027) |
| Depth | Medicaid, ABA, and hybrid each need their own playbook | [Medicaid credentialing by state](/resources/medicaid-credentialing-behavioral-health-by-state) |
| Developer | Eligibility at booking, by API, with a distinct outage status | [Eligibility at booking](/resources/eligibility-at-booking-conversion-lift) |

## What we would tell a founder starting today
Pick two states using rate and credentialing data. Sign with a platform that starts your own entity the same day it adds you to its contracts. Put eligibility at booking before your first insured patient arrives. Insist on seeing the contracted rate and the fee on every claim. Then measure everything, because the numbers that matter are yours, not ours.

## What's next
More state pages, more codes in the lookup, and every tool on the site stays free and ungated.

## Next step
Look up rates for your first two states at [/rates](/rates), then run the [pricing calculator](/pricing#calculator) to see what the platform costs at your volume.

---
