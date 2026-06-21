import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { FAQ } from "@/components/sections/faq";
import { SectionHeading } from "@/components/section-heading";
import { pricingTiers } from "@/lib/content";
import { vatLabel } from "@/lib/pricing-display";

export const metadata: Metadata = {
  title: "Pricing — Flowstack",
  description:
    "Start with one agent for €99/mo. Scale to five for €399/mo. Custom builds with bespoke integrations on your stack — scoped per project. No lock-in, ever.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — Flowstack",
    url: "/pricing",
    description:
      "Start with one agent for €99/mo. Scale to five for €399/mo. Custom builds scoped per project.",
  },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        eyebrowTint="violet"
        title={
          <>
            Try it for €99. Scale when it works.{" "}
            <span className="text-gradient">Custom when you need it.</span>
          </>
        }
        lead="One agent for €99/mo to try the product. Five agents for €399/mo when you're running it in production. Custom builds with bespoke integrations on your stack — fixed scope, you keep the code."
      />

      {/* Pricing tiers — hairline-bordered cards in the editorial mono
          language. Featured tier gets a white top accent + corner ticks
          (the ring-violet emphasis no longer reads in mono). */}
      <section className="relative pb-12">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="depth-rise grid grid-cols-1 gap-0 border-t border-l border-border-line lg:grid-cols-3">
            {pricingTiers.map((tier, i) => {
              const ref = `TIER-0${i + 1}`;
              return (
                <div
                  key={tier.name}
                  className={`lift-hover relative flex flex-col border-r border-b border-border-line bg-surface/40 p-8 ${
                    tier.featured ? "flow-edge border-t-2 border-t-ink lg:-mt-px" : ""
                  }`}
                >
                  {tier.featured && (
                    <>
                      <span
                        aria-hidden
                        className="absolute -left-px -top-px h-3 w-3 border-l border-t border-ink"
                      />
                      <span
                        aria-hidden
                        className="absolute -right-px -top-px h-3 w-3 border-r border-t border-ink"
                      />
                      <span className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink">
                        MOST PICKED
                      </span>
                    </>
                  )}

                  <span className="bp-ref text-ink-mute">{ref}</span>
                  <h3 className="text-ink mt-2 font-mono text-[13px] uppercase tracking-[0.22em]">
                    {tier.name}
                  </h3>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-ink text-4xl font-semibold tracking-[-0.03em]">
                      {tier.price}
                    </span>
                    {/* VAT label — only shown next to numeric prices.
                        Custom tier ("Let's talk") has no number to qualify. */}
                    {tier.price.startsWith("€") && (
                      <span className="text-ink-mute font-mono text-[11px] uppercase tracking-[0.18em]">
                        {vatLabel()}
                      </span>
                    )}
                  </div>
                  <p className="text-ink-mute mt-1 text-[13px]">
                    {tier.cadence}
                  </p>

                  <div className="bp-dim mt-5 w-full" aria-hidden />

                  <p className="text-ink-dim mt-5 text-[15px] leading-[1.5]">
                    {tier.tagline}
                  </p>

                  <ul className="mt-7 space-y-3.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="bp-dot mt-2 shrink-0"
                        />
                        <span className="text-ink text-[14.5px] leading-[1.45]">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={tier.cta.href}
                    className={`mt-8 inline-flex w-full items-center justify-center px-6 py-4 text-[13px] font-semibold tracking-[0.12em] uppercase ${
                      tier.featured ? "btn-grad" : "btn-draw"
                    }`}
                  >
                    {tier.cta.label}
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="bp-annot mt-8 text-center">
            {"// all projects: built on your stack · code & credentials handed over · no monthly minimums"}
          </p>
          {/* VAT disclosure — required for Cyprus / EU sellers under
              CRD Art. 6 + Electronic Commerce Law 156(I)/2004. Wording
              is driven by src/lib/pricing-display.ts so flipping the
              VAT treatment is a one-config-change. */}
          <p className="text-ink-mute mt-3 text-center font-mono text-[11px] uppercase tracking-[0.18em]">
            All prices in EUR · {vatLabel()} · final total shown at
            checkout
          </p>
        </div>
      </section>

      <section className="relative pt-12">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="Before you ask"
            tint="violet"
            title="The pricing questions everyone has."
          />
        </div>
      </section>
      <FAQ hideHeading />
    </>
  );
}
