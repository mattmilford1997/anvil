// Single source of truth for brand + URL. Change here, everything follows.
export const SITE = {
  name: 'Anvil',
  legalName: 'Catalyze Care LLC d/b/a Anvil', // TODO(launch): confirm entity name with counsel
  tagline: 'Insurance infrastructure for care companies',
  // Production domain: anvilcontracts.com (DNS at Netlify). Override with SITE_URL if needed.
  url: process.env.SITE_URL || 'https://www.anvilcontracts.com',
  docsUrl: 'https://docs.anvilcontracts.com',      // TODO(launch): Fern/Mintlify docs host — subdomain not live yet
  trustUrl: 'https://trust.anvilcontracts.com',    // TODO(launch): Vanta/Drata trust center — subdomain not live yet
  loginUrl: 'https://app.homefront.health',  // TODO(launch): confirm Homefront portal URL
  linkedin: 'https://www.linkedin.com/company/anvil', // TODO(launch): company page URL
  contactEmail: 'hello@anvilcontracts.com',        // TODO(launch): mailbox on the production domain
  parentBrands: ['Foundry PC', 'Homefront', 'Arche Studios'],
  calendly: '',  // TODO(launch): e.g. https://calendly.com/you/anvil-intro (used on /contact/success)
  ga4: '',       // TODO(launch): G-XXXXXXX
  posthog: '',   // TODO(launch): phc_...
  linkedinInsight: '', // TODO(launch): partner id
};
