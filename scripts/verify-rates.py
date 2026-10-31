#!/usr/bin/env python3
"""Check built rate sentences against public/rates.json.

Highest range is the highest high. Lowest range is the lowest high.
Ties break on low, then state name. Amounts are "$X" or "$X to $Y".
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
RATES = json.loads((ROOT / 'public' / 'rates.json').read_text())['rates']

PAYER_NAMES = {
    'medicare': 'Medicare',
    'uhc': 'UnitedHealthcare',
    'medicaid-ffs': 'Medicaid FFS',
}
PAYER_ORDER = ('medicare', 'uhc', 'medicaid-ffs')
NON_STATE = {'DC', 'PR', 'VI'}
PAYER_FILES = {
    'medicare': DIST / 'rates' / 'payer' / 'medicare.html',
    'uhc': DIST / 'rates' / 'payer' / 'uhc.html',
    'medicaid-ffs': DIST / 'rates' / 'payer' / 'medicaid.html',
}

coverage = (ROOT / 'src' / 'data' / 'coverage.ts').read_text()
STATE_NAMES = dict(re.findall(r"(\w+): '([^']+)'", coverage.split('stateNames', 1)[1].split('};', 1)[0]))
STATE_NAMES.update({'PR': 'Puerto Rico', 'VI': 'U.S. Virgin Islands'})


def fail(message):
    print(f'verify-rates: {message}', file=sys.stderr)
    sys.exit(1)


def money(n):
    return f'${n:,.2f}'


def amount(low, high):
    return money(low) if low == high else f'{money(low)} to {money(high)}'


def state_name(code):
    return STATE_NAMES.get(code, code)


def join_labels(labels):
    if len(labels) <= 1:
        return labels[0] if labels else ''
    if len(labels) == 2:
        return f'{labels[0]} and {labels[1]}'
    return ', '.join(labels[:-1]) + f', and {labels[-1]}'


def states_for(payer, code=None):
    return {row['state'] for row in RATES if row['payer'] == payer and (code is None or row['code'] == code)}


def place_noun(codes, n=None):
    codes = list(codes)
    if n is None:
        n = len(set(codes))
    has_non_state = any(code.upper() in NON_STATE for code in codes)
    if has_non_state:
        return 'jurisdiction' if n == 1 else 'jurisdictions'
    return 'state' if n == 1 else 'states'


def spread(payer, code):
    rows = [row for row in RATES if row['payer'] == payer and row['code'] == code]
    if not rows:
        return None
    highest = sorted(rows, key=lambda row: (-row['high'], -row['low'], state_name(row['state'])))[0]
    lowest = sorted(rows, key=lambda row: (row['high'], row['low'], state_name(row['state'])))[0]
    return rows, highest, lowest


def spread_sentence(payer, code='90837'):
    found = spread(payer, code)
    if not found:
        return ''
    rows, highest, lowest = found
    noun = place_noun((row['state'] for row in rows), len(rows))
    return (
        f"Among the {len(rows)} {noun} Parite publishes {PAYER_NAMES[payer]} {code} for, "
        f"the highest range is in {state_name(highest['state'])} ({amount(highest['low'], highest['high'])}) "
        f"and the lowest is in {state_name(lowest['state'])} ({amount(lowest['low'], lowest['high'])})."
    )


def code_sentence(code):
    parts = []
    for payer in PAYER_ORDER:
        places = states_for(payer, code)
        n = len(places)
        if n:
            parts.append((PAYER_NAMES[payer], n, place_noun(places, n)))
    if not parts:
        return ''
    bits = []
    for i, (label, n, noun) in enumerate(parts):
        bits.append(f'{label} in {n} {noun}' if i == 0 else f'{label} in {n}')
    return f'Parite publishes {code} ranges for {join_labels(bits)}.'


def medicare_spread_sentence(code):
    found = spread('medicare', code)
    if not found:
        return ''
    rows, highest, lowest = found
    noun = place_noun((row['state'] for row in rows), len(rows))
    return (
        f"Across the {len(rows)} {noun} with a published Medicare {code} range, "
        f"the highest is in {state_name(highest['state'])} ({amount(highest['low'], highest['high'])}) "
        f"and the lowest in {state_name(lowest['state'])} ({amount(lowest['low'], lowest['high'])})."
    )


def for_range_sentence(label, payer, code):
    found = spread(payer, code)
    if not found:
        return ''
    rows, highest, lowest = found
    noun = place_noun((row['state'] for row in rows), len(rows))
    return (
        f"For {code}, the highest {label} range is in {state_name(highest['state'])} "
        f"({amount(highest['low'], highest['high'])}) and the lowest is in {state_name(lowest['state'])} "
        f"({amount(lowest['low'], lowest['high'])}), across {len(rows)} {noun}."
    )


def medicaid_code_spread_sentence(code):
    found = spread('medicaid-ffs', code)
    if not found:
        return ''
    rows, highest, lowest = found
    noun = place_noun((row['state'] for row in rows), len(rows))
    return (
        f"Across the {len(rows)} {noun} with a published Medicaid FFS {code} range, "
        f"the highest is in {state_name(highest['state'])} ({amount(highest['low'], highest['high'])}) "
        f"and the lowest in {state_name(lowest['state'])} ({amount(lowest['low'], lowest['high'])})."
    )


def payers_for_code(code):
    return sorted({row['payer'] for row in RATES if row.get('code') == code and row.get('payer')})


def cross_90837_alaska_sentence():
    medicaid = spread('medicaid-ffs', '90837')
    medicare = spread('medicare', '90837')
    if not medicaid or not medicare:
        return ''
    _, med_high, _ = medicaid
    _, mc_high, _ = medicare
    if med_high['state'] != mc_high['state'] or not med_high['high'] > mc_high['high']:
        return ''
    return (
        f"In {state_name(med_high['state'])}, the published 90837 range tops out higher on Medicaid FFS "
        f"({money(med_high['high'])}) than on Medicare ({money(mc_high['high'])})."
    )


def top_90837_sentence():
    winners = []
    top_high = None
    for payer in payers_for_code('90837'):
        found = spread(payer, '90837')
        if not found:
            continue
        _, highest, _ = found
        if top_high is None or highest['high'] > top_high:
            top_high = highest['high']
            winners = [(payer, highest)]
        elif highest['high'] == top_high:
            winners.append((payer, highest))
    if len(winners) != 1:
        return ''
    payer, highest = winners[0]
    name = PAYER_NAMES.get(payer, payer)
    return (
        f"{name}'s top 90837 range reaches {money(highest['high'])} in {state_name(highest['state'])}, "
        f"the highest published 90837 figure on these rate pages."
    )


def row_for(payer, code, state):
    hits = [row for row in RATES if row['payer'] == payer and row['code'] == code and row['state'] == state]
    return hits[0] if len(hits) == 1 else None


def medicaid_above_sentence(code):
    both = states_for('medicare', code) & states_for('medicaid-ffs', code)
    if not both:
        return ''
    above = 0
    for state in both:
        medicaid = row_for('medicaid-ffs', code, state)
        medicare = row_for('medicare', code, state)
        if medicaid['high'] > medicare['high']:
            above += 1
    noun = place_noun(both, len(both))
    return (
        f"In {above} of the {len(both)} {noun} with both a Medicare and a Medicaid FFS {code} range, "
        f"the Medicaid FFS high is above the Medicare high."
    )


def medicaid_uhc_counts(code):
    both = states_for('medicaid-ffs', code) & states_for('uhc', code)
    medicaid_above = 0
    uhc_above = 0
    for state in both:
        medicaid = row_for('medicaid-ffs', code, state)
        uhc = row_for('uhc', code, state)
        if medicaid['high'] == uhc['high']:
            fail(f'{code} {state} ties on Medicaid FFS and UnitedHealthcare high')
        elif medicaid['high'] > uhc['high']:
            medicaid_above += 1
        else:
            uhc_above += 1
    noun = place_noun(both, len(both))
    return len(both), medicaid_above, uhc_above, noun


def payer_coverage_sentence(payer):
    rows = [row for row in RATES if row['payer'] == payer]
    places = {row['state'] for row in rows}
    codes = {row['code'] for row in rows}
    noun = place_noun(places, len(places))
    return (
        f"This table has {len(rows)} {PAYER_NAMES[payer]} ranges across {len(places)} {noun} "
        f"and {len(codes)} CPT codes."
    )


def medicaid_uhc_sentence():
    parts = []
    n = None
    noun = None
    for code in ('90791', '90834', '90837'):
        count, above, _uhc_above, code_noun = medicaid_uhc_counts(code)
        if n is None:
            n, noun = count, code_noun
        elif count != n or code_noun != noun:
            fail(f'{code} Medicaid and UHC set is {count} {code_noun}, expected {n} {noun}')
        parts.append(f'{above} for {code}')
    return (
        f"Among the {n} {noun} with both a Medicaid FFS and a UnitedHealthcare range, "
        f"the Medicaid high is above the UnitedHealthcare high in {parts[0]}, {parts[1]} and {parts[2]}."
    )


def uhc_medicaid_sentence():
    parts = []
    n = None
    noun = None
    for code in ('90791', '90834', '90837'):
        count, _medicaid_above, above, code_noun = medicaid_uhc_counts(code)
        if n is None:
            n, noun = count, code_noun
        parts.append(f'{above} for {code}')
    return (
        f"Among the {n} {noun} with both a UnitedHealthcare and a Medicaid FFS range, "
        f"the UnitedHealthcare high is above the Medicaid high in {parts[0]}, {parts[1]} and {parts[2]}."
    )


def uhc_above_sentence(code):
    both = states_for('uhc', code) & states_for('medicare', code)
    if not both:
        return ''
    above = 0
    for state in both:
        uhc = row_for('uhc', code, state)
        medicare = row_for('medicare', code, state)
        if uhc['high'] == medicare['high']:
            fail(f'{code} {state} ties on UHC and Medicare high')
        if uhc['high'] > medicare['high']:
            above += 1
    noun = place_noun(both, len(both))
    return (
        f"In {above} of the {len(both)} {noun} with both a Medicare and a UHC {code} range, "
        f"the UHC high is above the Medicare high."
    )


def medicare_peer_sentence(state, code):
    rows = [row for row in RATES if row['payer'] == 'medicare' and row['code'] == code]
    mine = next((row for row in rows if row['state'] == state), None)
    if not mine:
        return ''
    others = [row for row in rows if row['state'] != state]
    m = sum(1 for row in others if mine['high'] > row['high'])
    if m == 0:
        return ''
    noun = place_noun((row['state'] for row in others), len(others))
    place = f"the {state_name(state)}" if state == 'DC' else state_name(state)
    return (
        f"In {place}, the Medicare {code} high of {money(mine['high'])} is above the Medicare high "
        f"in {m} of the other {len(others)} {noun} Parite publishes."
    )


def medicaid_medicare_top_sentence(state, code):
    if code not in ('90791', '90834'):
        return ''
    medicaid = row_for('medicaid-ffs', code, state)
    medicare = row_for('medicare', code, state)
    if not medicaid or not medicare:
        return ''
    place = f"the {state_name(state)}" if state == 'DC' else state_name(state)
    return (
        f"For {code} in {place}, the published Medicaid FFS range tops out at {money(medicaid['high'])} "
        f"and the Medicare range at {money(medicare['high'])}."
    )


def rate_page_count_sentence():
    pairs = {(row['state'], row['code']) for row in RATES}
    places = {row['state'] for row in RATES}
    noun = place_noun(places, len(places))
    return f"There are {len(pairs)} state and CPT code rate pages across {len(places)} {noun}."


def state_90837_top_sentence(state):
    medicaid = row_for('medicaid-ffs', '90837', state)
    medicare = row_for('medicare', '90837', state)
    if not medicaid or not medicare:
        return ''
    place = f"the {state_name(state)}" if state == 'DC' else state_name(state)
    return (
        f"In {place}, the top of the published 90837 range is {money(medicaid['high'])} on Medicaid FFS "
        f"and {money(medicare['high'])} on Medicare."
    )


def triple_payer_sentence():
    codes = ('90791', '90834', '90837')
    sets = []
    for code in codes:
        sets.append(states_for('medicare', code) & states_for('medicaid-ffs', code) & states_for('uhc', code))
    if any(places != sets[0] for places in sets) or not sets[0]:
        return ''
    places = sets[0]
    noun = place_noun(places, len(places))
    return (
        f"Medicare, Medicaid FFS and UHC ranges are all published for 90791, 90834 and 90837 "
        f"in {len(places)} {noun}."
    )


def uhc_90791_sentence():
    found = spread('uhc', '90791')
    if not found:
        return ''
    rows, highest, lowest = found
    noun = place_noun((row['state'] for row in rows), len(rows))
    return (
        f"For 90791, the highest UnitedHealthcare range is in {state_name(highest['state'])} "
        f"({amount(highest['low'], highest['high'])}) and the lowest is in {state_name(lowest['state'])} "
        f"({amount(lowest['low'], lowest['high'])}), across {len(rows)} {noun}."
    )


def file_sentence():
    parts = []
    for payer in PAYER_ORDER:
        places = states_for(payer)
        n = len(places)
        if n:
            parts.append((PAYER_NAMES[payer], n, place_noun(places, n)))
    if not parts:
        return ''
    first, *rest = parts
    if not rest:
        return f'{first[0]} ranges cover {first[1]} {first[2]}.'
    last = rest[-1]
    middle = ', '.join(f'{label} {n}' for label, n, _noun in rest[:-1])
    tail = f'{middle} and {last[0]} {last[1]}' if middle else f'{last[0]} {last[1]}'
    return f'{first[0]} ranges cover {first[1]} {first[2]}, {tail}.'


def visible(html):
    text = re.sub(r'<script[\s\S]*?</script>', ' ', html, flags=re.I)
    text = re.sub(r'<style[\s\S]*?</style>', ' ', text, flags=re.I)
    text = re.sub(r'<[^>]+>', ' ', text)
    return re.sub(r'\s+', ' ', text)


def linked_text(html):
    text = re.sub(r'<script[\s\S]*?</script>', ' ', html, flags=re.I)
    text = re.sub(r'<style[\s\S]*?</style>', ' ', text, flags=re.I)
    text = re.sub(r'<[^>]+>', '', text)
    return re.sub(r'\s+', ' ', text)


def main():
    if not DIST.exists():
        fail('dist/ is missing. Run the site build first.')

    # The expected sentences must be updated when rates.json is refreshed.
    expected = {
        'medicare': 'Among the 53 jurisdictions Parite publishes Medicare 90837 for, the highest range is in Alaska ($232.44) and the lowest is in Arkansas ($161.03).',
        'uhc': 'Among the 51 jurisdictions Parite publishes UnitedHealthcare 90837 for, the highest range is in Wisconsin ($95.69 to $341.64) and the lowest is in Mississippi ($87.63 to $159.80).',
        'medicaid-ffs': 'Among the 24 jurisdictions Parite publishes Medicaid FFS 90837 for, the highest range is in Alaska ($323.68) and the lowest is in Kentucky ($93.67 to $94.13).',
        '90837': 'Parite publishes 90837 ranges for Medicare in 53 jurisdictions, UnitedHealthcare in 51, and Medicaid FFS in 24.',
        '90791': 'Parite publishes 90791 ranges for Medicare in 53 jurisdictions, UnitedHealthcare in 51, and Medicaid FFS in 24.',
        '90834': 'Parite publishes 90834 ranges for Medicare in 53 jurisdictions, UnitedHealthcare in 51, and Medicaid FFS in 24.',
        '97153': 'Parite publishes 97153 ranges for Medicaid FFS in 5 states.',
        'file': 'Medicare ranges cover 53 jurisdictions, UnitedHealthcare 51 and Medicaid FFS 24.',
        '90791-medicare': 'Across the 53 jurisdictions with a published Medicare 90791 range, the highest is in Alaska ($240.07) and the lowest in Arkansas ($166.76).',
        '90834-medicare': 'Across the 53 jurisdictions with a published Medicare 90834 range, the highest is in Alaska ($158.15) and the lowest in Arkansas ($109.66).',
        'uhc-90791': 'For 90791, the highest UnitedHealthcare range is in Wisconsin ($112.56 to $373.38) and the lowest is in Mississippi ($108.16 to $200.85), across 51 jurisdictions.',
        'medicaid-90791': 'For 90791, the highest Medicaid range is in Alaska ($334.31) and the lowest is in Kentucky ($94.84 to $97.80), across 24 jurisdictions.',
        'uhc-90834': 'For 90834, the highest UnitedHealthcare range is in Wisconsin ($75.18 to $204.30) and the lowest is in Arkansas ($71.63 to $117.90), across 51 jurisdictions.',
        '97153-medicaid': 'Across the 5 states with a published Medicaid FFS 97153 range, the highest is in Missouri ($20.13) and the lowest in North Dakota ($10.81).',
        '90834-medicaid': 'Across the 24 jurisdictions with a published Medicaid FFS 90834 range, the highest is in Alaska ($220.24) and the lowest in Kentucky ($62.66 to $62.90).',
        '90837-alaska-cross': 'In Alaska, the published 90837 range tops out higher on Medicaid FFS ($323.68) than on Medicare ($232.44).',
        '90837-top': "UnitedHealthcare's top 90837 range reaches $341.64 in Wisconsin, the highest published 90837 figure on these rate pages.",
        'medicare-90791-for': 'For 90791, the highest Medicare range is in Alaska ($240.07) and the lowest is in Arkansas ($166.76), across 53 jurisdictions.',
        'medicare-90834-for': 'For 90834, the highest Medicare range is in Alaska ($158.15) and the lowest is in Arkansas ($109.66), across 53 jurisdictions.',
        'medicaid-90834-for': 'For 90834, the highest Medicaid range is in Alaska ($220.24) and the lowest is in Kentucky ($62.66 to $62.90), across 24 jurisdictions.',
        'medicaid-97153-for': 'For 97153, the highest Medicaid range is in Missouri ($20.13) and the lowest is in North Dakota ($10.81), across 5 states.',
        '90791-above': 'In 7 of the 24 jurisdictions with both a Medicare and a Medicaid FFS 90791 range, the Medicaid FFS high is above the Medicare high.',
        '90834-above': 'In 7 of the 24 jurisdictions with both a Medicare and a Medicaid FFS 90834 range, the Medicaid FFS high is above the Medicare high.',
        '90837-above': 'In 7 of the 24 jurisdictions with both a Medicare and a Medicaid FFS 90837 range, the Medicaid FFS high is above the Medicare high.',
        'triple': 'Medicare, Medicaid FFS and UHC ranges are all published for 90791, 90834 and 90837 in 24 jurisdictions.',
        'OH-top': 'In Ohio, the top of the published 90837 range is $108.57 on Medicaid FFS and $163.52 on Medicare.',
        'AK-top': 'In Alaska, the top of the published 90837 range is $323.68 on Medicaid FFS and $232.44 on Medicare.',
        'IL-top': 'In Illinois, the top of the published 90837 range is $183.16 on Medicaid FFS and $169.49 on Medicare.',
        '90791-uhc-above': 'In 51 of the 51 jurisdictions with both a Medicare and a UHC 90791 range, the UHC high is above the Medicare high.',
        '90834-uhc-above': 'In 51 of the 51 jurisdictions with both a Medicare and a UHC 90834 range, the UHC high is above the Medicare high.',
        '90837-uhc-above': 'In 50 of the 51 jurisdictions with both a Medicare and a UHC 90837 range, the UHC high is above the Medicare high.',
        'OH-90837-peer': 'In Ohio, the Medicare 90837 high of $163.52 is above the Medicare high in 11 of the other 52 jurisdictions Parite publishes.',
        'AK-90837-peer': 'In Alaska, the Medicare 90837 high of $232.44 is above the Medicare high in 52 of the other 52 jurisdictions Parite publishes.',
        'TX-90834-peer': 'In Texas, the Medicare 90834 high of $115.60 is above the Medicare high in 36 of the other 52 jurisdictions Parite publishes.',
        'CA-90791-peer': 'In California, the Medicare 90791 high of $206.78 is above the Medicare high in 51 of the other 52 jurisdictions Parite publishes.',
        'DC-90837-peer': 'In the District of Columbia, the Medicare 90837 high of $181.03 is above the Medicare high in 47 of the other 52 jurisdictions Parite publishes.',
        'TX-90834-medi': 'For 90834 in Texas, the published Medicaid FFS range tops out at $86.07 and the Medicare range at $115.60.',
        'CA-90791-medi': 'For 90791 in California, the published Medicaid FFS range tops out at $128.08 and the Medicare range at $206.78.',
        'OH-90834-medi': 'For 90834 in Ohio, the published Medicaid FFS range tops out at $74.01 and the Medicare range at $111.49.',
        'rate-pages': 'There are 164 state and CPT code rate pages across 53 jurisdictions.',
        'medicare-coverage': 'This table has 159 Medicare ranges across 53 jurisdictions and 3 CPT codes.',
        'uhc-coverage': 'This table has 153 UnitedHealthcare ranges across 51 jurisdictions and 3 CPT codes.',
        'medicaid-coverage': 'This table has 77 Medicaid FFS ranges across 24 jurisdictions and 4 CPT codes.',
        'medicaid-uhc': 'Among the 24 jurisdictions with both a Medicaid FFS and a UnitedHealthcare range, the Medicaid high is above the UnitedHealthcare high in 1 for 90791, 3 for 90834 and 4 for 90837.',
        'uhc-medicaid': 'Among the 24 jurisdictions with both a UnitedHealthcare and a Medicaid FFS range, the UnitedHealthcare high is above the Medicaid high in 23 for 90791, 21 for 90834 and 20 for 90837.',
    }
    aba = states_for('medicaid-ffs', '97153')
    if aba & NON_STATE or len(aba) != 5 or place_noun(aba) != 'states':
        fail(f'97153 Medicaid should be 5 states with no DC, PR, or VI, got {sorted(aba)}')
    for payer in ('medicare', 'uhc', 'medicaid-ffs'):
        if spread_sentence(payer) != expected[payer]:
            fail(f'{payer} 90837 sentence drifted: {spread_sentence(payer)}')
    for code in ('90837', '90791', '90834', '97153'):
        if code_sentence(code) != expected[code]:
            fail(f'{code} coverage sentence drifted: {code_sentence(code)}')
    if file_sentence() != expected['file']:
        fail(f'payer file sentence drifted: {file_sentence()}')
    for code in ('90791', '90834'):
        key = f'{code}-medicare'
        if medicare_spread_sentence(code) != expected[key]:
            fail(f'{key} sentence drifted: {medicare_spread_sentence(code)}')
    if uhc_90791_sentence() != expected['uhc-90791']:
        fail(f"UHC 90791 sentence drifted: {uhc_90791_sentence()}")
    if for_range_sentence('Medicaid', 'medicaid-ffs', '90791') != expected['medicaid-90791']:
        fail(f"Medicaid 90791 sentence drifted: {for_range_sentence('Medicaid', 'medicaid-ffs', '90791')}")
    if for_range_sentence('UnitedHealthcare', 'uhc', '90834') != expected['uhc-90834']:
        fail(f"UHC 90834 sentence drifted: {for_range_sentence('UnitedHealthcare', 'uhc', '90834')}")
    for code in ('97153', '90834'):
        key = f'{code}-medicaid'
        if medicaid_code_spread_sentence(code) != expected[key]:
            fail(f'{key} sentence drifted: {medicaid_code_spread_sentence(code)}')
    if cross_90837_alaska_sentence() != expected['90837-alaska-cross']:
        fail(f"90837 Alaska cross sentence drifted: {cross_90837_alaska_sentence()}")
    if top_90837_sentence() != expected['90837-top']:
        fail(f"90837 top sentence drifted: {top_90837_sentence()}")
    for label, payer, code, key in (
        ('Medicare', 'medicare', '90791', 'medicare-90791-for'),
        ('Medicare', 'medicare', '90834', 'medicare-90834-for'),
        ('Medicaid', 'medicaid-ffs', '90834', 'medicaid-90834-for'),
        ('Medicaid', 'medicaid-ffs', '97153', 'medicaid-97153-for'),
    ):
        got = for_range_sentence(label, payer, code)
        if got != expected[key]:
            fail(f'{key} sentence drifted: {got}')
    for code in ('90791', '90834', '90837'):
        key = f'{code}-above'
        if medicaid_above_sentence(code) != expected[key]:
            fail(f'{key} sentence drifted: {medicaid_above_sentence(code)}')
    if medicaid_above_sentence('97153'):
        fail(f"97153 should not have a Medicare comparison: {medicaid_above_sentence('97153')}")
    if triple_payer_sentence() != expected['triple']:
        fail(f"triple payer sentence drifted: {triple_payer_sentence()}")
    for code in ('90791', '90834', '90837'):
        key = f'{code}-uhc-above'
        if uhc_above_sentence(code) != expected[key]:
            fail(f'{key} sentence drifted: {uhc_above_sentence(code)}')
    if uhc_above_sentence('97153'):
        fail(f"97153 should not have a UHC comparison: {uhc_above_sentence('97153')}")
    for state, code, key in (
        ('OH', '90837', 'OH-90837-peer'),
        ('AK', '90837', 'AK-90837-peer'),
        ('TX', '90834', 'TX-90834-peer'),
        ('CA', '90791', 'CA-90791-peer'),
        ('DC', '90837', 'DC-90837-peer'),
    ):
        if medicare_peer_sentence(state, code) != expected[key]:
            fail(f'{key} sentence drifted: {medicare_peer_sentence(state, code)}')
    for state, code, key in (
        ('TX', '90834', 'TX-90834-medi'),
        ('CA', '90791', 'CA-90791-medi'),
        ('OH', '90834', 'OH-90834-medi'),
    ):
        if medicaid_medicare_top_sentence(state, code) != expected[key]:
            fail(f'{key} sentence drifted: {medicaid_medicare_top_sentence(state, code)}')
    if rate_page_count_sentence() != expected['rate-pages']:
        fail(f"rate page count sentence drifted: {rate_page_count_sentence()}")
    for payer, key in (
        ('medicare', 'medicare-coverage'),
        ('uhc', 'uhc-coverage'),
        ('medicaid-ffs', 'medicaid-coverage'),
    ):
        if payer_coverage_sentence(payer) != expected[key]:
            fail(f'{key} sentence drifted: {payer_coverage_sentence(payer)}')
    if medicaid_uhc_sentence() != expected['medicaid-uhc']:
        fail(f"Medicaid vs UHC sentence drifted: {medicaid_uhc_sentence()}")
    if uhc_medicaid_sentence() != expected['uhc-medicaid']:
        fail(f"UHC vs Medicaid sentence drifted: {uhc_medicaid_sentence()}")
    for state, key in (('OH', 'OH-top'), ('AK', 'AK-top'), ('IL', 'IL-top')):
        if state_90837_top_sentence(state) != expected[key]:
            fail(f'{key} sentence drifted: {state_90837_top_sentence(state)}')

    for payer, path in PAYER_FILES.items():
        if not path.exists():
            fail(f'missing {path}')
        html = path.read_text()
        sentence = spread_sentence(payer)
        if sentence not in visible(html):
            fail(f'{path} is missing: {sentence}')
        found = spread(payer, '90837')
        _, highest, lowest = found
        for row in (highest, lowest):
            href = f'/rates/{row["state"].lower()}/90837'
            if f'href="{href}"' not in html:
                fail(f'{path} does not link {href}')

    for code in ('90837', '90791', '90834', '97153'):
        path = DIST / 'rates' / 'code' / f'{code}.html'
        if not path.exists():
            fail(f'missing {path}')
        sentence = code_sentence(code)
        html = path.read_text()
        if sentence not in visible(html):
            fail(f'{path} is missing: {sentence}')
        paragraph = re.search(r'<p[^>]*>[^<]*Parite publishes ' + re.escape(code) + r' ranges for[^<]*</p>', html)
        if not paragraph:
            fail(f'{path} coverage sentence is not a link-free paragraph')
        spread_text = medicare_spread_sentence(code) if code in ('90791', '90834') else ''
        if spread_text:
            if spread_text not in visible(html):
                fail(f'{path} is missing: {spread_text}')
            found = spread('medicare', code)
            _, highest, lowest = found
            for row in (highest, lowest):
                href = f'/rates/{row["state"].lower()}/{code}'
                if f'href="{href}"' not in html:
                    fail(f'{path} does not link {href}')
        elif code not in ('97153',) and 'Across the ' in visible(html):
            fail(f'{path} should not include a Medicare spread sentence')
        medicaid_text = medicaid_code_spread_sentence(code) if code in ('97153', '90834') else ''
        if medicaid_text:
            if medicaid_text not in visible(html):
                fail(f'{path} is missing: {medicaid_text}')
            found = spread('medicaid-ffs', code)
            _, highest, lowest = found
            for row in (highest, lowest):
                href = f'/rates/{row["state"].lower()}/{code}'
                if f'href="{href}"' not in html:
                    fail(f'{path} does not link {href}')
        elif 'published Medicaid FFS' in visible(html):
            fail(f'{path} should not include a Medicaid FFS spread sentence')
        if code == '90837':
            paragraphs = re.findall(r'<p[^>]*>.*?</p>', html)
            for key, href, needle in (
                ('90837-alaska-cross', '/rates/ak/90837', 'tops out higher on Medicaid FFS'),
                ('90837-top', '/rates/wi/90837', 'the highest published 90837 figure'),
            ):
                paragraph = next((item for item in paragraphs if needle in item), '')
                if expected[key] not in linked_text(paragraph):
                    fail(f'{path} is missing: {expected[key]}')
                if f'href="{href}"' not in paragraph:
                    fail(f'{path} does not link {href} from the 90837 sentence')
        elif 'tops out higher on Medicaid FFS' in linked_text(html) or 'the highest published 90837 figure' in linked_text(html):
            fail(f'{path} repeats a 90837 cross-payer sentence')
        above_text = medicaid_above_sentence(code)
        if above_text:
            if above_text not in visible(html):
                fail(f'{path} is missing: {above_text}')
            paragraph = next((item for item in re.findall(r'<p[^>]*>.*?</p>', html) if 'with both a Medicare and a Medicaid FFS' in item), '')
            if 'href=' in paragraph:
                fail(f'{path} Medicaid-above sentence should not contain a link')
        elif 'with both a Medicare and a Medicaid FFS' in visible(html):
            fail(f'{path} should not include a Medicare and Medicaid comparison')
        uhc_text = uhc_above_sentence(code)
        if uhc_text:
            if uhc_text not in visible(html):
                fail(f'{path} is missing: {uhc_text}')
            paragraph = next((item for item in re.findall(r'<p[^>]*>.*?</p>', html) if 'with both a Medicare and a UHC' in item), '')
            if 'href=' in paragraph:
                fail(f'{path} UHC-above sentence should not contain a link')
        elif 'with both a Medicare and a UHC' in visible(html):
            fail(f'{path} should not include a Medicare and UHC comparison')

    uhc_html = PAYER_FILES['uhc'].read_text()
    if expected['uhc-90791'] not in visible(uhc_html):
        fail(f"UHC hub is missing: {expected['uhc-90791']}")
    for href in ('/rates/wi/90791', '/rates/ms/90791'):
        if f'href="{href}"' not in uhc_html:
            fail(f'UHC hub does not link {href}')
    for payer in ('medicare', 'medicaid-ffs'):
        if 'For 90791, the highest UnitedHealthcare range' in visible(PAYER_FILES[payer].read_text()):
            fail(f'{payer} hub repeats the UnitedHealthcare 90791 sentence')
    medicaid_html = PAYER_FILES['medicaid-ffs'].read_text()
    if expected['medicaid-90791'] not in visible(medicaid_html):
        fail(f"Medicaid hub is missing: {expected['medicaid-90791']}")
    for href in ('/rates/ak/90791', '/rates/ky/90791'):
        if f'href="{href}"' not in medicaid_html:
            fail(f'Medicaid hub does not link {href}')
    if expected['uhc-90834'] not in visible(uhc_html):
        fail(f"UHC hub is missing: {expected['uhc-90834']}")
    for href in ('/rates/wi/90834', '/rates/ar/90834'):
        if f'href="{href}"' not in uhc_html:
            fail(f'UHC hub does not link {href}')
    if 'For 90834, the highest UnitedHealthcare range' in visible(medicaid_html):
        fail('Medicaid hub repeats the UnitedHealthcare 90834 sentence')
    if 'For 90791, the highest Medicaid range' in visible(uhc_html) or 'For 90791, the highest Medicaid range' in visible(PAYER_FILES['medicare'].read_text()):
        fail('a non-Medicaid hub repeats the Medicaid 90791 sentence')
    medicare_html = PAYER_FILES['medicare'].read_text()
    hub_for_sentences = (
        ('medicare', medicare_html, 'medicare-90791-for', ('/rates/ak/90791', '/rates/ar/90791')),
        ('medicare', medicare_html, 'medicare-90834-for', ('/rates/ak/90834', '/rates/ar/90834')),
        ('medicaid-ffs', medicaid_html, 'medicaid-90834-for', ('/rates/ak/90834', '/rates/ky/90834')),
        ('medicaid-ffs', medicaid_html, 'medicaid-97153-for', ('/rates/mo/97153', '/rates/nd/97153')),
    )
    for payer, html, key, hrefs in hub_for_sentences:
        if expected[key] not in visible(html):
            fail(f'{payer} hub is missing: {expected[key]}')
        needle = expected[key].split(' is in ')[0]
        paragraph = next((item for item in re.findall(r'<p[^>]*>.*?</p>', html) if needle in item), '')
        for href in hrefs:
            if f'href="{href}"' not in paragraph:
                fail(f'{payer} hub does not link {href} from: {expected[key]}')
    if expected['medicaid-90834-for'] in visible(medicare_html) or expected['medicaid-97153-for'] in visible(medicare_html):
        fail('Medicare hub repeats a Medicaid For-sentence')
    if expected['medicare-90791-for'] in visible(medicaid_html) or expected['medicare-90834-for'] in visible(medicaid_html):
        fail('Medicaid hub repeats a Medicare For-sentence')
    for key in ('medicare-90791-for', 'medicare-90834-for', 'medicaid-90834-for', 'medicaid-97153-for'):
        if expected[key] in visible(uhc_html):
            fail(f'UHC hub repeats: {expected[key]}')
    for payer, key in (
        ('medicare', 'medicare-coverage'),
        ('uhc', 'uhc-coverage'),
        ('medicaid-ffs', 'medicaid-coverage'),
    ):
        html = PAYER_FILES[payer].read_text()
        if expected[key] not in visible(html):
            fail(f'{payer} hub is missing: {expected[key]}')
        for other in ('medicare-coverage', 'uhc-coverage', 'medicaid-coverage'):
            if other != key and expected[other] in visible(html):
                fail(f'{payer} hub repeats: {expected[other]}')
        for href in ('/rates/code/90837', '/rates/code/90834', '/rates/code/90791'):
            if f'href="{href}"' not in html:
                fail(f'{payer} hub does not link {href}')
    medicaid_hub = PAYER_FILES['medicaid-ffs'].read_text()
    if expected['medicaid-uhc'] not in visible(medicaid_hub):
        fail(f"Medicaid hub is missing: {expected['medicaid-uhc']}")
    if 'href="/rates/code/97153"' not in medicaid_hub:
        fail('Medicaid hub does not link /rates/code/97153')
    if expected['uhc-medicaid'] not in visible(uhc_html):
        fail(f"UHC hub is missing: {expected['uhc-medicaid']}")
    if expected['medicaid-uhc'] in visible(uhc_html) or expected['medicaid-uhc'] in visible(medicare_html):
        fail('a non-Medicaid hub repeats the Medicaid vs UHC sentence')
    if expected['uhc-medicaid'] in visible(medicaid_hub) or expected['uhc-medicaid'] in visible(medicare_html):
        fail('a non-UHC hub repeats the UHC vs Medicaid sentence')
    for payer in ('medicare', 'uhc'):
        if 'href="/rates/code/97153"' in PAYER_FILES[payer].read_text():
            fail(f'{payer} hub links the 97153 code hub')

    by_state = {}
    for row in RATES:
        by_state.setdefault(row['state'], set()).add(row['code'])
    for state, codes in by_state.items():
        path = DIST / 'rates' / f'{state.lower()}.html'
        if not path.exists():
            fail(f'missing {path}')
        n = len(codes)
        label = 'CPT code' if n == 1 else 'CPT codes'
        place = f'the {state_name(state)}' if state == 'DC' else state_name(state)
        sentence = f'Parite publishes ranges for {n} {label} in {place}.'
        html = path.read_text()
        if sentence not in visible(html):
            fail(f'{path} is missing: {sentence}')
        top = state_90837_top_sentence(state)
        if top:
            if top not in visible(html):
                fail(f'{path} is missing: {top}')
        elif 'the top of the published 90837 range' in visible(html):
            fail(f'{path} should not include a 90837 Medicare comparison')
        paragraph = re.search(r'<p[^>]*>Parite publishes ranges for \d+ CPT codes? in [^<]+</p>', html)
        if not paragraph:
            fail(f'{path} code-count sentence is not a link-free paragraph')

    rates_html = (DIST / 'rates.html').read_text()
    if expected['file'] not in visible(rates_html):
        fail(f"rates hub is missing: {expected['file']}")
    # The count sentence must not repeat the code-hub wording.
    if 'Parite publishes 90837 ranges' in visible(rates_html):
        fail('rates hub repeats the code-hub coverage sentence')
    if expected['triple'] not in visible(rates_html):
        fail(f"rates hub is missing: {expected['triple']}")
    triple_paragraph = next((item for item in re.findall(r'<p[^>]*>.*?</p>', rates_html) if 'UHC ranges are all published' in item), '')
    if 'href=' in triple_paragraph:
        fail('rates hub triple-payer sentence should not contain a link')
    if expected['rate-pages'] not in visible(rates_html):
        fail(f"rates hub is missing: {expected['rate-pages']}")
    count_paragraph = next((item for item in re.findall(r'<p[^>]*>.*?</p>', rates_html) if 'state and CPT code rate pages' in item), '')
    if 'href=' in count_paragraph:
        fail('rates hub page-count sentence should not contain a link')

    peer_rendered = 0
    medicare_leaves = sum(len(states_for('medicare', code)) for code in ('90791', '90834', '90837'))
    if medicare_leaves != 159:
        fail(f'expected 159 Medicare psych leaves, got {medicare_leaves}')
    for code in ('90791', '90834', '90837'):
        for state in sorted(states_for('medicare', code)):
            path = DIST / 'rates' / state.lower() / f'{code}.html'
            if not path.exists():
                fail(f'missing {path}')
            html = path.read_text()
            sentence = medicare_peer_sentence(state, code)
            if sentence:
                peer_rendered += 1
                if sentence not in visible(html):
                    fail(f'{path} is missing: {sentence}')
                paragraph = next((item for item in re.findall(r'<p[^>]*>.*?</p>', html) if 'is above the Medicare high in' in item), '')
                if 'href=' in paragraph:
                    fail(f'{path} Medicare peer sentence should not contain a link')
            elif 'is above the Medicare high in' in visible(html):
                fail(f'{path} should not include a Medicare peer sentence')
    if peer_rendered > 159:
        fail(f'expected at most 159 Medicare peer sentences, got {peer_rendered}')

    medi_rendered = 0
    for code in ('90791', '90834'):
        both = states_for('medicare', code) & states_for('medicaid-ffs', code)
        for state in sorted(both):
            path = DIST / 'rates' / state.lower() / f'{code}.html'
            sentence = medicaid_medicare_top_sentence(state, code)
            html = path.read_text()
            if sentence not in visible(html):
                fail(f'{path} is missing: {sentence}')
            paragraph = next((item for item in re.findall(r'<p[^>]*>.*?</p>', html) if 'published Medicaid FFS range tops out' in item), '')
            if 'href=' in paragraph:
                fail(f'{path} Medicaid and Medicare top sentence should not contain a link')
            medi_rendered += 1
    if medi_rendered != 48:
        fail(f'expected 48 Medicaid and Medicare leaf sentences, got {medi_rendered}')
    for state in states_for('medicare', '90837') | states_for('medicaid-ffs', '90837'):
        path = DIST / 'rates' / state.lower() / '90837.html'
        if path.exists() and 'the published Medicaid FFS range tops out' in visible(path.read_text()):
            fail(f'{path} should not repeat the 90791 and 90834 Medicaid top sentence')

    print('verify-rates: payer spreads, code counts, Medicare, Medicaid and UHC comparisons, leaf rank sentences, the 90837 cross-payer sentences, state code counts, and the rates-hub sentence match rates.json')


if __name__ == '__main__':
    main()
