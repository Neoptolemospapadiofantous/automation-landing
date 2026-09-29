import Link from "next/link";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";
import { FREE_CALL } from "@/lib/content";

/**
 * The wiring band on the homepage: the built-to-order half of the one
 * service (2026-09-29) — the chat connected to the customer's own
 * calendar, sheet or CRM, plus the phone assistant on request.
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
            <span className="bp-ref text-violet">S/04 / wired in</span>
            <h2 className="text-ink mt-4 text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-4xl lg:text-[44px] lg:leading-[1.06]">
              Answered is half of it.
              <br />
              <span className="text-ink-dim">
                Filed where you work is the rest.
              </span>
            </h2>
            <p className="text-ink-dim mt-5 max-w-[52ch] leading-[1.6]">
              We connect the chat to the calendar, sheet or CRM you already
              run, so an answered enquiry lands there as a lead — not a
              transcript someone has to copy. A phone assistant can be added,
              built to order.
            </p>

            {/* Pointers into the one service since 2026-09-29: what the chat
                does today and the free call that prices the wiring. */}
            <ul className="bp-annot mt-6 grid gap-2.5 sm:grid-cols-2">
              {[
                { href: "/chat-assistant", label: "What the chat does today" },
                { href: "/pricing", label: "Chat plans" },
              ].map((l) => (
                <li key={l.href} className="flex items-start gap-2">
                  <span className="bp-dot mt-1 shrink-0" aria-hidden />
                  <Link
                    href={l.href}
                    className="inline-block py-1.5 underline underline-offset-4"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <Link
              href={FREE_CALL.href}
              className={ctaClass()}
            >
              <span className="sm:hidden">{FREE_CALL.short} →</span>
              <span className="hidden sm:inline">{FREE_CALL.label} →</span>
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
