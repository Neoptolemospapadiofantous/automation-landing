import Link from "next/link";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";
import { buildCatalogue } from "@/lib/content";

/**
 * "What we build for you" — the service catalogue.
 *
 * Lands on the white sheet directly after the black custom-build band:
 * that band says we build what runs behind the chat, this one says what
 * those things actually are. Before this existed, nine of the ten
 * services sold in person were invisible to a visitor — including the
 * two biggest, outreach and the live view.
 *
 * No prices here by design (see `buildCatalogue`). The closing line does
 * the work a price list would: it turns "unknown cost" into "known
 * process, fixed before you commit", and sends the reader to the audit,
 * which is where a number actually comes from.
 *
 * Shared with /pricing — pass `sheetRef` only on the homepage, where the
 * numbered drawing set is the navigation.
 */
export function Catalogue({ sheetRef }: { sheetRef?: string }) {
  return (
    <section id="catalogue" className="relative isolate overflow-hidden py-24">
      <SectionWatermark text="BUILD" />

      <div className="mx-auto max-w-[1280px] px-6">
        {sheetRef && <span className="bp-ref text-violet">{sheetRef}</span>}

        <h2 className="text-ink mt-4 max-w-[22ch] text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-4xl lg:text-[44px] lg:leading-[1.06]">
          What we build for you.
        </h2>

        <p className="text-ink-dim mt-5 max-w-[58ch] leading-[1.6]">
          <span className="text-ink font-semibold">
            None of these are part of the monthly plans.
          </span>{" "}
          The plans are the chat. Everything below is work we do for you,
          scoped to your own tools and quoted before it starts.
        </p>

        {/* Hairline grid — one cell per service. Two columns from sm, so the
            twelve read as a menu rather than a wall. */}
        <div className="border-border-line mt-10 grid grid-cols-1 gap-px border bg-border-line sm:grid-cols-2">
          {buildCatalogue.map((item) => {
            /* Three of the twelve link out — the two biggest builds have
               pages, and the end-to-end cell goes to the audit. The rest
               explain themselves here. `in` keeps this type-safe against
               the const tuple. */
            const href = "href" in item ? item.href : null;

            const inner = (
              <>
                <span className="text-ink flex items-center gap-2.5 font-mono text-[12px] tracking-[0.12em] uppercase">
                  <span className="bp-dot shrink-0" aria-hidden />
                  {item.name}
                  {href && (
                    <span
                      aria-hidden
                      className="text-violet ml-auto transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  )}
                </span>
                <p className="text-ink-dim text-[14px] leading-[1.55]">
                  {item.desc}
                </p>
              </>
            );

            return href ? (
              <Link
                key={item.name}
                href={href}
                className="bg-bg lift-hover group flex flex-col gap-2 px-5 py-6"
              >
                {inner}
              </Link>
            ) : (
              <div
                key={item.name}
                className="bg-bg lift-hover flex flex-col gap-2 px-5 py-6"
              >
                {inner}
              </div>
            );
          })}
        </div>

        {/* Closing move, left-aligned under the grid: the sentence and the
            button belong together, and the bottom-right corner is where the
            chat widget floats — a CTA parked there competes with it. */}
        <div className="mt-10 flex flex-col items-start gap-5">
          <p className="text-ink-dim max-w-[52ch] leading-[1.6]">
            Scoped and quoted after a free 30-minute audit.{" "}
            <span className="text-ink font-semibold">
              Fixed price, and you keep the code.
            </span>
          </p>
          <Link href="/audit" className={ctaClass()}>
            Book the audit →
          </Link>
        </div>
      </div>
    </section>
  );
}
