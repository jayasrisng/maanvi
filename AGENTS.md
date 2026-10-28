# Maanvi — final approved website

This checkout contains one website. Maintain this version; do not reconstruct or resurrect older website designs from Git history, past chats or deleted drafts unless the owner explicitly asks.

## Approved experience

- The homepage opens with the original, uncut `public/intro/maanvi-supplied-source.mp4`: a walking woman becomes the seated Maanvi mark. Preserve the original footage, soundtrack, exact logo and Telugu tagline.
- Music is enabled by default. Attempt audible playback, use muted playback only when the browser requires it, and restore sound on interaction. Keep the home, sound and playback icons. Do not add a text “Skip intro” button.
- Desktop: the cotton/cloud/loom → silk → Fall 2026 scroll journey.
- Mobile, at 760px and below: separate, naturally scrolling image/text panels. Never apply the desktop sticky canvas, oversized blur, fog masks or absolute text positioning to mobile.
- After silk: the Fall 2026 “Living classics” collection. Do not restore the owner's yellow/green saree portrait here.
- The collection catalogue opens at Fall 2026. Preserve the existing image-interpretation disclosure, collection history, Telugu/English switching, booking and contact routes.

## Clarity and restraint

- Do not repeat the same editorial photo in adjacent sections. The mobile opening uses the cloud/loom artwork once; the cotton introduction that follows is a compact text panel.
- Keep story, store visit and private-shopping content on their own pages instead of repeating the full three-section sequence on each route.
- Use compact, labelled icon controls for familiar actions (menu, social links, save, close, previous/next). Keep meaningful text on booking and other important decisions. Preserve 44px touch targets even when the visible control is small.
- Keep the original Sindoor Orange (#FF4F00) on branded coloured surfaces, including the footer, booking panel and primary actions. Do not substitute Maroon branding. Use Ivory for breathing room and Maroon for reading text. Avoid duplicate gallery thumbnail strips and repeated footer prompts.
- Intro controls are plain orange icons without default boxes. Focus the dialog on entry, not the home button. Keep a small circular indicator only for keyboard focus and preserve the invisible 44px touch target.

## Source of truth

- `brand-kit/README.md`: approved visual identity and original-logo rules.
- `brand-kit/tokens.css` and `brand-kit/tokens.json`: canonical colours and type roles. The site imports the CSS directly.
- `src/styles/site.css`: shared website styles.
- `src/styles/journey.css`: desktop journey and accessible stacked fallback.
- `src/styles/mobile.css`: mobile layout, loaded last.
- `src/components/maanvi-intro.css`: intro-only styles.
- `src/data/photobook.json`: the 20 chapters and 196 approved image interpretations.
- `assets/`: ignored local archive of original artwork, kept off GitHub and out of deployments. The site must build without this folder. Keep local originals safe; never stage them. The optional `assets/catalogue-masters.json` maps the collection masters to their web exports.
- Keep only the 196 displayed collection images in `public/images/archive/`. Do not generate or commit thumbnails unless a real website feature uses them. Unconfigured backend templates, draft renders and unused assets do not belong in this repository.

Do not add competing theme files, old page implementations, alternate intro cuts, mock website previews or new brand guides. Update these canonical files instead. Do not invent stock availability, appointment prices or checkout functionality.

## Verification and delivery

Run `npm run check`, `npm run lint`, and `npm run build`. Keep previews local unless the owner authorizes otherwise. Opening a local preview does not authorize sending unpublished code to cloud browsers or tunnels. Do not claim visual browser verification when only source/build checks were run. Commit when requested; do not push or deploy without authorization.
