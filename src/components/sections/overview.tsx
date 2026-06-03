import Link from "next/link";

const sheets = [
  {
    num: "01",
    title: "Problems we fix",
    desc: "The hidden tax on every manual process — missed leads, wasted senior time, invisible funnels.",
    href: "/problems",
    tag: "DEFECTS",
  },
  {
    num: "02",
    title: "How it works",
    desc: "Audit, ship, hand off. One week, start to handover. You own everything we build.",
    href: "/how-it-works",
    tag: "PROCESS",
  },
  {
    num: "03",
    title: "What we build",
    desc: "Five flavours of automation, built on your stack, in your accounts. No lock-in.",
    href: "/services",
    tag: "SYSTEMS",
  },
  {
    num: "04",
    title: "Outcomes",
    desc: "31× faster response · €127k saved · sub-60-day payback. Real numbers from real operators.",
    href: "/outcomes",
    tag: "READOUTS",
  },
  {
    num: "05",
    title: "Pricing",
    desc: "Free audit. Fixed-scope builds from €6k. Optional monthly. No retainer, cancel anytime.",
    href: "/pricing",
    tag: "TERMS",
  },
] as const;

export function Overview() {
  return (
    <section id="index" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-border-line flex flex-wrap items-end justify-between gap-4 border-b pb-5">
          <div>
            <span className="bp-ref">Drawing index</span>
            <h2 className="text-ink mt-4 max-w-[20ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              The whole set, one sheet at a time.
            </h2>
          </div>
          <span className="bp-annot hidden sm:block">
            {"// 05 sheets · select a row to open"}
          </span>
        </div>

        <ul>
          {sheets.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="group border-border-line hover:bg-bg-elev/60 grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b py-7 transition-colors sm:gap-8"
              >
                <span className="bp-ref text-ink-mute group-hover:text-violet w-10 shrink-0 transition-colors sm:w-16">
                  {s.num}
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-ink text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                      {s.title}
                    </h3>
                    <span className="bp-ref text-ink-mute hidden sm:inline">
                      {s.tag}
                    </span>
                  </div>
                  <p className="text-ink-dim mt-1.5 max-w-[68ch] text-sm leading-[1.55]">
                    {s.desc}
                  </p>
                </div>
                <span className="flex items-center gap-3 shrink-0">
                  <span className="bp-wire hidden w-10 opacity-0 transition-opacity group-hover:opacity-100 sm:block" />
                  <span
                    aria-hidden
                    className="text-ink-mute group-hover:text-violet font-mono text-lg transition-colors group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
