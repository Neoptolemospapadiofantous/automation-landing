# automation-landing

The public site for Flowstack: **flowstack.run** (English) and **flowstack.run/el**
(Greek). It sells one service, the chat assistant that answers every enquiry on a
client's site and files it into the calendar, sheet or CRM they already use, plus
a built-to-order phone assistant. Sign-up, billing and the product itself live in
the dashboard repo (`automation_dashboard`, app.flowstack.run); this repo only
links to it and embeds its chat widget.

## Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui
- Every page prerendered; no route handlers and no request-time state
- Homepage motion: GSAP ScrollTrigger + Lenis on one shared clock
  (`src/components/motion/`)
- Copy and site structure from one source, `src/lib/content.ts`

## Running locally

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint         # eslint
pnpm build        # production build, the same command CI runs
```

The quality gate is `pnpm lint && pnpm build` (`ecosystem check landing` on the
studio box).

## Deploying

Push to `main`. `.github/workflows/deploy.yml` builds on a GitHub runner, copies
the build into a new release directory on the Forge box, switches the release
symlink and restarts PM2. The box never builds: at 961 MB of RAM, shared with
the dashboard's MySQL and PHP, on-box builds ran it out of memory. Forge Quick
Deploy for this site stays off. Details: `docs/deploy-forge.md`.

## Docs

| File | What it covers |
|---|---|
| `AGENTS.md` (read by `CLAUDE.md`) | Architecture notes and the hard rules for anyone editing the site |
| `docs/deploy-forge.md` | Server, Nginx, PM2, environment variables |
| `docs/pricing-and-launch.md` | Plans, credits and the margin model |
| `docs/seo-keywords.md` | Keyword research (dated June 2026; see its banner) |
| `docs/counsel-handover.md`, `docs/legal/` | The four legal pages and their review trail |
| `branding/` | Tokens, logo and social assets (`tokens.css` is canonical) |
