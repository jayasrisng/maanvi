# Maanvi welcome film — asset handoff

## Current update

The first illustrated film has now been generated and integrated at /?intro=1. See maanvi-runway-generation-brief.md for the completed job, checks and draft limitations. The opening uses bright saffron #FF6A00 from the original PDF vector and finishes within five seconds. The following specifications describe the earlier production handoff and are retained as reference; the film is no longer missing.

## Earlier status

The isolated intro player and logo-to-header handoff are implemented. The cinematic film is **not produced**. Ordinary visits remain unchanged until both asset slots in src/components/maanvi-intro-assets.ts are populated. Visit /?intro=1 for an explicitly labelled logo-handoff rehearsal. This rehearsal does not set maanviIntroSeen.

## Required deliverables

1. public/intro/maanvi-desktop.mp4 — six seconds maximum, H.264, no audio track, fast-start, 1920×1080. Target under 4 MB.
2. public/intro/maanvi-mobile.mp4 — separately composed 1080×1920 film, six seconds maximum, no audio, target under 2.5 MB. Keep the complete silhouette inside the central 85% width. Check 390×844, 393×852 and 430×932 without cropping.
3. Original layered SVG/AI artwork, if available: separate woman, Telugu lettering, English wordmark and accent strokes. The repository currently has only public/logo/maanvi-logo.png; BrandLogo uses that exact artwork as a mask. Do not trace, invent, replace or alter her pose or the lettering without approval.
4. Approved real product references for the five looks, especially the lehenga. These are needed to depict actual Maanvi designs accurately, rather than implying an invented garment is sold by Maanvi.

## Film choreography

0–0.4 seconds: restrained runway, no audience, woman in lightweight cotton.
0.4–3.1: uninterrupted natural walk; cotton → traditional silk → festive → lehenga → bridal. Use pallu/hand/body movement for match transitions; no flashes, whole-screen dissolves or identity changes.
3.1–4.1: naturally decelerate, turn and sit. Chair geometry must follow the source logo silhouette.
4.1–4.9: camera moves around her to a left-facing profile. The background simplifies as fabric becomes graphic.
4.9–5.2: one subtle wink, under 0.3 seconds.
5.2–6.0: seated woman simplifies into the exact supplied artwork; surrounding logo lettering is revealed. End on the complete original mark, perfectly still.

The inspected logo shows a left-facing veiled woman with head gently lowered, bent arms and hands over a raised knee, lower legs/fabric flowing down-left, veil falling behind her on the right. It does not depict a conventional crossed-leg runway-chair pose. Match the source, rather than forcing that pose.

Mobile: start closer, shorter runway, fewer walking steps. Preserve the wardrobe story and prioritise the seated silhouette; simplify camera travel. Do not crop the desktop film.

## Matching the web handoff

Use a solid #c45417 terminal background and #fff8ed logo artwork. Terminal frame must contain ONLY the complete original logo, centered, in its original 2000:1414 aspect ratio. At the actual viewport, its size is min(32vw, 440px) on desktop and min(70vw, 330px) on mobile. Supply approved terminal stills for alignment; letterboxing must use the same saffron.

Because this viewport-relative logo sizing differs from a fixed video frame across aspect ratios, compare rendered end frames at each breakpoint before enabling. If alignment fails, produce additional aspect-ratio variants or deliver the final isolated woman/wordmark as alpha media and original SVG layers. Do not hide mismatches using an abrupt crossfade.

The web layer takes over the matched completed mark, gives it one 1.013-scale breath (300 ms), then docks it to the real header logo while revealing the already-mounted homepage (650 ms). Total sequence is bounded to 7 seconds including loading. Realistic walking, outfit transformations, camera movement, wink and human-to-illustration morph belong in the rendered film; CSS does not fake them.

## Playback and resilience

- First-visit state: localStorage key maanviIntroSeen; written when completed, skipped, hidden or page is left halfway through an enabled film.
- Revisit: no overlay or film download.
- Force: /?intro=1. Reset: localStorage.removeItem("maanviIntroSeen").
- Reduced motion: completed original mark briefly, then reveal with no travel or breath.
- Skip or Escape: graceful exit, no reload. Underlying page is inert until released.
- Resize/orientation change: gracefully finish, rather than crop or restart the woman.
- Failed video, rejected autoplay or slow loading: short original-logo fallback.
- Missing assets: no public first-visit interception; forced replay explicitly labels the placeholder.
- No sound, particles, sparkles, newly drawn logos, or changes to existing homepage scenes.

## Acceptance still needed with finished films

Confirm same woman across all five approved garments, continuous gait, logo-exact seated pose, restrained wink, end-frame alignment, and smooth desktop/mobile handoff. Exercise actual network throttling, corrupt-video failure, first/returning visits, Skip, reduced motion, orientation change, and mid-film refresh with approved media. A logo-only rehearsal cannot validate those cinematic behaviours.

## Checks performed on the framework

Production build and targeted ESLint pass. Browser checks confirmed forced replay, the Skip action, automatic release to the homepage, refresh during rehearsal, and normal visits without an overlay. At 390×844, 393×852 and 430×932 the intro mark fits the viewport and document width equals viewport width. The original logo was visually inspected in the desktop rehearsal. Full enabled-film storage lifecycle, reduced-motion runtime emulation, and throttled/broken-media playback remain unverified until the production media is supplied.
