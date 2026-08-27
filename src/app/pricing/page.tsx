import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { PricingJsonLd } from "@/components/jsonld";
import { FAQ } from "@/components/sections/faq";
import { Catalogue } from "@/components/sections/catalogue";
import { SectionHeading } from "@/components/section-heading";
import { pricingTiers } from "@/lib/content";
import { vatLabel } from "@/lib/pricing-display";
import { ctaClass } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start free with one agent. Paid plans are €9 to €39 a month, and €39 is our most expensive. Anything we build is quoted per project. No lock-in, ever.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — Flowstack",
    url: "/pricing",
    description:
      "Start free with one agent. Paid plans from €9/mo. Custom builds scoped per project.",
  },
};

export default function PricingPage() {
  return (
    <>
      <PricingJsonLd />
      <PageHero
        eyebrow="Pricing"
        eyebrowTint="violet"
        title={
          <>
            Start free. Pay when it works.{" "}
            <span className="text-gradient">Custom when you need it.</span>
          </>
        }
        lead="The chat has a price list. Everything we build is quoted for your setup."
      />

      <Tldr
        rows={[
          {
            k: "The chat",
            v: "Free for one agent. €9, €19 or €39 a month for more agents and more chats.",
          },
          {
            k: "Anything we build",
            v: "No list price. We quote it after a free 30-minute call, and the price is fixed.",
          },
          {
            k: "Lock-in",
            v: "None. Cancel any month. On builds, the code is yours to keep.",
          },
        ]}
      />

      {/* Pricing tiers — hairline-bordered cards in the editorial mono
          language. Featured tier gets a white top accent + corner ticks
          (the ring-violet emphasis no longer reads in mono). */}
      <section className="relative pb-12">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="depth-rise grid grid-cols-1 gap-0 border-t border-l border-border-line md:grid-cols-2 lg:grid-cols-5">
            {pricingTiers.map((tier, i) => {
              const ref = `TIER-0${i + 1}`;
              return (
                <div
                  key={tier.name}
                  className={`lift-hover relative flex flex-col border-r border-b border-border-line bg-surface/40 p-8 lg:p-4 xl:p-6 ${
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
                  <h2 className="text-ink mt-2 font-mono text-[13px] uppercase tracking-[0.22em]">
                    {tier.name}
                  </h2>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-ink text-4xl font-semibold tracking-[-0.03em] lg:text-3xl">
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

                  <p className="text-ink-dim mt-5 text-[15px] leading-[1.5] lg:text-[13px]">
                    {tier.tagline}
                  </p>

                  <ul className="mt-7 space-y-3.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="bp-dot mt-2 shrink-0"
                        />
                        <span className="text-ink text-[15px] leading-[1.45] lg:text-[13px]">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={tier.cta.href}
                    className={ctaClass({
                      variant: tier.featured ? "primary" : "ghost",
                      className: "mt-8 w-full lg:px-3 lg:text-[12px] xl:px-6 xl:text-[13px]",
                    })}
                  >
                    {tier.cta.label}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* What a credit actually buys. "2,500 conversation credits" is a
              unit with no exchange rate until you say this — the numbers and
              the never-charged list come from the services sheet. */}
          <p className="text-ink-dim mx-auto mt-8 max-w-[62ch] text-center text-[14px] leading-[1.6]">
            A short chat uses 5–8 credits. So Starter covers roughly{" "}
            <span className="text-ink font-semibold">300–500 chats a month</span>,
            and Operator about ten times that. You are not charged for the opening
            hello, a visitor coming back to an old chat, the instant answers we
            set up for your common questions, or any chat one of your team takes
            over.
          </p>

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

      {/* The subscription is the only thing with a price. Everything we build
          is scoped after the audit — but a visitor still has to be able to
          learn it exists, which is what this repeats from the homepage. */}
      <Catalogue />

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
