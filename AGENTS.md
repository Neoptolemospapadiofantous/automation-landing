<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Architecture notes for the landing site

## What this repo is

Public marketing site for Flowstack. Static-first (Next 16 App Router,
all pages prerendered + ISR). No route handlers, no request-time server
state — the only runtime dependency on the dashboard at
`/home/theone/automation_dashboard` is visitor-facing links (register /
login) and the chat widget script.

The live-platform-metrics pipeline (dashboard `/api/public/stats` → an
in-process SSE broadcaster → `<LiveStat>` islands on the homepage's
"Live across the platform" strip) was **removed on 2026-08-01** along
with its `DASHBOARD_API_URL` env var, the Forge site's copy of it, and
the Nginx SSE location block. Don't reintroduce a browser-visible
dashboard URL if it ever comes back: the SSE proxy existed so the
browser never saw `DASHBOARD_API_URL`.

## Hard rules — don't break these

1. **Nothing renders unverified operator-authored text as HTML.** If a
   dashboard-sourced string is ever displayed again, render it as
   `{value}` — never `dangerouslySetInnerHTML`. Free-form columns on the
   dashboard side would otherwise become stored XSS.
2. **No raw platform counts in marketing copy.** The dashboard's
   bucketed `display.*` strings existed so small early-stage numbers
   stayed hidden; the same honesty rule applies to any number we put on
   the page by hand.
3. **Keep the site prerenderable.** Every page is static + ISR today and
   PM2 runs a single instance; don't add per-process in-memory state
   that assumes one warm process.

## Homepage motion (GSAP + Lenis)

The homepage's depth comes from the page itself, not a 3D backdrop (a
three.js background was tried and dropped on 2026-09-29). `Hero` and
`EnquiryStory` place the product (chat window, messages, lead card, calendar
card from `src/components/motion/product-bits.tsx`) on layers at different
depths and drive them with GSAP ScrollTrigger.

- **One clock.** `SmoothScroll` makes GSAP's ticker drive Lenis and calls
  `ScrollTrigger.update` on every Lenis frame. Every scroll animation is a
  timeline with `scrub: true`, so it is always exactly where the scroll is.
  Don't add a second rAF loop or a separate easing for scroll-driven motion:
  two clocks fighting is what made the old backdrop stutter.
- **Sharp text: keep layers shallow.** Stages use a 2400px perspective and
  layers stay within `translateZ` ≈ 180px (about 8% enlargement). A layer
  pushed further forward is rasterised at its CSS size and then scaled up,
  which blurs its text. Make depth with parallax travel and shadows instead.
  Don't `scale` a stage holding text, for the same reason.
- **Reduced motion and phones.** Both components use `gsap.matchMedia`:
  reduced motion gets the finished composition with no pin or scroll
  animation; phones get half the depth, and the story shows only the
  active step so the scene stays on screen.
- Product mocks are illustrative and say `example` in the window (rule 2).

## Environment

```bash
cp .env.example .env.local
# NEXT_PUBLIC_DASHBOARD_URL=http://localhost:8000  (visitor-facing)
```

## Running locally

```bash
pnpm dev
# http://localhost:3000
```
