# Supplied welcome film

The active intro uses the supplied `maanvi logo.mp4`, archived as
`public/intro/maanvi-supplied-source.mp4`, followed by the original PDF-derived
logo in bright saffron and the single-line tagline `మన మాన్వి. మన వేడుక.`.

Run `node scripts/render-supplied-intro.cjs` to render both versions. The script
requires ffmpeg, the locally bundled sharp runtime, and Kohinoor Telugu.

- Desktop: 1920 × 1080, approximately 7.68 seconds (upscaled source, native-resolution vector ending).
- Mobile: 1080 × 1920, approximately 7.68 seconds; central square footage
  framed with ivory above and below to preserve the figure.
- Both: H.264 MP4 with original soundtrack and a quiet synthesized sparkle/whoosh, yuv420p, fast-start metadata, a short crossfade into
  the enlarged seated figure, a 0.65-second zoom out with immediate lettering formation, followed by the single-line tagline.

`MaanviIntro` selects the portrait film at widths up to 760px. It retains Skip,
Escape, first-visit storage, an audio toggle with muted-autoplay fallback, `?intro=1` replay, scroll/focus restoration, and a
static logo fallback for reduced motion, playback failures, or slow loading.

Validation: production build, targeted ESLint, ffprobe duration/codec checks,
and rendered contact-sheet inspection passed. Physical iOS/Android testing
has not been performed.

The 2.9–3.5-second source segment (red bridal flash before blue) is removed.
The source transitions to the vector ending at 5.9 seconds, eliminating the
static seated hold. The original audio has a matching cut and a faded tail;
`maanvi-sparkle.wav` adds the short ending accent.
