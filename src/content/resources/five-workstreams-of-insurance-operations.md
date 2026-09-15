---
title: "The five workstreams of insurance operations, and which ones you should never build"
excerpt: "Insurance operations is five distinct workstreams with different hires, timelines, and failure modes; here is which to build, partner, or rent."
summary:
  - "Insurance operations is not one function; it is five workstreams (contracting, credentialing, eligibility, coding and claims, denials and AR) with different hires, different timelines, and different costs of failure."
  - "In-house insurance operations is commonly cited at 20 to 25% of gross revenue at steady state, and the first year is worse because you pay for competence you do not have yet."
  - "Contracting is the one workstream where you must own the output (the contracts) even if you outsource every hour of the work."
  - "Eligibility should be an API call at booking, not a person on the phone the day before the visit."
  - "The right answer for most care companies under 100 clinicians is to rent four of the five and keep a single internal owner who reads the reports."
author: "matt-milford"
publishDate: 2026-10-12
category: "Blog"
icp: ["A","B"]
pillar: "depth"
keyword: "insurance operations virtual care"
tool: "calculator"
faq:
  - q: "What are the five workstreams of insurance operations?"
    a: "Payer contracting, credentialing and enrollment, real-time eligibility, coding and claims, and denials and accounts receivable. Each one needs different people, breaks in different ways, and has a different build-or-partner answer."
  - q: "How much does it cost to run insurance operations in-house?"
    a: "The commonly cited figure is 20 to 25% of gross revenue at steady state, covering people, software, and clearinghouse fees. Year one runs higher because denial rates are commonly cited at 10% or more before a team is competent, versus roughly 5% at steady state."
  - q: "Which insurance workstream should a care company own?"
    a: "The contracts. You can outsource the negotiation, the paperwork, and the payer relationship management, but the contracts must be in your entity's name with your rates. Everything else can be rented without losing anything you need later."
  - q: "Should eligibility verification be done by staff or software?"
    a: "Software, at the moment of booking. A person checking eligibility the day before the visit catches problems after the patient has already committed. An API at booking catches them before, and is commonly cited to lift insurance-funnel conversion 2 to 5x."
  - q: "When does it make sense to bring insurance operations in-house?"
    a: "Usually not before 100 or more clinicians in a stable set of states and payers. Below that, the fixed cost of competent staff exceeds what a partner charges, and the cost of first-year mistakes is paid in denied claims."
related: ["when-to-accept-insurance-virtual-care", "cost-of-an-idle-credentialed-clinician", "renting-a-pc-vs-owning-one"]
draft: false
---

"We need to build out insurance ops" is one of the most expensive sentences in virtual care. It is five different jobs, and the sentence treats them as one.

Each of the five needs different people. Each breaks differently. Each has a different answer to the build-or-partner question. Get it wrong and you end up with a team of eight doing four jobs badly and one job nobody is doing at all.

Here are the five, one at a time, and then the one rule that matters most.

## Workstream 1: Payer contracting

### What it is

Getting a signed participation agreement between your entity and each payer, with a fee schedule, in each state you serve. This is the workstream that determines what you get paid. Everything downstream is about collecting the rate; contracting is about setting it.

### Who you would hire

A director of payer relations or contracting, typically 10 or more years of payer-side or provider-side experience. For national coverage, one or two contracting managers under them. Legal review on every agreement. If you are also forming the professional entity, healthcare counsel for the corporate structure.

This is a senior hire, and hard to recruit into a company with no contracts yet.

### Where it breaks

It breaks on three things. First, sequence: payers will not contract an entity with no credentialed clinicians, and clinicians cannot enroll under an entity with no contract, so you have to run both at once and most first-timers do not. Second, rates: without benchmarks, you sign whatever is offered, and the first contract sets the anchor for the renegotiation two years later. Third, entity structure: if the professional corporation is not set up correctly for corporate practice of medicine rules in each state, the contract is built on an entity that cannot legally hold it.

### Build, partner, or rent

Partner on the work. Own the output. More on this below, because it is the most important point in this article.

## Workstream 2: Credentialing and enrollment

### What it is

Verifying each clinician's licenses, education, work history, and malpractice, then enrolling them with each payer under your entity's contract. This is per clinician, per payer, per state. Say you have 20 clinicians, 8 payers, and 10 states. That is not 20 files. It is hundreds of enrollments, each with its own form, portal, and follow-up cadence.

