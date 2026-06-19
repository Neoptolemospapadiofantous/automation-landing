import { getPlatformStats, relativeTime, type CountField } from "@/lib/stats";
import { tintMap, type Tint } from "@/lib/content";
import { LiveStat } from "@/components/live-stat";
import { LiveRelativeTime } from "@/components/live-relative-time";
import { SectionWatermark } from "@/components/section-watermark";

/**
 * Live counts strip — async server component for first paint (SEO-correct
 * bucketed labels) + a <LiveStat> client island per cell that subscribes
 * to /api/stats/stream (SSE) so updates land within ~5 s of any
 * dashboard change, without polling.
 *
 * Cells whose count is below the display threshold render a muted "—"
 * instead of disappearing. Whole-section hide was confusing on an early-
 * stage platform; muted-dash cells read as "instrument calibrating" and
 * automatically light up once the underlying count crosses the bucket.
 *
 * Six cells laid out as a 2x3 (mobile) / 3x2 (tablet) / 6x1 (desktop)
 * grid. Top row covers cumulative platform stats (operators, qualified,
 * conversational turns); bottom row covers right-now signals (active,
 * last 24h, hours given back). A separate <LiveRelativeTime> recency
 * line sits below the grid pulling `last_activity_at`.
 */
export async function LiveOutcomes() {
  const stats = await getPlatformStats();

  const items: { field: CountField; l: string; c: Tint }[] = [
    { field: "teams_count", l: "teams on the platform", c: "violet" },
    { field: "leads_qualified", l: "leads qualified by AI agents", c: "cyan" },
    { field: "messages_handled", l: "conversations handled", c: "success" },
    { field: "agents_active", l: "agents running right now", c: "warn" },
    { field: "messages_last_24h", l: "messages in the last 24h", c: "violet" },
    { field: "time_saved_hours", l: "hours given back to teams", c: "cyan" },
  ];

  const initialRecency = relativeTime(stats.last_activity_at);

  return (
    <section id="live" className="relative isolate overflow-hidden py-20">
      <SectionWatermark text="LIVE" />
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

        <div className="depth-rise flow-edge border-border-line divide-border-line grid grid-cols-2 divide-x divide-y overflow-hidden border-x border-b sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
          {items.map((m, i) => {
            const tint = tintMap[m.c];
            const ref = `R-1${(i + 1).toString().padStart(2, "0")}`;
            return (
              <figure
                key={m.field}
                className="lift-hover relative flex flex-col gap-5 px-6 py-9"
              >
                <span
                  className="bp-annot absolute top-3 right-4 text-[10px] tracking-[0.2em]"
                  aria-hidden="true"
                >
                  {ref}
                </span>
                <div
                  className={`text-4xl font-semibold tracking-[-0.04em] sm:text-5xl ${tint.text}`}
                >
                  <LiveStat
                    initial={stats.display[m.field]}
                    field={m.field}
                    fallback={
                      <span className="text-ink-mute/60" aria-hidden>
                        —
                      </span>
                    }
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

        {/* Recency callout — distinct from the count cells because it's a
            timestamp, not an aggregate. Hides itself when no qualified
            leads exist yet (renders nothing rather than "never"). */}
        {initialRecency ? (
          <p className="text-ink-dim mt-6 flex items-center justify-end gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
            <span
              className="pulse-glow inline-block h-1.5 w-1.5 rounded-full bg-ink"
              aria-hidden
            />
            Last qualified lead{" "}
            <LiveRelativeTime initial={initialRecency} field="last_activity_at" />
          </p>
        ) : null}
      </div>
    </section>
  );
}
