---
title: "The Five Workstreams of Insurance Operations (and Which Ones You Should Never Build)"
excerpt: "Insurance billing is five separate jobs: contracting, credentialing, eligibility, claims, and denials."
lede: "Insurance billing is five separate jobs: contracting, credentialing, eligibility, claims, and denials. Here's what each one actually involves, who you'd have to hire, and which ones make sense to own."
summary:
  - "\"Billing\" is five distinct workstreams with five distinct skill sets. Founders who staff it as one job get five half-jobs."
  - "Two of the five (eligibility technology and claims/denials operations) are commodity work that should never be built from scratch."
  - "Two of the five (contracting and the entity that holds contracts) are strategic assets you should own eventually, even if someone else does the work."
author: "matt-milford"
publishDate: 2026-10-13
category: "Blog"
icp: ["A", "B"]
pillar: "depth"
keyword: "insurance operations virtual care"
tool: "calculator"
faq:
  - q: "Can I outsource all five workstreams to one vendor?"
    a: "Yes, and for a company going national quickly, that is usually the right first move. The question to ask any single vendor is which entity holds the payer contracts and what happens to them if you leave."
  - q: "What does in-house insurance operations cost?"
    a: "Industry benchmarks put fully loaded in-house operations at roughly 20 to 25 percent of insured revenue at steady state, once contracting talent, compliance, and integration engineering are counted. Use the calculator below to model your own case."
  - q: "What's the first hire if I do build?"
    a: "A contracting lead, because everything else waits on a contract. It is also the hardest hire, which is why most companies start with a partner."
related: ["when-to-accept-insurance", "cash-pay-to-insurance-two-phase-plan", "what-in-network-nationally-means"]
sourceFile: "01_October_When_and_How.md"
calendarWeek: 2
dataReview: "cleared"
draft: false
---
When a founder says "we need to figure out billing," they are describing five jobs. Each has its own talent pool, its own failure modes, and its own timeline. Treating them as one job is the most common reason in-house insurance operations underperform.

## 1. Health plan contracting
Getting a contract with a payer means a negotiated agreement between a legal entity and the plan: rates by code, terms, credentialing requirements, timely filing windows, and renewal cycles. It is part legal, part sales, part data. A good contracting lead knows which payers in which states cover the lives you want, what the rate ladder looks like, and when a "we're not accepting new providers in your specialty" is real versus an opening position.

Timeline for a competent internal hire to reach national density: one to three years. Talent: scarce, senior, expensive. Most people with this background did it for one health system in one region.

## 2. Credentialing and enrollment
Once the entity has a contract, each clinician has to be credentialed (primary source verification of license, education, board status, malpractice history) and enrolled (added to the payer's roster under that contract). Credentialing is document-heavy and combinatorial. Ten clinicians, eight states, four payers is 320 enrollments, each with its own portal, form, and follow-up cadence.

Timeline: 90 to 120 days per clinician per payer on average, longer when applications bounce. Talent: credentialing specialists, roughly one per 40 to 50 clinicians, plus someone who knows how to automate the repetitive parts.

## 3. Eligibility and benefits verification
Before a visit, someone has to confirm the patient's plan is active, the service is covered, the clinician is in that plan's network in that state, and what the patient owes. Done manually, this is a phone call and a portal check. Done properly, it is an API call at the moment of booking that returns a yes/no and a cost estimate.

Getting this wrong is expensive twice: eligibility errors drive a meaningful share of denials, and a clunky insurance step drives a meaningful share of funnel drop-off. Talent: this is engineering plus payer-data knowledge, not billing staff.

## 4. Coding and claims submission
Every visit becomes a claim: CPT codes, modifiers, place of service, diagnosis codes, rendering and billing provider, submitted through a clearinghouse to the payer. New billing operations should expect a rough first six months while workflows stabilize. When claim volume outpaces submission capacity, cash slips a week for every week of backlog.

Talent: certified coders and billers, plus EHR-to-clearinghouse plumbing.

## 5. Denials and accounts receivable
Some claims come back denied. A new operation runs a denial rate above 10% while it learns each payer's patterns; mature operations run around 5%. The gap is lost revenue and staff time on appeals. This work is pattern recognition by payer and discipline about timely filing.

Talent: AR specialists with payer-specific experience.

## Which ones to build
Here is the honest map.

| Workstream | Build it? | Why |
|---|---|---|
| Contracting (the relationships) | Own eventually, outsource the labor | The contracts are an asset. Whose entity they sit in matters at your next raise. |
| The contracted entity (your PC) | Own | If you bill through someone else's entity forever, you are renting your insured revenue. |
| Credentialing and enrollment | Never build from scratch | Commodity work with real automation available. Buy throughput. |
| Eligibility technology | Never build | It's an API problem someone has already solved. Build the UX around it. |
| Claims and denials | Not early | Buy it until you have the volume to justify a team, and keep the data so you can move later. |

The pattern: outsource the labor, own the asset. Most vendors get you the first half. Few are set up to hand you the second.

## Next step

Model the build cost for your company with the build vs partner calculator.

---
