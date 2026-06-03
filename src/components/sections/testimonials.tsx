import { testimonials } from "@/lib/content";

export function Testimonials({ hideHeading = false }: { hideHeading?: boolean }) {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        {!hideHeading && (
          <header className="flex flex-col items-center text-center">
            <span className="bp-ref">SHEET 07 / FIELD NOTES</span>
            <h2 className="text-ink mt-5 max-w-[18ch] text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
              Quiet systems. Loud results.
            </h2>
            <p className="bp-annot mt-4 max-w-[44ch]">
              {"// margin notes recorded on-site by operators running the shipped systems"}
            </p>
          </header>
        )}
        <div
          className={`grid grid-cols-1 border-t border-l border-border-line md:grid-cols-3 ${
            hideHeading ? "" : "mt-14"
          }`}
        >
          {testimonials.map((t, i) => {
            const ref = `NOTE ${String(i + 1).padStart(2, "0")}`;
            return (
              <figure
                key={t.name}
                className="bg-surface/40 relative flex flex-col gap-6 border-r border-b border-border-line p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="bp-ref">{ref}</span>
                  <span
                    aria-hidden
                    className="bp-dot pulse-glow translate-y-px"
                  />
                </div>

                <blockquote className="text-ink flex-1 text-[16px] font-medium leading-[1.6] tracking-[-0.005em]">
                  <span aria-hidden className="text-ink-mute mr-2 font-mono">
                    &mdash;
                  </span>
                  {t.quote}
                </blockquote>

                <figcaption className="border-t border-border-line pt-5">
                  <span className="text-ink block font-mono text-[12.5px] font-semibold uppercase tracking-[0.14em]">
                    {t.name}
                  </span>
                  <span className="text-ink-mute mt-1.5 block font-mono text-[11px] uppercase tracking-[0.18em]">
                    {t.role}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
