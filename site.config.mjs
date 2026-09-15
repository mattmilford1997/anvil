// Single source of truth for brand + URL. Change here, everything follows.
export const SITE = {
  name: 'Anvil',
  legalName: 'Catalyze Care LLC d/b/a Anvil', // TODO(launch): confirm entity name with counsel
  tagline: 'Insurance infrastructure for care companies',
  // TODO(launch): replace with the purchased domain. Netlify sets process.env.URL at build.
  url: process.env.SITE_URL || 'https://www.getanvil.com',
  docsUrl: 'https://docs.getanvil.com',      // TODO(launch): Fern/Mintlify docs host
  trustUrl: 'https://trust.getanvil.com',    // TODO(launch): Vanta/Drata trust center
  loginUrl: 'https://app.homefront.health',  // TODO(launch): confirm Homefront portal URL
  linkedin: 'https://www.linkedin.com/company/anvil', // TODO(launch): company page URL
  contactEmail: 'hello@getanvil.com',        // TODO(launch)
  parentBrands: ['Foundry PC', 'Homefront', 'Arche Studios'],
  calendly: '',  // TODO(launch): e.g. https://calendly.com/you/anvil-intro (used on /contact/success)
  ga4: '',       // TODO(launch): G-XXXXXXX
  posthog: '',   // TODO(launch): phc_...
  linkedinInsight: '', // TODO(launch): partner id
};
