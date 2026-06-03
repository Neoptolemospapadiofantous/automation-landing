import { getPlatformStats, type CountField } from "@/lib/stats";
import { tintMap, type Tint } from "@/lib/content";
import { LiveStat } from "@/components/live-stat";

/**
 * Live counts strip — async server component for first paint (SEO-correct
 * bucketed labels) + a <LiveStat> client island per cell that subscribes
 * to /api/stats/stream (SSE) so updates land within ~5 s of any
 * dashboard change, without polling.
 *
 * Renders nothing if EVERY count is below the 10-bucket — better to hide
 * the section entirely than to show an empty grid that screams "no
 * traction". Once the platform crosses the lowest bucket the section
 * appears naturally.
 */
export async function LiveOutcomes() {
  const stats = await getPlatformStats();

  const items: { field: CountField; l: string; c: Tint }[] = [
    { field: "teams_count", l: "operators on the platform", c: "violet" },
    { field: "leads_qualified", l: "leads qualified by AI agents", c: "cyan" },
    { field: "messages_handled", l: "conversational turns handled", c: "success" },
    { field: "agents_active", l: "agents running right now", c: "warn" },
  ];

  // Drop cells whose bucket is null — we never want to render "0 operators"
  // or a blank cell. Once the underlying count crosses the 10-bucket the
  // cell joins the strip automatically.
  const visible = items.filter((i) => stats.display[i.field] !== null);

  if (visible.length === 0) return null;

  // Grid spans 2 cols on mobile, up to 4 on desktop. Tailwind's JIT can't
  // see interpolated class names, so map fully-spelled-out classes by
  // visible-cell count (1-4). Anything beyond 4 stays at 4-wide and wraps.
  const colsClass =
    {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
    }[Math.min(visible.length, 4) as 1 | 2 | 3 | 4] ?? "md:grid-cols-4";

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
          <p className="bp-annot">{"// LIVE — STREAMS VIA SSE"}</p>
        </div>

        <div
          className={`border-border-line divide-border-line grid grid-cols-2 ${colsClass} divide-x divide-y overflow-hidden border-x border-b md:divide-y-0`}
        >
          {visible.map((m, i) => {
            const tint = tintMap[m.c];
            const ref = `R-1${i + 1}`;
            return (
              <figure
                key={m.field}
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
                  <LiveStat
                    initial={stats.display[m.field]}
                    field={m.field}
                  />
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
