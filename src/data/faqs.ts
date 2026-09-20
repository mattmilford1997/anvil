export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  { q: 'What is insurance billing infrastructure for virtual care?', a: 'The stack that lets a care company get in-network nationally and bill insurance in all 50 states: payer contracting, credentialing, eligibility, claims, and compliance. Anvil is that stack as a payer contracting platform. You launch on our PC, then own the contracts.' },
  { q: 'How can we be in-network nationally in weeks?', a: 'Because the contracts already exist. Anvil operates a credentialed 50-state professional corporation with payer contracts in place. Your clinicians are added to those contracts as a roster change, which takes weeks, not the quarters a new contract takes.' },
  { q: 'Who owns the payer contracts?', a: 'During the rental phase, Anvil\'s PC holds them. From day one we also form your own PC, place a physician owner, and contract your entity with payers. As those come live, volume moves to your PC and the contracts, rates, and relationships are yours.' },
  { q: 'Can we see what we will be paid?', a: 'Yes. Before you sign, you can look up what payers pay for your codes by state. During the rental phase, statements show the contracted rate and the platform fee as separate lines.' },
  { q: 'Do you work with Medicaid?', a: 'Yes. Medicaid managed care enrollment and contracting, state by state, is part of the platform, and Medicaid contracting for your own entity is included in the Scale tier.' },
  { q: 'Is the structure compliant?', a: 'The rental phase is structured to align with the personal services and management contracts safe harbor under the federal Anti-Kickback Statute, with fees set in advance at fair market value. On top of that we structure your own PC for each state\'s corporate practice of medicine rules, which federal guidance does not address. Counsel reviews every structure.' },
  { q: 'What does it cost?', a: 'Pricing is published. A platform fee on collections during rental, plus fixed one-time and monthly fees for your own PC and physician owner. See the pricing page.' },
  { q: 'Is Anvil a Bridge alternative?', a: 'Yes. Bridge is a network rental vendor. Anvil is a Bridge alternative that launches you on a rented PC, then migrates volume so you own your payer contracts. The side-by-side is on the Anvil vs Bridge page.' },
];

export const ownFaqs: Faq[] = [
  { q: 'What does it mean to own your payer contracts?', a: 'The participation agreements sit in an entity you control, with portable payer contracts and billing under your own entity. Network rental vs owning contracts is the difference between a lease fee and an asset you can take to diligence or a sale. Anvil launches you on rental, then migrates you.' },
  { q: 'Why would I want to own contracts? Isn\'t that the work I am outsourcing?', a: 'You outsource the work, not the asset. Anvil does the contracting for your entity. You end up with a company that holds its own payer relationships when you raise or sell.' },
  { q: 'Does building my own PC slow down the launch?', a: 'No. It runs in parallel and never gates your go-live. You bill through our PC first and through yours as each contract comes live.' },
  { q: 'How long does the migration take?', a: 'Typically 6 to 18 months depending on states and payers. Commercial contracts for a new entity often land in 4 to 8 months. Medicaid managed care varies by state.' },
  { q: 'What happens to claims in flight during migration?', a: 'Nothing changes for them. Claims billed under our PC are paid to our PC and remitted to you. New visits are routed to your PC once its contract with that payer is effective.' },
  { q: 'What do we end up with?', a: 'Your own PC, a physician owner under a friendly-PC structure, executed MSO and PC agreements, payer contracts in your entity\'s name, credentialing files for each clinician, and the rate history.' },
  { q: 'What if we leave Anvil after migration?', a: 'The contracts stay with your PC. Your MSO agreement with your PC stays in place. You would need an RCM and credentialing vendor, which is a normal vendor switch, not a relaunch.' },
  { q: 'What will investors ask?', a: 'Whether insured revenue runs through an entity you control, whether payer contracts are assignable or would need to be re-signed in a sale, and whether a single vendor could terminate your network access. Owning your PC answers all three.' },
  { q: 'Does the platform fee change?', a: 'Yes. It steps down as volume moves to your own contracts, because we are no longer carrying claims risk on that volume.' },
  { q: 'Is a friendly physician owner really mine?', a: 'The physician owns the PC under agreements that give your MSO the management rights and economics permitted in that state. Foundry PC has placed physician owners in these structures across the country.' },
  { q: 'Can we start with Build and add Scale later?', a: 'Yes. Most companies start on Build so the PC is forming while they launch, then move to Scale when they are ready to contract their entity.' },
];

export const pricingFaqs: Faq[] = [
  { q: 'What is telehealth billing platform pricing?', a: 'On Anvil it is a published platform fee on collections during rental, plus fixed fees for your own PC and physician owner. Payer contracting cost and credentialing cost per clinician are included in the tiers, not billed as surprise line items. The rental PC fee is the platform fee while you bill under our PC.' },
  { q: 'Why publish pricing?', a: 'Because you should be able to model this without a sales call. Most vendors in this category do not publish, which usually means the number depends on who is asking.' },
  { q: 'What is the platform fee charged on?', a: 'Collections, not billed charges. If a claim is not paid, there is no fee on it.' },
  { q: 'What does the physician owner fee cover?', a: 'A licensed physician who owns your PC under the friendly-PC structure, matched by Foundry PC, with the agreements and ongoing obligations that structure requires. $3,000 per month, 12-month minimum.' },
  { q: 'Are there per-clinician credentialing fees?', a: 'Roster-adds under our PC are included in the platform fee. Credentialing under your own entity is included in Build and Scale.' },
  { q: 'What is not included?', a: 'State filing, publication, and registered agent fees, which pass through at cost. Clearinghouse fees above our included volume. Legal work outside the standard document suite.' },
];
