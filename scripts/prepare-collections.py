"""Regenerate only the final catalogue derivatives from their selected masters.
Requires Pillow; never changes the catalogue or chooses alternative images.
"""
from pathlib import Path
import json
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
catalogue = json.loads((root / 'src/data/photobook.json').read_text())
for chapter in catalogue:
    for item in chapter['images']:
        source = root / item['source']
        with Image.open(source) as original:
            image = ImageOps.exif_transpose(original).convert('RGB')
            for key, size, quality in [('src', (1000, 1400), 84), ('thumbnail', (240, 336), 75)]:
                output = root / 'public' / item[key].lstrip('/')
                output.parent.mkdir(parents=True, exist_ok=True)
                derivative = image.copy()
                derivative.thumbnail(size)
                derivative.save(output, quality=quality, method=6)
print(f"Prepared {sum(len(c['images']) for c in catalogue)} catalogue images and thumbnails.")
