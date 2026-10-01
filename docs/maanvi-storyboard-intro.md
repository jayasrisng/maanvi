# Storyboard intro — current implementation

The active `MaanviIntro` uses the supplied 1536×1024 storyboard through CSS image windows. Earlier video drafts and their production notes are retained but are not used by the current intro. The rest of the website was not redesigned.

## Sequence

Seven looks run from 0–4.5 seconds: clouds, everyday flowers, work/education, heritage, celebration, evening, bridal. Each portrait has a restrained 3.5% forward drift, matching central framing, a soft dissolve, and a directional fabric-light wipe. A softly blurred environmental layer fills wide viewports. Mobile keeps the full portrait visible.

4.5–5.25 seconds presents the actual logo's seated woman and surrounding character through a clipping mask. 5.25–6.65 reveals the complete original vector, then the overlay fades out by 7 seconds. No lettering or seated figure is redrawn. The approximate logo shapes in storyboard panels 8–10 are intentionally not used. The existing original saffron vector retains the source PDF geometry.

This is an animated static-artwork sequence, not generated character footage. The provided walking poses retain their original head directions. A natural walk cycle, left turn, lowering into the seated pose, and wink are not fabricated from the stills; the bridal-to-logo transition is an editorial dissolve. Higher-resolution/layered character artwork or actual footage would be needed to animate those actions faithfully.

## Behavior

- First homepage visit plays once per browser storage profile, using `maanviIntroSeen`.
- Playback start marks the intro seen, so refreshing midway does not replay it.
- `/?intro=1` forces replay; remove the localStorage key to reset first-visit behavior.
- Preloads storyboard and logo before starting the seven-second timeline.
- After 1.4 seconds without assets, uses the brief logo fallback. Loading can add up to 1.4 seconds before the sequence.
- Reduced motion displays the static original logo briefly, then fades to the homepage.
- Skip and Escape release the page; underlying content is inert during the intro, with focus restored afterward.
- No audio, added dependencies, or video downloads. Old draft video files are retained.

## Verification

Production build and targeted ESLint passed. Local Chrome/Playwright verified first visit, completed sequence, returning visits, forced replay, Skip, Escape, mobile width at 390×844, reduced motion, failed-storyboard fallback, inert cleanup, and no JavaScript runtime errors. Desktop and mobile screenshots were visually reviewed. The agent-browser CLI was unavailable, so verification used the bundled Playwright runtime with installed Chrome.
