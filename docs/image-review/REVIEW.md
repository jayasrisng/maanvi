# Maanvi image review — 28 September 2026

## Scope and limits

248 existing raster source assets were decoded and checked for dimensions and exact duplicates. All seasonal contact sheets, both diversity sheets, the 15 watercolours, and all existing website/source images were visually reviewed for overall style, composition, repetition, legibility and conspicuous anomalies. This is a contact-sheet editorial review, not a pixel-level anatomy certification or independent verification against historical stock. The owner's statement that the archive represents previously sold designs/fabrics informs the disclosure. Exact original products and sale dates cannot be established from generated images alone.

- 197 seasonal originals exist, not the 200 previously claimed.
- 26 diversity candidates exist; all 26 replace matching original entries in the web catalogue. Original files are preserved.
- 15 standalone watercolours: cohesive medium, but repetitive slim/young casting; retained as unassigned concepts, not inserted into dated collections without date evidence.
- 10 other assets: existing campaign source/export, collection cards, hero images, founders photo, invitation, and logo.
- All 248 decode successfully. No byte-identical duplicates. Similar visual identities still recur across generated scenes.
- `inventory.json` records source path, dimensions, size and SHA-256. Generated contact sheets in this directory reflect files actually present; old contact sheets can show missing files.

## Decisions

The website now contains 196 archive illustrations in 20 chapters. Each image has AI-aware alt text; chapter headings identify the artistic medium, and the disclosure appears immediately below the book and homepage book preview. Years are collection chapters, not dates photographs were taken. Current stock and precise details are confirmed on a video viewing.

| Chapter | Review finding | Web action |
|---|---|---|
| 2017 Spring | Soft watercolour palette; repeated young/slim casting; original slots 05, 06, 07 missing | Use 7 available entries; replace Uppada and Mangalagiri with existing diversity candidates |
| 2017 Fall | Consistent muted evening light; homogeneous solo portraits | Replace Gadwal and Venkatagiri with elder/fuller-bodied candidates |
| 2018 Spring | Consistent botanical warmth; repeated faces | Replace Sambalpuri and Kalamkari |
| 2018 Fall | Consistent miniature borders and landscape; dense small figures | Replace Paithani and Banarasi; retain as illustrations |
| 2019 Spring | Consistent charcoal backgrounds/colour accents | Replace Chikankari and dancing Mysore crepe |
| 2019 Fall | Coherent saturated collage; intentionally stylized anatomy | Replace Bandhani and Pochampally |
| 2020 Spring | Coherent domestic photographic treatment; unusually polished/repeated faces | Replace Chettinad and Kanchi cotton; label photographic interpretation |
| 2020 Fall | Coherent gilded palette; small hand/jewelry details remain interpretive | Replace Muga and Muga Paithani |
| 2021 Spring | Soft photographic palette; repeated young faces | Replace Organza and Pashmina; label photographic interpretation |
| 2021 Fall | Consistent dark Art Deco world | Replace Mashru and green Banarasi |
| 2022 Spring | Consistent paper/collage backgrounds | Replace Tussar and linen tissue |
| 2022 Fall | Consistent graphic linocut; stylized hands/feet | Replace Batik and Ikat |
| 2023 Spring | Coherent architecture and light; repeated solo identity | Replace Silk Kota and Mal cotton |
| 2023 Fall | Strong fresco consistency and broader casting | Retain |
| 2024 Spring | Consistent mineral pigment/mountain setting and varied casting | Retain |
| 2024 Fall | Consistent blue botanical setting; deliberately dark mood | Retain |
| 2025 Spring | Consistent manuscript palette; faces naturally turned away/cropped | Retain; default opening chapter |
| 2025 Fall | Coherent dark oil treatment; facial crops consistent with direction; dark detail visibility | Retain with enlarge control; do not describe as product photography |
| 2026 Spring | Slot 03 has a conspicuous blurred black vignette and orange watermark unlike the chapter | Withhold `03-kanchi-kota-lime.png`; retain other 9 |
| 2026 Fall | Coherent studio palette and broader casting, but still very polished synthetic skin | Retain with explicit AI labeling; no live-inventory claim |

## Existing website images

- Salt-flat portrait: stronger sense of a lived moment than the campaign concept; now a supporting memory image, not distorted by the 3D cloth effect.
- Founders: retain existing family image and identity caption; do not replace with synthetic people.
- Bridal/festival/classics: retain existing product compositions. Their orange framing is embedded in the source; no destructive crops or retouching were made.
- `visit/store.jpg` is an anniversary invitation, not a storefront. Its existing truthful alt text is retained.
- Existing generated editorial hero/source: coherent campaign concept but not used as historical/product evidence or in the new hero.
- Logo: retain exact supplied mark, including orange ground.

## Remaining limits

Generated faces, textile motifs, jewelry and fingers can still have subtle inconsistencies at full resolution. Changing the medium label or adding diversity does not make them documentary photographs. No originals were regenerated, beautified, or claimed to be artifact-free. This pass reduces repetitive presentation through the existing reviewed replacements and withholds the clearest style outlier. Original product matching would require the underlying product photographs or stock records.

## Rebuilding

Run `scripts/prepare-photobook.py` with Pillow installed. It builds web and thumbnail derivatives, preserves originals, applies the explicit replacement map, and writes `src/data/photobook.json`. Derivatives are locally hosted and only the selected spread is loaded at full size. Paths to replacements remain in the data for traceability.
