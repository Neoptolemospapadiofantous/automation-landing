import { Eyebrow } from "../eyebrow";
import { services, tintMap, type Tint } from "@/lib/content";

// Schematic refs: row A (top), row B (bottom) — assigned by index.
function refFor(i: number) {
  const cols = 3;
  const sheet = String.fromCharCode(65 + Math.floor(i / cols)); // A, B, …
  const seq = String((i % cols) + 1).padStart(2, "0");
  return `${sheet}-${seq}`;
}

export function Services({ hideHeading = false }: { hideHeading?: boolean }) {
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        {!hideHeading && (
          <div className="flex flex-col items-center text-center">
            <span className="bp-ref" aria-hidden>
              Sheet 03 / Services
            </span>
            <div className="mt-4">
              <Eyebrow tint="cyan">What we build</Eyebrow>
            </div>
            <h2 className="mt-5 max-w-[20ch] text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[56px]">
              We don&apos;t pitch tools. We ship outcomes.
            </h2>
            <p className="text-ink-dim mt-5 max-w-[62ch] text-balance text-lg leading-[1.65]">
              Every node below started as a leak. Each card is the diagnosis,
              wired to the fix.
            </p>
          </div>
        )}

        {/* Shared-hairline node grid: cells abut, dividers are 1px, no rounding. */}
        <div
          className={`border-border-line bg-bg-elev/60 grid grid-cols-1 border md:grid-cols-3 ${
            hideHeading ? "" : "mt-16"
          }`}
        >
          {services.map((s, i) => {
            const tint = tintMap[s.tint as Tint];
            const wide = "wide" in s && s.wide;
            return (
              <article
                key={s.title}
                className={`border-border-line relative flex flex-col border-b last:border-b-0 md:border-r [&:nth-child(3n)]:md:border-r-0 ${
                  wide ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  {/* Title-block strip: ref · connection point · kicker */}
                  <div className="border-border-line/70 flex items-center gap-3 border-b pb-3">
                    <span
                      className="bp-ref shrink-0"
                      style={{ color: "var(--accent)" }}
                      aria-hidden
                    >
                      {refFor(i)}
                    </span>
                    <span className="bp-dot shrink-0" aria-hidden />
                    <span
                      className={`${tint.text} font-mono text-[11px] uppercase tracking-[0.18em]`}
                    >
                      {s.kicker}
                    </span>
                  </div>

                  <h3 className="text-ink mt-5 text-[22px] font-semibold leading-[1.2] tracking-[-0.02em]">
                    {s.title}
                  </h3>
                  <p className="text-ink-dim mt-3 text-[14px] leading-[1.55]">
                    {s.body}
                  </p>

                  <ServiceVisual tint={s.tint as Tint} badge={s.badge} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceVisual({ tint, badge }: { tint: Tint; badge: string }) {
  const t = tintMap[tint];
  // Schematic footer: a mono signal trace + a status-tagged outcome badge.
  return (
    <div className="border-border-line/70 mt-auto flex items-center gap-3 border-t pt-4">
      {/* Marching-dashed wire = the automation running, unattended. */}
      <span className="bp-wire w-10 shrink-0" aria-hidden />
      <span className="bp-annot truncate" aria-hidden>
        {"// output"}
      </span>
      <span
        className={`bp-node ${t.text} ml-auto inline-flex shrink-0 items-center gap-1.5 px-2 py-1 text-[10px] uppercase tracking-[0.18em]`}
      >
        <span
          className={`pulse-glow inline-block h-1.5 w-1.5 rounded-full bg-current ${t.text}`}
          aria-hidden
        />
        {badge}
      </span>
    </div>
  );
}
