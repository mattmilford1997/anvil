// Single source of truth for brand + URL. Change here, everything follows.
const siteUrl = (process.env.SITE_URL || 'https://www.anvilcontracts.com').replace(/\/$/, '');

export const SITE = {
  name: 'Anvil',
  legalName: 'Catalyze Care LLC d/b/a Anvil', // TODO(launch): confirm entity name with counsel
  tagline: 'Insurance infrastructure for care companies',
  // Production domain: anvilcontracts.com (DNS at Netlify). Override with SITE_URL if needed.
  url: siteUrl,
  // First-party stubs (path-only so Header/Footer stay on the current host).
  // Absolute equivalents: https://www.anvilcontracts.com/docs and .../trust
  docsUrl: '/docs',
  trustUrl: '/trust',
  // No customer login host is published. /login redirects to /contact (see netlify.toml).
  loginUrl: '/contact',
  linkedin: '', // TODO(launch): company page URL. Empty means no sameAs and no footer link.
  contactEmail: 'hello@anvilcontracts.com',        // TODO(launch): mailbox on the production domain
  parentBrands: ['Foundry PC', 'Homefront', 'Arche Studios'],
  calendly: '',  // TODO(launch): e.g. https://calendly.com/you/anvil-intro (used on /contact/success)
  // CoS measurement ID. PUBLIC_GA4 overrides this at build time if set.
  ga4: process.env.PUBLIC_GA4 || 'G-PT5J74C7KT',
  posthog: '',   // TODO(launch): phc_...
  linkedinInsight: '', // TODO(launch): partner id
};
