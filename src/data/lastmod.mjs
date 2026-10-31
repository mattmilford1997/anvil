// Last significant content change per path (YYYY-MM-DD). Update a path's date in the same PR that changes its rendered content.
// Every sitemap URL gets a date. Unlisted paths use the fallback.
export const PAGE_LASTMOD = {
  '/': '2026-10-31',
  '/platform': '2026-10-30',
  '/platform/rcm': '2026-10-30',
  '/platform/compliance': '2026-10-30',
  '/platform/contracting': '2026-10-31',
  '/platform/credentialing': '2026-10-31',
  '/platform/eligibility': '2026-10-30',
  '/own-your-contracts': '2026-10-31',
  '/pricing': '2026-10-30',
  '/rates': '2026-10-30',
  '/rates/payer/medicare': '2026-10-31',
  '/rates/payer/uhc': '2026-10-31',
  '/rates/payer/medicaid': '2026-10-31',
  '/rates/code/90791': '2026-10-29',
  '/rates/code/90834': '2026-10-29',
  '/rates/code/90837': '2026-10-29',
  '/rates/code/97153': '2026-10-25',
  '/solutions/behavioral-health': '2026-10-30',
  '/solutions/switching': '2026-10-31',
  '/solutions/virtual-care': '2026-10-31',
  '/solutions/hybrid-care': '2026-10-30',
  '/compare/bridge': '2026-10-31',
  '/health-plans': '2026-10-31',
  '/resources': '2026-10-20',
  '/resources/cash-pay-to-insurance-two-phase-plan': '2026-10-31',
  '/resources/what-in-network-nationally-means': '2026-10-30',
  '/resources/five-workstreams-insurance-operations': '2026-10-30',
  '/resources/six-months-of-data': '2026-10-18',
  '/resources/when-to-accept-insurance': '2026-10-30',
  // State hubs whose 90837 section compares Medicaid FFS and Medicare. Other state hubs stay on STATE_HUB_LASTMOD.
  '/rates/ak': '2026-10-28',
  '/rates/az': '2026-10-28',
  '/rates/ca': '2026-10-28',
  '/rates/dc': '2026-10-28',
  '/rates/fl': '2026-10-28',
  '/rates/il': '2026-10-28',
  '/rates/in': '2026-10-28',
  '/rates/ky': '2026-10-28',
  '/rates/la': '2026-10-28',
  '/rates/mi': '2026-10-28',
  '/rates/mo': '2026-10-28',
  '/rates/ms': '2026-10-28',
  '/rates/mt': '2026-10-28',
  '/rates/nd': '2026-10-28',
  '/rates/ne': '2026-10-28',
  '/rates/nv': '2026-10-28',
  '/rates/ny': '2026-10-28',
  '/rates/oh': '2026-10-28',
  '/rates/ok': '2026-10-28',
  '/rates/sc': '2026-10-28',
  '/rates/tx': '2026-10-28',
  '/rates/va': '2026-10-28',
  '/rates/wa': '2026-10-28',
  '/rates/wv': '2026-10-28',
};
// State hub pages (/rates/oh). State and code pages stay on RATES_SUBPAGES_LASTMOD.
const STATE_HUB_LASTMOD = '2026-10-23';
// State and code pages, and any other /rates/ URL without its own date.
export const RATES_SUBPAGES_LASTMOD = '2026-10-18';
// 90791, 90834, and 90837 leaf pages. 97153 leaves stay on RATES_SUBPAGES_LASTMOD.
const PSYCH_LEAF_LASTMOD = '2026-10-29';
const FALLBACK_LASTMOD = '2026-10-17';
export function lastmodFor(path) {
  if (PAGE_LASTMOD[path]) return PAGE_LASTMOD[path];
  if (/^\/rates\/[a-z]{2}$/.test(path)) return STATE_HUB_LASTMOD;
  if (/^\/rates\/[a-z]{2}\/(90791|90834|90837)$/.test(path)) return PSYCH_LEAF_LASTMOD;
  if (path.startsWith('/rates/')) return RATES_SUBPAGES_LASTMOD;
  return FALLBACK_LASTMOD;
}
