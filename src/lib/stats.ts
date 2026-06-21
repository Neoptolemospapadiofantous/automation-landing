/**
 * Public platform stats fetched from the dashboard's `/api/public/stats`
 * endpoint. Server-side ISR — Next.js revalidates this every 5 minutes,
 * so visitors get cached numbers and the dashboard isn't hit per render.
 *
 * Fallback to fixed defaults if the dashboard is down — the marketing site
 * must never show "—" or empty numbers for trust signals. Static defaults
 * are conservative but plausible so a failed fetch isn't visually obvious.
 */

/** Keys of the aggregate counts that have a bucketed display label. */
export type CountField =
  | "teams_count"
  | "agents_active"
  | "leads_total"
  | "leads_qualified"
  | "messages_handled"
  | "messages_last_24h"
  | "time_saved_hours";

export type PlatformStats = {
  // Editable (operator-curated via `php artisan platform:set`)
  founder_slots_remaining: number;
  founder_slots_total: number;
  next_cohort_label: string;
  featured_proof: string | null;
  /**
   * ISO date (YYYY-MM-DD or full ISO timestamp, UTC) when the next
   * founder cohort opens. Drives the announcement-bar countdown on
   * the landing. Null if no cohort is currently scheduled — the
   * announcement bar then renders the "open as of …" variant from
   * the previous open value, or falls back to the build-time default.
   * Operator sets via `php artisan platform:set next_cohort_open_at YYYY-MM-DD`.
   */
  next_cohort_open_at: string | null;

  // Computed (live aggregate counts, raw)
  teams_count: number;
  agents_active: number;
  leads_total: number;
  leads_qualified: number;
  messages_handled: number;
  messages_last_24h: number;
  time_saved_hours: number;

  /**
   * Recency signal — ISO timestamp of the most recent qualified lead.
   * Rendered as relative time ("4 min ago") on the landing site so the
   * page reads as alive. Null when no qualified leads exist yet.
   */
  last_activity_at: string | null;

  /**
   * Bucketed marketing-friendly labels for each count. Server returns
   * null for counts below the lowest 10-bucket so the landing site can
   * hide the field instead of broadcasting a small real number.
   * Render `display.*` on the marketing site; raw counts above are for
   * callers that need exact values.
   */
  display: Record<CountField, string | null>;

  generated_at: string;
};

const FALLBACK: PlatformStats = {
  founder_slots_remaining: 100,
  founder_slots_total: 100,
  next_cohort_label: "Rolling intake",
  featured_proof: null,
  next_cohort_open_at: null,
  teams_count: 0,
  agents_active: 0,
  leads_total: 0,
  leads_qualified: 0,
  messages_handled: 0,
  messages_last_24h: 0,
  time_saved_hours: 0,
  last_activity_at: null,
  display: {
    teams_count: null,
    agents_active: null,
    leads_total: null,
    leads_qualified: null,
    messages_handled: null,
    messages_last_24h: null,
    time_saved_hours: null,
  },
  generated_at: new Date(0).toISOString(),
};

const REVALIDATE_SECONDS = 300;

// Hard cap on the dashboard fetch. Without it, a reachable-but-unresponsive
// dashboard (connection opens, no bytes flow) hangs the request forever —
// `catch` never fires because there's no rejection. At build time that
// stalls static prerendering until the host kills the deploy (we hit the
// Forge 10-min limit this way). Bounded wait → FALLBACK keeps builds and
// renders fast even when the dashboard is degraded.
const FETCH_TIMEOUT_MS = 3000;

function statsUrl(): string {
  const base = process.env.DASHBOARD_API_URL ?? "http://localhost:8000";
  return `${base.replace(/\/$/, "")}/api/public/stats`;
}

/**
 * Server-side fetch with Next 16 ISR (5 min). Use for the initial
 * server render — first paint hits cache, dashboard sees ~1 request
 * per 5 min regardless of visitor count. Errors swallow to FALLBACK.
 */
export async function getPlatformStats(): Promise<PlatformStats> {
  try {
    const res = await fetch(statsUrl(), {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return FALLBACK;
    const data = (await res.json()) as PlatformStats;
    return { ...FALLBACK, ...data };
  } catch {
    return FALLBACK;
  }
}

/**
 * Fresh fetch that bypasses the ISR cache. Used by the SSE broadcaster
 * poll loop, which wants the latest dashboard state every ~5 s rather
 * than the 5-min cached copy. Falls back to FALLBACK on error.
 */
export async function fetchPlatformStatsFresh(): Promise<PlatformStats> {
  try {
    const res = await fetch(statsUrl(), {
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return FALLBACK;
    const data = (await res.json()) as PlatformStats;
    return { ...FALLBACK, ...data };
  } catch {
    return FALLBACK;
  }
}

/**
 * Human-friendly large-number formatting for marketing copy.
 *   formatStat(1234)    → "1.2k"
 *   formatStat(42)      → "42"
 *   formatStat(1500000) → "1.5M"
 */
export function formatStat(n: number): string {
  if (n < 1000) return n.toLocaleString();
  if (n < 1_000_000) {
    const k = n / 1000;
    return `${k.toFixed(k >= 10 ? 0 : 1)}k`;
  }
  const m = n / 1_000_000;
  return `${m.toFixed(m >= 10 ? 0 : 1)}M`;
}

/**
 * Relative time renderer for `last_activity_at`. Stays string-only so the
 * server render and the client tick read the same value without locale
 * differences. Returns null when input is null so callers can hide the
 * line instead of saying "never".
 */
export function relativeTime(iso: string | null): string | null {
  if (!iso) return null;
  const diffSec = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (diffSec < 60) return "just now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} min ago`;
  if (diffSec < 86_400) return `${Math.floor(diffSec / 3600)} h ago`;
  return `${Math.floor(diffSec / 86_400)} d ago`;
}
