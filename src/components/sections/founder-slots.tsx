import { getPlatformStats } from "@/lib/stats";

/**
 * Scarcity callout — "47 of 100 founder spots remaining."
 *
 * Async server component, fetches live values with ISR (see lib/stats.ts)
 * and degrades to the fallback (100/100, "Rolling intake") if the
 * dashboard is unreachable. Operators update the live numbers via:
 *
 *   php artisan platform:set founder_slots_remaining 47
 *   php artisan platform:set next_cohort_label "Starts March 15"
 *
 * Renders nothing visually if all spots are taken — empty state is "we're
 * full", we don't want to say "0 remaining" which reads as "closed."
 */
export async function FounderSlots() {
  const stats = await getPlatformStats();

  if (stats.founder_slots_remaining <= 0) return null;

  const taken = Math.max(
    0,
    stats.founder_slots_total - stats.founder_slots_remaining,
  );
  const pct = stats.founder_slots_total
    ? Math.round((taken / stats.founder_slots_total) * 100)
    : 0;

  return (
    <div className="border-border-line bg-bg-panel/60 mx-auto mt-8 max-w-[640px] border p-5 backdrop-blur">
      <div className="flex items-baseline justify-between gap-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
          Founder cohort
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
          {stats.next_cohort_label}
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-violet text-4xl font-semibold tracking-[-0.04em]">
          {stats.founder_slots_remaining}
        </span>
        <span className="text-ink-dim text-sm">
          of {stats.founder_slots_total} spots remaining
        </span>
      </div>

      <div className="border-border-line mt-4 h-1.5 w-full overflow-hidden border bg-transparent">
        <div
          className="h-full bg-violet transition-all"
          style={{ width: `${pct}%` }}
          aria-label={`${pct}% of founder spots taken`}
        />
      </div>

      {stats.featured_proof ? (
        <p className="bp-annot mt-4 normal-case leading-[1.6]">
          {`// ${stats.featured_proof}`}
        </p>
      ) : null}
    </div>
  );
}
