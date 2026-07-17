import Link from "next/link";
import { SectionWatermark } from "@/components/section-watermark";

/**
 * Upsell band on the homepage: positions the bespoke automation
 * engagement (the original Flowstack "we ship custom builds" offering)
 * as the next step for teams whose needs outgrow the off-the-shelf
 * agent. Visually echoes the title-block CTA pattern.
 */
export function CustomBuild() {
  return (
    <section id="custom" className="relative isolate overflow-hidden py-20">
      <SectionWatermark text="CUSTOM" />
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="depth-rise flow-edge border-border-hi relative grid grid-cols-1 gap-10 border p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end">
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
            <span className="bp-ref text-violet">S/06 / the operations layer</span>
            <h2 className="text-ink mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              The chat is the front door.
              <br />
              <span className="text-gradient">We build what runs behind it.</span>
            </h2>
            <p className="text-ink-dim mt-5 max-w-[52ch] leading-[1.6]">
              Lead sourcing, outreach sequences, CRM sync, data pipelines —
              built on your stack, every run audited. The same stack we run
              Flowstack&apos;s own growth on.
            </p>

            <ul className="bp-annot mt-5 grid gap-2.5 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="bp-dot mt-1 shrink-0" aria-hidden />
                Automations wired to your stack — CRM, Sheets, internal tools
              </li>
              <li className="flex items-start gap-2">
                <span className="bp-dot mt-1 shrink-0" aria-hidden />
                Lead sourcing, enrichment and outreach pipelines
              </li>
              <li className="flex items-start gap-2">
                <span className="bp-dot mt-1 shrink-0" aria-hidden />
                The agent delegates the work as it runs
              </li>
              <li className="flex items-start gap-2">
                <span className="bp-dot mt-1 shrink-0" aria-hidden />
                Every run on your dashboard · fully audited
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
            <span className="bp-annot normal-case">
              Free 30-minute call · written scope in 48h
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
