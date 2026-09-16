---
title: "The 3 to 5 Payers That Cover 80% of Lives in Each State, and What That Means for Your Rollout Order"
excerpt: "In most states, three to five payers cover the large majority of commercially insured and Medicaid lives."
lede: "In most states, three to five payers cover the large majority of commercially insured and Medicaid lives. Here's how to find them, how to combine payer share with rates and credentialing timelines, and the rollout sequence that follows."
summary:
  - "Payer concentration is high in almost every state. Contracting with the top three to five plans usually reaches most insured patients; the long tail adds little."
  - "Rollout order should be built from three inputs per state: payer share, rate medians, and credentialing timelines. Two of those we have already published."
  - "The output is a ranked list of payer-state pairs, not a list of states. That list is your contracting plan."
author: "matt-milford"
publishDate: 2027-01-26
category: "Blog"
icp: ["A", "B"]
pillar: "depth"
keyword: "largest health insurers by state"
tool: "coverage-map"
faq:
  - q: "How many payers do I need to contract with in a state?"
    a: "Usually three to five to reach most commercially insured lives, plus the two or three largest Medicaid MCOs if Medicaid matters to your model."
  - q: "Which health insurers are largest by state?"
    a: "It varies: most states have a dominant Blue plan plus one or two nationals. The table above lists the largest plans in approximate order for the states we cover. Public enrollment data is the source, not Anvil claims data."
  - q: "Should I contract with every payer in a state?"
    a: "No. The long tail adds credentialing cost for very few patients. Start with the top group and add based on your own booking data."
  - q: "How do I combine rates and payer share?"
    a: "Rank payer-state pairs by lives reachable, weighted by median rate and divided by expected credentialing time. That ranking is your application order."
related: ["behavioral-health-reimbursement-rates-by-state-q1-2027", "lease-fee-vs-contracted-rate", "payer-contracting-101-care-companies"]
sourceFile: "04_January_Rates_Contracting.md"
calendarWeek: 17
dataReview: "cleared"
draft: false
---
"We're launching in Texas" is not a plan. "We're contracting with these 4 plans in Texas in this order" is. Here is how to get from the first sentence to the second.

## Payer concentration by state
In nearly every state, a small number of payers cover most commercial lives: typically 1 dominant Blue plan, 1 or 2 national carriers, and in some markets a strong regional. Medicaid follows the same pattern through its managed care organizations. 2 or 3 plans usually cover most managed Medicaid members.

The table below is a starting point, not a source of truth. It is built from approximate public enrollment data, with plans listed largest first. It is not Anvil data. Shares move with every open enrollment and every acquisition, so confirm against the latest state filings before you file an application based on it.

<!-- verify before publishing -->
| State | Commercial payers, largest first (approximate, public data) | Medicaid plans, largest first | Concentration |
|---|---|---|---|
| Arizona | BCBS of Arizona, UnitedHealthcare, Aetna, Cigna | Mercy Care, Arizona Complete Health, Banner-University Family Care | High |
| California | Kaiser (closed network), Anthem Blue Cross, Blue Shield of California, UnitedHealthcare | L.A. Care, Health Net, Molina, county plans | High, but the largest plan is not contractable in the usual way |
| Colorado | Anthem, UnitedHealthcare, Kaiser, Cigna | Regional Accountable Entities by region (Colorado Access, Rocky Mountain Health Plans, others) | High |
| Illinois | BCBS of Illinois, UnitedHealthcare, Aetna, Cigna | Meridian, BCBS Community Health Plan, CountyCare (Cook County) | Very high; 1 dominant Blue plan |
| Massachusetts | BCBS of Massachusetts, Point32 (Harvard Pilgrim and Tufts), UnitedHealthcare, Aetna | MassHealth ACOs, statewide behavioral health carve-out administrator | High |
| Michigan | BCBS of Michigan, Priority Health, UnitedHealthcare, Aetna | Meridian, Molina, Blue Cross Complete; specialty BH through regional PIHPs | Very high; 2 plans dominate |
| New York | UnitedHealthcare/Oxford, Anthem/Empire, Aetna, Cigna, EmblemHealth | Fidelis, Healthfirst, MetroPlus, UnitedHealthcare Community Plan | Moderate; the most fragmented market on this list |
| North Carolina | BCBS of North Carolina, UnitedHealthcare, Aetna, Cigna | WellCare, Healthy Blue, AmeriHealth Caritas, UnitedHealthcare Community Plan | Very high; 1 dominant Blue plan |
| Ohio | Anthem, Medical Mutual, UnitedHealthcare, Aetna | CareSource, Molina, Buckeye, Anthem; OhioRISE for youth BH | Moderate to high |
| Texas | BCBS of Texas, UnitedHealthcare, Aetna, Cigna | Superior, Wellpoint, Texas Children's Health Plan, Molina | High |
| Virginia | Anthem, Sentara, UnitedHealthcare, Aetna | Anthem HealthKeepers Plus, Sentara Community Plan, Aetna Better Health | High |

