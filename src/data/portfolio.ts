/** Care companies operated by the Anvil team (Arche Studios). Shown with the label "Operated by our team". */
export type PortfolioCo = { name: string; model: string; specialty: string; payers: string };

export const portfolio: PortfolioCo[] = [
  { name: 'Third Space', model: 'Virtual, multi-state', specialty: 'Behavioral health', payers: 'Medicaid, commercial' },
  { name: 'Clearview', model: 'Virtual and hybrid', specialty: 'Behavioral health', payers: 'Commercial, Medicaid' },
  { name: 'Sway', model: 'Virtual', specialty: 'Behavioral health', payers: 'Commercial' },
  { name: 'Novamind', model: 'In-person', specialty: 'Interventional psychiatry', payers: 'Commercial, MA' },
  { name: 'Luna', model: 'In-home and clinic', specialty: 'ABA', payers: 'Medicaid, commercial' },
  { name: 'Stoa', model: 'School-based', specialty: 'Speech-language pathology', payers: 'Medicaid' },
  { name: 'MPL', model: 'Hybrid', specialty: 'Behavioral health', payers: 'Commercial' },
];

// TODO(launch): confirm each company's model/specialty/payer line and add the remaining portfolio companies.
export const portfolioAggregate = {
  companies: 11,
  statesLabel: 'multiple states', // TODO(launch): real count
  specialtiesLabel: 'six specialties', // TODO(launch): real count
};
