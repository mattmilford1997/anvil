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

Status: **ready** publishes automatically on its date. **pending** needs Category 2 figures replaced with actuals (listed) and `dataReview: cleared`. Word counts are body only.

| Wk | Date | Post | Words | Tool CTA | Status | Category 2 figures to replace |
|---|---|---|---|---|---|---|
| 1 | Oct 6 | when-to-accept-insurance | 658 | Readiness checklist | ready | |
| 2 | Oct 13 | five-workstreams-insurance-operations | 659 | Calculator | ready | |
| 3 | Oct 20 | cash-pay-to-insurance-two-phase-plan | 549 | Eligibility | ready | |
| 4 | Oct 27 | what-in-network-nationally-means | 582 | Coverage map | ready | |
| 5 | Nov 3 | credentialing-timeline-benchmark-by-payer | 648 | Benchmark download | pending | 1,140 applications, 38 payers, 62-day median, 23% and 9% bounce, 58%, 31%, 90% automated, per-payer table |
| 6 | Nov 10 | cost-of-credentialing-delays | 475 | Idle counter | ready | |
| 7 | Nov 17 | roster-add-vs-full-enrollment | 495 | none | ready | |
| 8 | Nov 24 | credentialing-automation-what-works | 412 | none | pending | 23% bounce, 90% of applications automated |
| 9 | Dec 1 | medicaid-credentialing-behavioral-health-by-state | 758 | Coverage map | pending | Medicaid enrollment days by state (38 to 84), MCO range 60 to 165; verify MCO counts (Category 1) |
| 10 | Dec 8 | cost-of-in-house-insurance-operations | 614 | Calculator | ready | confirm $2.3M vs $610k worked example against the live calculator |
| 11 | Dec 15 | renting-vs-owning-professional-corporation | 638 | Timeline slider | ready | |
| 12 | Dec 22 | investor-diligence-payer-contracts | 396 | Diligence checklist | ready | "Harborline Behavioral PC" is an illustrative name, fine as is |
| 13 | Dec 29 | migrating-from-rented-pc-to-own-contracts | 570 | Timeline slider | pending | 20 to 35% by month 6, 38% first cohort |
| 14 | Jan 5 | behavioral-health-reimbursement-rates-by-state-q1-2027 | 856 | Rate lookup | pending | Entire report: 41,300 claims, 27 payers, 12 states, every state-by-code table, 64 codes, 8 of 12, 41% |
| 15 | Jan 12 | lease-fee-vs-contracted-rate | 481 | Rate lookup | ready | confirm $95 per-visit fee and $138 / $12.42 claim example match Anvil's real fee |
| 16 | Jan 19 | payer-contracting-101-care-companies | 516 | none | ready | |
| 17 | Jan 26 | largest-payers-by-state-rollout-order | 697 | Coverage map | pending | 71% own entity in 30 days; verify payer share table (Category 1) |
| 18 | Feb 2 | eligibility-at-booking-conversion-lift | 493 | Eligibility | pending | 11% to 27%, 2.2x to 3.1x, 2.6x median |
| 19 | Feb 9 | soft-check-hard-check-eligibility-api | 600 | Docs | ready | "Dr. Patel" is an illustrative name |
| 20 | Feb 16 | payer-eligibility-outage-detection | 494 | none | pending | 4 of 10 payers, 11 incidents, 214 fallback bookings |
| 21 | Feb 23 | aba-authorization-intake-flow | 565 | none | ready | |
| 22 | Mar 2 | oig-advisory-opinion-25-03-and-state-cpom | 615 | none | ready, counsel review | OIG 25-03 summary must be checked by counsel |
| 23 | Mar 9 | state-cpom-telehealth-billing-map-2027 | 1,105 | Map download | ready, counsel review | every state row must be verified by counsel |
| 24 | Mar 16 | health-plan-audits-virtual-care | 583 | Audit checklist | ready | 71% to 93% chart compliance if present |
| 25 | Mar 23 | hybrid-in-person-care-insurance-billing | 525 | none | ready | |
| 26 | Mar 30 | six-months-of-data | 457 | All tools | pending | Everything: 14 companies, 17 states, 620 enrollments, 79-day median, 31,400 claims, 5 of 9, 9 states, 34 days, 2.6x, 214, 38%, 71%, July 2027 |

Detection of Category 2 figures is by token match against the Numbers Ledger. Read each pending post once against the ledger before clearing; a figure phrased differently will not have been caught.

## Review findings

1. **Posts are short.** Bodies run 400 to 1,100 words. The spec calls for 1,500 to 2,500 words per post with an executive summary, numbered frameworks, a cost table, and an FAQ. The FAQ and summary are there; the depth is not. For the SEO goal (page-one rankings on the cluster) most of these need roughly doubling. Longer versions of six topics (weeks 1, 2, 3, 4, 6, 11) exist in git history at commit `e77b3d3` under `src/content/resources/` and can be merged in.
2. **Meta descriptions were too long.** All 26 ran 214 to 283 characters. The full text is kept as the article lede; a sentence-boundary cut under 155 characters is used for the meta tag and cards. Worth a manual pass, since a cut sentence is not always the best hook.
3. **House rule conflict with the site.** The plan's rules say no Arche portfolio company names and no "companies we operate" framing. The site currently uses portfolio names on the homepage logo strip and operators band, the company page, and the three draft case studies (Third Space, Clearview, Luna), following the original spec. Pick one. If the plan's rule wins, the site changes are: `src/data/portfolio.ts` (anonymize or remove), `OperatorsBand.astro` and `LogoStrip.astro` copy, `company.astro`, and the case study files.
4. **House rule on physician pay figures.** The plan says no stipend or friendly-physician pay figures. The site publishes the $3,000 per month physician owner fee on the pricing page and in two posts (weeks 11 and 13 reference it via Foundry PC). That is a Foundry list price rather than a stipend, but decide whether it belongs on the Anvil site.
5. **Launch timing.** The first post is dated Oct 6. If the site goes live before that, the resources hub is empty in production. Either backdate weeks 1 to 4 to the launch date or launch the site with the first post.
6. **Tool CTAs that do not exist yet.** Benchmark download (week 5), CPOM map download (week 23), and audit checklist (week 24) are wired as email-gated forms that promise a PDF; the PDFs need producing. Eligibility demo (weeks 3, 18) links to the eligibility page; the sandbox demo is a phase 2 build. Docs (week 19) links to the docs subdomain placeholder.
7. **Category 1 items still need verification** before their posts go live: Medicaid MCO counts (week 9), payer share by state table (week 17), every CPOM row (week 23), the OIG 25-03 summary (week 22).
8. **Week 26 cannot be written until the data exists.** It is a recap of six months of Anvil operating data. Keep it pending and rewrite it in March from actuals.
9. **Two data reports are tagged Report** (weeks 14 and 23) so they filter correctly on the hub. The plan calls them gated; they are published ungated with a gated PDF download alongside, which matches the spec's rule that every article ends in a tool.

## Working the schedule

Weekly, on Monday:
1. Open the deploy preview for `main` and read next Tuesday's post at its real URL.
2. If it is pending, replace the listed figures with actuals in the Markdown, set `dataReview: cleared`, commit.
3. Tuesday 13:00 UTC the scheduled build publishes it. Check the live URL and the hub.

To move a post, change `publishDate`. To pull one, set `draft: true`. To add one, copy any file and follow the frontmatter.
