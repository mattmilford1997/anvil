# Anvil marketing site

Astro static site for Anvil, the insurance infrastructure platform (rented 50-state PC now, own your contracts by year one). Built from the Bridge teardown / positioning / website spec. Deploys to Netlify.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
npm run check    # type check
```

Node 22. No database, no server. Forms use Netlify Forms.

## Deploy to Netlify

**Option A. This folder inside the foundrypc-website repo.**
1. Netlify > Add new site > Import from GitHub > `mattmilford1997/foundrypc-website`.
2. Set **Base directory** to `anvil`. Build command and publish dir are read from `anvil/netlify.toml` (`npm run build`, `dist`).
3. Set environment variable `SITE_URL` to the production domain (for example `https://www.getanvil.com`) so canonicals and the sitemap are right. Deploy previews can leave it unset.
4. Add the custom domain, enable HTTPS.

**Option B. Its own repository (recommended once the name is final).**
```bash
# from the repo root
git subtree split --prefix=anvil -b anvil-site
# push that branch to a new empty GitHub repo, then import it in Netlify with no base directory
```

## Forms to Close

Netlify Forms collects submissions for `anvil-leads` (contact), `newsletter`, `calculator-export`, `readiness-checklist`, `diligence-checklist`, and `baa-request`. In Netlify: Site settings > Forms > Form notifications > Outgoing webhook, point at a Zapier or Make hook that creates the lead in Close. Every submission carries hidden fields `utm_*`, `referrer`, `landing`, and `go_slug` for attribution. Tracked links: `/go/<slug>` redirects to `/contact?src=<slug>` (see `netlify.toml`).

## Where things live

| What | Where |
|---|---|
| Brand name, URL, docs/trust/login URLs, analytics IDs, Calendly | `site.config.mjs` |
| Design tokens (colors, type, spacing) | `src/styles/global.css` |
| Nav and footer links | `src/data/nav.ts` |
| Coverage stats band (honesty-gated) | `src/data/stats.ts` |
| Testimonials (honesty-gated) | `src/data/testimonials.ts` |
| Portfolio companies, team, authors | `src/data/portfolio.ts`, `src/data/team.ts` |
| Pricing tiers and notes | `src/data/pricing.ts` |
| FAQ copy for home, ownership, pricing | `src/data/faqs.ts` |
| Coverage map data (per state) | `src/data/coverage.ts` |
| Rate lookup data (Parite export) | `public/rates.json` |
| Articles | `src/content/resources/*.md` |
| Case studies | `src/content/customers/*.md` |
| Page templates | `src/pages/**`, `src/layouts/**` |
| Redirects, headers, /go/ links | `netlify.toml` |

## Honesty gates

Some content is hidden in production until it is real:
- Stats in `stats.ts` render only when `verified: true`.
- Testimonials render only when `approved: true`.
- Articles and case studies with `draft: true` are excluded from production builds (visible in `npm run dev`).

## Adding an article

Create `src/content/resources/<slug>.md` with the frontmatter in `src/content.config.ts`. `faq` items emit FAQPage JSON-LD automatically. `tool` picks the end-of-article tool CTA. `related` takes sibling slugs. Set `featured: true` to pin it at the top of the hub.

## Adding a case study

Create `src/content/customers/<slug>.md`. Only publish `headline` and `metrics` that are true. Keep `draft: true` until the customer signs off.

## Interactive components

- Rate lookup: `RateLookup.astro` reads `public/rates.json`. To use a Parite embed instead, replace the form in that component with the embed snippet.
- Build vs partner calculator: `BuildVsPartnerCalc.astro`, fee numbers come from `pricing.ts`.
- Idle clinician counter: `IdleCounter.astro`.
- Ownership timeline slider: `TimelineSlider.astro`.
- Coverage map: `CoverageMap.astro`, tile-grid map driven by `coverage.ts`.

See `LAUNCH-CHECKLIST.md` before going live.
