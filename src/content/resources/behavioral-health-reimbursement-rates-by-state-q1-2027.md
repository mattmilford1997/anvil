---
title: "How to Read Reimbursement for 90837, 99214, and 96158 by State"
excerpt: "Why the same behavioral health code pays differently by state and payer, what drives the spread, and how to turn published ranges into a contracting plan."
lede: "The same 53-minute session pays differently in two states, and differently across two payers in the same state. Here is what drives the spread for 90837, 99214, and 96158, how to read a published range without misreading it, and how to build a rate ladder you can use in rollout and contracting."
summary:
  - "A reimbursement rate is a distribution, not a number. The same code from the same national payer varies by state, by product line, and by contract vintage."
  - "Four drivers explain most of the spread: Medicare fee schedule geography, Medicaid fee schedules and MCO rate floors, plan mix, and network adequacy pressure."
  - "Rate should be an input to your state rollout order and your contract asks, not something you discover on the first remit. The rate lookup publishes ranges by state and code so you can plan before you sign."
author: "matt-milford"
publishDate: 2027-01-05
category: "Blog"
icp: ["B"]
pillar: "transparency"
keyword: "reimbursement rates by state"
tool: "rate-lookup"
faq:
  - q: "What is the average reimbursement for a 90837?"
    a: "There is no single useful average. It depends on state, payer, product line, and whether the contract is fee-schedule based or negotiated. Use the rate lookup for a range in your state, then treat the range as a negotiating frame."
  - q: "Do Medicaid rates vary by state for behavioral health?"
    a: "Substantially. Each state sets its own fee schedule, and managed care organizations may pay at, above, or below it depending on state rules and network need. Check the state before writing off Medicaid."
  - q: "Can I see rates for other codes?"
    a: "The rate lookup covers therapy, psychiatry, ABA, and integrated behavioral health codes. This post walks through three of the most common."
  - q: "Where do published rate ranges come from?"
    a: "Published Medicare and Medicaid fee schedules, public rate transparency files, and aggregated allowed amounts reported as ranges. No individual contract rate for a single group is disclosed."
related: ["lease-fee-vs-contracted-rate", "payer-contracting-101-care-companies", "largest-payers-by-state-rollout-order"]
sourceFile: "04_January_Rates_Contracting.md"
calendarWeek: 14
dataReview: "cleared"
draft: false
---
Most care companies learn what they will be paid after they sign the contract. This post is about learning it before.

The three codes below cover most of the revenue in a behavioral health or integrated care company. If you can read their ranges correctly, you can pick states, pick payers, and walk into a contract conversation with a number.

## The three codes
*90837* is 53-minute psychotherapy. It is the core code for therapy-led companies and the one where a small per-visit difference compounds fastest, because a full-time therapist bills it 20 to 30 times a week.

*99214* is an established patient E/M visit of moderate complexity. Psychiatry and medication management live here, along with much of general and primary care. It is also the code where Medicaid tends to trail commercial by the widest margin.

*96158* is health behavior assessment and intervention, first 30 minutes. It matters for integrated and chronic-condition programs. Coverage is less uniform than the other two, and some payers still do not reimburse it for telehealth. Modality is a separate question from rate.

## Why the same code pays differently
A founder will often model "our rate with a national payer" as one number. It is a distribution. The same payer, same code, can pay meaningfully different amounts in two states, and two products from that payer can pay differently in the same state. Four drivers explain most of it.

| Driver of variance | What it looks like | What to do about it |
|---|---|---|
| Medicare fee schedule geography | Commercial contracts are often written as a percentage of Medicare, and Medicare's geographic practice cost index shifts the base by locality. A contract at the same percentage pays more in a high-index locality. | Ask what the contract is indexed to, and to which year's schedule. Model your rate as base times multiplier, not as a flat dollar figure. |
| Medicaid fee schedules and MCO rate floors | Each state publishes its own fee schedule. Some states require managed care organizations to pay at least the fee-for-service rate; others do not. Carve-outs for specialty behavioral health add a second schedule. | Pull the state schedule before you decide Medicaid is low-margin. Check whether a rate floor applies to the MCOs you would contract with. |
| Plan mix | A payer's fully insured, self-funded, exchange, and Medicare Advantage lines can carry different fee schedules under one brand. Your effective rate is the volume-weighted mix. | Ask which product lines the contract covers and what share of your target members sit in each. Track allowed amount by product, not by payer logo. |
| Network adequacy pressure | Where a payer is short on behavioral health access, it has room to pay above its default schedule to fill the gap. Where it is saturated, it does not. | Look for state and county adequacy findings and waiting-time complaints. Shortage is your negotiating position. Lead with it. |

