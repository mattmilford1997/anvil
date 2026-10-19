// Last significant content change per path (YYYY-MM-DD). Update a path's date in the same PR that changes its rendered content.
// Every sitemap URL gets a date. Unlisted paths use the fallback.
export const PAGE_LASTMOD = {
  '/': '2026-10-19',
  '/platform': '2026-10-18',
  '/platform/rcm': '2026-10-18',
  '/platform/compliance': '2026-10-19',
  '/platform/contracting': '2026-10-17',
  '/platform/credentialing': '2026-10-03',
  '/platform/eligibility': '2026-10-17',
  '/own-your-contracts': '2026-10-19',
  '/pricing': '2026-10-03',
  '/rates': '2026-10-17',
  '/solutions/behavioral-health': '2026-10-18',
  '/solutions/switching': '2026-10-19',
  '/solutions/virtual-care': '2026-10-18',
  '/solutions/hybrid-care': '2026-10-17',
  '/compare/bridge': '2026-10-19',
  '/health-plans': '2026-10-18',
  '/resources': '2026-10-18',
  '/resources/five-workstreams-insurance-operations': '2026-10-18',
  '/resources/six-months-of-data': '2026-10-18',
  '/resources/when-to-accept-insurance': '2026-10-19',
};
// Every URL under /rates/ (state hubs, code hubs, payer hubs, state+code pages).
export const RATES_SUBPAGES_LASTMOD = '2026-10-18';
// State hubs (/rates/{state}) and code hubs (/rates/code/{code}) whose H1 or title changed.
export const RATE_HUB_LASTMOD = '2026-10-19';
const FALLBACK_LASTMOD = '2026-10-17';
export function lastmodFor(path) {
  if (PAGE_LASTMOD[path]) return PAGE_LASTMOD[path];
  if (/^\/rates\/[a-z]{2}$/.test(path) || path.startsWith('/rates/code/')) return RATE_HUB_LASTMOD;
  if (path.startsWith('/rates/')) return RATES_SUBPAGES_LASTMOD;
  return FALLBACK_LASTMOD;
}
