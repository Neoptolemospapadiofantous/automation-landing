import Link from "next/link";
import { agentRoles } from "@/lib/content";
import { SectionWatermark } from "@/components/section-watermark";

/**
 * Agent role picker — the "drawing index" pattern applied to product
 * roles. Each row links to that role's landing page (/roles/{slug}),
 * which carries the long-form pitch and the register CTA; sending
 * visitors straight to /register skipped the persuasion step and
 * starved the role pages of internal links.
 */
export function Overview() {
  return (
    <section
      id="agents"
      className="relative isolate overflow-hidden py-24 sm:py-28"
    >
      <SectionWatermark text="ROLE" />
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-border-line flex flex-wrap items-end justify-between gap-4 border-b pb-5">
          <div>
            <span className="bp-ref text-violet">S/05 / agent roles</span>
            <h2 className="text-ink mt-4 max-w-[22ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Pick the job you need done.
            </h2>
          </div>
          <span className="bp-annot hidden normal-case sm:block">Four roles · live in 60 seconds</span>
        </div>

        <span className="flow-underline" aria-hidden />

        <ul>
          {agentRoles.map((r) => (
            <li key={r.ref}>
              <Link
                href={`/roles/${r.slug}`}
                className="group border-border-line hover:bg-bg-elev/60 grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b py-7 transition-colors sm:gap-8"
              >
                <span className="bp-ref text-ink-mute group-hover:text-violet w-14 shrink-0 transition-colors sm:w-20">
                  {r.ref}
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-ink text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                      {r.name}
                    </h3>
                  </div>
                  <p className="text-ink-dim mt-1.5 max-w-[68ch] text-sm leading-[1.55]">
                    {r.desc}
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-3">
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

        <p className="bp-annot mt-6 normal-case">
          {"Don't see your role? "}
          <Link
            href="/audit"
            className="text-draw hover:text-violet underline-offset-4 hover:underline"
          >
            Book a custom build →
          </Link>
        </p>
      </div>
    </section>
  );
}
