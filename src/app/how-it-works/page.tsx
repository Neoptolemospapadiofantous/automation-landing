import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/section-heading";
import { processDeliverables, tintMap, type Tint } from "@/lib/content";

export const metadata: Metadata = {
  title: "How it works — Flowstack",
  description:
    "One week: we audit, we ship, we hand over. You keep the system, the code and the credentials. No retainer trap.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        eyebrowTint="violet"
        title={
          <>
            One week from chaos to{" "}
            <span className="text-gradient">calm.</span>
          </>
        }
        lead="No discovery-phase theatre. No 6-month engagement. We shadow your team, ship the three highest-leverage automations, and hand you the keys."
        ctas={[
          { href: "/audit", label: "Start with an audit →", variant: "primary" },
          { href: "/pricing", label: "See pricing", variant: "secondary" },
        ]}
      />

      <HowItWorks hideHeading />

      {/* Deliverables per phase */}
      <section className="relative py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="What you actually get"
            tint="cyan"
            title="Every phase ends with something in your hands."
            sub="No vague 'strategy decks'. Concrete artifacts you own at the end of each phase."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {processDeliverables.map((p) => {
              const t = tintMap[p.tint as Tint];
              return (
                <div key={p.phase} className="glass rounded-3xl p-8">
                  <span
                    className={`${t.text} font-mono text-[11px] tracking-[0.18em]`}
                  >
                    {p.phase}
                  </span>
                  <ul className="mt-6 space-y-4">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${t.bg} ${t.border} ${t.text}`}
                        >
                          ✓
                        </span>
                        <span className="text-ink text-[14.5px] leading-[1.5]">
                          {it}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="Day one starts with a free audit."
        subtitle="Book the 30-minute call. If there's nothing worth automating, we'll tell you — and you keep the report."
      />
    </>
  );
}
