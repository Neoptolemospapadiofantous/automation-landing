import { outcomes, tintMap, type Tint } from "@/lib/content";

export function Outcomes() {
  return (
    <section id="outcomes" className="relative py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Sheet header / title-block strip */}
        <div className="border-border-line flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1">
            <span className="bp-ref">SHEET 04 / OUTCOMES</span>
            <h2 className="text-ink text-2xl font-semibold tracking-tight sm:text-3xl">
              Measured readouts
            </h2>
          </div>
          <p className="bp-annot">
            {"// AVG ACROSS LAST 20 CLIENTS — N=20"}
          </p>
        </div>

        {/* Data panel — hairline grid, shared 1px dividers, no gaps */}
        <div className="border-border-line divide-border-line grid grid-cols-2 divide-x divide-y overflow-hidden border-x border-b md:grid-cols-4 md:divide-y-0">
          {outcomes.map((m, i) => {
            const tint = tintMap[m.c as Tint];
            const ref = `R-0${i + 1}`;
            return (
              <figure
                key={m.l}
                className="relative flex flex-col gap-5 px-6 py-9"
              >
                {/* corner registration ref */}
                <span
                  className="bp-annot absolute top-3 right-4 text-[10px] tracking-[0.2em]"
                  aria-hidden="true"
                >
                  {ref}
                </span>

                {/* big sans readout */}
                <div
                  className={`text-5xl font-semibold tracking-[-0.04em] sm:text-6xl ${tint.text}`}
                >
                  {m.v}
                </div>

                {/* dimension line measuring the readout */}
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
