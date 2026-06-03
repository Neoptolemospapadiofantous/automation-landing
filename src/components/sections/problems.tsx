import { problems, tintMap, type Tint } from "@/lib/content";

/* Short mono annotations keyed by leak — the surveyor's note on each defect. */
const leakNotes = [
  "// first-response latency exceeds tolerance",
  "// senior labour mis-allocated to transcription",
  "// no reconciled source of truth",
  "// defect rate scales with manual volume",
  "// onboarding throughput < hiring rate",
] as const;

export function Problems({ hideHeading = false }: { hideHeading?: boolean }) {
  return (
    <section id="problems" className="relative py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        {!hideHeading && (
          <header className="flex flex-col items-start">
            <div className="flex w-full items-center justify-between border-border-line border-b pb-4">
              <span className="bp-ref">SHEET 02 / DEFECTS</span>
              <span className="bp-annot hidden sm:inline">
                FIG. 2 · LEAK SURVEY
              </span>
            </div>
            <h2 className="text-ink mt-8 max-w-[20ch] text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[56px]">
              Five leaks bleeding your operation right now.
            </h2>
            <div className="mt-6 flex w-full max-w-[640px] items-center gap-4">
              <div className="bp-dim w-16 shrink-0" aria-hidden />
              <p className="text-ink-dim text-balance text-lg leading-[1.65]">
                We don&apos;t sell automations. We sell the absence of these
                defects. If any reads familiar, we should talk.
              </p>
            </div>
          </header>
        )}

        {/* Defect schedule — cells share a single 1px hairline; no gaps, no rounding. */}
        <div
          className={`border-border-line grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-3 ${
            hideHeading ? "" : "mt-16"
          }`}
        >
          {problems.map((p, i) => {
            const tint = tintMap[p.tint as Tint];
            const ref = `LEAK ${String(i + 1).padStart(2, "0")}`;
            return (
              <article
                key={p.title}
                className="border-border-line group relative flex flex-col border-r border-b p-7 sm:p-8"
              >
                {/* Defect tag: ref + hollow connection-point marker. */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`h-2 w-2 rounded-full ${tint.text} bg-current`}
                      aria-hidden
                    />
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.2em] ${tint.text}`}
                    >
                      {ref}
                    </span>
                  </span>
                  <span className="text-ink-mute font-mono text-[11px] uppercase tracking-[0.2em]">
                    {p.label}
                  </span>
                </div>

                <h3 className="text-ink mt-6 text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] sm:text-2xl">
                  {p.title}
                </h3>
                <p className="text-ink-dim mt-3 text-[15px] leading-[1.55]">
                  {p.body}
                </p>

                {"metric" in p && p.metric && (
                  <div className="border-border-line mt-7 flex items-baseline gap-3 border-t pt-5">
                    <span
                      className={`text-5xl font-semibold tracking-[-0.04em] ${tint.text}`}
                    >
                      {p.metric.value}
                    </span>
                    <span className="bp-annot leading-[1.4]">
                      {p.metric.label}
                    </span>
                  </div>
                )}

                {/* Surveyor's annotation, anchored to the cell foot. */}
                <span className="bp-annot mt-auto block pt-6">
                  {leakNotes[i]}
                </span>

                {/* Corner registration tick. */}
                <span
                  aria-hidden
                  className="border-border-hi pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 border-r border-t"
                />
              </article>
            );
          })}

          {/* Trailing cell: continues the schedule grid as a "no further defects" stamp. */}
          <article className="border-border-line bp-hatch relative flex flex-col justify-end border-r border-b p-7 sm:p-8">
            <div className="bg-bg-elev/85 -mx-7 -mb-7 mt-auto p-7 sm:-mx-8 sm:-mb-8 sm:p-8">
              <span className="bp-ref">SURVEY · COMPLETE</span>
              <p className="text-ink-dim mt-3 text-[15px] leading-[1.55]">
                Every defect above is one we&apos;ve sealed before. The audit
                tells you which are draining you now.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
