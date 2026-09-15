---
company: "Luna"
headline: "ABA authorizations and Medicaid billing run as one intake flow"
specialty: "ABA"
careModel: "In-home"
states: ["TODO"]
payerMix: ["Medicaid", "Commercial"]
firstParty: true
metrics:
  - { value: "[N] days", label: "median authorization turnaround" }
  - { value: "[N]%", label: "sessions delivered under active authorization" }
  - { value: "[N]", label: "Medicaid programs billed" }
quote: "[Quote from the Luna operating lead.]"
quoteAuthor: "[Name]"
quoteTitle: "[Title], Luna"
publishDate: 2026-12-07
draft: true
---

<!-- TODO(launch): fill bracketed values with real Luna numbers. Keep draft: true until sign-off. -->

## Context

Luna delivers applied behavior analysis in homes and clinics, operated by our team. ABA is authorization-driven and heavily Medicaid, which makes it the model that telehealth-only billing vendors cannot take.

## The problem

Authorizations were handled after intake, by a different person than the one billing. Sessions were delivered while units were pending. Re-authorizations lapsed. Every lapse was unbillable work.

## What we did

1. Authorization moved into intake: assessment codes, treatment plan submission, and units requested before the first treatment session is scheduled.
2. Re-authorization calendared from the units authorized and the planned session cadence, with alerts before the lapse.
3. Claims under both entities routed by payer as Luna's own Medicaid enrollments landed.

## Results

| Metric | Before | After |
|---|---|---|
| Median authorization turnaround | [N] days | [N] days |
| Sessions delivered under active authorization | [N]% | [N]% |
| Denials for missing or lapsed authorization | [N]% | [N]% |

## What's next

[Additional states, commercial ABA benefits, and school-based expansion.]
