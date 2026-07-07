<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Architecture notes for the landing site

## What this repo is

Public marketing site for Flowstack. Static-first (Next 16 App Router,
all pages prerendered + ISR), with one streaming dynamic route
(`/api/stats/stream`) for live platform metrics from the dashboard at
`/home/theone/automation_dashboard`.

## The public-stats pipeline (live data on the landing site)

The dashboard exposes `GET /api/public/stats`. We don't poll it from the
browser — that would either flood the dashboard or feel laggy. Instead
we run a **module-level singleton broadcaster** in the Next.js Node
process: ONE poller fetches the dashboard every 5s, ALL visitor
`EventSource` connections subscribe to that singleton. Dashboard sees
~1 request per 5s regardless of how many visitors are on the site.

Files:

- `src/lib/stats.ts` — typed `PlatformStats`, `getPlatformStats()` (ISR,
  for first paint), `fetchPlatformStatsFresh()` (no-cache, for the
  broadcaster).
- `src/lib/stats-broadcaster.ts` — the singleton. Poll loop +
  subscriber set + diff-and-broadcast + idle-stop.
- `src/app/api/stats/stream/route.ts` — SSE route handler
  (`runtime = 'nodejs'`). Subscribes the request, sends initial event,
  heartbeats every 30s, cleans up on disconnect.
- `src/components/live-stat.tsx` — `"use client"` island that consumes
  the SSE. Takes server-rendered `initial` prop so first paint is
  correct (no flash, SEO-friendly).
- `src/components/sections/live-outcomes.tsx` — server component that
  renders the strip with one `<LiveStat>` per cell.

(The founder-slots scarcity callout was removed 2026-07-07 — the
dashboard's `founder_slots_*` / `featured_proof` fields are still in
the API payload and `PlatformStats` type, just no longer rendered.)

Full design with sequence diagrams lives in the dashboard repo:
`docs/architecture/landing-sse-pipeline.md` and `docs/public-surface.md`.

## Hard rules — don't break these

1. **`DASHBOARD_API_URL` is server-only** (no `NEXT_PUBLIC_` prefix).
   Browser must never see the dashboard URL — `/api/stats/stream` is
   our proxy. `NEXT_PUBLIC_DASHBOARD_URL` is a separate visitor-facing
   var used by "Login" / "Start free trial" buttons; usually has the
   same value but plays a different role.
2. **Read `display.*`, never raw counts.** The dashboard returns both;
   `display.*` are bucketed marketing strings (`"10+"`, `"100+"`,
   `"1k+"`) and are `null` below the 10-bucket so small early-stage
   numbers stay hidden.
3. **Render `featured_proof` as `{stats.featured_proof}`** — never
   `dangerouslySetInnerHTML`. It's a free-form text column on the
   dashboard side; an operator typo could otherwise become stored XSS.
4. **`runtime = 'nodejs'`** on the SSE route. Edge runtime has no shared
   memory between invocations — the singleton breaks.
5. **Deployment must be persistent Node.** Vercel serverless / Edge /
   Lambda / Cloudflare Workers all break the singleton (each invocation
   is a fresh isolate). If we ever move to a serverless host, fall back
   to short-interval polling (see the docs above).
6. **Don't broadcast on every poll.** The broadcaster diffs `display.*`
   and only fans out on change. Idle visitors should see 30s
   heartbeats, not 5s payload events.

## Environment

```bash
cp .env.example .env.local
# DASHBOARD_API_URL=http://localhost:8000          (server-only)
# NEXT_PUBLIC_DASHBOARD_URL=http://localhost:8000  (visitor-facing)
```

## Running locally

```bash
# Terminal 1 — dashboard (provides /api/public/stats)
cd ../automation_dashboard && php artisan serve

# Terminal 2 — landing
pnpm dev

# Browser: http://localhost:3000/outcomes
# DevTools → Network → filter "stream" → see one open EventStream.
# Open a second tab on the same URL — dashboard log should still show
# at most one request per 5s TOTAL (proves the singleton works).
```
