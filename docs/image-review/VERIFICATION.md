# Website verification — 28 September 2026

- Production build: TypeScript and Vite pass.
- ESLint: changed React/TypeScript components pass.
- Git whitespace check: passes.
- Chrome desktop (1440 × 1000) and mobile (390 × 844): no runtime errors or horizontal overflow.
- Home: WebGL fabric renders; loom entrance appears and dismisses; motion can pause/resume.
- Archive: all 20 chapter counts match the 196-image data set; year/season changes reset to the first spread; previous/next boundaries work; thumbnails jump to spreads; enlargement opens a modal and Escape closes it.
- Saved chapter survives reload.
- Homepage → archive, mobile menu → archive and disclosure → booking all work.
- Scroll reveal reaches full visibility.
- Reduced-motion preference skips the entrance and hides the motion toggle.
- Simulated WebGL unavailability leaves the static cloth fallback and navigation usable.
- Images are served locally as WebP derivatives and small thumbnails. The complete collection is approximately 48 MB; full-size images load only for the selected spread. Three.js loads as a separate approximately 192 KB gzip chunk.

The first scroll-reveal assertion sampled the animation at opacity 0.987. The check was changed to wait for the visible end state and then passed. No product-data submission, appointment booking, or deployment was performed during testing.

Tooling notes: agent-browser CLI was not installed; used bundled Playwright with installed Chrome. Build retains a non-blocking Three.js chunk-size notice and the existing outdated Browserslist-data notice.
