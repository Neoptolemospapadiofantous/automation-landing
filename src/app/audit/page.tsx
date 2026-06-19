import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { AuditForm } from "@/components/sections/audit-form";

export const metadata: Metadata = {
  title: "Custom build — Flowstack",
  description:
    "When the off-the-shelf agent isn't enough. Book a free 30-minute audit; we come back inside 48 hours with a written scope for the bespoke build.",
  alternates: { canonical: "/audit" },
  openGraph: {
    title: "Custom build — Flowstack",
    url: "/audit",
    description:
      "Free 30-minute audit. Written scope inside 48 hours. Fixed-scope build, you keep the code.",
  },
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

export default function AuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Custom build"
        eyebrowTint="violet"
        title={
          <>
            For teams whose stack outruns{" "}
            <span className="text-gradient">the off-the-shelf agent.</span>
          </>
        }
        lead="The trial gives you the agent itself — chat, knowledge base, transcripts, lead routing. The custom build is where bespoke flows, custom integrations and any internal tooling get wired up. Fixed scope, you own the code."
        ctas={[
          { href: "#audit", label: "Jump to the form →", variant: "primary" },
        ]}
      />

      {/* What to expect — hairline-bordered grid, large mono step number
          as the differentiator (per-step tint collapses in mono). */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-[1280px] px-6">
          <ol className="depth-rise flow-edge grid grid-cols-1 border-t border-l border-border-line md:grid-cols-3">
            {expect.map((e) => (
              <li
                key={e.step}
                className="lift-hover bg-surface/40 relative border-r border-b border-border-line p-8"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-ink font-mono text-5xl font-semibold leading-none tracking-[-0.04em]">
                    {e.step}
                  </span>
                  <span className="bp-dim flex-1" aria-hidden />
                </div>
                <h3 className="text-ink mt-5 text-xl font-semibold tracking-[-0.02em]">
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
