// Last significant content change per path (YYYY-MM-DD). Update a path's date in the same PR that changes its rendered content.
// Every sitemap URL gets a date. Unlisted paths use the fallback.
export const PAGE_LASTMOD = {
  '/': '2026-10-20',
  '/platform': '2026-10-20',
  '/platform/rcm': '2026-10-18',
  '/platform/compliance': '2026-10-19',
  '/platform/contracting': '2026-10-20',
  '/platform/credentialing': '2026-10-03',
  '/platform/eligibility': '2026-10-17',
  '/own-your-contracts': '2026-10-19',
  '/pricing': '2026-10-20',
  '/rates': '2026-10-20',
  '/rates/payer/medicare': '2026-10-20',
  '/rates/payer/uhc': '2026-10-20',
  '/rates/payer/medicaid': '2026-10-20',
  '/rates/code/90791': '2026-10-20',
  '/rates/code/90834': '2026-10-20',
  '/rates/code/90837': '2026-10-20',
  '/rates/code/97153': '2026-10-20',
  '/solutions/behavioral-health': '2026-10-18',
  '/solutions/switching': '2026-10-20',
  '/solutions/virtual-care': '2026-10-20',
  '/solutions/hybrid-care': '2026-10-20',
  '/compare/bridge': '2026-10-19',
  '/health-plans': '2026-10-18',
  '/resources': '2026-10-20',
  '/resources/cash-pay-to-insurance-two-phase-plan': '2026-10-20',
  '/resources/five-workstreams-insurance-operations': '2026-10-18',
  '/resources/six-months-of-data': '2026-10-18',
  '/resources/when-to-accept-insurance': '2026-10-20',
};
// Every URL under /rates/ (state hubs, code hubs, payer hubs, state+code pages).
export const RATES_SUBPAGES_LASTMOD = '2026-10-18';
const FALLBACK_LASTMOD = '2026-10-17';
export function lastmodFor(path) {
  if (PAGE_LASTMOD[path]) return PAGE_LASTMOD[path];
  if (path.startsWith('/rates/')) return RATES_SUBPAGES_LASTMOD;
  return FALLBACK_LASTMOD;
}
