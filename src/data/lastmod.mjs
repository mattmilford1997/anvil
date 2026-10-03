// Last significant content change per path (YYYY-MM-DD). Update a path's date in the same PR that changes its rendered content.
// Paths not listed get no <lastmod>.
export const PAGE_LASTMOD = {
  '/': '2026-10-03',
  '/platform': '2026-10-03',
  '/platform/compliance': '2026-10-03',
  '/platform/contracting': '2026-10-03',
  '/platform/credentialing': '2026-10-03',
  '/platform/eligibility': '2026-10-03',
  '/pricing': '2026-10-03',
  '/solutions/switching': '2026-10-03',
  '/solutions/virtual-care': '2026-10-03',
  '/solutions/hybrid-care': '2026-10-03',
  '/compare/bridge': '2026-10-03',
  '/resources': '2026-10-03',
};
// Every URL under /rates/ (state hubs, code hubs, state+code pages). /rates itself is not included.
export const RATES_SUBPAGES_LASTMOD = '2026-10-03';
export function lastmodFor(path) {
  if (PAGE_LASTMOD[path]) return PAGE_LASTMOD[path];
  if (path.startsWith('/rates/')) return RATES_SUBPAGES_LASTMOD;
  return undefined;
}
