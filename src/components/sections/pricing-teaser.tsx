import Link from "next/link";
import { pricingTiers } from "@/lib/content";
import { vatLabel } from "@/lib/pricing-display";

/**
 * Homepage pricing — the same three tiers as /pricing, from the same
 * `pricingTiers` source so the two can never drift. Compact treatment;
 * the full page keeps the FAQ and VAT disclosure detail.
 */
export function PricingTeaser() {
  return (
    <section id="plans" className="relative isolate overflow-hidden py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-border-hi flex flex-wrap items-end justify-between gap-4 border-b pb-5">
          <div>
            <span className="bp-ref text-violet">S/09</span>
            <h2 className="text-ink mt-4 max-w-[24ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Try it for €99. Scale when it works.
            </h2>
          </div>
          <span className="bp-annot hidden sm:block">{"// no lock-in, ever"}</span>
        </div>

        <div className="border-border-hi mt-10 grid grid-cols-1 gap-px border bg-border-hi lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col p-7 ${tier.featured ? "bg-bg-elev" : "bg-bg"}`}
            >
              {tier.featured && (
                <>
                  <span aria-hidden className="bg-violet absolute -top-px left-0 right-0 h-0.5" />
                  <span className="text-violet absolute right-5 top-4 font-mono text-[9px] tracking-[0.22em] uppercase">
                    Most picked
                  </span>
                </>
              )}
              <span className="text-ink font-mono text-[12px] tracking-[0.22em] uppercase">
                {tier.name}
              </span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-ink text-4xl font-semibold tracking-[-0.03em] tabular-nums">
                  {tier.price}
                </span>
                {tier.price.startsWith("€") && (
                  <span className="text-ink-mute font-mono text-[11px] tracking-[0.18em] uppercase">
                    {vatLabel()}
                  </span>
                )}
              </div>
              <p className="text-ink-mute mt-1 text-[12.5px]">{tier.cadence}</p>
              <ul className="mb-7 mt-5 space-y-2.5">
                {tier.features.slice(0, 4).map((f) => (
                  <li key={f} className="text-ink-dim flex items-start gap-3 text-[13.5px]">
                    <span aria-hidden className="bp-dot mt-1.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.cta.href}
                className={`mt-auto inline-flex w-full items-center justify-center px-6 py-3.5 text-[12px] font-semibold tracking-[0.12em] uppercase ${
                  tier.featured ? "btn-grad" : "btn-draw"
                }`}
              >
                {tier.cta.label}
              </Link>
            </div>
          ))}
        </div>

        <p className="bp-annot mt-5 text-center">
          {"// all prices EUR · final total at checkout · "}
          <Link href="/pricing" className="text-draw hover:text-violet underline-offset-4 hover:underline">
            full pricing &amp; FAQ →
          </Link>
        </p>
      </div>
    </section>
  );
}
