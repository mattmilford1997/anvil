---
title: "The Migration Playbook: Rented PC to Your Own Without a Revenue Gap"
excerpt: "How to move insured volume from a billing vendor's contracted entity to your own professional corporation, payer by payer, without a gap in revenue."
lede: "How to move insured volume from a billing vendor's contracted entity to your own professional corporation, payer by payer and state by state, without a gap in revenue. The sequencing, the traps, and a month-by-month plan."
summary:
  - "Migration is not a switchover. It is a payer-by-payer, state-by-state shift of volume from a shared entity to yours as each of your own contracts comes online."
  - "The three traps: terminating the shared entity relationship before your contracts are live, mis-sequencing payers so your highest-volume plans migrate last, and losing claims data you need for rate negotiation."
  - "Done right, the shared entity becomes a shrinking backstop and revenue never pauses."
author: "matt-milford"
publishDate: 2026-12-29
category: "Blog"
icp: ["C"]
pillar: "ownership"
keyword: "switch billing vendor telehealth"
tool: "timeline"
faq:
  - q: "Can I switch billing vendors without losing revenue?"
    a: "Yes, if you migrate rather than switch: keep the current entity live until your own contracts are in place, and move volume payer by payer."
  - q: "How long does it take to migrate to my own payer contracts?"
    a: "In a typical plan, the majority of insured volume is on your own contracts by roughly month 12, with a long tail into month 18. It depends on how many payer-state pairs you bill and how much Medicaid is in the mix."
  - q: "Do patients notice?"
    a: "No. The clinician, the visit, and the coverage are the same. Only the billing entity behind the claim changes."
  - q: "What data should I export before migrating?"
    a: "Claim-level detail by payer, state, clinician, and code, with paid amounts and denial reasons. It drives sequencing and your first rate negotiation."
related: ["cost-of-in-house-insurance-operations", "renting-vs-owning-professional-corporation", "investor-diligence-payer-contracts"]
sourceFile: "03_December_Build_Rent_Own.md"
calendarWeek: 13
dataReview: "cleared"
draft: false
---
Companies on a network rental model reach the same moment: a diligence question, a rate dispute, a renewal, or the realization that 2 years of insured revenue built no asset. The instinct is to switch. The better move is to migrate.

A switch is a date. A migration is a sequence. You keep billing under the shared entity while your own professional corporation gets contracted, then move volume one payer-state pair at a time as each contract goes effective. Revenue never pauses. The shared entity shrinks into a backstop and eventually goes quiet.

Here is the sequence, the numbers to watch, and the traps.

## Step 0: Do not terminate anything
The shared entity is your revenue. It stays live until the last payer in the last state is contracted with your own PC. The most expensive migration mistake is a termination notice sent before the replacement contracts exist. Once the shared entity stops billing, every insured visit is either cash or unpaid until your own contracts are effective. On commercial plans that gap can run 4 to 8 months. On Medicaid it varies by state and is often longer.

Read your current agreement before you do anything else. Note the notice period, what happens to claims in flight at termination, and whether you can keep the relationship on a reduced footprint while you migrate. Ask those questions in writing and keep the answers.

## Step 1: Inventory what you bill today
By payer, by state, by clinician: claim volume, paid amounts, denial rates, days to payment. This is the map for sequencing, and it is the evidence base for your first rate negotiation. Get the data out now, while you still have access, in a format you own.

Ask for claim-level detail, not a summary report. You want the CPT code, the billed and paid amounts, the denial reason, and the date of service for every claim. A summary tells you which payers matter. Claim-level data tells you what each payer actually pays you per code, which is what you need at the negotiating table.

## Step 2: Form and credential your own PC
In your top states first. Physician owner, management services agreement, entity credentialing, group NPI, clearinghouse enrollment. Formation takes weeks. Contracting is the long pole.

The commonly cited range for unmanaged credentialing is 90 to 120 days per clinician per payer. Entity contracting sits on top of that. Start it before you feel ready, because nothing in Step 3 or Step 4 can begin until the entity exists and its applications are in. See [/platform/credentialing](/platform/credentialing) for how entity and clinician enrollment run in parallel.

## Step 3: Contract in order of volume
Rank payer-state pairs by insured revenue. Contract your PC with the top pairs first. In most books, 2 payers in 3 states cover the majority of volume. Do not start with the easy panels. Start with the ones that matter.

