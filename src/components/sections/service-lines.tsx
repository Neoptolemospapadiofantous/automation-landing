import Link from "next/link";

/**
 * The three service lines — the block that makes the shape of the
 * business legible in about eight seconds.
 *
 * It used to render as three unlabelled cells straight after the ticker,
 * with no heading above them, and it did not read as a section at all: a
 * visitor could scroll past the only place the site says "we do cold
 * outreach, and it has a page" without registering it. Hence the heading,
 * and cues that name the destination instead of saying "see how it
 * works" twice.
 *
 * Deliberately carries no sheet number: like the ticker and the proof
 * band it is an interstitial, and the numbered set (S/01 hero … S/09
 * commit) is tracked by SheetRail, which would have to renumber seven
 * printed refs to make room here.
 *
 * Only the chat carries a price: it is a subscription and already has
 * one. The other two say what the next page contains rather than
 * pretending to a number that is quoted per stack.
 */
const lines = [
  {
    name: "Chat",
    how: "You set it up · from €0",
    desc: "Answers your website visitors, day and night.",
    href: "/pricing",
    cue: "See the plans",
  },
  {
    name: "Outreach",
    how: "We run it for you · quoted",
    desc: "We find companies that fit you and email them in your voice.",
    href: "/outreach",
    cue: "How outreach works",
  },
  {
    name: "What works",
    how: "We build it for you · quoted",
    desc: "Your numbers in one dashboard, plus tests that say what to change.",
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
            <span className="bp-ref">what we sell</span>
            <h2 className="text-ink mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              Three services. One you can start yourself.
            </h2>
          </div>
          <p className="bp-annot normal-case">Start with any one of them.</p>
        </div>

        <div className="border-border-line mt-px grid grid-cols-1 gap-px bg-border-line md:grid-cols-3">
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
