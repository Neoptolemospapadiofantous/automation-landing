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
  | "messages_handled";

export type PlatformStats = {
  // Editable (operator-curated via `php artisan platform:set`)
  founder_slots_remaining: number;
  founder_slots_total: number;
  next_cohort_label: string;
  featured_proof: string | null;

  // Computed (live aggregate counts, raw)
  teams_count: number;
  agents_active: number;
  leads_total: number;
  leads_qualified: number;
  messages_handled: number;

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
  teams_count: 0,
  agents_active: 0,
  leads_total: 0,
  leads_qualified: 0,
  messages_handled: 0,
  display: {
    teams_count: null,
    agents_active: null,
    leads_total: null,
    leads_qualified: null,
    messages_handled: null,
  },
  generated_at: new Date(0).toISOString(),
};

const REVALIDATE_SECONDS = 300;

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
