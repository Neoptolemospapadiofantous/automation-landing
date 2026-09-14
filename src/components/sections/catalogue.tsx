import Link from "next/link";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";
import { buildCatalogue, FREE_CALL, FREE_CALL_EL } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * "What we build for you" — the service catalogue.
 *
 * No prices here by design (see `buildCatalogue`). The closing line does
 * the work a price list would: it turns "unknown cost" into "known
 * process, fixed before you commit", and sends the reader to the free
 * call, which is where a number actually comes from.
 *
 * Shared by the homepage and /pricing, in both languages: the Greek pages
 * pass `items={buildCatalogueEl}` and `copy={CATALOGUE_EL}` (the AuditForm
 * copy-prop pattern) instead of keeping a hand-built second grid, which is
 * how the Greek catalogue drifted to five cells while English had four.
 * Pass `sheetRef` only on the homepage, where the numbered drawing set is
 * the navigation.
 */
type CatalogueItem = { name: string; href: string; desc: string; covers: string };

export type CatalogueCopy = {
  heading: string;
  introStrong: string;
  introRest: string;
  closingA: string;
  closingStrong: string;
  closingB: string;
  cta: { href: string; label: string; short: string };
  hrefLang?: "en" | "el";
};

export const CATALOGUE_EN: CatalogueCopy = {
  heading: "What we build for you.",
  introStrong: "Not part of the plans.",
  introRest: "Built for you, on your tools, quoted before it starts.",
  closingA: "Take one, or all of them end to end — one team, one quote.",
  closingStrong: "Fixed price after a free 30-minute call, and you keep the code.",
  closingB:
    "We keep watching what we built, and if the work you repeat every week isn't listed, ask.",
  cta: { href: FREE_CALL.href, label: FREE_CALL.label, short: FREE_CALL.short },
};

export const CATALOGUE_EL: CatalogueCopy = {
  heading: "Τι φτιάχνουμε για εσάς.",
  introStrong: "Δεν είναι μέρος των πλάνων.",
  introRest: "Φτιαγμένο για εσάς, στα δικά σας εργαλεία, με τιμή πριν ξεκινήσουμε.",
  closingA: "Πάρτε ένα, ή όλα μαζί — μία ομάδα, μία προσφορά.",
  closingStrong: "Σταθερή τιμή μετά από δωρεάν ραντεβού 30 λεπτών, και ο κώδικας δικός σας.",
  closingB:
    "Προσέχουμε ό,τι φτιάξαμε, κι αν η δουλειά που επαναλαμβάνετε κάθε εβδομάδα δεν είναι εδώ, ρωτήστε μας.",
  cta: { href: FREE_CALL_EL.href, label: FREE_CALL_EL.label, short: FREE_CALL_EL.short },
  hrefLang: "el",
};

export function Catalogue({
  sheetRef,
  items = buildCatalogue,
  copy = CATALOGUE_EN,
}: {
  sheetRef?: string;
  items?: readonly CatalogueItem[];
  copy?: CatalogueCopy;
}) {
  return (
    <section id="catalogue" className="relative isolate overflow-hidden py-24">
      <SectionWatermark text="BUILD" />

      <div className="mx-auto max-w-[1280px] px-6">
        {sheetRef && <span className="bp-ref text-violet">{sheetRef}</span>}

        <h2 className="text-ink mt-4 max-w-[22ch] text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-4xl lg:text-[44px] lg:leading-[1.06]">
          {copy.heading}
        </h2>

        <p className="text-ink-dim mt-5 max-w-[58ch] leading-[1.6]">
          <span className="text-ink font-semibold">{copy.introStrong}</span>{" "}
          {copy.introRest}
        </p>

        {/* Hairline grid — one cell per service. Two columns from sm; an odd
            last cell spans the row, so the count reads as deliberate rather
            than as a gap where a cell fell out. */}
        <div className="border-border-line bg-border-line mt-10 grid grid-cols-1 gap-px border sm:grid-cols-2">
          {items.map((item, i) => {
            const spans = i === items.length - 1 && items.length % 2 === 1;
            return (
              <Link
                key={item.name}
                href={item.href}
                hrefLang={copy.hrefLang}
                className={cn(
                  "bg-bg lift-hover group flex flex-col gap-2 px-5 py-6",
                  spans && "sm:col-span-2",
                )}
              >
                <span className="text-ink flex items-center gap-2.5 font-mono text-[12px] tracking-[0.12em] uppercase">
                  {/* Drawing-set ref, like P-01/ST-01 elsewhere — the menu
                      reads as numbered, ordered, deliberate. */}
                  <span className="bp-ref text-ink-mute shrink-0">
                    {`B-${String(i + 1).padStart(2, "0")}`}
                  </span>
                  {item.name}
                  <span
                    aria-hidden
                    className="text-violet ml-auto transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
                <p className="text-ink-dim text-[14px] leading-[1.55]">
                  {item.desc}
                </p>
                {/* What the cell absorbed when the list was cut down — the
                    line that keeps "fewer services" from meaning "less offer". */}
                <p className="text-ink-mute mt-0.5 font-mono text-[11px] leading-[1.5]">
                  {item.covers}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Closing move, left-aligned under the grid: the sentence and the
            button belong together, and the bottom-right corner is where the
            chat widget floats — a CTA parked there competes with it. It also
            carries what used to be three separate cells (ongoing care,
            "something else", the end-to-end wrap), which were never services. */}
        <div className="mt-10 flex flex-col items-start gap-5">
          <p className="text-ink-dim max-w-[56ch] leading-[1.6]">
            {copy.closingA}{" "}
            <span className="text-ink font-semibold">{copy.closingStrong}</span>{" "}
            {copy.closingB}
          </p>
          <Link
            href={copy.cta.href}
            hrefLang={copy.hrefLang}
            className={ctaClass()}
          >
            <span className="sm:hidden">{copy.cta.short} →</span>
            <span className="hidden sm:inline">{copy.cta.label} →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
