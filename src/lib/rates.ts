/**
 * Parite reimbursement ranges. Only rows in public/rates.json are published.
 * Do not invent codes or pad missing payers.
 */
import raw from '../../public/rates.json';
import { stateNames as baseStateNames } from '../data/coverage';

export type RateRow = {
  state: string;
  code: string;
  payer?: string;
  low: number;
  high: number;
  median?: number;
  source?: string;
  effectiveFrom?: string;
};

export type RatesFile = {
  _readme: string;
  updated: string;
  source?: string;
  rates: RateRow[];
};

export const ratesFile = raw as RatesFile;
export const rateRows: RateRow[] = ratesFile.rates ?? [];

export const extraStateNames: Record<string, string> = {
  PR: 'Puerto Rico',
  VI: 'U.S. Virgin Islands',
};

export const rateStateNames: Record<string, string> = { ...baseStateNames, ...extraStateNames };

export const codeLabels: Record<string, string> = {
  '90837': '90837 Psychotherapy, 60 min',
  '90834': '90834 Psychotherapy, 45 min',
  '90791': '90791 Psychiatric diagnostic evaluation',
  '97153': '97153 ABA adaptive behavior treatment, 15 min',
};

/** Payer slugs as they appear in the Parite export. */
export const payerLabels: Record<string, string> = {
  medicare: 'Medicare (CMS PFS)',
  'medicaid-ffs': 'Medicaid FFS',
  uhc: 'UnitedHealthcare (TiC)',
};

const payerOrder = ['medicaid-ffs', 'medicare', 'uhc'];

export function payerLabel(payer?: string) {
  if (!payer) return 'Blended';
  return payerLabels[payer] ?? payer;
}

export function codeLabel(code: string) {
  return codeLabels[code] ?? code;
}

/** Anchor text on the rates hub: "{code} {short name} in {State}". */
export const codeAnchorNames: Record<string, string> = {
  '90791': 'psychiatric evaluation',
  '90834': 'psychotherapy 45 min',
  '90837': 'psychotherapy 60 min',
  '97153': 'ABA treatment 15 min',
};

export function codeAnchorName(code: string) {
  return codeAnchorNames[code] ?? codeLabel(code);
}

/** Service name without the leading code, for the rate-page first sentence. */
export function codeServiceName(code: string) {
  const label = codeLabel(code);
  return label.startsWith(`${code} `) ? label.slice(code.length).trim() : label;
}

const payerShortNames: Record<string, string> = {
  medicare: 'Medicare',
  'medicaid-ffs': 'Medicaid FFS',
  uhc: 'UnitedHealthcare',
};

/** Short payer name for hub intros. Does not invent a payer that is absent from the rows. */
export function shortPayerName(payer?: string) {
  if (!payer) return 'Blended';
  return payerShortNames[payer] ?? payerLabel(payer);
}

