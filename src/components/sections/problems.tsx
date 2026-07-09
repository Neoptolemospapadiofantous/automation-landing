import { SectionWatermark } from "@/components/section-watermark";

/**
 * The three pains, named — problem-agitation before any solution talk.
 * Each card carries a hatched fill on hover (the drawing system's "cut"
 * device) and a "cost" line in the signal accent.
 */
const PROBLEMS = [
  {
    ref: "P-01 / repetition",
    title: "Busywork by hand",
    body: "Follow-ups typed one by one. Records copied between tools. The same report rebuilt every Monday. Work a person does because nothing else will.",
    cost: "cost: hours, every week, forever",
  },
  {
    ref: "P-02 / fragmentation",
    title: "Data in silos",
    body: "The CRM says one thing, the spreadsheet another, the inbox a third. Nobody has the whole picture, so decisions run on the loudest partial view.",
    cost: "cost: decisions made half-blind",
  },
  {
    ref: "P-03 / latency",
    title: "Leads left waiting",
    body: "The visitor with a buying question at 11pm doesn't fill in a form and wait. They open a competitor's site. Interest has a half-life measured in minutes.",
    cost: "cost: revenue that never arrives",
  },
] as const;

export function Problems() {
  return (
    <section id="problems" className="relative isolate overflow-hidden py-24">
      <SectionWatermark text="FIX" size="sm" />
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-border-hi flex flex-wrap items-end justify-between gap-4 border-b pb-5">
          <div>
            <span className="bp-ref text-violet">S/02</span>
            <h2 className="text-ink mt-4 max-w-[24ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Three ways a week disappears.
            </h2>
          </div>
          <span className="bp-annot hidden sm:block">{"// what we fix"}</span>
        </div>

        <div className="border-border-hi mt-10 grid grid-cols-1 gap-px border bg-border-hi md:grid-cols-3">
          {PROBLEMS.map((p) => (
            <div key={p.ref} className="group bg-bg relative overflow-hidden px-6 pb-6 pt-7">
              <span
                aria-hidden
                className="bp-hatch absolute inset-0 opacity-5 transition-opacity duration-300 group-hover:opacity-15"
              />
              <span className="bp-ref text-ink-mute relative">{p.ref}</span>
              <h3 className="text-ink relative mt-3.5 text-xl font-semibold tracking-[-0.02em]">
                {p.title}
              </h3>
              <p className="text-ink-dim relative mt-2.5 max-w-[42ch] text-sm leading-[1.6]">
                {p.body}
              </p>
              <p className="text-violet relative mt-5 font-mono text-[11px] tracking-[0.1em] uppercase">
                {p.cost}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
