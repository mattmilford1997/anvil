# Content changelog

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
