"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/content";

export function FAQ({ hideHeading = false }: { hideHeading?: boolean }) {
  return (
    <section id="faq" className="relative py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        {!hideHeading && (
          <header className="mx-auto max-w-[920px]">
            <div className="border-border-line flex items-end justify-between border-b pb-4">
              <div>
                <span className="bp-ref">SHEET 07 / FAQ</span>
                <h2 className="text-ink mt-4 max-w-[20ch] text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
                  Things you&apos;re probably wondering.
                </h2>
              </div>
              <span
                className="bp-annot hidden shrink-0 sm:block"
                aria-hidden="true"
              >
                {"// objections, answered"}
              </span>
            </div>
          </header>
        )}

        <Accordion
          defaultValue={["item-0"]}
          className={`border-border-line mx-auto max-w-[920px] border-t ${
            hideHeading ? "" : "mt-12"
          }`}
        >
          {faqItems.map((it, i) => {
            const ref = `Q-${String(i + 1).padStart(2, "0")}`;
            return (
              <AccordionItem
                key={it.q}
                value={`item-${i}`}
                className="border-border-line border-b border-t-0 transition-colors data-open:border-l-2 data-open:border-l-violet data-open:bg-surface/40"
              >
                <AccordionTrigger className="group/q text-ink rounded-none border-0 px-5 py-5 text-left hover:no-underline">
                  <span className="flex items-baseline gap-4">
                    <span className="text-ink-mute group-data-open/q:text-violet shrink-0 font-mono text-[12px] tracking-[0.18em] tabular-nums">
                      {ref}
                    </span>
                    <span className="text-[17px] font-semibold leading-snug tracking-[-0.01em]">
                      {it.q}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-ink-dim px-5 pb-6 pt-0 text-[15px] leading-[1.65]">
                  <div className="flex gap-4">
                    <span
                      className="bp-dot mt-1.5 shrink-0"
                      aria-hidden="true"
                    />
                    <p className="max-w-[68ch]">{it.a}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
