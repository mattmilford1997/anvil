import { SITE } from '../../site.config.mjs';

export type NavLink = { label: string; href: string; desc?: string; external?: boolean };
export type NavGroup = { label: string; href?: string; items?: NavLink[] };

export const platformItems: NavLink[] = [
  { label: 'How it works', href: '/platform', desc: 'Rent, then own. The five workstreams.' },
  { label: 'Eligibility', href: '/platform/eligibility', desc: 'Real-time checks at booking, by API.' },
  { label: 'Credentialing', href: '/platform/credentialing', desc: 'Enrollment under our contracts, then yours.' },
  { label: 'Contracting', href: '/platform/contracting', desc: 'Payer contracts for your entity. Rates you can see.' },
  { label: 'RCM', href: '/platform/rcm', desc: 'Coding, claims, denials, AR.' },
  { label: 'Compliance', href: '/platform/compliance', desc: 'Structure, CPOM, safe harbor, security.' },
];

export const solutionItems: NavLink[] = [
  { label: 'Virtual care', href: '/solutions/virtual-care', desc: 'Cash-pay going multi-state insurance.' },
  { label: 'Behavioral health', href: '/solutions/behavioral-health', desc: 'Psychiatry, therapy, ABA, IOP, Medicaid.' },
  { label: 'Hybrid and in-person', href: '/solutions/hybrid-care', desc: 'In-home, interventional, school-based.' },
  { label: 'Switching vendors', href: '/solutions/switching', desc: 'Move off a network rental with no revenue gap.' },
];

export const mainNav: NavGroup[] = [
  { label: 'Platform', items: platformItems },
  { label: 'Solutions', items: solutionItems },
  { label: 'Own Your Contracts', href: '/own-your-contracts' },
  { label: 'Rates', href: '/rates' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
  { label: 'Docs', href: SITE.docsUrl },
  { label: 'Company', href: '/company' },
];

export const footerNav: { title: string; items: NavLink[] }[] = [
  { title: 'Platform', items: platformItems.map(({ label, href }) => ({ label, href })) },
  { title: 'Solutions', items: [...solutionItems.map(({ label, href }) => ({ label, href })), { label: 'Health plans', href: '/health-plans' }] },
  {
    title: 'Resources',
    items: [
      { label: 'Own your contracts', href: '/own-your-contracts' },
      { label: 'Rates by state', href: '/rates' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Blog and guides', href: '/resources' },
      { label: 'API docs', href: SITE.docsUrl },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/company' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'Trust center', href: SITE.trustUrl },
      { label: 'BAA', href: '/legal/baa' },
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Terms', href: '/legal/terms' },
    ],
  },
];
