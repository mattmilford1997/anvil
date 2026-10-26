// Last significant content change per path (YYYY-MM-DD). Update a path's date in the same PR that changes its rendered content.
// Every sitemap URL gets a date. Unlisted paths use the fallback.
export const PAGE_LASTMOD = {
  '/': '2026-10-20',
  '/platform': '2026-10-20',
  '/platform/rcm': '2026-10-26',
  '/platform/compliance': '2026-10-19',
  '/platform/contracting': '2026-10-20',
  '/platform/credentialing': '2026-10-03',
  '/platform/eligibility': '2026-10-17',
  '/own-your-contracts': '2026-10-26',
  '/pricing': '2026-10-20',
  '/rates': '2026-10-20',
  '/rates/payer/medicare': '2026-10-25',
  '/rates/payer/uhc': '2026-10-25',
  '/rates/payer/medicaid': '2026-10-25',
  '/rates/code/90791': '2026-10-23',
  '/rates/code/90834': '2026-10-25',
  '/rates/code/90837': '2026-10-26',
  '/rates/code/97153': '2026-10-25',
  '/solutions/behavioral-health': '2026-10-26',
  '/solutions/switching': '2026-10-20',
  '/solutions/virtual-care': '2026-10-23',
  '/solutions/hybrid-care': '2026-10-20',
  '/compare/bridge': '2026-10-26',
  '/health-plans': '2026-10-26',
  '/resources': '2026-10-20',
  '/resources/cash-pay-to-insurance-two-phase-plan': '2026-10-26',
  '/resources/five-workstreams-insurance-operations': '2026-10-26',
  '/resources/six-months-of-data': '2026-10-18',
  '/resources/when-to-accept-insurance': '2026-10-25',
};
// State hub pages (/rates/oh). State and code pages stay on RATES_SUBPAGES_LASTMOD.
const STATE_HUB_LASTMOD = '2026-10-23';
// State and code pages, and any other /rates/ URL without its own date.
export const RATES_SUBPAGES_LASTMOD = '2026-10-18';
const FALLBACK_LASTMOD = '2026-10-17';
export function lastmodFor(path) {
  if (PAGE_LASTMOD[path]) return PAGE_LASTMOD[path];
  if (/^\/rates\/[a-z]{2}$/.test(path)) return STATE_HUB_LASTMOD;
  if (path.startsWith('/rates/')) return RATES_SUBPAGES_LASTMOD;
  return FALLBACK_LASTMOD;
}