export function joinLabels(labels: string[]) {
  if (labels.length <= 1) return labels[0] ?? '';
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(', ')} and ${labels[labels.length - 1]}`;
}

/** Payer names actually present on these rows, in display order. */
export function payerNamesInRows(rows: RateRow[]) {
  const set = new Set(rows.map((r) => r.payer).filter((p): p is string => Boolean(p)));
  const ordered = payerOrder.filter((p) => set.has(p));
  const rest = [...set].filter((p) => !payerOrder.includes(p)).sort();
  return [...ordered, ...rest].map((p) => shortPayerName(p));
}

/**
 * Title rule: first option that fits in 60 characters.
 * Returned string is the full document title (no further suffix).
 */
export function ratePageTitle(code: string, name: string) {
  const branded = `CPT ${code} reimbursement rate in ${name} (2026) | Anvil`;
  if (branded.length <= 60) return branded;
  const plain = `CPT ${code} reimbursement rate in ${name} (2026)`;
  if (plain.length > 60) throw new Error(`Rate title over 60 chars (${plain.length}): ${plain}`);
  return plain;
}

export function ratePageDescription(code: string, name: string) {
  const description = `${code} reimbursement rate in ${name}: Medicaid FFS, Medicare PFS, and UHC TiC where present, from Parite. Planning ranges, not a guarantee.`;
  if (description.length > 155) throw new Error(`Rate meta over 155 chars (${description.length}): ${description}`);
  return description;
}

export function ratePageH1(code: string, name: string) {
  return `${code} reimbursement rate in ${name} by payer (2026)`;
}

export function stateName(state: string) {
  const st = state.toUpperCase();
  return rateStateNames[st] ?? st;
}

export function fmtRate(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** "$X" when the published low and high match, otherwise "$X to $Y". */
export function fmtRange(low: number, high: number) {
  return low === high ? fmtRate(low) : `${fmtRate(low)} to ${fmtRate(high)}`;
}

const coveragePayerOrder = ['medicare', 'uhc', 'medicaid-ffs'] as const;
const nonStateCodes = new Set(['DC', 'PR', 'VI']);

function statesFor(payer: string, code?: string) {
  const states = new Set<string>();
  for (const row of rateRows) {
    if (row.payer !== payer) continue;
    if (code && row.code !== code) continue;
    states.add(row.state);
  }
  return states;
}

/** "jurisdictions" when the set includes DC, PR, or VI. "states" otherwise. */
export function placeNoun(codes: Iterable<string>, n = [...codes].length) {
  const hasNonState = [...codes].some((code) => nonStateCodes.has(code.toUpperCase()));
  if (hasNonState) return n === 1 ? 'jurisdiction' : 'jurisdictions';
  return n === 1 ? 'state' : 'states';
}

/** Jurisdictions with both a Medicare and a Medicaid FFS row. above counts strict > on high. */
export function medicaidAboveMedicare(code: string) {
  const medicare = new Map<string, number>();
  const medicaid = new Map<string, number>();
  for (const row of rateRows) {
    if (row.code !== code) continue;
    if (row.payer === 'medicare') medicare.set(row.state, row.high);
    if (row.payer === 'medicaid-ffs') medicaid.set(row.state, row.high);
  }
  const both = [...medicaid.keys()].filter((state) => medicare.has(state));
  const above = both.filter((state) => (medicaid.get(state) ?? 0) > (medicare.get(state) ?? 0)).length;
  return { n: both.length, above, noun: placeNoun(both, both.length) };
}

/** Jurisdictions with both a Medicaid FFS and a UHC row. above counts strict > on high. */
export function medicaidAboveUhc(code: string) {
  const medicaid = new Map<string, number>();
  const uhc = new Map<string, number>();
  for (const row of rateRows) {
    if (row.code !== code) continue;
    if (row.payer === 'medicaid-ffs') medicaid.set(row.state, row.high);
    if (row.payer === 'uhc') uhc.set(row.state, row.high);
  }
  const both = [...medicaid.keys()].filter((state) => uhc.has(state));
  const above = both.filter((state) => (medicaid.get(state) ?? 0) > (uhc.get(state) ?? 0)).length;
  return { n: both.length, above, noun: placeNoun(both, both.length) };
}

/** Jurisdictions with both a Medicare and a UHC row. above counts strict > on high. */
export function uhcAboveMedicare(code: string) {
  const medicare = new Map<string, number>();
  const uhc = new Map<string, number>();
  for (const row of rateRows) {
    if (row.code !== code) continue;
    if (row.payer === 'medicare') medicare.set(row.state, row.high);
    if (row.payer === 'uhc') uhc.set(row.state, row.high);
  }
  const both = [...uhc.keys()].filter((state) => medicare.has(state));
  const above = both.filter((state) => (uhc.get(state) ?? 0) > (medicare.get(state) ?? 0)).length;
  return { n: both.length, above, noun: placeNoun(both, both.length) };
}

/** This jurisdiction's Medicare high against the other Medicare jurisdictions for the same code. */
export function medicarePeerRank(state: string, code: string) {
  const st = state.toUpperCase();
  const highs = new Map<string, number>();
  for (const row of rateRows) {
    if (row.payer !== 'medicare' || row.code !== code) continue;
    highs.set(row.state, row.high);
  }
  const high = highs.get(st);
  if (high == null) return undefined;
  const others = [...highs.keys()].filter((place) => place !== st);
  const m = others.filter((place) => high > (highs.get(place) ?? 0)).length;
  return { high, m, n: others.length, noun: placeNoun(others, others.length) };
}

/** Highest range is the highest high. Lowest range is the lowest high. Ties break on low, then state name. */
export function payerCodeSpread(payer: string, code: string) {
  const rows = rateRows.filter((row) => row.payer === payer && row.code === code);
  if (rows.length === 0) return undefined;
  const byName = (a: RateRow, b: RateRow) => stateName(a.state).localeCompare(stateName(b.state));
  const highest = [...rows].sort((a, b) => b.high - a.high || b.low - a.low || byName(a, b))[0];
  const lowest = [...rows].sort((a, b) => a.high - b.high || a.low - b.low || byName(a, b))[0];
  const places = rows.map((row) => row.state);
  return { n: rows.length, payerName: shortPayerName(payer), highest, lowest, noun: placeNoun(places, rows.length) };
}

export function payer90837Sentence(payer: string) {
  const spread = payerCodeSpread(payer, '90837');
  if (!spread) return '';
  const highAmount = fmtRange(spread.highest.low, spread.highest.high);
  const lowAmount = fmtRange(spread.lowest.low, spread.lowest.high);
  return `Among the ${spread.n} ${spread.noun} Parite publishes ${spread.payerName} 90837 for, the highest range is in ${stateName(spread.highest.state)} (${highAmount}) and the lowest is in ${stateName(spread.lowest.state)} (${lowAmount}).`;
}

/** Code-hub sentence. Payers with no rows are omitted. Only the first payer names jurisdictions or states. */
export function codePayerCoverageSentence(code: string) {
  const parts = coveragePayerOrder.flatMap((payer) => {
    const places = statesFor(payer, code);
    const n = places.size;
    return n > 0 ? [{ label: shortPayerName(payer), n, noun: placeNoun(places, n) }] : [];
  });
  if (parts.length === 0) return '';
  const bits = parts.map((part, i) => (i === 0 ? `${part.label} in ${part.n} ${part.noun}` : `${part.label} in ${part.n}`));
  const phrase = bits.length <= 1
    ? (bits[0] ?? '')
    : bits.length === 2
      ? `${bits[0]} and ${bits[1]}`
      : `${bits.slice(0, -1).join(', ')}, and ${bits[bits.length - 1]}`;
  return `Parite publishes ${code} ranges for ${phrase}.`;
}

/** Rates-hub sentence. The noun follows the first payer and is computed from that payer's places. */
export function payerFileStateSentence() {
  const parts = coveragePayerOrder.flatMap((payer) => {
    const places = statesFor(payer);
    const n = places.size;
    return n > 0 ? [{ label: shortPayerName(payer), n, noun: placeNoun(places, n) }] : [];
  });
  if (parts.length === 0) return '';
  const [first, ...rest] = parts;
  if (rest.length === 0) return `${first.label} ranges cover ${first.n} ${first.noun}.`;
  const last = rest[rest.length - 1];
  const middle = rest.slice(0, -1).map((part) => `${part.label} ${part.n}`).join(', ');
  const tail = middle ? `${middle} and ${last.label} ${last.n}` : `${last.label} ${last.n}`;
  return `${first.label} ranges cover ${first.n} ${first.noun}, ${tail}.`;
}

/** Same jurisdiction set for 90791, 90834, and 90837, or empty when the sets differ. */
export function allThreePayerCodeSentence() {
  const codes = ['90791', '90834', '90837'];
  const sets = codes.map((code) => {
    const places = ['medicare', 'medicaid-ffs', 'uhc'].map((payer) => statesFor(payer, code));
    const [first, ...rest] = places;
    return new Set([...first].filter((state) => rest.every((set) => set.has(state))));
  });
  const [first, ...rest] = sets;
  const same = rest.every((set) => set.size === first.size && [...first].every((state) => set.has(state)));
  if (!same || first.size === 0) return '';
  return `Medicare, Medicaid FFS and UHC ranges are all published for 90791, 90834 and 90837 in ${first.size} ${placeNoun(first, first.size)}.`;
}

export function codesInData() {
  return [...new Set(rateRows.map((r) => r.code))].sort();
}

export function servicesInData() {
  return codesInData().map((code) => ({ code, label: codeLabel(code) }));
}

export function ratePath(state: string, code: string) {
  return `/rates/${state.toLowerCase()}/${code}`;
}

export type RatePair = { state: string; code: string; rows: RateRow[] };

export function ratePairs(): RatePair[] {
  const map = new Map<string, RateRow[]>();
  for (const r of rateRows) {
    const k = `${r.state}|${r.code}`;
    const list = map.get(k) ?? [];
    list.push(r);
    map.set(k, list);
  }
  return [...map.entries()]
    .map(([k, rows]) => {
      const [state, code] = k.split('|');
      const sorted = [...rows].sort((a, b) => payerOrder.indexOf(a.payer ?? '') - payerOrder.indexOf(b.payer ?? '') || (a.payer ?? '').localeCompare(b.payer ?? ''));
      return { state, code, rows: sorted };
    })
    .sort((a, b) => a.state.localeCompare(b.state) || a.code.localeCompare(b.code));
}

export function pairRows(state: string, code: string) {
  const st = state.toUpperCase();
  return ratePairs().find((p) => p.state === st && p.code === code)?.rows ?? [];
}

/** Featured long-tail URLs for the hub. Only pairs that exist in the JSON. */
export const samplePairKeys: [string, string][] = [
  ['OH', '90837'],
  ['TX', '90837'],
  ['CA', '90834'],
  ['NY', '90791'],
  ['FL', '90837'],
  ['IN', '97153'],
];

export type RateJurisdiction = { state: string; name: string; pairs: RatePair[] };

/** One row per jurisdiction, for the crawlable all-states index. */
export function ratesByJurisdiction(): RateJurisdiction[] {
  const map = new Map<string, RatePair[]>();
  for (const pair of ratePairs()) {
    const list = map.get(pair.state) ?? [];
    list.push(pair);
    map.set(pair.state, list);
  }
  return [...map.entries()]
    .map(([state, pairs]) => ({
      state,
      name: stateName(state),
      pairs: [...pairs].sort((a, b) => a.code.localeCompare(b.code)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function ratePageCountSentence() {
  const pairs = ratePairs();
  const places = ratesByJurisdiction().map((jurisdiction) => jurisdiction.state);
  if (pairs.length === 0 || places.length === 0) return '';
  return `There are ${pairs.length} state and CPT code rate pages across ${places.length} ${placeNoun(places, places.length)}.`;
}

/** States that share a border. Used only to link a code page to the same code nearby. */
export const nearbyStates: Record<string, string[]> = {
  AK: [],
  AL: ['FL', 'GA', 'MS', 'TN'],
  AR: ['LA', 'MO', 'MS', 'OK', 'TN', 'TX'],
  AZ: ['CA', 'CO', 'NM', 'NV', 'UT'],
  CA: ['AZ', 'NV', 'OR'],
  CO: ['AZ', 'KS', 'NE', 'NM', 'OK', 'UT', 'WY'],
  CT: ['MA', 'NY', 'RI'],
  DC: ['MD', 'VA'],
  DE: ['MD', 'NJ', 'PA'],
  FL: ['AL', 'GA'],
  GA: ['AL', 'FL', 'NC', 'SC', 'TN'],
  HI: [],
  IA: ['IL', 'MN', 'MO', 'NE', 'SD', 'WI'],
  ID: ['MT', 'NV', 'OR', 'UT', 'WA', 'WY'],
  IL: ['IA', 'IN', 'KY', 'MO', 'WI'],
  IN: ['IL', 'KY', 'MI', 'OH'],
  KS: ['CO', 'MO', 'NE', 'OK'],
  KY: ['IL', 'IN', 'MO', 'OH', 'TN', 'VA', 'WV'],
  LA: ['AR', 'MS', 'TX'],
  MA: ['CT', 'NH', 'NY', 'RI', 'VT'],
  MD: ['DC', 'DE', 'PA', 'VA', 'WV'],
  ME: ['NH'],
  MI: ['IN', 'OH', 'WI'],
  MN: ['IA', 'ND', 'SD', 'WI'],
  MO: ['AR', 'IA', 'IL', 'KS', 'KY', 'NE', 'OK', 'TN'],
  MS: ['AL', 'AR', 'LA', 'TN'],
  MT: ['ID', 'ND', 'SD', 'WY'],
  NC: ['GA', 'SC', 'TN', 'VA'],
  ND: ['MN', 'MT', 'SD'],
  NE: ['CO', 'IA', 'KS', 'MO', 'SD', 'WY'],
  NH: ['MA', 'ME', 'VT'],
  NJ: ['DE', 'NY', 'PA'],
  NM: ['AZ', 'CO', 'OK', 'TX', 'UT'],
  NV: ['AZ', 'CA', 'ID', 'OR', 'UT'],
  NY: ['CT', 'MA', 'NJ', 'PA', 'VT'],
  OH: ['IN', 'KY', 'MI', 'PA', 'WV'],
  OK: ['AR', 'CO', 'KS', 'MO', 'NM', 'TX'],
  OR: ['CA', 'ID', 'NV', 'WA'],
  PA: ['DE', 'MD', 'NJ', 'NY', 'OH', 'WV'],
  PR: [],
  RI: ['CT', 'MA'],
  SC: ['GA', 'NC'],
  SD: ['IA', 'MN', 'MT', 'ND', 'NE', 'WY'],
  TN: ['AL', 'AR', 'GA', 'KY', 'MO', 'MS', 'NC', 'VA'],
  TX: ['AR', 'LA', 'NM', 'OK'],
  UT: ['AZ', 'CO', 'ID', 'NM', 'NV', 'WY'],
  VA: ['DC', 'KY', 'MD', 'NC', 'TN', 'WV'],
  VI: [],
  VT: ['MA', 'NH', 'NY'],
  WA: ['ID', 'OR'],
  WI: ['IA', 'IL', 'MI', 'MN'],
  WV: ['KY', 'MD', 'OH', 'PA', 'VA'],
  WY: ['CO', 'ID', 'MT', 'NE', 'SD', 'UT'],
};

/** Neighboring jurisdictions that have a state hub, sorted by name. Uses nearbyStates only. */
export function nearbyHubs(state: string): RateJurisdiction[] {
  const want = new Set((nearbyStates[state.toUpperCase()] ?? []).map((s) => s.toUpperCase()));
  return ratesByJurisdiction().filter((j) => want.has(j.state));
}

export function stateHubPath(state: string) {
  return `/rates/${state.toLowerCase()}`;
}

export function codeHubPath(code: string) {
  return `/rates/code/${code}`;
}

export function stateHubH1(name: string) {
  return `${name} therapy reimbursement rates by CPT code`;
}

/** Title stem. BaseLayout adds " | Anvil". Full H1 may be longer than 60. */
export function stateHubTitle(name: string) {
  const full = stateHubH1(name);
  if (`${full} | Anvil`.length <= 60) return full;
  const mid = `${name} therapy reimbursement rates`;
  if (`${mid} | Anvil`.length <= 60) return mid;
  const short = `${name} reimbursement rates`;
  if (`${short} | Anvil`.length > 60) throw new Error(`State hub title over 60: ${short}`);
  return short;
}

export function stateHubDescription(name: string, includeAba = false) {
  const description = includeAba
    ? `${name} therapy, psychotherapy and ABA (97153) reimbursement rates by CPT code, from Parite. Planning ranges, not a guarantee of payment.`
    : `${name} therapy and psychotherapy reimbursement rates by CPT code, from Parite. Planning ranges, not a guarantee of payment.`;
  if (description.length > 155) throw new Error(`State hub meta over 155 (${description.length}): ${description}`);
  return description;
}

export type PayerHub = {
  slug: string;
  payer: string;
  title: string;
  h1: string;
  description: string;
};

/** Payer hubs. Slugs are routes; payer values match rates.json. */
export const payerHubs: PayerHub[] = [
  {
    slug: 'medicare',
    payer: 'medicare',
    title: 'Medicare psychotherapy rates by state (2026)',
    h1: 'Medicare psychotherapy rates by state (2026)',
    description: 'Medicare psychotherapy rates by state for 2026, including the Medicare 90837 rate. Planning ranges from Parite, not a guarantee of payment.',
  },
  {
    slug: 'uhc',
    payer: 'uhc',
    title: 'UnitedHealthcare therapy rates by state (2026)',
    h1: 'UnitedHealthcare therapy rates by state (2026)',
    description: 'UnitedHealthcare therapy rates by state for 2026, including the UnitedHealthcare 90837 rate. Planning ranges from Parite, not a guarantee of payment.',
  },
  {
    slug: 'medicaid',
    payer: 'medicaid-ffs',
    title: 'Medicaid psychotherapy rates by state (2026)',
    h1: 'Medicaid psychotherapy rates by state (2026)',
    description: 'Medicaid psychotherapy rates by state for 2026, including the Medicaid 90837 rate. Planning ranges from Parite, not a guarantee of payment.',
  },
];

export function payerHubBySlug(slug: string) {
  return payerHubs.find((hub) => hub.slug === slug);
}

export function payerHubPath(payer?: string) {
  const hub = payerHubs.find((item) => item.payer === payer);
  return hub ? `/rates/payer/${hub.slug}` : undefined;
}

/** Anchor text for payer-hub links. Matches the /rates sentence. */
export const payerHubLinkLabel: Record<string, string> = {
  medicare: 'Medicare',
  'medicaid-ffs': 'Medicaid',
  uhc: 'UnitedHealthcare',
};

const payerHubLinkOrder = ['medicare', 'medicaid-ffs', 'uhc'];

/** Payer hubs that have at least one of these rows. Skips a payer with no row. */
export function payerHubsForRows(rows: { payer?: string }[]) {
  const set = new Set(rows.map((row) => row.payer).filter((payer): payer is string => Boolean(payer)));
  return payerHubLinkOrder
    .filter((payer) => set.has(payer))
    .map((payer) => payerHubs.find((hub) => hub.payer === payer))
    .filter((hub): hub is PayerHub => Boolean(hub));
}

/** One payer's rows, low to high, then state and code. Only rows that exist. */
export function rowsForPayer(payer: string) {
  return rateRows
    .filter((row) => row.payer === payer)
    .sort((a, b) => a.low - b.low || a.high - b.high || stateName(a.state).localeCompare(stateName(b.state)) || a.code.localeCompare(b.code));
}

const faqPayerNames: Record<string, string> = {
  medicare: 'Medicare',
  'medicaid-ffs': 'Medicaid',
  uhc: 'UnitedHealthcare',
};

/** One question per existing payer row. Missing payers are omitted. */
export function rateFaqs(code: string, state: string, rows: RateRow[]) {
  const name = stateName(state);
  return rows.map((row) => {
    const who = faqPayerNames[row.payer ?? ''] ?? shortPayerName(row.payer);
    const low = fmtRate(row.low);
    const high = fmtRate(row.high);
    const amount = low === high ? `is ${low} per unit` : `is ${low} to ${high} per unit`;
    return {
      q: `What is the ${who} reimbursement rate for ${code} in ${name}?`,
      a: `The ${who} reimbursement rate for ${code} in ${name} ${amount}. These are planning ranges from Parite, not a guarantee of payment.`,
    };
  });
}

export function codeHubTitle(code: string) {
  const stem = `${code} reimbursement rates by state`;
  if (`${stem} | Anvil`.length > 60) throw new Error(`Code hub title over 60: ${stem}`);
  return stem;
}

export function codeHubH1(code: string) {
  return `${code} reimbursement rates by state`;
}

export function codeHubDescription(code: string) {
  const phrase = joinLabels(payerNamesInRows(rateRows.filter((r) => r.code === code)));
  const description = `${code} reimbursement rates by state from Parite: ${phrase} where published. Planning ranges, not a guarantee.`;
  if (description.length > 155) throw new Error(`Code hub meta over 155 (${description.length}): ${description}`);
  return description;
}

export function pairsForState(state: string) {
  const st = state.toUpperCase();
  return ratePairs().filter((p) => p.state === st);
}

export function pairsForCode(code: string) {
  return ratePairs().filter((p) => p.code === code).sort((a, b) => stateName(a.state).localeCompare(stateName(b.state)));
}

export function nearbyPairs(state: string, code: string) {
  const want = new Set((nearbyStates[state.toUpperCase()] ?? []).map((s) => s.toUpperCase()));
  return ratePairs()
    .filter((p) => p.code === code && want.has(p.state))
    .sort((a, b) => stateName(a.state).localeCompare(stateName(b.state)));
}

function assertRateSeo() {
  const pairs = ratePairs();
  const paths = new Set<string>();
  for (const pair of pairs) {
    const name = stateName(pair.state);
    const title = ratePageTitle(pair.code, name);
    const description = ratePageDescription(pair.code, name);
    if (title.length > 60) throw new Error(`Rate title over 60 (${title.length}): ${title}`);
    if (description.length > 155) throw new Error(`Rate meta over 155 (${description.length}): ${description}`);
    if (/[—–]/.test(title) || /[—–]/.test(description)) throw new Error(`Dash in rate SEO for ${pair.state} ${pair.code}`);
    paths.add(ratePath(pair.state, pair.code));
  }
  if (paths.size !== pairs.length) throw new Error(`Expected ${pairs.length} unique rate paths, got ${paths.size}`);
  for (const j of ratesByJurisdiction()) {
    const title = `${stateHubTitle(j.name)} | Anvil`;
    const includeAba = j.pairs.some((pair) => pair.code === '97153');
    const description = stateHubDescription(j.name, includeAba);
    if (title.length > 60) throw new Error(`State hub title over 60 (${title.length}): ${title}`);
    if (/[—–]/.test(title) || /[—–]/.test(description) || /[—–]/.test(stateHubH1(j.name))) throw new Error(`Dash in state hub SEO for ${j.state}`);
    const listed = new Set(j.pairs.map((p) => ratePath(p.state, p.code)));
    const expected = new Set(pairsForState(j.state).map((p) => ratePath(p.state, p.code)));
    if (listed.size !== expected.size || [...expected].some((path) => !listed.has(path))) {
      throw new Error(`State hub ${j.state} does not list every code page`);
    }
  }
  for (const code of codesInData()) {
    const title = `${codeHubTitle(code)} | Anvil`;
    const description = codeHubDescription(code);
    if (title.length > 60) throw new Error(`Code hub title over 60 (${title.length}): ${title}`);
    if (/[—–]/.test(title) || /[—–]/.test(description)) throw new Error(`Dash in code hub SEO for ${code}`);
  }
  for (const hub of payerHubs) {
    const title = `${hub.title} | Anvil`;
    const rows = rowsForPayer(hub.payer);
    if (title.length > 60) throw new Error(`Payer hub title over 60 (${title.length}): ${title}`);
    if (hub.description.length > 155) throw new Error(`Payer hub meta over 155 (${hub.description.length}): ${hub.description}`);
    if (rows.length === 0) throw new Error(`Payer hub ${hub.slug} has no rates.json rows`);
    if (!rows.some((row) => row.code === '90837')) throw new Error(`Payer hub ${hub.slug} has no 90837 row`);
    if (/[—–]/.test(title) || /[—–]/.test(hub.h1) || /[—–]/.test(hub.description)) throw new Error(`Dash in payer hub SEO for ${hub.slug}`);
    const spreadSentence = payer90837Sentence(hub.payer);
    if (!spreadSentence) throw new Error(`Payer hub ${hub.slug} has no 90837 spread sentence`);
    if (/[—–]/.test(spreadSentence)) throw new Error(`Dash in 90837 spread for ${hub.slug}`);
  }
  for (const code of codesInData()) {
    const coverage = codePayerCoverageSentence(code);
    if (!coverage) throw new Error(`Code hub ${code} has no payer coverage sentence`);
    if (/[—–]/.test(coverage)) throw new Error(`Dash in code coverage for ${code}`);
  }
  const fileSentence = payerFileStateSentence();
  if (/[—–]/.test(fileSentence)) throw new Error('Dash in payer file state sentence');
  for (const pair of pairs) {
    for (const faq of rateFaqs(pair.code, pair.state, pair.rows)) {
      if (/[—–]/.test(faq.q) || /[—–]/.test(faq.a)) throw new Error(`Dash in rate FAQ for ${pair.state} ${pair.code}`);
    }
    if (rateFaqs(pair.code, pair.state, pair.rows).length !== pair.rows.length) {
      throw new Error(`FAQ count does not match payer rows for ${pair.state} ${pair.code}`);
    }
  }
}

assertRateSeo();

export function samplePairs(): RatePair[] {
  const all = ratePairs();
  return samplePairKeys.map(([state, code]) => all.find((p) => p.state === state && p.code === code)).filter((p): p is RatePair => !!p);
}

/** Highest-search 90837 state pages. Only pairs that exist in the JSON. */
export const longTail90837Keys: [string, string][] = [
  ['OH', '90837'],
  ['CA', '90837'],
  ['TX', '90837'],
  ['NY', '90837'],
  ['FL', '90837'],
  ['IL', '90837'],
  ['PA', '90837'],
  ['WA', '90837'],
];

export function longTail90837Pairs(): RatePair[] {
  const all = ratePairs();
  return longTail90837Keys.map(([state, code]) => all.find((p) => p.state === state && p.code === code)).filter((p): p is RatePair => !!p);
}

export function sourcesOnPage(rows: RateRow[]) {
  return [...new Set(rows.map((r) => r.source).filter(Boolean))] as string[];
}
