"""Re-export final web pictures from an optional, ignored local master archive.
Requires Pillow. A fresh clone does not need these originals to build the site.
"""
from pathlib import Path
import json

root = Path(__file__).resolve().parents[1]
manifest = root / 'assets/catalogue-masters.json'
if not manifest.exists():
    raise SystemExit('Original artwork is kept locally, outside Git. Supply assets/catalogue-masters.json and its master files to regenerate web images.')

from PIL import Image, ImageOps

images = json.loads(manifest.read_text())['images']
for item in images:
    source = root / item['source']
    output = root / 'public' / item['output'].lstrip('/')
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        image.thumbnail((1000, 1400))
        output.parent.mkdir(parents=True, exist_ok=True)
        image.save(output, quality=84, method=6)
print(f'Prepared {len(images)} web pictures; no unused thumbnails created.')
