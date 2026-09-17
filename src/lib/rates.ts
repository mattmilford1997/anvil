/**
 * Parite reimbursement ranges. Only rows in public/rates.json are published.
 * Do not invent codes or pad missing payers.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
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

const filePath = fileURLToPath(new URL('../../public/rates.json', import.meta.url));
export const ratesFile = JSON.parse(readFileSync(filePath, 'utf8')) as RatesFile;
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

export function samplePairs(): RatePair[] {
  const all = ratePairs();
  return samplePairKeys.map(([state, code]) => all.find((p) => p.state === state && p.code === code)).filter((p): p is RatePair => !!p);
}

export function sourcesOnPage(rows: RateRow[]) {
  return [...new Set(rows.map((r) => r.source).filter(Boolean))] as string[];
}