Ordering is approximate, drawn from public enrollment data as of early 2027. Treat it as directional. The pattern matters more than any single row: in most states the top 4 commercial plans reach roughly three quarters or more of commercially insured lives, and each plan past that adds a small slice for a full application's worth of work.

## The three inputs
1. *Payer share.* Above. Tells you which contracts reach patients.
2. *Rate medians.* Tells you which contracts are worth reaching them with. See the [Q1 rate report](/resources/behavioral-health-reimbursement-rates-by-state-q1-2027).
3. *Credentialing timelines.* Tells you how long each will take. The commonly cited range is 90 to 120 days per clinician per payer when nobody is managing it, and it varies a lot by payer and state. See the [credentialing timeline benchmark](/resources/credentialing-timeline-benchmark-by-payer).

## Turning three inputs into a rollout
For each state you are considering, list the top payers. For each payer-state pair, note share, median rate for your core codes, and expected credentialing time. Then rank pairs by a simple score: lives reachable per month of credentialing, weighted by rate. The top of that list is where your first applications go. It is rarely the same as an alphabetical or population-based list.

A worked example with hypothetical numbers. Say you have 20 clinicians licensed across 4 states, you can run about 5 contract applications at a time, and 2 states are competing for the next cohort:

| Input | State A | State B |
|---|---|---|
| Population | Larger | Smaller |
| Commercial market | Fragmented; top 4 plans reach about 60% of lives | Concentrated; top 2 plans reach about 70% of lives |
| 90837 median rate (illustrative) | $120 | $135 |
| Expected credentialing time, top plans | 5 months | 3 months |
| Medicaid MCO enrollment | Slow | Moderate |

State B goes first despite the smaller population. Its 2 top contracts reach more lives per application, pay about 12% more per session, and go effective about 2 months sooner. Rate, share, and speed beat headcount. State A is still worth doing. It is just second, and its first application should be the 1 plan that reaches the most lives, not all 4 at once.

Run the same table for every state on your list and you get a single ranked list of payer-state pairs. That list, not a list of states, is your contracting plan. It also tells you what to do when a payer goes quiet on an application: if the pair is near the top, escalate; if it is near the bottom, let it sit and keep moving.

## Medicaid changes the order
If Medicaid is a meaningful share of your demand, add the top 2 or 3 MCOs in each state to the list and score them the same way. Medicaid enrollment timing varies more than commercial. Some states are fast. Some take 2 quarters or more. Behavioral health often runs through a carve-out or a regional administrator, which is a separate application with its own clock. Start Medicaid applications early in the slow states, and do not count on that revenue in the first cohort. The [state-by-state Medicaid picture](/resources/medicaid-credentialing-behavioral-health-by-state) covers where the clocks are longest.

## What this does to your hiring
Once the payer-state list exists, hire against it. A clinician licensed in the state where your first 3 contracts land is productive in weeks. One licensed where you have no contracts in progress is idle for a quarter. Post openings by state in the same order as your applications, and time start dates to expected effective dates, not to the day the application goes in.

The same list tells you which licenses to sponsor for existing clinicians. A therapist with 1 license in State A and a pending license in State B is worth more once State B's Blue plan is effective. Sequence the license applications with the contract applications, and you stop paying for idle capacity in states where nothing is live yet.

## Where the plan is already built
Anvil's coverage map shows where a contracted entity is live today, so clinicians can bill insured visits in weeks, and where your own entity can be contracted next. Contracts for your own entity are filed in your entity's name, and new visits route to it as each contract becomes effective. Layer the payer share table over the map and the rollout writes itself: roster onto the live entity in the states where that is available now, and queue own-entity applications in the order this post describes. See [/platform/contracting](/platform/contracting) and [/own-your-contracts](/own-your-contracts).

## Next step

Open the coverage map and see which of the top payers in your states are live now.

---
