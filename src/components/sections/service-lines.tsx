import Link from "next/link";

/**
 * The three service lines — the block that makes the shape of the
 * business legible in about eight seconds.
 *
 * Before this, a visitor could read the whole homepage and still not
 * know we do lead generation. One line each, one destination each.
 *
 * Only the chat carries a price: it is a subscription and already has
 * one. The other two say what the next page contains rather than
 * pretending to a number that is quoted per stack.
 */
const lines = [
  {
    name: "Chat",
    desc: "Answers every inbound on your site, day or night.",
    href: "/pricing",
    cue: "From €99/mo",
  },
  {
    name: "Outreach",
    desc: "We find the companies you want as customers, and write to them in your voice.",
    href: "/outreach",
    cue: "See how it works",
  },
  {
    name: "What works",
    desc: "We test what you send, keep what wins, and show you the numbers.",
    href: "/what-works",
    cue: "See how it works",
  },
] as const;

export function ServiceLines() {
  return (
    <section id="services" className="relative pt-16">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-border-line grid grid-cols-1 gap-px border bg-border-line md:grid-cols-3">
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
