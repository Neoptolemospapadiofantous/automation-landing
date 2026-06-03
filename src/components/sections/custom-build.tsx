import Link from "next/link";

/**
 * Upsell band on the homepage: positions the bespoke automation
 * engagement (the original Flowstack "we ship custom builds" offering)
 * as the next step for teams whose needs outgrow the off-the-shelf
 * agent. Visually echoes the title-block CTA pattern.
 */
export function CustomBuild() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-border-hi relative grid grid-cols-1 gap-10 border p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end">
          {/* corner registration ticks */}
          <span
            aria-hidden
            className="border-violet absolute -left-px -top-px h-4 w-4 border-l border-t"
          />
          <span
            aria-hidden
            className="border-violet absolute -right-px -top-px h-4 w-4 border-r border-t"
          />
          <span
            aria-hidden
            className="border-violet absolute -bottom-px -left-px h-4 w-4 border-b border-l"
          />
          <span
            aria-hidden
            className="border-violet absolute -bottom-px -right-px h-4 w-4 border-b border-r"
          />

          <div className="max-w-[60ch]">
            <span className="bp-ref">FIG. 02 / when off-the-shelf hits a wall</span>
            <h2 className="text-ink mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Need an agent we don&apos;t ship yet?
              <br />
              <span className="text-gradient">We&apos;ll build it.</span>
            </h2>
            <p className="text-ink-dim mt-5 leading-[1.6]">
              The trial is the same chat product every team gets — yours,
              customised within the bounds we offer. When you need bespoke
              flows, custom integrations, a different LLM, or your own
              tooling on top, that&apos;s where Flowstack&apos;s automation
              studio comes in. One week, fixed scope, you keep the code.
            </p>

            <ul className="bp-annot mt-5 grid gap-2.5 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="bp-dot mt-1 shrink-0" aria-hidden />
                Bespoke Voiceflow flows on your stack
              </li>
              <li className="flex items-start gap-2">
                <span className="bp-dot mt-1 shrink-0" aria-hidden />
                CRM, telephony, internal-tool integrations
              </li>
              <li className="flex items-start gap-2">
                <span className="bp-dot mt-1 shrink-0" aria-hidden />
                Trained on your knowledge + voice
              </li>
              <li className="flex items-start gap-2">
                <span className="bp-dot mt-1 shrink-0" aria-hidden />
                Runbooks + handover · you own it
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <Link
              href="/audit"
              className="btn-grad inline-flex items-center justify-center px-6 py-4 text-[13px] font-semibold tracking-[0.12em] uppercase"
            >
              Book the audit →
            </Link>
            <span className="bp-annot">
              {"// free 30-min · written diagnosis in 48h"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
