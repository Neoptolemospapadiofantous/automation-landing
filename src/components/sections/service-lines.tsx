import Link from "next/link";

/**
 * What we do, in four verbs — the block that makes the shape of the
 * business legible in about eight seconds.
 *
 * It was three cells named after products (Chat / Outreach / What works)
 * until the catalogue grew to twelve. That framing then actively misled:
 * the site announced "three services" and listed twelve underneath, and
 * a visitor who needed a website or an internal dashboard found nothing
 * at the top that spoke to them. Verbs cover the whole studio without
 * having to grow a cell every time a service is added — a new build lands
 * in the catalogue under a verb that already exists.
 *
 * Each cell states its BUY PATH before the price question is asked. Only
 * the chat is self-serve; the rest are quoted, and saying so here is what
 * stops "quoted" reading as evasion further down.
 *
 * Deliberately carries no sheet number: like the ticker and the proof
 * band it is an interstitial, and the numbered set (S/01 hero … S/09
 * commit) is tracked by SheetRail, which would have to renumber seven
 * printed refs to make room here.
 */
const lines = [
  {
    name: "Build",
    how: "We build it · quoted",
    desc: "The website, the dashboard, or the internal tool you keep meaning to get made.",
    href: "/audit",
    cue: "Book the audit",
  },
  {
    name: "Answer",
    how: "You set it up · from €0",
    desc: "Chat on your site, trained on your own knowledge. It answers, qualifies, and hands you the leads.",
    href: "/pricing",
    cue: "See the plans",
  },
  {
    name: "Automate",
    how: "We run it for you · quoted",
    desc: "Email, follow-ups, cold outreach, invoices, inbox — the work that repeats.",
    href: "/outreach",
    cue: "How outreach works",
  },
  {
    name: "Measure",
    how: "We build it for you · quoted",
    desc: "Your numbers out of scattered tools into one live dashboard, and the tests that move them.",
    href: "/what-works",
    cue: "How the loop works",
  },
] as const;

export function ServiceLines() {
  return (
    <section id="services" className="relative pt-16">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-border-line flex flex-wrap items-end justify-between gap-4 border-b pb-5">
          <div>
            <span className="bp-ref">what we do</span>
            <h2 className="text-ink mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              Four things, end to end. One team.
            </h2>
          </div>
          <p className="bp-annot normal-case">
            Take one, or hand us the lot.
          </p>
        </div>

        <div className="border-border-line mt-px grid grid-cols-1 gap-px bg-border-line sm:grid-cols-2 lg:grid-cols-4">
          {lines.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className="bg-bg lift-hover group flex flex-col gap-3 px-6 py-8"
            >
              <span className="text-ink flex items-center gap-2.5 font-mono text-[12px] tracking-[0.12em] uppercase">
                <span className="bp-dot shrink-0" aria-hidden />
                {l.name}
              </span>
              <span className="bp-annot normal-case text-violet">
                {l.how}
              </span>
              <p className="text-ink-dim max-w-[34ch] leading-[1.55]">
                {l.desc}
              </p>
              <span className="bp-annot normal-case mt-auto flex items-center gap-2 pt-2">
                {l.cue}
                <span
                  aria-hidden
                  className="text-violet transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