### Who you would hire

Credentialing specialists. A common rule of thumb is one specialist per 40 to 60 active clinicians, more if you are in high-churn categories. A credentialing lead to own the process and the payer follow-ups. Software to track expirations, CAQH profiles, and re-attestations.

### Where it breaks

Follow-up. The commonly cited timeline for credentialing is 90 to 120 days per payer when unmanaged, and "unmanaged" mostly means nobody called the payer at day 30 to ask why the file is sitting. A file that sits is a clinician who is paid a salary and cannot see insured patients. Then re-credentialing comes around every two to three years and gets missed because the person who did the original enrollment left.

### Build, partner, or rent

Rent. This is process work with no strategic content. The only thing you need to own is the data: a current record of every clinician's status with every payer, in your systems, so you can plan capacity. Whoever does the work should give you that report weekly.

## Workstream 3: Real-time eligibility

### What it is

Confirming, at the moment a patient tries to book, that they have active coverage, that your service is covered, and what they will owe. Not the day before. Not at check-in. At booking, before the patient decides.

### Who you would hire

If you do it with people, front-desk or intake staff who call payers or work portals. If you do it with software, an engineer for a few weeks to integrate an eligibility API into your booking flow, plus the clearinghouse relationship.

### Where it breaks

It breaks on timing. A person verifying eligibility works a queue, and the queue runs a day behind. By the time a problem is caught, the patient has already booked, maybe already been seen. The visit gets written off or the patient gets a surprise bill. Either way you lose the patient.

The other failure is the funnel. Ask patients to figure out their own coverage and most will not. Checking eligibility at booking is commonly cited to lift insurance-funnel conversion 2 to 5x. That is not an ops improvement. That is a growth number.

### Build, partner, or rent

Integrate an API. Never staff it. This is the clearest call of the five. Eligibility is a lookup, and lookups belong in software. See [real-time eligibility at booking](/platform/eligibility) for how the integration works.

## Workstream 4: Coding and claims

### What it is

Turning a clinical encounter into a clean claim: the right CPT and diagnosis codes, the right modifiers (telehealth modifiers and place-of-service codes matter here), the right rendering and billing provider, submitted to the right payer through a clearinghouse, in the payer's required format.

### Who you would hire

Certified coders, typically one per 8 to 12 clinicians depending on visit volume and complexity. Billing specialists to submit and track claims. A billing manager. Practice management or billing software and a clearinghouse contract.

### Where it breaks

It breaks on the first pass. First-year DIY denial rates are commonly cited at 10% or more, versus roughly 5% at steady state. That gap is the cost of a team learning payer-specific rules by having claims rejected. Every denied claim costs you the time to rework it and the cash flow while it waits.

If clinicians document inconsistently, coders guess. Coders who guess get audited.

### Build, partner, or rent

Partner until you are large enough that a dedicated team is cheaper than the partner's fee, which for most virtual care companies is well past 100 clinicians. The one thing to build internally is documentation discipline, because no partner can fix a note that does not support the code.

## Workstream 5: Denials and AR

### What it is

Working every claim that was not paid in full: appealing denials, correcting and resubmitting rejections, chasing underpayments against the contracted rate, and managing the aging of receivables so cash actually arrives.

### Who you would hire

AR specialists, typically organized by payer. A denials analyst who reads the patterns and feeds fixes back to coding and to the front end. An AR manager who owns days-in-AR as a number.

### Where it breaks

It breaks quietly. Denials have appeal windows, often 60 to 180 days depending on the payer. A claim nobody worked before the window closed is revenue that is gone. It never shows up as a line item, only as a collection rate 4 points lower than it should be.

Underpayments are worse. If nobody is comparing paid amounts to the contracted fee schedule, you will never know that a payer is paying 85% of your rate on one code in one state. You cannot chase what you cannot see, which is another reason the contracted rate needs to be visible and separate from any platform fee.

### Build, partner, or rent

Rent, with one internal owner who reads the denial report every week and asks why. The pattern analysis is the valuable part, and it is the part most companies skip.

## The five side by side