A worked example, with hypothetical numbers. Say you have 20 clinicians licensed across 4 states and $400,000 a month in insured revenue. Your inventory shows this:

| Payer-state pair | Share of insured revenue | Cumulative |
|---|---|---|
| Blue plan, State A | 30% | 30% |
| National carrier, State A | 18% | 48% |
| Blue plan, State B | 15% | 63% |
| Medicaid MCO, State A | 10% | 73% |
| National carrier, State B | 7% | 80% |
| Everything else (15 pairs) | 20% | 100% |

Five applications cover 80% of revenue. The other 15 pairs cover 20%. That is your application order, and it tells you where to spend attention when a payer goes quiet on you. The long tail can wait, and some of it may never be worth contracting at all.

## Step 4: Migrate clinicians pair by pair
As each own-PC contract goes effective, enroll the relevant clinicians under it and route new visits for that payer in that state to your PC. The shared entity keeps billing everything else. Claims already in flight under the shared entity stay there until they are paid or resolved. Do not rebill them.

Patients notice nothing. The clinician, the visit, and the coverage are the same. Only the billing entity behind the claim changes. Clinicians notice a little: they are enrolled under 2 entities for a period. Their schedule, their pay, and their patient list should not change. The routing is a back-office function, and it should be automatic, keyed off payer, state, and contract effective date.

## Step 5: Watch three numbers

| Number | What it tells you | What to expect |
|---|---|---|
| Share of insured revenue on your own contracts | Whether the migration is moving | Rises in steps as each contract goes effective; majority by roughly month 12 in a typical plan |
| Denial rate, own PC vs. shared entity | Whether your enrollment and claim setup are clean | Should converge within about 90 days of each contract going live |
| Days in AR on your own PC | Cash timing | New payer relationships often pay slower for the first cycle; plan cash for it |

If the first number stalls, a contract is stuck. If the second diverges, something in your enrollment, taxonomy, or claim setup is wrong, and you should find it before the volume grows. If the third stretches, it is usually the first-cycle effect and it settles.

## Step 6: Renegotiate at first renewal
With 12 months of clean claims on your own contract and the volume data from Step 1, you have a negotiating position you never had while paying per visit under someone else's contract. You can show the payer your volume, your denial rate, and your outcomes. This is the payoff, and it compounds at every renewal after. See [/own-your-contracts](/own-your-contracts) for why the contract in your name is the asset.

## The four traps
1. *Terminating early.* Covered above. It is the single most expensive mistake.
2. *Wrong sequence.* Contracting your PC with low-volume payers first because they are easier. You end up with contracts that do not move the needle and a shared entity still carrying the load.
3. *Losing data.* Some platforms do not make claim-level data easy to export. Ask for it before you announce a migration, not after.
4. *Clinician confusion.* Each clinician is enrolled under 2 entities for a period. If routing is manual, claims go to the wrong entity and get denied. Make routing a system rule, not a front-desk decision.

## Timeline (illustrative plan)
This is a plan shape, not a result. Your timeline depends on how many payer-state pairs you bill, which states, and how much Medicaid is in the mix.

| Month | Milestone |
|---|---|
| 0 | Inventory complete, own PC formed in top states, physician owner placed |
| 1 to 3 | Own-PC credentialing and first contract applications in top payer-state pairs |
| 4 to 8 | First commercial contracts effective; new visits for those pairs routed to your PC |
| 6 to 12 | Majority of volume on own contracts in a typical plan; shared entity as backstop; Medicaid timing varies by state |
| 12 to 18 | Long-tail states and payers; first renegotiation on top contracts at renewal |

Medicaid gets its own line because it varies more than commercial. Some states enroll a new entity in weeks. Others take 2 quarters or more. If Medicaid is a large share of your revenue, file those applications first and expect them to finish last.

## How Anvil runs a migration
Anvil forms your professional corporation in parallel with the inventory, so formation is never the thing you wait on. Contracts are filed in your entity's name. As each contract becomes effective, new visits for that payer and state route to your PC. Claims already in flight stay where they are until they resolve. Whatever is not yet migrated keeps billing where it bills today, and the share of volume on your own contracts is a number you can see, not one you have to compute. See [/platform/contracting](/platform/contracting) for the mechanics, and [/resources/renting-vs-owning-professional-corporation](/resources/renting-vs-owning-professional-corporation) if you are still deciding whether to make the move at all.

## Next step

See the migration timeline for your payer mix, and get a contracting plan for your top states.

---
