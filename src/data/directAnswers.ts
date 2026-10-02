/**
 * Direct-answer blocks from the Sep 30 copy queue.
 * Visible paragraphs and FAQ answers import these strings so FAQPage JSON-LD matches the page.
 * California CPOM (p10) is omitted pending counsel review.
 * Do not add "Own the contracts by year one" or "typically 6 to 18 months" here.
 */

export const p01 =
  "Anvil is a Bridge alternative for virtual care companies that want to own their payer contracts. Anvil launches your clinicians in-network on a credentialed 50-state professional corporation, then forms your own PC in parallel and moves volume to payer contracts in your entity's name. With network rental the vendor holds the contracts; with Anvil they end up with you.";

export const p08 =
  "Bridge is a network rental vendor: the vendor holds the payer contracts and you bill under an entity it controls. Owning means the contracts sit in your own PC and stay with you if you switch vendors. Anvil uses rental only to launch, then migrates your volume payer by payer to contracts in your entity's name.";

export const bridgeLeaveAnswer =
  "Contracts in your own professional corporation stay with you if you leave. Under network rental the vendor holds the payer contracts, so leaving without contracts in your name is a relaunch.";

export const bridgePriceAnswer =
  "Anvil publishes pricing: a platform fee on collections during rental, plus fixed fees for your own PC and physician owner. The fee steps down as volume moves to contracts you own. Model Anvil on the pricing page, then send us your numbers for a side-by-side.";

export const p02 =
  "To own your payer contracts, form your own professional corporation with a physician owner, then file payer contract applications in that PC's name. Anvil runs this in parallel while you bill on our credentialed PC, then moves each payer's volume to your entity as its contract becomes effective. The contracts stay with your PC if you switch vendors.";

export const p14 =
  "Network rental means you bill insurance under a vendor's professional corporation and its payer contracts. It is a fast way to launch. The risk is that you never hold the contracts: the vendor can end your network access, and investors will ask whether your insured revenue runs through an entity you control. Anvil rents to launch, then migrates you.";

export const p04 =
  "Do both, in order. Renting a PC gets you billing in weeks because the payer contracts already exist. Building your own PC is how you end up owning the contracts, but new commercial contracts commonly take 4 to 8 months. Anvil launches you on our PC and forms yours in parallel, so building never delays revenue.";

export const vendorOwnsAnswer =
  "It depends on the model. Network rental means the vendor's professional corporation (PC) holds the payer contracts and you bill under an entity you do not control. Anvil launches you on our credentialed PC, then files applications in your own PC's name. The contracts that land in your PC stay with your PC if you switch vendors.";

export const p06 =
  "The fastest path is joining payer contracts that already exist. Anvil operates a credentialed 50-state professional corporation with payer contracts in place, so your clinicians are added as a roster change in weeks, not the months a new contract takes. In parallel, Anvil contracts your own entity with payers so you own the network over time.";

export const p03 =
  "Most telehealth startups should launch insurance billing on an existing credentialed group, then build their own. Anvil adds your clinicians to a 50-state professional corporation's payer contracts as a roster change, runs eligibility, claims, and denials, and forms your own PC at the same time so insured revenue ends up under an entity you control.";

export const p07 =
  "Start accepting insurance when your board is asking about addressable market or competitors in your category already take insurance. Begin in the 3 to 5 states with the most covered lives among your patients and clinicians, keep cash pay as the fallback, and form your own PC in parallel so the insured revenue becomes an asset.";

export const p12 =
  "It depends on whose contracts you bill under. Adding clinicians to an existing group's payer contracts typically takes weeks. Contracting a new entity commonly takes 4 to 8 months for commercial payers, and full credentialing runs 90 to 120 days per payer when unmanaged. Anvil starts you on the first path and builds the second in parallel.";

export const cashPayToInNetworkAnswer =
  "Pick the 3 to 5 states with the most covered lives among your patients and clinicians. We roster-add those clinicians under our contracts, turn on eligibility at booking, and keep cash-pay as the fallback path. Your own PC forms in the same states at the same time.";

export const p05 =
  "An MSO-PC structure splits a care company into a physician-owned professional corporation that delivers and bills care and a management services organization that founders and investors own. Many states' corporate practice of medicine rules require it when non-physicians own the business. Anvil structures your PC for each state's rules, with counsel reviewing every structure.";

export const aksSafeHarborAnswer =
  "It is structured to align with the personal services and management contracts safe harbor under the federal Anti-Kickback Statute: written agreements, terms of at least a year, compensation set in advance at fair market value, and not tied to the volume or value of referrals. Independent counsel reviews every structure. Anvil does not claim an OIG advisory opinion.";

export const p09 =
  "On Anvil, pricing is published. While you bill under our PC, you pay a platform fee on collections, not billed charges, and roster-adds are included. Building your own PC adds fixed fees, including a physician owner at $3,000 per month with a 12-month minimum. Payer contracting and credentialing for your entity are included in the tiers.";

export const p11 =
  "Look for a payer contracting company that files in your entity's name and shows you the rate before you sign. Anvil runs commercial and Medicaid payer contracting for virtual care companies: applications, rate proposals, redlines, and renewals for your own PC, while you bill on our credentialed 50-state PC so contracting never gates revenue.";

export const p13 =
  "Medicaid behavioral health runs through managed care organizations, each with its own panels and enrollment, so it is worked state by state. Anvil does Medicaid MCO enrollment and contracting per state, closed-panel exception paths included, plus psychiatry credentialing across states and ABA authorizations. Clinicians can bill on our PC while your own panels come through.";

export const switchWithoutGapAnswer =
  "Keep billing through your current vendor until each of your own contracts is effective, so there is no revenue gap. Form your professional corporation, file contract applications in your name, and move volume payer by payer as each contract is effective, then give notice. Remaining payers can run through Anvil's rented PC. If your current agreement allows, new states can run on our PC during the switch.";

export const credentialingServicesAnswer =
  "For a multi-state clinician network, roster-adds under existing contracts typically take weeks, and full enrollment under a new entity is commonly 90 to 120 days per payer when unmanaged. Anvil does the roster-add for speed and full enrollment under your own professional corporation for ownership, and tracks every file per clinician and per payer.";

export const eligibilityApiAnswer =
  "A soft check at booking uses name, date of birth, and payer and returns coverage, plan, and an estimated copay. When a payer endpoint fails, the API returns a distinct outage status instead of not covered, so booking can continue and the check can run again before the visit. The public API reference is not published yet.";