| Workstream | Hires needed | Time to competence | Cost of mistakes | Build or partner |
|---|---|---|---|---|
| Payer contracting | Senior contracting lead, counsel | 12 to 24 months for national coverage | Locked-in low rates for years; structural risk if entity is wrong | Partner on work, own the contracts |
| Credentialing and enrollment | Specialists (1 per 40 to 60 clinicians), lead, software | 6 to 12 months to a reliable process | Idle salaried clinicians; lapsed enrollments | Rent, own the status data |
| Real-time eligibility | Engineer for integration, or intake staff | Weeks for an API; never fully reliable with people | Lost patients, write-offs, surprise bills | Integrate an API |
| Coding and claims | Coders (1 per 8 to 12 clinicians), billers, manager, software | 12 months to reach steady-state denial rates | Denials at 10%+ in year one; audit exposure | Partner until 100+ clinicians |
| Denials and AR | AR specialists by payer, analyst, manager | 6 to 12 months | Expired appeal windows; invisible underpayments | Rent, with one internal reader |

## What it costs to build all five

The commonly cited number for in-house insurance operations at steady state is 20 to 25% of gross revenue. That covers people, software, clearinghouse fees, and management overhead.

Say you are a 30-clinician company doing $6 million a year in insured revenue. At 22%, in-house ops costs about $1.3 million a year once it is running well. That buys you roughly a contracting lead, a credentialing lead and one specialist, three coders, two billers, two AR specialists, a manager, and the software stack. It is a real department.

And that is steady state. Year one is worse. You pay the salaries from day one and get first-year denial rates, first-year credentialing delays, and first-year contracts signed at whatever rate was offered. The learning is paid for in denied claims.

The build case only works when the fixed cost is spread across enough volume that it beats the partner's variable fee, and when the states and payers are stable enough that the team's knowledge does not go stale. For most virtual care companies that point is well past 100 clinicians. Many never reach it. Rented ops is not a compromise. It is the right cost structure for the size.

## The one rule: own the contracts

Here is the point everything above builds to.

Four of the five workstreams are process. Credentialing, eligibility, claims, and AR produce outputs you can move between vendors: data, code, claims history. If you change partners, you take the data and start again with a short gap.

Contracting is different. The output is a legal agreement between a payer and an entity. Whichever entity holds the contract holds the rate, the relationship, and the ability to renegotiate. If that entity is not yours, you do not have a payer business. You have a subscription to someone else's.

This is the trap in pure network rental. Bill through a vendor's entity indefinitely and you get to market fast, but you never accumulate the asset. Years in, you have volume and claims history attached to a contract you do not own. Your rates are whatever the vendor negotiated for their whole book. Leaving means starting contracting from zero, which is the 12 to 24 month path you rented to avoid.

The fix is not to build contracting yourself. Senior contracting talent is scarce, the timeline is long, and doing it wrong locks in bad rates. The fix is to separate the work from the output.

1. **Rent an entity to start.** Bill through an already-contracted professional corporation so insured revenue starts in weeks. See the contracted rate and the platform fee separately so you know exactly what you are clearing.
2. **Form your own entity in parallel.** Your own PC, with a physician owner placed in a structure that satisfies state corporate practice of medicine rules, and a services agreement structured against the Anti-Kickback Statute personal services safe harbor.
3. **Credential and contract your entity.** The partner does the work: the files, the follow-ups, the negotiation. The contracts are signed by your PC, at rates you benchmarked before signing.
4. **Migrate volume.** Over 6 to 18 months, as your contracts go live, volume moves from the rented entity to yours. At the end, the contracts, the rates, and the relationships are yours.

You outsourced every hour of the contracting work. You own every contract. That is the distinction that matters, and it is what [rent, then own](/own-your-contracts) means in practice.

## How to staff the whole thing

Under 100 clinicians, the internal team for all five workstreams is one person. Not a department. One operator who owns the number, reads the weekly reports from the partner, asks why on every denial pattern and every stalled credentialing file, and makes sure the contracts are in your entity's name.

The partner does the work. Your person makes sure it is the right work.

Over 100 clinicians, revisit workstream by workstream. Claims and AR might come in-house first, because volume makes the fixed cost worthwhile. Eligibility stays an API forever. Credentialing usually stays rented because the work is the same at any size. And contracting stays partnered on the work and owned on the output, because that is the only arrangement where you get speed now and the asset later.

## Next step

Run your own numbers. The [calculator](/pricing#calculator) takes your clinician count, states, and visit volume and shows what the five workstreams cost to build in-house versus what they cost to rent, with the contracted rate and platform fee shown separately.
