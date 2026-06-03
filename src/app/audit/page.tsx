import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { AuditForm } from "@/components/sections/audit-form";

export const metadata: Metadata = {
  title: "Custom build — Flowstack",
  description:
    "When the off-the-shelf agent isn't enough. Book a free 30-minute audit; we come back inside 48 hours with a written scope for the bespoke build.",
};

const expect = [
  {
    step: "01",
    tint: "cyan",
    title: "30-minute call",
    body: "You walk us through what the off-the-shelf agent can't do — the integration, the flow, the edge case. No slides on our side.",
  },
  {
    step: "02",
    tint: "violet",
    title: "Written scope in 48h",
    body: "We come back with a fixed-scope build proposal: what we'll ship, on which integrations, in how long, for how much. Yours to keep.",
  },
  {
    step: "03",
    tint: "success",
    title: "You decide",
    body: "Hire us for the build, take the scope to someone else, or do it yourself. The document is yours either way — no follow-up sales emails.",
  },
] as const;

const tintText: Record<string, string> = {
  cyan: "text-cyan",
  violet: "text-violet",
  success: "text-success",
};

export default function AuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Custom build"
        eyebrowTint="violet"
        title={
          <>
            For teams whose needs outrun{" "}
            <span className="text-gradient">the off-the-shelf agent.</span>
          </>
        }
        lead="The trial chat covers most cases. When it doesn't — custom Voiceflow flows, bespoke integrations, your own LLM, internal tooling on top — Flowstack ships it. One week, fixed scope, you own the code."
        ctas={[
          { href: "#audit", label: "Jump to the form →", variant: "primary" },
        ]}
      />

      {/* What to expect */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-[1280px] px-6">
          <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {expect.map((e) => (
              <li key={e.step} className="glass p-8">
                <span
                  className={`font-mono text-[13px] tracking-[0.18em] ${tintText[e.tint]}`}
                >
                  {e.step}
                </span>
                <h3 className="text-ink mt-4 text-xl font-semibold tracking-[-0.02em]">
                  {e.title}
                </h3>
                <p className="text-ink-dim mt-3 text-[14.5px] leading-[1.55]">
                  {e.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <AuditForm />
    </>
  );
}
