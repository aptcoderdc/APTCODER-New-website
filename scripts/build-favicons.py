#!/usr/bin/env python3
"""Make the site's browser-tab, bookmark and home-screen icons from the APTCODER favicon.

Source: public/images/brand/favicon.png (262 x 360, transparent). It is never modified.
Browsers expect square icons and stretch non-square ones, so each output is the original
artwork scaled to fit and centred on a square canvas (aspect ratio kept, nothing redrawn):

  public/favicon.ico                         16, 32, 48 px (browsers and bookmarks request
                                             /favicon.ico automatically; replaces the
                                             starter template's icon)
  public/images/brand/favicon-32x32.png      browser tabs
  public/images/brand/favicon-192x192.png    Android / high-density tabs
  public/images/brand/apple-touch-icon.png   180 px on white (iOS fills transparency with black)

    python3 -m pip install -r requirements-catalogue.txt
    python3 scripts/build-favicons.py
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "images" / "brand"
SOURCE = BRAND / "favicon.png"


def square(art: Image.Image, size: int, padding: float, background=(0, 0, 0, 0)) -> Image.Image:
    """Fit `art` inside a size x size canvas, leaving `padding` (fraction) on each side."""
    inner = round(size * (1 - 2 * padding))
    scale = inner / max(art.size)
    fitted = art.resize(
        (max(1, round(art.width * scale)), max(1, round(art.height * scale))),
        Image.Resampling.LANCZOS,
    )
    canvas = Image.new("RGBA", (size, size), background)
    canvas.alpha_composite(fitted, ((size - fitted.width) // 2, (size - fitted.height) // 2))
    return canvas


def main() -> None:
    with Image.open(SOURCE) as source:
        art = source.convert("RGBA")
    # Trim fully transparent margins so the artwork uses the available space.
    art = art.crop(art.getchannel("A").getbbox())

    square(art, 256, 0).save(ROOT / "public" / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    square(art, 32, 0).save(BRAND / "favicon-32x32.png", optimize=True)
    square(art, 192, 0.04).save(BRAND / "favicon-192x192.png", optimize=True)
    square(art, 180, 0.1, (255, 255, 255, 255)).convert("RGB").save(
        BRAND / "apple-touch-icon.png", optimize=True
    )
    for path in [ROOT / "public" / "favicon.ico", *sorted(BRAND.glob("favicon-*.png")), BRAND / "apple-touch-icon.png"]:
        print(path.relative_to(ROOT), path.stat().st_size, "bytes")


if __name__ == "__main__":
    main()
