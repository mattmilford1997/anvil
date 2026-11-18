# Content changelog

## 2026-11-18

Scheduled guest post entity-structure-before-payer-contracts (publishDate 2026-11-30), Foundry PC guest post, one-off cross-brand exception approved by Matt via CoS Nov 18; awaiting reviewer.

## 2026-11-17

Package-page upgrades on existing URLs. Titles, H1s, and metas were not changed. No new URLs. Homepage, `/rates`, and RateRelated were not edited, and rate `lastmod` values were not stamped.

### `/solutions/switching`

- Hero prompt is now "Is there a Bridge alternative that lets me keep billing while I switch?" The switch-without-a-gap FAQ stays.
- Added "What is a Bridge alternative when you are already on a vendor?" It points at the sourced fact table, pricing, and own-your-contracts. It does not copy the fact table or add a switch-duration claim.
- The ownership timeline no longer renders the unpublished post-migration platform fee.

### `/platform/contracting`

- Hero prompt is now "What is payer contracting for telehealth, and how long does it take to get in-network?" The existing "best payer contracting companies" answer stays in the FAQ.
- Added an ungated guide: participation agreement, roster-add versus a contract, what you can see before you sign, and the order of work. Written by Anvil. Sources checked November 17, 2026. Links the live in-network definition, and the roster-add guide when that post is live.
- Added an in-network timeline by payer type. Medicare rows cite the First Coast Service Options CMS-855 page (February 18, 2026). North Carolina Medicaid cites the NC Medicaid provider enrollment page. A commercial row cites only what Bridge published (6 to 12 months) and is labeled as Bridge's statement. Arizona Revised Statutes 20-3453 and Virginia Code 38.2-3407.10:1 are quoted as state credentialing clocks, not a national average. New York was left out because the official page did not open. No Program Integrity Manual section number is added. The NCQA blog is cited only to say it does not state a 120-day clock.

### `/own-your-contracts`

- Added "Rent or own: per-claim math." It uses the published Launch, Build, and Scale fees, the published $360 per state, and the published 12-month minimum. Allowed amount, claim count, spread months, and state count are reader inputs. The post-migration platform fee is not published, so the example leaves it out.
- The ownership timeline no longer renders the unpublished post-migration platform fee.

### `/compare/bridge`

- Added a Written by Anvil method line. Every cell has a source link to a usebridge.com page or an Anvil page, re-checked November 17, 2026. Existing cell text stays.
- Added two sourced rows: Bridge's published 6 to 12 months to secure multi-state contracts, and Bridge's published 20 to 25% of gross revenue for in-house operations. The Anvil cell on each is Not published.
- Article authorship is Anvil.

### `/solutions/behavioral-health`

- Tightened the panel sequence so state Medicaid enrollment and each MCO panel are separate filings.
- Added a sourced process table for psychiatry and therapy, ABA, and Medicaid MCO panels. Written by Anvil. Sources checked November 17, 2026. No coverage count was added.

### Not a page change

- `/`, `/rates`, RateRelated, `/pricing` body copy, and held articles were not edited.
- The TimelineSlider no longer outputs the hardcoded post-migration fee on the two pages that render it.

## 2026-11-17

Held 3 contracting articles (publishDate set to 2099-01-01), held pending named legal/regulatory reviewer per CoS Nov 17 (G1a).

- `renting-vs-owning-professional-corporation.md`, original publishDate 2026-12-15, held pending named legal/regulatory reviewer per CoS Nov 17 (G1a)
- `investor-diligence-payer-contracts.md`, original publishDate 2026-12-22, held pending named legal/regulatory reviewer per CoS Nov 17 (G1a)
- `migrating-from-rented-pc-to-own-contracts.md`, original publishDate 2026-12-29, held pending named legal/regulatory reviewer per CoS Nov 17 (G1a)

## 2026-11-17

Held 13 queued non-contracting articles (publishDate set to 2099-01-01), held pending reviewer / URL freeze per CoS Nov 17.

Restore by setting each file's `publishDate` back to the original date. No other field was changed.

- `credentialing-automation-what-works.md` — 2026-11-24
- `medicaid-credentialing-behavioral-health-by-state.md` — 2026-12-01
- `cost-of-in-house-insurance-operations.md` — 2026-12-08
- `behavioral-health-reimbursement-rates-by-state-q1-2027.md` — 2027-01-05
- `eligibility-at-booking-conversion-lift.md` — 2027-02-02
- `soft-check-hard-check-eligibility-api.md` — 2027-02-09
- `payer-eligibility-outage-detection.md` — 2027-02-16
- `aba-authorization-intake-flow.md` — 2027-02-23
- `oig-advisory-opinion-25-03-and-state-cpom.md` — 2027-03-02
- `state-cpom-telehealth-billing-map-2027.md` — 2027-03-09
- `health-plan-audits-virtual-care.md` — 2027-03-16
- `hybrid-in-person-care-insurance-billing.md` — 2027-03-23
- `six-months-of-data.md` — 2027-03-30

## 2026-11-11

The contact form (`anvil-leads` on `/contact`) again posts attribution as hidden fields: `first_landing`, `first_referrer`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content`. Those values are captured on the first page view of the browser session and stored only in `sessionStorage` (`anvil_attr`). The referrer field is named `first_referrer` because Netlify Forms overwrites a field named `referrer` with the POST Referer header. Visible inquiry fields are unchanged.

### Home (`/`)

- Meta description now reads "Insurance billing infrastructure for virtual and hybrid care." The title tag and H1 stay "Insurance billing infrastructure for virtual care."
- Rate lookup codes stay 90791, 90834, 90837, and 97153. `public/rates.json` (Parite export, updated 2026-09-17) has rates only for those four codes. It has no rows for 99213, 99214, 99204, 97802, or 97110. The file readme already records 99214, 99213, 96158, and 99484 as omitted because Parite had no cells.
- The rate section intro now says the menu lists the codes Parite has published, and that this menu is not a limit on the care Anvil bills.
- The sample enrollment tracker rows are MD primary care, NP, RD, PT, MD specialist, and one behavioral health row (LCSW). Existing status text is unchanged. The widget is labeled "Sample enrollment tracker" and "Illustrative sample. Not a customer roster." Clinician names wrap inside the card.
- `lastmod` for `/` is 2026-11-11 because this page's visible content changed.

### Shared head (every page)

- `site.config.mjs` had no behavioral-health-only wording. Tagline stays "Insurance infrastructure for care companies." A description field was added for JSON-LD only: "Anvil is insurance billing infrastructure for virtual and hybrid care."
- Organization JSON-LD uses that description (it previously said virtual care only). WebSite JSON-LD now includes the same description (it previously had none).
- No other page's visible body copy changed, so no other `lastmod` moved.

### `public/llms.txt`

- The service paragraph now says Anvil is insurance infrastructure for virtual and hybrid care, including in-home and in-person programs. Behavioral health stays one solution, next to virtual care and hybrid care.
- The file stamp is November 11, 2026 because this file changed.
- The behavioral health solutions URL stays listed with the other solutions.

### Not a page change

- No new solutions pages. No rate rows added. `RateRelated`, the anvil-leads form, analytics, and consent were not edited.
