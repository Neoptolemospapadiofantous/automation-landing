import { getPlatformStats, formatStat } from "@/lib/stats";
import { tintMap, type Tint } from "@/lib/content";

/**
 * Live version of the static Outcomes strip. Async server component —
 * fetches platform stats at render-time and falls back to defaults if
 * the dashboard is down (see lib/stats.ts).
 *
 * Visually identical layout to the static <Outcomes /> so they can be
 * swapped without other markup churn.
 */
export async function LiveOutcomes() {
  const stats = await getPlatformStats();

  const items: { v: string; l: string; c: Tint }[] = [
    {
      v: formatStat(stats.teams_count),
      l: "operators on the platform",
      c: "violet",
    },
    {
      v: formatStat(stats.leads_qualified),
      l: "leads qualified by AI agents",
      c: "cyan",
    },
    {
      v: formatStat(stats.messages_handled),
      l: "conversational turns handled",
      c: "success",
    },
    {
      v: formatStat(stats.agents_active),
      l: "agents running right now",
      c: "warn",
    },
  ];

  return (
    <section id="live" className="relative py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-border-line flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1">
            <span className="bp-ref">SHEET 04A / LIVE READOUTS</span>
            <h2 className="text-ink text-2xl font-semibold tracking-tight sm:text-3xl">
              Live across the platform
            </h2>
          </div>
          <p className="bp-annot">
            {"// PULLED FROM DASHBOARD — REFRESH ~5 MIN"}
          </p>
        </div>

        <div className="border-border-line divide-border-line grid grid-cols-2 divide-x divide-y overflow-hidden border-x border-b md:grid-cols-4 md:divide-y-0">
          {items.map((m, i) => {
            const tint = tintMap[m.c];
            const ref = `R-1${i + 1}`;
            return (
              <figure
                key={m.l}
                className="relative flex flex-col gap-5 px-6 py-9"
              >
                <span
                  className="bp-annot absolute top-3 right-4 text-[10px] tracking-[0.2em]"
                  aria-hidden="true"
                >
                  {ref}
                </span>
                <div
                  className={`text-5xl font-semibold tracking-[-0.04em] sm:text-6xl ${tint.text}`}
                >
                  {m.v}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="bp-dim w-full" aria-hidden="true" />
                  <figcaption className="text-ink-dim flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                    <span className="bp-dot" aria-hidden="true" />
                    {m.l}
                  </figcaption>
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
