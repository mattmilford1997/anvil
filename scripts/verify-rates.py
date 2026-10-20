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
    return (
        f"Among the {len(rows)} states Parite publishes {PAYER_NAMES[payer]} {code} for, "
        f"the highest range is in {state_name(highest['state'])} ({amount(highest['low'], highest['high'])}) "
        f"and the lowest is in {state_name(lowest['state'])} ({amount(lowest['low'], lowest['high'])})."
    )


def code_sentence(code):
    parts = []
    for payer in PAYER_ORDER:
        n = len(states_for(payer, code))
        if n:
            parts.append((PAYER_NAMES[payer], n))
    if not parts:
        return ''
    bits = []
    for i, (label, n) in enumerate(parts):
        bits.append(f'{label} in {n} {"state" if n == 1 else "states"}' if i == 0 else f'{label} in {n}')
    return f'Parite publishes {code} ranges for {join_labels(bits)}.'


def file_sentence():
    bits = []
    for payer in PAYER_ORDER:
        n = len(states_for(payer))
        if n:
            bits.append(f"{PAYER_NAMES[payer]} is in {n} {'state' if n == 1 else 'states'}")
    if len(bits) <= 1:
        phrase = bits[0] if bits else ''
    elif len(bits) == 2:
        phrase = f'{bits[0]} and {bits[1]}'
    else:
        phrase = ', '.join(bits[:-1]) + f' and {bits[-1]}'
    return f'Across the file, {phrase}.'


def visible(html):
    text = re.sub(r'<script[\s\S]*?</script>', ' ', html, flags=re.I)
    text = re.sub(r'<style[\s\S]*?</style>', ' ', text, flags=re.I)
    text = re.sub(r'<[^>]+>', ' ', text)
    return re.sub(r'\s+', ' ', text)


def main():
    if not DIST.exists():
        fail('dist/ is missing. Run the site build first.')

    expected = {
        'medicaid-ffs': 'Among the 24 states Parite publishes Medicaid FFS 90837 for, the highest range is in Alaska ($323.68) and the lowest is in Kentucky ($93.67 to $94.13).',
        '90837': 'Parite publishes 90837 ranges for Medicare in 53 states, UnitedHealthcare in 51, and Medicaid FFS in 24.',
        '90791': 'Parite publishes 90791 ranges for Medicare in 53 states, UnitedHealthcare in 51, and Medicaid FFS in 24.',
        '90834': 'Parite publishes 90834 ranges for Medicare in 53 states, UnitedHealthcare in 51, and Medicaid FFS in 24.',
        '97153': 'Parite publishes 97153 ranges for Medicaid FFS in 5 states.',
        'file': 'Across the file, Medicare is in 53 states, UnitedHealthcare is in 51 states and Medicaid FFS is in 24 states.',
    }
    if spread_sentence('medicaid-ffs') != expected['medicaid-ffs']:
        fail(f"Medicaid 90837 sentence drifted: {spread_sentence('medicaid-ffs')}")
    for code in ('90837', '90791', '90834', '97153'):
        if code_sentence(code) != expected[code]:
            fail(f'{code} coverage sentence drifted: {code_sentence(code)}')
    if file_sentence() != expected['file']:
        fail(f'payer file sentence drifted: {file_sentence()}')

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

    rates_html = (DIST / 'rates.html').read_text()
    if expected['file'] not in visible(rates_html):
        fail(f"rates hub is missing: {expected['file']}")
    # The count sentence must not repeat the code-hub wording.
    if 'Parite publishes 90837 ranges' in visible(rates_html):
        fail('rates hub repeats the code-hub coverage sentence')

    print('verify-rates: payer spreads, code counts, and the rates-hub sentence match rates.json')


if __name__ == '__main__':
    main()
