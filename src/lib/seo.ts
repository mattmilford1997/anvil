import { SITE } from '../../site.config.mjs';

export const isProd = import.meta.env.PROD;
/** True when gates are bypassed (dev server or ANVIL_PREVIEW=1). Used to show hold banners. */
export const showHeld = !isProd || process.env.ANVIL_PREVIEW === '1';

export function absolute(path: string) {
  return new URL(path, SITE.url).toString();
}

/** True for off-site http(s) URLs. Same-origin absolute URLs stay in-app. */
export function isExternalHref(href?: string) {
  if (!href) return false;
  if (href.startsWith('/') || href.startsWith('#') || href.startsWith('?')) return false;
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return true;
  try {
    return new URL(href, SITE.url).origin !== new URL(SITE.url).origin;
  } catch {
    return false;
  }
}

export function orgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: absolute('/logo.svg'),
    sameAs: [SITE.linkedin],
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', email: SITE.contactEmail }],
  };
}

export function websiteJsonLd() {
  return { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absolute(it.path),
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function fmtDate(d: Date) {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

export function fmtMoney(n: number, digits = 0) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: digits });
}
