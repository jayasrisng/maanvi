# Maanvi

The final bilingual website for Maanvi, a family-owned saree house in Vijayawada. This is the single maintained website; retired page designs, alternate intro cuts and review drafts have been removed.

## Approved experience

The original walking-to-seated-logo film plays on homepage entry, with music enabled by default and home/sound/playback icons. Browsers that block audible autoplay receive muted video until a user interaction. `?intro=1` replays the film; `?intro=0` enters the website directly.

Desktop keeps the cotton/cloud/loom → silk → Fall 2026 scroll journey. Mobile uses its own stacked image-and-text panels without fog, overlays or a sticky canvas. The collection starts at Fall 2026, with all 20 historical chapters accessible.

## Project map

| Location | Purpose |
| --- | --- |
| `src/App.tsx` | Current routes, shared navigation and footer |
| `src/components/` | Only components used by the final website |
| `src/styles/site.css` | Shared styles |
| `src/styles/journey.css` | Desktop scroll journey |
| `src/styles/mobile.css` | Dedicated mobile panels and responsive pages |
| `brand-kit/` | Original logo assets, colour/type tokens, identity guide and visual preview |
| `src/data/photobook.json` | 20 chapters, 196 approved image interpretations |
| `public/` | Only deployable website assets |
| `assets/collections/` | Original masters for those 196 catalogue images |
| `assets/scenes/` | Original masters for the cotton and silk artwork |
| `docs/website.md` | Current integrations, media notes and verification limits |
| `AGENTS.md` | Instructions to preserve this approved website in future edits |

## Development

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The brand kit preview is available at `/brand-kit/index.html` in the development server, or by opening `brand-kit/index.html` as a local file.

```sh
npm run check
npm run lint
npm run build
npm run preview
```

To regenerate web-sized collection images from the retained source masters, run `python3 scripts/prepare-collections.py` with Pillow installed. The catalogue, selected source images and output filenames are preserved.

## Routes

`/`, `/archive`, `/book`, `/bridal`, `/saree-guide`, `/private-shopping`, `/our-story`, `/visit`, `/contact`, `/services`, `/company`, `/careers`, `/shipping`, `/returns`, `/privacy`, `/terms`, `/cookies`.

Production hosting is the existing Vercel project at `maanvi.website`. A local build or commit does not publish it. Copy `.env.example` to `.env.local` only when configuring integrations; do not store secret keys in `VITE_` variables.
