import Link from "next/link";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";
import { buildCatalogue } from "@/lib/content";
import { cn } from "@/lib/utils";

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
            Not part of the plans.
          </span>{" "}
          Built for you, on your tools, quoted before it starts.
        </p>

        {/* Hairline grid — one cell per service. Two columns from sm; an odd
            last cell spans the row, so the count reads as deliberate rather
            than as a gap where a cell fell out. */}
        <div className="border-border-line bg-border-line mt-10 grid grid-cols-1 gap-px border sm:grid-cols-2">
          {buildCatalogue.map((item, i) => {
            /* Every service has a page of its own — that was the point of
               cutting the list down. `in` keeps this type-safe against the
               const tuple. */
            const href = "href" in item ? item.href : null;
            const spans =
              i === buildCatalogue.length - 1 && buildCatalogue.length % 2 === 1;

            const inner = (
              <>
                <span className="text-ink flex items-center gap-2.5 font-mono text-[12px] tracking-[0.12em] uppercase">
                  {/* Drawing-set ref, like P-01/ST-01 elsewhere — the menu
                      reads as numbered, ordered, deliberate. */}
                  <span className="bp-ref text-ink-mute shrink-0">
                    {`B-${String(i + 1).padStart(2, "0")}`}
                  </span>
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
                {/* What the cell absorbed when the list was cut down. This is
                    the line that keeps "fewer services" from meaning "less
                    offer". */}
                <p className="text-ink-mute mt-0.5 font-mono text-[11px] leading-[1.5]">
                  {item.covers}
                </p>
              </>
            );

            return href ? (
              <Link
                key={item.name}
                href={href}
                className={cn(
                  "bg-bg lift-hover group flex flex-col gap-2 px-5 py-6",
                  spans && "sm:col-span-2",
                )}
              >
                {inner}
              </Link>
            ) : (
              <div
                key={item.name}
                className={cn(
                  "bg-bg lift-hover flex flex-col gap-2 px-5 py-6",
                  spans && "sm:col-span-2",
                )}
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
          {/* Carries what used to be three separate cells — ongoing care,
              "something else", and the end-to-end wrap. They were a term, an
              invitation and a wrap, never services. */}
          <p className="text-ink-dim max-w-[56ch] leading-[1.6]">
            Take one, or all of them end to end — one team, one quote.{" "}
            <span className="text-ink font-semibold">
              Fixed price after a free 30-minute audit, and you keep the code.
            </span>{" "}
            We keep watching what we built, and if the work you repeat every
            week isn&apos;t listed, ask.
          </p>
          <Link href="/audit" className={ctaClass()}>
            Book the audit →
          </Link>
        </div>
      </div>
    </section>
  );
}
