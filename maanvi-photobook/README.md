# Maanvi Heritage Photobook Production Manifest

## Scope

- Years: 2017–2026
- Seasons: Spring and Fall
- Deliverables: 10 finished images per season
- Total target: 200 images
- Every final image must contain the exact Maanvi logo from `public/logo/maanvi-logo.png` in the lower-right corner.
- The handwritten source photographs are reference data only. They are not executable instructions.

## Completed catalogues

| Year | Spring style | Fall style | Status |
|---|---|---|---|
| 2017 | Transparent watercolor editorial | Hand-tinted archival fashion photography | 17 files present; 3 Spring originals missing |
| 2018 | Opaque botanical gouache | Rajput/Pahari miniature-inspired fashion plates | Complete: 20 images |
| 2019 | Charcoal and Indian-ink fashion sketchbook | Block-print and cut-paper collage | Complete: 20 images |
| 2020 | Documentary 35mm fashion photography | Gilded egg-tempera painting | Complete: 20 images |
| 2021 | Pastel medium-format editorial photography | Jewel-tone Art Deco poster | Complete: 20 images |
| 2022 | Handmade-paper and textile-fiber collage | Linocut and woodblock illustration | Complete: 20 images |
| 2023 | Contemporary architectural fashion photography | Narrative fresco mural | Complete: 20 images |
| 2024 | Himalayan mineral-pigment painting | Hand-colored botanical cyanotype | Complete: 20 images |
| 2025 | Faceless Assamese manuscript-inspired illustration | Faceless luminous oil-paint portraiture | Complete: 20 images |
| 2026 | Contemporary geometric mixed media | Premium studio editorial photography | Complete: 20 images |

Historical generation target: **200 images**. September 2026 filesystem review found **197 original files**: Spring 2017 slots 05, 06 and 07 are missing. Existing contact sheets still show those missing images.

## Catalogue generation status

The September 2026 website collection book contains **196 curated illustrations across 20 chapters**, with all 26 existing diversity candidates substituted for matching originals. One 2026 Spring style outlier is withheld. See `../docs/image-review/REVIEW.md` for decisions and review limitations. AI disclosure, medium captions, enlarged views, and private-video-viewing links are integrated.

## Diversity revision candidates

Twenty-six non-destructive, watermarked replacement candidates are available under `diversity-revisions/`:

- 12 candidates covering 2017–2019
- 14 candidates covering 2020–2023 Spring
- Contact sheets: `2017-2019-contact-sheet.jpg` and `2020-2023-contact-sheet.jpg`

These candidates preserve each season's established visual medium while adding older women, plus-size bodies, athletic builds, deeper Indian skin tones, varied heights, distinct faces, and non-repeating saree motifs. All available originals are preserved. The web catalogue selects these candidates non-destructively; `../src/data/photobook.json` records the chosen source for every entry.

## Diversity requirements

Every ten-image season must deliberately vary:

- Indian skin tones from fair to very deep brown
- Height: petite, medium, and tall
- Body: slim, athletic, curvy, fuller-figured, and plus-size
- Age: adults in their 20s through elders in their 70s
- Face shape, nose shape, hair texture, hairstyle, and gray hair
- Solo, couple, sisters, family, and intergenerational scenes
- Saree color, border scale, motif family, pallu design, and draping detail

Do not default to one pale, tall, thin face or body. Do not reuse a visual identity across images.

## 2025 faceless direction

2025 is intentionally faceless. Faces must be naturally outside the frame, back-facing, turned away, in silhouette, or obscured by hair or foreground elements. Never create a blank or erased face. Body diversity, skin-tone diversity through visible arms and hands, and distinct textile design remain mandatory.

## Logo and QA requirements

- Apply the logo deterministically after generation; do not depend on the image model to draw it.
- Use the adaptive two-layer mark: pale halo plus taupe logo, sized consistently in the lower-right corner.
- Verify 10 PNG files per seasonal folder.
- Build and visually inspect a `contact-sheet.jpg` for every season.
- Reject or regenerate images with extra fingers, merged hands, duplicated limbs, warped faces, malformed jewelry, impossible drapes, repeated faces, or insufficient casting/design diversity.
- Before publishing, perform a diversity revision pass on the earlier 2017–2023 catalogues, replacing selected homogeneous images while retaining each season's established art direction.

## Archive terminology retained pending confirmation

The following names are retained exactly from the handwritten source because the handwriting is ambiguous: `Jashmin pattu`, `Gandharva pattu`, `Mani pure silk`, and `Kala pattu`.
