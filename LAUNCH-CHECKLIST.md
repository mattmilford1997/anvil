# Launch checklist

Everything marked `TODO(launch)` in the code is listed here. Run `grep -rn "TODO(launch)" src site.config.mjs public netlify.toml` to find them.

## Decisions (Appendix B of the spec)
- [ ] Brand name. The site is built as **Anvil**. To rename: change `SITE.name` in `site.config.mjs`, then `grep -rl "Anvil" src public | xargs sed -i 's/Anvil/NewName/g'`, and update `Logo.astro`, `favicon.svg`, `logo.svg`, `og-default.png`.
- [ ] Domain. Replace `https://www.getanvil.com` in `site.config.mjs`, `public/robots.txt`, `public/llms.txt`, `netlify.toml`.
- [ ] Which entity is the rented PC, its contract count and states (feeds `stats.ts` and `coverage.ts`).
- [ ] Pricing numbers: platform fee % per tier, one-time program fees, own-contract fee (`pricing.ts`, `TimelineSlider.astro`). Foundry numbers ($15,000 formation, $3,000/mo physician owner, $360/state) are already real.
- [ ] Login destination (`SITE.loginUrl`), docs host (`SITE.docsUrl`), trust center (`SITE.trustUrl`).
- [ ] Counsel sign-off on `/platform/compliance`, `/legal/privacy`, `/legal/terms`, and the footer disclaimer.
- [ ] Which three Arche companies are the launch case studies (drafts exist for Third Space, Clearview, Luna).

## Data to fill
- [ ] `src/data/stats.ts`: real states live, payers live, clinicians credentialed, median days to first paid claim. Set `verified: true`.
- [ ] `src/data/coverage.ts`: real per-state rented / contracting / Medicaid status.
- [ ] `public/rates.json`: Parite export, or swap in the Parite embed.
- [ ] `src/data/testimonials.ts`: three signed-off quotes (CEO, engineer, CFO or investor). Set `approved: true`.
- [ ] `src/data/portfolio.ts`: confirm each company line; real state and specialty counts.
- [ ] `src/data/team.ts`: titles, photos, additional team members.
- [ ] `src/content/customers/*.md`: fill bracketed metrics, set `draft: false` after sign-off.
- [ ] `src/pages/careers.astro`: real open roles or ATS link.
- [ ] `src/pages/platform/compliance.astro`: SOC 2 target date.

## Integrations
- [ ] Netlify: base directory `anvil`, env `SITE_URL`, custom domain, HTTPS.
- [ ] Netlify Forms: enable, add outgoing webhook to Zapier/Make -> Close for each form.
- [ ] Analytics: set `SITE.ga4` (GA4). Add PostHog / LinkedIn Insight snippets in `BaseLayout.astro` behind the consent event `anvil:consent` if wanted.
- [ ] Calendly: set `SITE.calendly` for the confirmation page embed.
- [ ] Google Search Console: verify, submit `/sitemap-index.xml`.
- [ ] Docs site (Fern/Mintlify) at `docs.` with `llms.txt`; trust center at `trust.`.

## Acceptance (Phase 1)
- [ ] Lighthouse 90+ mobile on Home, Platform, Own Your Contracts, Pricing, Contact, Company, Resources.
- [ ] Contact form creates a Close lead with UTM and `go_slug`.
- [ ] FAQ schema validates (Rich Results Test) on Home and one article.
- [ ] Every page: one H1, meta title under 60 chars, description under 155.
- [ ] Reduced-motion check: hero dots and marquee stop.
- [ ] Keyboard nav through header dropdowns, FAQ accordions, coverage map.
