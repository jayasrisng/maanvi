# Current Maanvi website

This document describes the final checkout. There are no alternate page designs or intro variants to choose between.

## Media and identity

- Original approved intro: `public/intro/maanvi-supplied-source.mp4`, 7.072 seconds, 1280×720 H.264 with AAC soundtrack. Use the complete film on desktop and mobile, contained without cropping. The web logo formation uses the original seated mark, lettering and sparkle assets in the same folder.
- Website mark: `public/logo/maanvi-logo.png`, unchanged supplied artwork. Exact vector exports and the original PNG are in `brand-kit/logos/`. Colour-only variants do not alter path geometry. The source vector's original orange is retained in the supplied export; branded exports use the canonical Sindoor colour.
- Desktop cotton/cloud and silk artwork: `public/images/concepts/`. Mobile uses these same artworks in separate image panels. Full-size scene masters are preserved locally in the ignored `assets/scenes/` folder. They are not required in a fresh clone.
- Homepage collection image: Fall 2026 Living classics finale from the approved catalogue. The owner's former campaign portrait is no longer used or retained as a website asset.
- Catalogue: 20 chapters, 196 AI-created interpretations of designs/fabrics the owner confirmed Maanvi sold. These images do not establish current availability. Keep the on-page disclosure; availability, price and delivery are confirmed personally. The selected original image masters are preserved locally in ignored `assets/collections/`, with their export mapping in `assets/catalogue-masters.json`. The Git-tracked catalogue contains only the fields the website uses; unused thumbnails are not retained.
- Fonts: Fraunces, Manrope, Noto Sans Telugu and Noto Serif Telugu are loaded from Google Fonts. Lepakshi is the preferred Telugu display face when locally available; it is not bundled or assumed installed. Offline/system fallbacks remain available.
- Three.js: MIT-licensed dependency, dynamically loaded only for the desktop decorative textile scene. No third-party cloth texture or old demo scene remains.

## Layout and clarity

The mobile opening shows the cotton/cloud artwork once, followed by a compact text-only cotton introduction, then the silk and Fall 2026 images. The story, visit and private-shopping routes have distinct content. The gallery uses its swipe/arrow controls without a duplicate thumbnail strip. Familiar icon controls have accessible labels and 44px touch targets; booking actions retain clear text. Original Sindoor Orange is used for branded surfaces and primary actions; Ivory gives reading space and Maroon is reserved for text. Intro icons have no default box; initial focus goes to the dialog, with a small circular indicator when keyboard users focus a control.

## Booking and contact

The website questionnaire hands the selected preferences to the configured Calendly event. `VITE_CALENDLY_URL` defaults to the existing 30-minute event. A booking is complete only after the visitor confirms a time in Calendly. The website does not claim to collect payment or guarantee an appointment fee.

WhatsApp, Instagram, email and maps retain the existing Maanvi contact destinations. The nonfunctional newsletter form was removed; the footer now links to the real WhatsApp conversation.

The site uses the external Calendly handoff and direct contact links; it has no payment-credit backend. The unused, unconfigured webhook and SQL template were removed. No production environment variables were configured for that integration, and no database data or schema was changed.

## Verification

`npm run check` verifies imports, the 196 deployable catalogue image references, approved intro configuration and responsive layout contracts. `npm run lint` and `npm run build` check TypeScript, React and production compilation.

These checks are not visual browser verification. Keep browser previews local, as requested by the owner. Verify mobile widths 320, 375, 390, 430 and 760px, desktop 1024 and 1440px, both languages, the menu, collection swipe and booking steps in the local preview. Physical iOS/Android audible-autoplay behaviour remains browser-dependent.
