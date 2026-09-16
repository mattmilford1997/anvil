# Content plan: blog schedule and review

Source: the six-month content package (files 01 to 06 plus 00_INDEX). LinkedIn copy is not imported; it stays in the source files. All 26 blog posts are in `src/content/resources/`, one file per post, dated per the master calendar (Tuesdays, Oct 6 2026 to Mar 30 2027).

## How scheduling works

The site is static, so a post exists on the live site only after a build that includes it. Three gates decide whether a post is included in a production build (`src/lib/content.ts`):

| Gate | Frontmatter | Effect |
|---|---|---|
| Date | `publishDate` | Excluded until the build runs on or after that date |
| Data review | `dataReview: pending` | Excluded until you change it to `cleared` |
| Draft | `draft: true` | Excluded |

`.github/workflows/scheduled-publish.yml` triggers a Netlify build every Tuesday at 13:00 UTC so date-gated posts appear on their day without anyone pushing. It needs one secret, `NETLIFY_BUILD_HOOK`, set in the GitHub repo (create the hook in Netlify under Build & deploy > Build hooks). Until the secret exists the workflow runs and does nothing. Pushing to `main` also rebuilds, so a manual push on a Tuesday works too.

Deploy previews and branch deploys set `ANVIL_PREVIEW=1` and render every post with a banner showing why it is held, so you can review scheduled and pending posts at their real URLs before they go live.

## Master schedule

Every post is cleared to publish automatically on its date. No post depends on Anvil operating data; the nine that did were rewritten around frameworks, commonly cited industry ranges, and clearly hypothetical worked examples. Word counts are body only.

| Wk | Date | Post | Words | Tool CTA | Status |
|---|---|---|---|---|---|
| 1 | Oct 6 | when-to-accept-insurance | 658 | Readiness checklist | ready |
| 2 | Oct 13 | five-workstreams-insurance-operations | 659 | Calculator | ready |
| 3 | Oct 20 | cash-pay-to-insurance-two-phase-plan | 549 | Eligibility | ready |
| 4 | Oct 27 | what-in-network-nationally-means | 582 | Coverage map | ready |
| 5 | Nov 3 | credentialing-timeline-benchmark-by-payer | 1,017 | Enrollment checklist download | ready |
| 6 | Nov 10 | cost-of-credentialing-delays | 475 | Idle counter | ready |
| 7 | Nov 17 | roster-add-vs-full-enrollment | 495 | none | ready |
| 8 | Nov 24 | credentialing-automation-what-works | 936 | none | ready |
| 9 | Dec 1 | medicaid-credentialing-behavioral-health-by-state | 1,112 | Coverage map | ready, verify <!-- verify --> program facts |
| 10 | Dec 8 | cost-of-in-house-insurance-operations | 614 | Calculator | ready |
| 11 | Dec 15 | renting-vs-owning-professional-corporation | 638 | Timeline slider | ready |
| 12 | Dec 22 | investor-diligence-payer-contracts | 396 | Diligence checklist | ready |
| 13 | Dec 29 | migrating-from-rented-pc-to-own-contracts | 1,399 | Timeline slider | ready |
| 14 | Jan 5 | behavioral-health-reimbursement-rates-by-state-q1-2027 | 1,332 | Rate lookup | ready |
| 15 | Jan 12 | lease-fee-vs-contracted-rate | 481 | Rate lookup | ready |
| 16 | Jan 19 | payer-contracting-101-care-companies | 516 | none | ready |
| 17 | Jan 26 | largest-payers-by-state-rollout-order | 1,227 | Coverage map | ready, verify payer share table |
| 18 | Feb 2 | eligibility-at-booking-conversion-lift | 1,238 | Eligibility | ready |
| 19 | Feb 9 | soft-check-hard-check-eligibility-api | 600 | Docs | ready |
| 20 | Feb 16 | payer-eligibility-outage-detection | 1,071 | none | ready |
| 21 | Feb 23 | aba-authorization-intake-flow | 565 | none | ready |
| 22 | Mar 2 | oig-advisory-opinion-25-03-and-state-cpom | 615 | none | ready, counsel review |
| 23 | Mar 9 | state-cpom-telehealth-billing-map-2027 | 1,105 | Map download | ready, counsel review |
| 24 | Mar 16 | health-plan-audits-virtual-care | 583 | Audit checklist | ready |
| 25 | Mar 23 | hybrid-in-person-care-insurance-billing | 525 | none | ready |
| 26 | Mar 30 | six-months-of-data | 1,216 | All tools | ready |

## Review findings

1. **Posts are short.** The 17 untouched posts run 400 to 1,100 words; the 9 rewritten ones run 900 to 1,400. The spec calls for 1,500 to 2,500 words per post. The FAQ and summary are there; the depth mostly is not. For the SEO goal (page-one rankings on the cluster) most need expanding. Longer versions of six topics (weeks 1, 2, 3, 4, 6, 11) exist in git history at commit `e77b3d3` under `src/content/resources/` and can be merged in.
2. **Meta descriptions were too long.** All 26 ran 214 to 283 characters. The full text is kept as the article lede; a sentence-boundary cut under 155 characters is used for the meta tag and cards. Worth a manual pass, since a cut sentence is not always the best hook.
3. **House rule applied to the site.** No portfolio company names, no first-party case studies, and no "companies we operate" framing anywhere on the site. The operators band and company page describe the team's experience without naming or counting companies.
4. **House rule on physician pay figures.** The plan says no stipend or friendly-physician pay figures. The site publishes the $3,000 per month physician owner fee on the pricing page and in two posts (weeks 11 and 13 reference it via Foundry PC). That is a Foundry list price rather than a stipend, but decide whether it belongs on the Anvil site.
5. **Launch timing.** The first post is dated Oct 6. If the site goes live before that, the resources hub is empty in production. Either backdate weeks 1 to 4 to the launch date or launch the site with the first post.
6. **Tool CTAs that do not exist yet.** Benchmark download (week 5), CPOM map download (week 23), and audit checklist (week 24) are wired as email-gated forms that promise a PDF; the PDFs need producing. Eligibility demo (weeks 3, 18) links to the eligibility page; the sandbox demo is a phase 2 build. Docs (week 19) links to the docs subdomain placeholder.
7. **Category 1 items still need verification** before their posts go live: Medicaid program facts marked `<!-- verify -->` (week 9), the approximate payer share table (week 17), every CPOM row (week 23), the OIG 25-03 summary (week 22).
8. **Week 26 was re-framed** from a data recap to a synthesis of the series ("What we would tell a founder starting today") linking to 21 earlier posts. If real six-month data exists by March, a data recap can be added as a separate post.
9. **Week 14 was re-framed** from a rate report with tables to a guide on reading reimbursement by state and building a rate ladder, pointing at the live rate lookup. When Parite data is in `public/rates.json`, a true quarterly rate report can be published as a Report.
10. **Week 23 is tagged Report** so it filters correctly on the hub; it publishes ungated with a gated PDF download alongside, which matches the spec's rule that every article ends in a tool.

## Working the schedule

Weekly, on Monday:
1. Open the deploy preview for `main` and read next Tuesday's post at its real URL.
2. If a post carries a `<!-- verify -->` comment or a counsel-review note, check those facts and commit any fix.
3. Tuesday 13:00 UTC the scheduled build publishes it. Check the live URL and the hub.

To move a post, change `publishDate`. To pull one, set `draft: true`. To add one, copy any file and follow the frontmatter.
