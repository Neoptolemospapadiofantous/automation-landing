import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { AuditForm } from "@/components/sections/audit-form";

export const metadata: Metadata = {
  title: "Custom build — Flowstack",
  description:
    "End-to-end data aggregation and automation: the repetitive work run for you, the integrations into your stack, your data pulled from client-facing chat to in-house tools into one live view. Book a free 30-minute audit; we return in 48 hours with a written, fixed-scope build. You keep the code.",
  alternates: { canonical: "/audit" },
  openGraph: {
    title: "Custom build — Flowstack",
    url: "/audit",
    description:
      "End-to-end data aggregation and automation — integrations, pipelines, one live view. Free 30-minute audit, written fixed-scope build, you keep the code.",
  },
};

const expect = [
  {
    step: "01",
    tint: "cyan",
    title: "30-minute call",
    body: "You walk us through the work you want off your plate. No slides on our side.",
  },
  {
    step: "02",
    tint: "violet",
    title: "Written scope in 48h",
    body: "A fixed-scope proposal: what ships, in how long, for how much. Yours to keep.",
  },
  {
    step: "03",
    tint: "success",
    title: "You decide",
    body: "Hire us, take the scope elsewhere, or build it yourself. No follow-up sales emails.",
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
            Your operation, wired{" "}
            <span className="text-gradient">end to end.</span>
          </>
        }
        lead="We map the work your team repeats, then build the automations and pipelines that run it — chat to in-house systems to one live dashboard. We scope it, build it, and hand you the code."
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
