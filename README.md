# Maanvi

**A warm, bilingual brand site for a family-owned saree house in Vijayawada.**

Maanvi is a React/Vite website presenting the store's story, private saree-shopping experience and visit information through a visual language rooted in Telugu celebration, saree culture and family-owned retail.

## What it includes

- Telugu and English brand messaging with genuine Maanvi imagery.
- Private-viewing questionnaire and Calendly handoff.
- Archive-inspired browsing that does not imply live inventory.
- Bridal, saree guide, story and verified visit pages.
- Provider-neutral secure-payment integration point.
- Responsive layouts, structured metadata and direct-route support.

## Routes

```text
/                    Home
/archive             The Archive
/private-shopping    Private Shopping
/bridal              Bridal
/saree-guide         Across India
/our-story           Our Story
/visit               Visit Maanvi
/book                Private-viewing questionnaire
```

## Local development

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` to connect approved booking, contact and hosted-checkout URLs. Never put secret credentials in `VITE_` variables.

## Verification

```bash
npm run build
npx eslint src --max-warnings=0
npm run preview
```

Vercel rewrites public page routes to the SPA while preserving `/api/*` and static assets. Integration setup is documented in `docs/`, the case study is in [docs/case-study.md](docs/case-study.md), and media notes are in [media/README.md](media/README.md).

## Deployment

Production deployment is connected to the repository through Vercel. The custom domain remains managed in the Vercel project rather than through a repository `CNAME` file.
