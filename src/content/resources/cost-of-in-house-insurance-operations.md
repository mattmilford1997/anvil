---
title: "The Real Cost of Building Insurance Ops In-House: A Line-Item Model"
excerpt: "A line-item cost model for building commercial and Medicaid insurance operations in-house: headcount by workstream, tooling, compliance, timeline, and the."
lede: "A line-item cost model for building commercial and Medicaid insurance operations in-house: headcount by workstream, tooling, compliance, timeline, and the opportunity cost of idle clinicians. Download the model and run your own numbers."
summary:
  - "Fully loaded in-house insurance operations land at roughly 20 to 25 percent of insured revenue at steady state once you count the line items founders usually skip: contracting talent, compliance, and integration engineering."
  - "The bigger cost is time: one to three years to national contract density, and idle clinician revenue for every month of it."
  - "Build makes sense in a narrow set of cases. For everyone else, the right answer is to buy the labor and own the asset, which is a third option most build-vs-buy analyses leave out."
author: "matt-milford"
publishDate: 2026-12-08
category: "Blog"
icp: ["A"]
pillar: "ownership"
keyword: "build vs buy insurance billing"
tool: "calculator"
faq:
  - q: "How much does it cost to run insurance billing in-house?"
    a: "Fully loaded, commonly 20 to 25 percent of insured revenue at steady state, once contracting, compliance, and integration engineering are included."
  - q: "How long does it take to build in-house insurance operations?"
    a: "One to three years to national contract density, plus six to twelve months for claims performance to stabilize."
  - q: "What is the alternative to building or fully outsourcing?"
    a: "A structure where a partner does the labor on all five workstreams, you launch on their contracted entity for speed, and they build and contract your own entity in parallel so the contracts end up yours."
  - q: "Does the model include Medicaid?"
    a: "The download has a Medicaid toggle that adds state program enrollment and MCO contracting headcount, which is where many behavioral health models are most under-budgeted."
related: ["renting-vs-owning-professional-corporation", "investor-diligence-payer-contracts", "migrating-from-rented-pc-to-own-contracts"]
sourceFile: "03_December_Build_Rent_Own.md"
calendarWeek: 10
dataReview: "cleared"
draft: false
---
Most build-vs-buy decisions for insurance operations are decided on a feeling: "our team is smart, we'll figure it out." This is the spreadsheet version.

## Headcount by workstream (illustrative, early growth stage)
| Workstream | Role | FTE | Loaded annual cost (illustrative) |
|---|---|---|---|
| Contracting | Payer contracting lead | 1 | $180k to $250k |
| Credentialing and enrollment | Specialists at ~1 per 40 to 50 clinicians | 1 to 2 | $70k to $90k each |
| Eligibility and integrations | Engineer, part to full time | 0.5 to 1 | $180k to $220k |
| Coding and claims | Certified coder/biller | 1 to 2 | $65k to $85k each |
| Denials and AR | AR specialist | 1 | $60k to $80k |
| Compliance | Compliance lead, fractional early | 0.5 | $90k to $150k |
| Management | Director of RCM or ops | 0.5 | $80k to $120k |

Illustrative total at 15 to 30 clinicians: $700k to $1.1M a year in people before tooling. These figures are illustrative market ranges, not quotes.

## Tooling and overhead
Clearinghouse fees, eligibility API, credentialing software, claims management, EHR integration work, outside counsel for contracts and structure, audit and compliance tooling. Commonly $100k to $250k a year at this scale.

## The line items founders skip
Three show up in almost every under-budgeted model:

1. *Contracting talent.* Most founders budget for billers and forget that nothing bills without a contract. The contracting lead is the most expensive and hardest hire.
2. *Compliance.* Becoming a covered entity billing payers changes your regulatory footprint: HIPAA obligations, fraud and abuse exposure, state-level billing and scope rules. A compliance function is not optional; it is just easy to leave off a spreadsheet.
3. *Integration engineering.* Wiring eligibility, clearinghouse, and EHR together is real engineering. It competes with product.

Add those back and most models land at 20 to 25 percent of insured revenue. A company doing $10M insured revenue is spending $2M to $2.5M a year on this, and the number scales with revenue rather than amortizing.

## The timeline
- National contract density built alone: one to three years.
- Per-clinician credentialing: 90 to 120 days per payer, with combinatorial growth as states and payers multiply.
- Denial rate: 10 percent or higher for the first six to twelve months, settling near five. The gap is tuition.
- Idle clinician cost for the duration: see last month's counter.

## The third option most analyses miss
Build-vs-buy frames it as: build everything and own everything, or buy everything and own nothing. There is a third structure: buy the labor on all five workstreams, launch on an existing contracted entity for speed, and have the same partner form and contract your own entity in parallel so that the asset (the contracts) ends up yours.

In that structure, the cost is a platform fee that flattens per claim as volume grows, the timeline to revenue is weeks, and the timeline to owning your contracts is 6 to 18 months, none of which delays revenue.

## When building still makes sense
- You operate in one or two states with a small set of payers.
- You have a strategic reason to own the operation, such as a proprietary payer relationship or a parent organization.
- You already employ a proven contracting lead and RCM director.
- Time to revenue is not your binding constraint.

If two or more of those are true, build. If not, buy the labor and own the asset.

## Next step

Download the model and run the calculator with your own revenue target, states, and clinician count.

---
