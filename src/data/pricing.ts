/**
 * Published pricing. Publishing real numbers is a deliberate differentiator.
 * Foundry PC numbers are real (formation $15,000 one-time; physician owner $3,000/mo).
 * TODO(launch): confirm platform fee percentages and state-count tiers with the Foundry/Homefront rate cards.
 */
export type Tier = {
  key: 'launch' | 'build' | 'scale';
  name: string;
  tagline: string;
  platformFeePct: number; // % of collections during rental phase
  monthly: number;        // flat monthly (PC + physician owner where applicable)
  oneTime: number;        // one-time program fee
  includes: string[];
  bestFor: string;
  cta: string;
  featured?: boolean;
};

export const tiers: Tier[] = [
  {
    key: 'launch',
    name: 'Launch',
    tagline: 'Bill in-network on our 50-state PC in weeks.',
    platformFeePct: 8,
    monthly: 0,
    oneTime: 5000,
    includes: [
      'Roster-add your clinicians under our payer contracts',
      'Real-time eligibility at booking (API and hosted widget)',
      'Coding, claims, denials, and AR under our PC',
      'Contracted rate and platform fee reported separately',
      'We carry claims risk during the rental phase',
    ],
    bestFor: 'Cash-pay companies going in-network for the first time',
    cta: 'Start on Launch',
  },
  {
    key: 'build',
    name: 'Build',
    tagline: 'Launch, plus your own PC and physician owner.',
    platformFeePct: 8,
    monthly: 3000,
    oneTime: 15000,
    includes: [
      'Everything in Launch',
      'Your own PC formed in your launch states (Foundry PC)',
      'Friendly physician owner placed and matched ($3,000/mo)',
      'MSO and PC document suite, CPOM structuring by state',
      'Credentialing files built under your own entity',
    ],
    bestFor: 'Companies that want the asset on their balance sheet',
    cta: 'Start on Build',
    featured: true,
  },
  {
    key: 'scale',
    name: 'Scale',
    tagline: 'Build, plus contracting your entity and migrating volume.',
    platformFeePct: 6,
    monthly: 3000,
    oneTime: 15000,
    includes: [
      'Everything in Build',
      'Payer contracting for your entity, commercial, Medicaid, MA',
      'Volume migration from our PC to yours, no revenue gap',
      'Rate management and renewals on your contracts',
      'Platform fee steps down as volume moves to your PC',
    ],
    bestFor: 'Multi-state groups and companies switching off a rental vendor',
    cta: 'Talk to us about Scale',
  },
];

export const pricingNotes = [
  'Platform fee is charged on collections during the rental phase and steps down as claims move to your own contracts.',
  'One-time fees cover formation and program setup. State filing, publication, and registered agent fees pass through at cost.',
  'Adding states to your own PC is $360 per state (foreign qualification) plus filing fees. States that require a separately formed entity are quoted individually.',
  'Monthly components carry a 12-month minimum.',
];

export const expansionPerState = 360;
