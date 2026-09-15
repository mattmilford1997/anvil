---
company: "Third Space"
headline: "Multi-state Medicaid behavioral health, billed in-network from the first month"
specialty: "Behavioral health"
careModel: "Virtual"
states: ["TODO"]
payerMix: ["Medicaid MCOs", "Commercial"]
firstParty: true
metrics:
  - { value: "[N] states", label: "Medicaid MCO panels live" }
  - { value: "[N] days", label: "signature to first paid claim" }
  - { value: "~$3M", label: "annual insured revenue run rate" }
quote: "[Quote from the Third Space operating lead. Speed, Medicaid depth, or ownership.]"
quoteAuthor: "[Name]"
quoteTitle: "[Title], Third Space"
publishDate: 2026-10-05
draft: true
---

<!-- TODO(launch): fill every bracketed value with real numbers from Third Space. Keep draft: true until ops and the Third Space lead sign off. -->

## Context

Third Space is a virtual behavioral health company operated by our team. Its patients are heavily Medicaid, which means the payer work is state-by-state managed care organization panels rather than a handful of national commercial contracts.

## The problem

Medicaid behavioral health volume does not wait. Each state's MCOs have their own enrollment, their own panel status, and their own supervision rules for associate-level clinicians. Doing this one state at a time, with a small ops team, meant [N] months between winning a market and billing it.

## What we did

1. **Month 1.** Clinicians roster-added under the rented PC's existing Medicaid and commercial contracts in [states]. Eligibility at booking turned on, with the behavioral health carve-out logic for the MCOs involved.
2. **Months 1-4.** Third Space's own PC formed in [states] with a physician owner placed through Foundry PC. Credentialing files built under the new entity through Homefront.
3. **Months 4-[N].** MCO panel applications filed in Third Space's name. Closed panels worked through the exception path, with that volume staying on the rented PC until they opened.
4. **Month [N].** Majority of volume on Third Space's own contracts. Platform fee stepped down.

## Results

| Metric | Before | After |
|---|---|---|
| Days from signature to first paid claim | [N] | [N] |
| States billing Medicaid in-network | [N] | [N] |
| Clean-claim rate | [N]% | [N]% |
| Share of volume on owned contracts at month 12 | 0% | [N]% |

## What's next

[Expansion states, additional MCOs, and what the team is building next.]
