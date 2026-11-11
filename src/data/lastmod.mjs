// Last significant content change per path (YYYY-MM-DD). Update a path's date in the same PR that changes its rendered content.
// Every sitemap URL gets a date. Unlisted paths use the fallback.
export const PAGE_LASTMOD = {
  '/': '2026-11-11',
  '/platform': '2026-11-09',
  '/platform/rcm': '2026-11-09',
  '/platform/compliance': '2026-11-07',
  '/platform/contracting': '2026-11-09',
  '/platform/credentialing': '2026-11-09',
  '/platform/eligibility': '2026-11-07',
  '/own-your-contracts': '2026-11-09',
  '/pricing': '2026-11-06',
  '/contact': '2026-11-11',
  '/company': '2026-11-08',
  '/careers': '2026-11-08',
  '/trust': '2026-11-08',
  '/rates': '2026-11-06',
  '/rates/payer/medicare': '2026-11-06',
  '/rates/payer/uhc': '2026-11-06',
  '/rates/payer/medicaid': '2026-11-06',
  '/rates/code/90791': '2026-11-06',
  '/rates/code/90834': '2026-11-06',
  '/rates/code/90837': '2026-11-06',
  '/rates/code/97153': '2026-11-06',
  '/solutions/behavioral-health': '2026-11-09',
  '/solutions/switching': '2026-11-09',
  '/solutions/virtual-care': '2026-11-09',
  '/solutions/hybrid-care': '2026-11-07',
  '/compare/bridge': '2026-11-09',
  '/health-plans': '2026-11-08',
  '/resources': '2026-11-09',
  '/resources/cash-pay-to-insurance-two-phase-plan': '2026-11-08',
  '/resources/what-in-network-nationally-means': '2026-11-08',
  '/resources/five-workstreams-insurance-operations': '2026-11-09',
  '/resources/six-months-of-data': '2026-10-18',
  '/resources/when-to-accept-insurance': '2026-11-08',
  '/resources/credentialing-timeline-benchmark-by-payer': '2026-11-08',
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
// State hubs and leaves: related list changed (MSO-PC item removed).
const RATE_RELATED_LASTMOD = '2026-11-06';
// A few leaf pages with hand-written notes. Checked before the blanket state/leaf date so the rest of the tree stays on RATE_RELATED_LASTMOD.
const RATE_LEAF_NOTE_LASTMOD = {
  '/rates/in/97153': '2026-11-08',
  '/rates/nd/97153': '2026-11-08',
  '/rates/pr/90837': '2026-11-08',
  '/rates/mo/97153': '2026-11-09',
  '/rates/ms/97153': '2026-11-09',
  '/rates/ok/97153': '2026-11-09',
  '/rates/vi/90791': '2026-11-09',
};
export function lastmodFor(path) {
  if (RATE_LEAF_NOTE_LASTMOD[path]) return RATE_LEAF_NOTE_LASTMOD[path];
  if (/^\/rates\/[a-z]{2}(\/\d+)?$/.test(path)) return RATE_RELATED_LASTMOD;
  if (PAGE_LASTMOD[path]) return PAGE_LASTMOD[path];
  if (/^\/rates\/[a-z]{2}$/.test(path)) return STATE_HUB_LASTMOD;
  if (/^\/rates\/[a-z]{2}\/(90791|90834|90837)$/.test(path)) return PSYCH_LEAF_LASTMOD;
  if (path.startsWith('/rates/')) return RATES_SUBPAGES_LASTMOD;
  return FALLBACK_LASTMOD;
}
