import Link from "next/link";
import { pricingTiers } from "@/lib/content";
import { vatLabel } from "@/lib/pricing-display";
import { ctaClass } from "@/components/ui/button";

/**
 * Homepage pricing — the same three tiers as /pricing, from the same
 * `pricingTiers` source so the two can never drift. Compact treatment;
 * the full page keeps the FAQ and VAT disclosure detail.
 */
export function PricingTeaser() {
  return (
    <section id="plans" className="relative isolate overflow-hidden py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-ink flex flex-wrap items-end justify-between gap-4 border-b-[1.5px] pb-5">
          <div>
            <span className="bp-ref text-violet">S/07</span>
            <h2 className="text-ink mt-4 max-w-[24ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Start free. Pay when it works.
            </h2>
          </div>
          <span className="bp-annot hidden normal-case sm:block">No lock-in, ever</span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-bg relative flex flex-col p-7 lg:p-5 ${
                tier.featured
                  ? "border-ink border-[1.5px] shadow-[6px_6px_0_var(--signal)]"
                  : "border-border-hi border"
              }`}
            >
              {tier.featured && (
                <span className="border-ink bg-[var(--signal)] text-[var(--signal-ink)] absolute -top-2.5 left-6 border-[1.5px] px-2 py-0.5 font-mono text-[10px] tracking-[0.22em] uppercase">
                  Most picked
                </span>
              )}
              <span className="text-ink font-mono text-[12px] tracking-[0.22em] uppercase">
                {tier.name}
              </span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-ink text-4xl font-semibold tracking-[-0.03em] tabular-nums lg:text-[28px]">
                  {tier.price}
                </span>
                {tier.price.startsWith("€") && (
                  <span className="text-ink-mute font-mono text-[11px] tracking-[0.18em] uppercase">
                    {vatLabel()}
                  </span>
                )}
              </div>
              <p className="text-ink-mute mt-1 text-[12px]">{tier.cadence}</p>
              <ul className="mb-7 mt-5 space-y-2.5">
                {tier.features.slice(0, 4).map((f) => (
                  <li key={f} className="text-ink-dim flex items-start gap-3 text-[13px]">
                    <span aria-hidden className="bp-dot mt-1.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.cta.href}
                className={ctaClass({
                  variant: tier.featured ? "primary" : "ghost",
                  className: "mt-auto w-full",
                })}
              >
                {tier.cta.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Trust strip — factual claims only, each backed by a live page
            or shipped behavior (DPA in force, AI-disclosure at chat start,
            cancel-anytime billing, code handover on custom builds). */}
        <div className="border-border-line mt-8 grid grid-cols-2 gap-px border bg-border-line text-center lg:grid-cols-4">
          {[
            ["GDPR", "DPA in force"],
            ["EU AI Act", "transparent by design"],
            ["No lock-in", "cancel anytime"],
            ["Custom builds", "you keep the code"],
          ].map(([k, v]) => (
            <div key={k} className="bg-bg px-4 py-3.5">
              <span className="text-ink block font-mono text-[11px] font-bold tracking-[0.14em] uppercase">
                {k}
              </span>
              <span className="text-ink-mute mt-0.5 block font-mono text-[10px] tracking-[0.06em]">
                {v}
              </span>
            </div>
          ))}
        </div>
        <p className="bp-annot mt-5 text-center normal-case">
          {"All prices EUR · final total at checkout · "}
          <Link href="/pricing" className="text-draw hover:text-violet underline-offset-4 hover:underline">
            full pricing &amp; FAQ →
          </Link>
        </p>
      </div>
    </section>
  );
}
