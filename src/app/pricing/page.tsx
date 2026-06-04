import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { FAQ } from "@/components/sections/faq";
import { SectionHeading } from "@/components/section-heading";
import { pricingTiers, tintMap, type Tint } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing — Flowstack",
  description:
    "Start with one agent for $19/mo. Scale to five for $79/mo. Custom builds from $6k — n8n operations + integrations on your stack. No lock-in, ever.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        eyebrowTint="violet"
        title={
          <>
            Try it for $19. Scale when it works.{" "}
            <span className="text-gradient">Custom when you need it.</span>
          </>
        }
        lead="One agent for $19/mo to try the product. Five agents for $79/mo when you're running it in production. Custom builds with n8n operations and integrations on your stack — fixed scope, you keep the code."
      />

      {/* Pricing tiers */}
      <section className="relative pb-12">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {pricingTiers.map((tier) => {
              const t = tintMap[tier.tint as Tint];
              return (
                <div
                  key={tier.name}
                  className={`glass relative flex flex-col rounded-3xl p-8 ${
                    tier.featured ? "ring-1 ring-violet/40" : ""
                  }`}
                >
                  {tier.featured && (
                    <span className="bg-violet/15 border-violet/40 text-violet absolute right-6 top-6 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em]">
                      MOST PICKED
                    </span>
                  )}
                  <h3 className={`text-sm font-semibold tracking-wide ${t.text}`}>
                    {tier.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-ink text-4xl font-semibold tracking-[-0.03em]">
                      {tier.price}
                    </span>
                  </div>
                  <p className="text-ink-mute mt-1 text-[13px]">
                    {tier.cadence}
                  </p>
                  <p className="text-ink-dim mt-4 text-[15px] leading-[1.5]">
                    {tier.tagline}
                  </p>

                  <ul className="mt-7 space-y-3.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${t.bg} ${t.border} ${t.text}`}
                        >
                          ✓
                        </span>
                        <span className="text-ink text-[14.5px] leading-[1.45]">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={tier.cta.href}
                    className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-[15px] font-semibold transition ${
                      tier.featured
                        ? "btn-grad"
                        : "glass text-ink hover:bg-surface-hi/60"
                    }`}
                  >
                    {tier.cta.label}
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="text-ink-mute mt-8 text-center text-[13px]">
            All projects: built on your stack · code &amp; credentials handed
            over · no monthly minimums.
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
