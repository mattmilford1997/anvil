#!/usr/bin/env python3
"""Regenerate the site-wide share image.

Writes public/og-default-v2.png at 1200x630: ink background, the inverse
logo mark (white anvil, terracotta base), the Inter Tight wordmark, and
the site tagline. No timeline copy.

Requires the Inter Tight variable font from @fontsource-variable/inter-tight
(installed with npm) plus Pillow, fontTools, and brotli:

    pip install pillow fonttools brotli
    python3 scripts/og-default.py
"""

from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
FONT_SRC = (
    ROOT
    / "node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2"
)
OUT = ROOT / "public" / "og-default-v2.png"

W, H = 1200, 630
SCALE = 3  # draw large, then downscale for cleaner edges
INK = (15, 46, 42)  # #0f2e2a
WHITE = (255, 255, 255)
TERRACOTTA = (196, 85, 45)  # #c4552d
TAGLINE = (213, 224, 220)  # light text used on ink sections
DOMAIN = (183, 199, 194)

# Logo.astro paths, viewBox 0 0 32 32.
ANVIL = [(4, 9), (28, 9), (28, 14), (18, 14), (18, 24), (14, 24), (14, 14), (4, 14)]
BASE = [(9, 22), (23, 22), (23, 26), (9, 26)]


def static_font(weight: int) -> ImageFont.FreeTypeFont:
    """Instantiate one Inter Tight weight and return a Pillow font factory."""
    font = TTFont(str(FONT_SRC))
    instantiateVariableFont(font, {"wght": weight}, inplace=True)
    font.flavor = None
    cache = ROOT / "scripts" / ".cache"
    cache.mkdir(exist_ok=True)
    path = cache / f"inter-tight-{weight}.ttf"
    font.save(str(path))
    return path


def load(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size)


def tracked_width(font: ImageFont.FreeTypeFont, text: str, tracking: float) -> float:
    widths = [font.getlength(ch) for ch in text]
    return sum(widths) + tracking * (len(text) - 1)


def draw_tracked(draw, x, y, text, font, fill, tracking):
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += font.getlength(ch) + tracking


def polygon(draw, points, origin, unit, fill):
    ox, oy = origin
    draw.polygon([(ox + px * unit, oy + py * unit) for px, py in points], fill=fill)


def main():
    if not FONT_SRC.exists():
        raise SystemExit(f"Missing Inter Tight font at {FONT_SRC}. Run npm install first.")

    bold_path = static_font(700)
    text_path = static_font(500)

    canvas = Image.new("RGB", (W * SCALE, H * SCALE), INK)
    draw = ImageDraw.Draw(canvas)

    mark = 156 * SCALE
    unit = mark / 32
    word_size = int(mark * 0.85)
    word = load(bold_path, word_size)
    tag_size = 34 * SCALE
    tag = load(text_path, tag_size)
    domain_size = 18 * SCALE
    domain = load(text_path, domain_size)

    word_text = "Anvil"
    tag_text = "Insurance infrastructure for care companies"
    domain_text = "anvilcontracts.com"
    # Logo.astro letter-spacing is -0.03em on the wordmark.
    word_track = -0.03 * word_size
    tag_track = -0.01 * tag_size

    gap = int(mark * (9 / 26))
    word_w = tracked_width(word, word_text, word_track)
    lockup_w = mark + gap + word_w
    tag_w = tracked_width(tag, tag_text, tag_track)
    domain_w = tracked_width(domain, domain_text, 0)

    tag_ascent, tag_descent = tag.getmetrics()
    tag_h = tag_ascent + tag_descent
    dom_ascent, dom_descent = domain.getmetrics()
    dom_h = dom_ascent + dom_descent
    # Cap-height box, so the wordmark centers on the drawn mark rather than the em square.
    word_box = word.getbbox(word_text)

    below = 36 * SCALE
    domain_gap = 18 * SCALE
    # The mark's painted pixels sit in y 9..26 of the 32 viewBox.
    painted = 17 * unit
    block_h = painted + below + tag_h + domain_gap + dom_h
    top = (H * SCALE - block_h) / 2
    lockup_x = (W * SCALE - lockup_w) / 2
    mark_y = top - 9 * unit
    logo_center = mark_y + 17.5 * unit
    word_y = logo_center - (word_box[1] + word_box[3]) / 2

    polygon(draw, ANVIL, (lockup_x, mark_y), unit, WHITE)
    polygon(draw, BASE, (lockup_x, mark_y), unit, TERRACOTTA)
    draw_tracked(draw, lockup_x + mark + gap, word_y, word_text, word, WHITE, word_track)

    tag_y = top + painted + below
    draw_tracked(draw, (W * SCALE - tag_w) / 2, tag_y, tag_text, tag, TAGLINE, tag_track)
    draw_tracked(
        draw,
        (W * SCALE - domain_w) / 2,
        tag_y + tag_h + domain_gap,
        domain_text,
        domain,
        DOMAIN,
        0,
    )

    image = canvas.resize((W, H), Image.Resampling.LANCZOS)
    image.save(OUT, "PNG", optimize=True)
    print(f"Wrote {OUT} ({W}x{H})")


if __name__ == "__main__":
    main()
