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
  const branded = `${code} reimbursement rate in ${name} by payer (2026) | Anvil`;
  if (branded.length <= 60) return branded;
  const mid = `${code} reimbursement rate in ${name} by payer (2026)`;
  if (mid.length <= 60) return mid;
  const short = `${code} reimbursement rate in ${name} (2026)`;
  if (short.length > 60) throw new Error(`Rate title over 60 chars (${short.length}): ${short}`);
  return short;
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

export function stateHubDescription(name: string) {
  const description = `${name} therapy reimbursement rates by CPT code, from Parite. Planning ranges for the codes we publish, not a guarantee of payment.`;
  if (description.length > 155) throw new Error(`State hub meta over 155 (${description.length}): ${description}`);
  return description;
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
    const description = stateHubDescription(j.name);
    if (title.length > 60) throw new Error(`State hub title over 60 (${title.length}): ${title}`);
    if (/[—–]/.test(title) || /[—–]/.test(description) || /[—–]/.test(stateHubH1(j.name))) throw new Error(`Dash in state hub SEO for ${j.state}`);
  }
  for (const code of codesInData()) {
    const title = `${codeHubTitle(code)} | Anvil`;
    const description = codeHubDescription(code);
    if (title.length > 60) throw new Error(`Code hub title over 60 (${title.length}): ${title}`);
    if (/[—–]/.test(title) || /[—–]/.test(description)) throw new Error(`Dash in code hub SEO for ${code}`);
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
