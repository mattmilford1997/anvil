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
  loginUrl: 'https://app.homefront.health',  // TODO(launch): confirm Homefront portal URL
  linkedin: 'https://www.linkedin.com/company/anvil', // TODO(launch): company page URL
  contactEmail: 'hello@anvilcontracts.com',        // TODO(launch): mailbox on the production domain
  parentBrands: ['Foundry PC', 'Homefront', 'Arche Studios'],
  calendly: '',  // TODO(launch): e.g. https://calendly.com/you/anvil-intro (used on /contact/success)
  // Measurement ID from SITE.ga4 or PUBLIC_GA4 at build time. Empty means no analytics.
  ga4: process.env.PUBLIC_GA4 || '',
  posthog: '',   // TODO(launch): phc_...
  linkedinInsight: '', // TODO(launch): partner id
};
