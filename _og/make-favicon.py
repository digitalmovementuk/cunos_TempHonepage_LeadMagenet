#!/usr/bin/env python3
"""Generate the Cunos favicon set from the brand mark.

The mark is the one from public/brand/logo.svg — an open circle with a chord
and a node — redrawn on the brand navy tile.

Two pieces of craft here, both learned by rendering it and looking at 16px:

1. Size-specific artwork. At 16px the node fuses with the ring and the whole
   thing turns to mush, so the .ico's 16px frame gets a simplified, bolder
   mark with no node. 32/48px and every vector/PNG size get the full mark.
2. Breathing room. Scaling the source geometry up left the node almost
   touching the ring. The node now stops well short of it.

Everything is drawn oversized and downsampled with LANCZOS so edges stay clean.

Run: python3 _og/make-favicon.py
"""
from PIL import Image, ImageDraw
import pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / "public"

SUPER = 32                      # supersample factor; art is authored on a 64-unit grid
BG_TOP = (11, 30, 59)           # #0B1E3B
BG_BOT = (6, 18, 42)            # #06122a — matches <meta name="theme-color">
FG = (92, 179, 255)             # #5CB3FF — the on-dark accent from logo-on-dark.svg
CORNER = 14                     # tile corner radius, in grid units

# Full mark: circle + chord + node, with a real gap between node and ring.
FULL = dict(r=17.5, stroke=4.2, x0=21.0, x1=37.0, dot=4.6)
# 16px mark: bolder, no node — detail that small only muddies the shape.
SMALL = dict(r=19.0, stroke=6.5, x0=20.0, x1=44.0, dot=None)


def gradient_tile(px):
    g = Image.new("RGB", (1, px))
    for y in range(px):
        t = y / max(px - 1, 1)
        g.putpixel((0, y), tuple(round(a + (b - a) * t) for a, b in zip(BG_TOP, BG_BOT)))
    return g.resize((px, px), Image.BILINEAR)


def render(geo, rounded, px):
    """Draw one tile at `px` pixels (supersampled internally)."""
    S = 64 * SUPER
    k = SUPER
    img = gradient_tile(S).convert("RGBA")
    d = ImageDraw.Draw(img)
    c = 32 * k
    r = round(geo["r"] * k)
    w = round(geo["stroke"] * k)

    d.ellipse([c - r, c - r, c + r, c + r], outline=FG, width=w)
    x0, x1 = round(geo["x0"] * k), round(geo["x1"] * k)
    d.line([(x0, c), (x1, c)], fill=FG, width=w)
    cap = w // 2                                    # round caps for the chord
    for x in (x0, x1):
        d.ellipse([x - cap, c - cap, x + cap, c + cap], fill=FG)
    if geo["dot"]:
        dr = round(geo["dot"] * k)
        d.ellipse([x1 - dr, c - dr, x1 + dr, c + dr], fill=FG)

    if rounded:
        mask = Image.new("L", (S, S), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, S - 1, S - 1],
                                               radius=CORNER * k, fill=255)
        out = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        out.paste(img, (0, 0), mask)
        img = out
    return img.resize((px, px), Image.LANCZOS)


# .ico — 16px gets the simplified mark, 32/48 the full one.
frames = [
    render(FULL,  rounded=True, px=48),
    render(FULL,  rounded=True, px=32),
    render(SMALL, rounded=True, px=16),
]
frames[0].save(OUT / "favicon.ico", format="ICO",
               sizes=[(48, 48), (32, 32), (16, 16)],
               append_images=frames[1:])

# Apple + manifest icons are full-bleed: iOS and Android apply their own mask.
for name, px in (("apple-touch-icon.png", 180), ("icon-192.png", 192), ("icon-512.png", 512)):
    render(FULL, rounded=False, px=px).convert("RGB").save(OUT / name, "PNG", optimize=True)

for f in ("favicon.ico", "apple-touch-icon.png", "icon-192.png", "icon-512.png"):
    print(f"{f:24} {(OUT / f).stat().st_size/1024:6.1f} KB")
