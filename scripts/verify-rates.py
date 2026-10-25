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
        paragraph = re.search(r'<p[^>]*>Parite publishes ranges for \d+ CPT codes? in [^<]+</p>', html)
        if not paragraph:
            fail(f'{path} code-count sentence is not a link-free paragraph')

    rates_html = (DIST / 'rates.html').read_text()
    if expected['file'] not in visible(rates_html):
        fail(f"rates hub is missing: {expected['file']}")
    # The count sentence must not repeat the code-hub wording.
    if 'Parite publishes 90837 ranges' in visible(rates_html):
        fail('rates hub repeats the code-hub coverage sentence')

    print('verify-rates: payer spreads, code counts, Medicare code spreads, the UHC 90791 sentence, state code counts, and the rates-hub sentence match rates.json')


if __name__ == '__main__':
    main()
