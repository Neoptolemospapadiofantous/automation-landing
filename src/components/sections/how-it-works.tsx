import { steps, tintMap, type Tint } from "@/lib/content";

export function HowItWorks({ hideHeading = false }: { hideHeading?: boolean }) {
  return (
    <section id="how" className="relative py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        {!hideHeading && (
          <header className="flex flex-col items-center text-center">
            <span className="bp-ref">SHEET 02 / HOW IT WORKS</span>

            <h2 className="text-ink mt-5 max-w-[20ch] text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[56px]">
              One week. <span className="text-violet">No retainer trap.</span>
            </h2>

            {/* Dimension line measuring the engagement window */}
            <div
              aria-hidden
              className="mt-7 flex w-full max-w-[360px] flex-col items-center"
            >
              <div className="bp-dim w-full" />
              <span className="bp-annot mt-2 tracking-[0.18em] uppercase">
                Total span — 5 working days
              </span>
            </div>

            <p className="text-ink-dim mt-6 max-w-[58ch] text-balance text-lg leading-[1.65]">
              We diagnose, ship, and hand over. You keep the system. We stay on
              call if you want.
            </p>
          </header>
        )}

        {/* Signature flow: bordered stations joined by marching-wire connectors —
            horizontal on desktop, vertical on mobile. */}
        <ol
          className={`flex flex-col items-stretch md:flex-row md:items-stretch ${
            hideHeading ? "" : "mt-20"
          }`}
        >
          {steps.map((s, i) => {
            const tint = tintMap[s.tint as Tint];
            const isLast = i === steps.length - 1;
            return (
              <li
                key={s.num}
                className="flex flex-1 flex-col md:flex-row md:items-stretch"
              >
                {/* Station node */}
                <div className="bp-node relative flex-1 p-7">
                  {/* corner registration tick */}
                  <span
                    aria-hidden
                    className="border-violet absolute top-0 left-0 h-3 w-3 border-t border-l"
                  />

                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className={`${tint.text} text-2xl font-semibold tracking-[0.06em]`}
                    >
                      {s.num}
                    </span>
                    <span className="text-ink-mute font-mono text-[11px] tracking-[0.22em] uppercase">
                      {s.phase}
                    </span>
                  </div>

                  <div
                    aria-hidden
                    className="border-border-line mt-4 border-t"
                  />

                  <h3 className="text-ink mt-5 font-sans text-[26px] font-semibold tracking-[-0.03em] normal-case">
                    {s.title}
                  </h3>
                  <p className="text-ink-dim mt-3 font-sans text-[15px] leading-[1.6] normal-case">
                    {s.body}
                  </p>

                  {/* station ref tag */}
                  <span className="bp-annot mt-6 flex items-center gap-2">
                    <span className="bp-dot" aria-hidden />
                    STATION {s.num} / {steps.length.toString().padStart(2, "0")}
                  </span>
                </div>

                {/* Connector to next station */}
                {!isLast && (
                  <div
                    aria-hidden
                    className="flex items-center justify-center"
                  >
                    {/* vertical on mobile: dashed rule + downward arrowhead */}
                    <div className="flex flex-col items-center py-3 md:hidden">
                      <span className="border-violet h-8 border-l border-dashed" />
                      <span className="border-t-violet h-0 w-0 border-x-[4px] border-t-[7px] border-x-transparent" />
                    </div>
                    {/* horizontal on desktop: marching wire with arrowhead */}
                    <div className="bp-wire hidden w-12 md:block" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
