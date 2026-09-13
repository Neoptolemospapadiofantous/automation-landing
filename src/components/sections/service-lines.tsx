import Link from "next/link";

/**
 * What we sell, in four — the block that makes the offer legible in
 * about eight seconds (founder, 2026-09-13: a website, a chat and voice
 * system, automations in their CRM, lead generation).
 *
 * It was four VERBS (Build / Answer / Automate / Measure) from 2026-08-31.
 * Verbs described the studio well and the purchase badly: a buyer reads
 * "Measure" and still does not know what they get. These are the four
 * things on the invoice, named as the invoice names them.
 *
 * This block sells the OUTCOME and the buy path; the catalogue further
 * down lists what each one includes. Same four names, different
 * sentences — say each fact once.
 *
 * Each cell states its BUY PATH before the price question is asked. Only
 * the website chat is self-serve; voice, automations and lead generation
 * are built to order. Saying so here is what stops "quoted" reading as
 * evasion further down.
 *
 * Deliberately carries no sheet number: like the ticker and the proof
 * band it is an interstitial, and the numbered set is tracked by
 * SheetRail.
 */
const lines = [
  {
    name: "Website",
    how: "We build it · quoted",
    desc: "A site that looks right, loads fast and turns visitors into enquiries.",
    href: "/website-build",
    cue: "Website builds",
  },
  {
    name: "Chat & voice assistant",
    how: "Chat free · voice quoted",
    desc: "No enquiry goes unanswered — day or night, on your site or your phone.",
    href: "/pricing",
    cue: "See the plans",
  },
  {
    name: "Automations",
    how: "We build it · quoted",
    desc: "Your CRM, follow-ups and invoices stop needing a person to push them.",
    href: "/email-automation",
    cue: "How automations work",
  },
  {
    name: "Lead generation",
    how: "We run it · quoted",
    desc: "New customers found for you, and every enquiry called back in a minute.",
    href: "/outreach",
    cue: "How lead generation works",
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
              Four things. One team.
            </h2>
          </div>
          <p className="bp-annot normal-case">
            Take one, or all four.
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