None of these drivers is secret. All of them are knowable before you sign. That is the whole point.

## How to read a published range
A published range for a code in a state tells you three things and hides one.

It tells you the floor, which is usually a Medicaid fee schedule or the lowest commercial default schedule. It tells you the ceiling, which is usually a negotiated contract with a group that had bargaining power. It tells you roughly where an unremarkable first contract lands, which is at or below the middle.

What it hides is who is at each point and why. A ceiling set by a hospital-affiliated group with 200 clinicians is not your ceiling in year one. A floor set by a fee-for-service Medicaid schedule may not be your floor if the MCO in your state pays above it.

So read a range as a frame for the conversation, not a promise. If a payer's rack rate offer sits below the middle of the published range for your state, you know that. If it sits above, you know that too, and you should take it and stop talking.

## Rate as a rollout input
If demand is similar across two states and one pays materially more for your core codes, that is where your first contracts should go. Combine three inputs and you have a rollout plan built on evidence instead of a map:

1. Where your patients are, or where your demand channel can point them.
2. What your core codes pay in each of those states, from published ranges.
3. How long the largest payers in each state take to credential, from the [credentialing benchmark](/resources/credentialing-timeline-benchmark-by-payer).

The [largest payers by state](/resources/largest-payers-by-state-rollout-order) post covers the ordering logic in detail. Rate is the input most companies skip.

## How to build your own rate ladder
A rate ladder is a per-code, per-state, per-payer target sheet you keep current. It takes an afternoon to build and it changes how every contracting call goes.

1. *Pick your five revenue codes.* For most companies that is 90837, 90834, 99214, 90791, and one specialty code such as 96158 or an ABA code. Five is enough to cover most of billed revenue.
2. *List your target states in rollout order.* Use the three inputs above. Do not list every state you might ever serve. List the next six.
3. *Pull the Medicaid fee schedule for each state.* This is public. Note whether an MCO rate floor applies and whether behavioral health is carved out to a separate administrator.
4. *Pull the Medicare locality base for each state.* You need this to translate a percentage-of-Medicare offer into a dollar figure and to compare offers across states.
5. *Look up the published commercial range for each code and state.* The [rate lookup](/rates) does this by state and code. Record the floor, middle, and ceiling.
6. *Set three numbers per cell: walk-away, target, and stretch.* Walk-away is usually the Medicaid schedule or the commercial floor, whichever is higher for you. Target is the middle. Stretch is a point below the ceiling that a group your size could plausibly get.
7. *Record every offer against the ladder.* When a payer sends a rate sheet, enter it next to the target. Over a year the ladder becomes your own evidence base, and your first renewal has a number attached to it.

## Using the ladder in contracting
When a payer offers rack rates, you now know where that lands in the state range. A first-time contract will usually sit at or below the middle. The point is not to win the first negotiation. The point is to know where you stand so the first renewal has a target and a reason.

If you bill under someone else's contracted entity today, the ladder is still worth building. It tells you what the visit is actually worth, which is the number you need to evaluate your per-visit fee. The [lease fee versus contracted rate](/resources/lease-fee-vs-contracted-rate) post explains why that comparison matters. On Anvil, the contracted rate and the platform fee show as separate lines on every claim, so the comparison is on the remit rather than in a spreadsheet.

When you own your contracts, the ladder is your negotiation prep. The [payer contracting 101](/resources/payer-contracting-101-care-companies) post covers what to ask for once you have the number.

## Three things to stop believing
1. *That Medicaid is uniformly the floor.* In some states the Medicaid schedule sits above the lowest commercial default. Check the state before you write it off.
2. *That a payer rate is a single number.* It is a distribution across states and product lines. Track allowed amounts by product.
3. *That you find out the rate on the first remit.* You can find it out today, before you pick a state or sign anything.

## Next step
Look up published ranges for your codes in your target states at [/rates](/rates), then build the ladder. Bring it to your first contract call.

---
