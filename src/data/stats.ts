/**
 * Coverage stats shown on the homepage stat band and elsewhere.
 * HONESTY GATE: a stat renders in production only when `verified: true`.
 * Unverified stats render in `npm run dev` only, so the layout can be reviewed.
 * TODO(launch): replace values with real numbers from Homefront / the rented PC and set verified: true.
 */
export type Stat = { value: string; label: string; note?: string; verified: boolean };

export const coverageStats: Stat[] = [
  { value: '50', label: 'States live on the rented PC', verified: false },
  { value: '120+', label: 'Payers live', verified: false },
  { value: '2,400+', label: 'Clinicians credentialed', note: 'Homefront, trailing 12 months', verified: false },
  { value: '38', label: 'Median days to first paid claim', note: 'From signature, rented PC', verified: false },
];

export const asOf = '2026-09-15'; // TODO(launch): date the stats were last pulled
