# Maanvi

**A warm, bilingual brand site for a family-owned saree house in Vijayawada.**

Maanvi is a React/Vite website for presenting the store’s story, collections, and visit information with a visual language rooted in Telugu celebration, saree culture, and family-owned retail.

The site replaces a generic ecommerce feel with a slower editorial experience: story, memory, celebration, and trust come before product-grid mechanics.

## What it includes

- Landing page with Telugu/English brand messaging.
- Story page with founder note and family-owned positioning.
- Collections page for bridal, festival, and classic saree categories.
- Visit page with address, maps links, social links, and anniversary update.
- Reusable layout shell, decorative muggu background elements, and brand color system.

## Routes

```text
/              Home page
/our-story     Brand story and founder note
/collections   Saree collection categories
/visit         Store visit and contact information
```

## Tech stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- gh-pages deployment script

## Project structure

```text
src/
  components/layout/    Page shell and decorative background components
  pages/                Home, story, collections, and visit pages
  styles/               Tailwind/global styling
public/
  images/               Hero, story, and collection imagery
  logo/                 Maanvi logo assets
```

## Local development

```bash
npm install
npm run dev
```

Build the site:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Deploy with the configured GitHub Pages script:

```bash
npm run deploy
```

## Case study

See [docs/case-study.md](docs/case-study.md) for design and implementation notes.

## Media

Media notes and capture targets are tracked in [media/README.md](media/README.md).

## Future work

- Replace placeholder social links with final destinations or remove them.
- Add image optimization and alt-text review for all gallery assets.
- Add responsive QA screenshots for mobile/tablet/desktop.
- Add structured metadata for sharing and search previews.
- Add accessibility pass for contrast, focus states, and language switching.
