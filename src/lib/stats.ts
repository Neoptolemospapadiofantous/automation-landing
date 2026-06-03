/**
 * Public platform stats fetched from the dashboard's `/api/public/stats`
 * endpoint. Server-side ISR — Next.js revalidates this every 5 minutes,
 * so visitors get cached numbers and the dashboard isn't hit per render.
 *
 * Fallback to fixed defaults if the dashboard is down — the marketing site
 * must never show "—" or empty numbers for trust signals. Static defaults
 * are conservative but plausible so a failed fetch isn't visually obvious.
 */

export type PlatformStats = {
  // Editable (operator-curated via `php artisan platform:set`)
  founder_slots_remaining: number;
  founder_slots_total: number;
  next_cohort_label: string;
  featured_proof: string | null;

  // Computed (live aggregate counts)
  teams_count: number;
  agents_active: number;
  leads_total: number;
  leads_qualified: number;
  messages_handled: number;

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
  generated_at: new Date(0).toISOString(),
};

const REVALIDATE_SECONDS = 300;

/**
 * Server-side fetch. `next: { revalidate: 300 }` opts into Next 16 ISR —
 * the first request after each 5-min window hits the dashboard, all
 * others serve the cached payload. Errors swallow to the FALLBACK so a
 * dashboard outage doesn't take the marketing site down.
 */
export async function getPlatformStats(): Promise<PlatformStats> {
  const base = process.env.DASHBOARD_API_URL ?? "http://localhost:8000";
  const url = `${base.replace(/\/$/, "")}/api/public/stats`;

  try {
    const res = await fetch(url, {
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
