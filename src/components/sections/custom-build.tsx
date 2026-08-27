import Link from "next/link";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";

/**
 * Upsell band on the homepage: positions the bespoke automation
 * engagement (the original Flowstack "we ship custom builds" offering)
 * as the next step for teams whose needs outgrow the off-the-shelf
 * agent.
 *
 * Since the 2026-08 "ink on paper" redesign this is the page's one
 * full-bleed dark moment: the section re-enters the BLACK sheet via
 * the `sheet-black` token class, so every token inside (--bg, --ink,
 * --violet → plotter yellow #F5C518) flips with it — the two-sheet
 * system from branding/tokens.css doing exactly what it was built for.
 */
export function CustomBuild() {
  return (
    <section
      id="custom"
      className="sheet-black bg-bg text-ink relative isolate mt-24 overflow-hidden py-20"
    >
      <SectionWatermark text="CUSTOM" />

      {/* corner registration ticks — signal yellow on the ink band */}
      <span
        aria-hidden
        className="border-violet pointer-events-none absolute top-5 left-6 h-4 w-4 border-t-2 border-l-2"
      />
      <span
        aria-hidden
        className="border-violet pointer-events-none absolute top-5 right-6 h-4 w-4 border-t-2 border-r-2"
      />
      <span
        aria-hidden
        className="border-violet pointer-events-none absolute bottom-5 left-6 h-4 w-4 border-b-2 border-l-2"
      />
      <span
        aria-hidden
        className="border-violet pointer-events-none absolute right-6 bottom-5 h-4 w-4 border-r-2 border-b-2"
      />

      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-[60ch]">
            <span className="bp-ref text-violet">S/05 / the delegation layer</span>
            <h2 className="text-ink mt-4 text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-4xl lg:text-[44px] lg:leading-[1.06]">
              The chat is the front door.
              <br />
              <span className="text-ink-dim">We build what runs behind it.</span>
            </h2>
            <p className="text-ink-dim mt-5 max-w-[52ch] leading-[1.6]">
              We automate the work behind it, on your own tools. The same
              setup we run our own company on.
            </p>

            {/* Two of these now have pages; the rest are named in full in
                the catalogue directly below, so this list points rather
                than repeats. */}
            <ul className="bp-annot mt-6 grid gap-2.5 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="bp-dot mt-1 shrink-0" aria-hidden />
                <Link href="/outreach" className="underline underline-offset-4">
                  Cold outreach
                </Link>
              </li>
              <li className="flex items-start gap-2">
                <span className="bp-dot mt-1 shrink-0" aria-hidden />
                <Link
                  href="/what-works"
                  className="underline underline-offset-4"
                >
                  One live view
                </Link>
              </li>
              <li className="flex items-start gap-2">
                <span className="bp-dot mt-1 shrink-0" aria-hidden />
                Your tools, wired together
              </li>
              <li className="flex items-start gap-2">
                <span className="bp-dot mt-1 shrink-0" aria-hidden />
                Booking, invoices, inbox triage
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <Link
              href="/audit"
              className={ctaClass()}
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
