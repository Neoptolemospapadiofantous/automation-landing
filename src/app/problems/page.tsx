import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Problems } from "@/components/sections/problems";
import { CTASection } from "@/components/sections/cta-section";
import { costStats, tintMap, type Tint } from "@/lib/content";

export const metadata: Metadata = {
  title: "Problems we fix — Flowstack",
  description:
    "Every manual process is a slow leak: missed leads, wasted senior time, invisible funnels, human error. Here's what it's costing you.",
};

export default function ProblemsPage() {
  return (
    <>
      <PageHero
        eyebrow="Problems we fix"
        eyebrowTint="danger"
        title={
          <>
            The hidden tax on every{" "}
            <span className="text-gradient">manual process.</span>
          </>
        }
        lead="It rarely shows up as one big number. It hides in 21 lost hours here, a 47-hour reply there, a wrong invoice once a month. Added up, it's a salary you never approved."
        ctas={[
          { href: "/audit", label: "Find my leaks →", variant: "primary" },
          { href: "/how-it-works", label: "See how we fix it", variant: "secondary" },
        ]}
      />

      {/* Cost-of-manual-work stats */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {costStats.map((s) => {
              const t = tintMap[s.c as Tint];
              return (
                <div key={s.l} className="glass rounded-3xl p-7">
                  <div
                    className={`text-4xl font-semibold tracking-[-0.04em] sm:text-5xl ${t.text}`}
                  >
                    {s.v}
                  </div>
                  <p className="text-ink-dim mt-3 text-[14px] leading-[1.5]">
                    {s.l}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Problems />

      <CTASection
        title="Let's find out where you're bleeding."
        subtitle="A free 30-minute audit returns a scored list of your top 5 leaks — in writing, in 48 hours."
      />
    </>
  );
}
