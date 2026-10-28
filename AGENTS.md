# Maanvi — final approved website

This checkout contains one website. Maintain this version; do not reconstruct or resurrect older website designs from Git history, past chats or deleted drafts unless the owner explicitly asks.

## Approved experience

- The homepage opens with the original, uncut `public/intro/maanvi-supplied-source.mp4`: a walking woman becomes the seated Maanvi mark. Preserve the original footage, soundtrack, exact logo and Telugu tagline.
- Music is enabled by default. Attempt audible playback, use muted playback only when the browser requires it, and restore sound on interaction. Keep the home, sound and playback icons. Do not add a text “Skip intro” button.
- Desktop: the cotton/cloud/loom → silk → Fall 2026 scroll journey.
- Mobile, at 760px and below: separate, naturally scrolling image/text panels. Never apply the desktop sticky canvas, oversized blur, fog masks or absolute text positioning to mobile.
- After silk: the Fall 2026 “Living classics” collection. Do not restore the owner's yellow/green saree portrait here.
- The collection catalogue opens at Fall 2026. Preserve the existing image-interpretation disclosure, collection history, Telugu/English switching, booking and contact routes.

## Source of truth

- `brand-kit/README.md`: approved visual identity and original-logo rules.
- `brand-kit/tokens.css` and `brand-kit/tokens.json`: canonical colours and type roles. The site imports the CSS directly.
- `src/styles/site.css`: shared website styles.
- `src/styles/journey.css`: desktop journey and accessible stacked fallback.
- `src/styles/mobile.css`: mobile layout, loaded last.
- `src/components/maanvi-intro.css`: intro-only styles.
- `src/data/photobook.json`: the 20 chapters and 196 approved image interpretations.
- `assets/collections/`: original masters corresponding exactly to catalogue entries. These are relevant website sources, not alternative websites. Do not delete them as unused public assets.

Do not add competing theme files, old page implementations, alternate intro cuts, mock website previews or new brand guides. Update these canonical files instead. Do not invent stock availability, appointment prices or checkout functionality.

## Verification and delivery

Run `npm run check`, `npm run lint`, and `npm run build`. Keep previews local unless the owner authorizes otherwise. Opening a local preview does not authorize sending unpublished code to cloud browsers or tunnels. Do not claim visual browser verification when only source/build checks were run. Commit when requested; do not push or deploy without authorization.
