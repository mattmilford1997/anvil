/**
 * Hand-written notes for a few thin rate leaves.
 * Numbers are copied from public/rates.json (Parite export, updated 2026-09-17).
 * A key that is absent renders nothing, so other leaves stay unchanged.
 */
export const rateLeafNotes: Record<string, string> = {
  'in/97153':
    'Parite publishes one 97153 row for Indiana. It is Medicaid FFS at $16.04 per 15-minute unit, and the low, high, and median are the same figure, effective April 1, 2026. The file has no Medicare row and no UnitedHealthcare row for 97153 in Indiana.',
  'nd/97153':
    'Parite publishes one 97153 row for North Dakota. It is Medicaid FFS at $10.81 per 15-minute unit, effective August 1, 2026. Indiana\'s only 97153 row in the same file is Medicaid FFS at $16.04, effective April 1, 2026. Neither state has a Medicare row or a UnitedHealthcare row for this code.',
  'pr/90837':
    'Parite publishes one 90837 row for Puerto Rico. It is Medicare at $167.44 under the CMS PFS, and the low, high, and median are the same figure. The file has no Medicaid FFS row and no UnitedHealthcare row for 90837 in Puerto Rico. The U.S. Virgin Islands 90837 row in the same file is the same Medicare amount, $167.44.',
};
