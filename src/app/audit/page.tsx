import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { AuditForm } from "@/components/sections/audit-form";

export const metadata: Metadata = {
  title: "Custom build",
  description:
    "Thirty minutes and you'll have a number. Every build is scoped here first: a free 30-minute audit, then a written fixed-scope proposal within 48 hours — what ships, in how long, for how much. Yours to keep.",
  alternates: { canonical: "/audit" },
  openGraph: {
    title: "Custom build — Flowstack",
    url: "/audit",
    description:
      "Every build is scoped here first: a free 30-minute audit, then a written fixed-scope proposal within 48 hours. Yours to keep, whether or not you go ahead.",
  },
};

const expect = [
  {
    step: "01",
    title: "30-minute call",
    body: "You walk us through the work you want off your plate. No slides on our side.",
  },
  {
    step: "02",
    title: "Written scope in 48h",
    body: "A fixed-scope proposal: what ships, in how long, for how much. Yours to keep.",
  },
  {
    step: "03",
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
            Thirty minutes, and you&apos;ll have{" "}
            <span className="text-gradient">a number.</span>
          </>
        }
        lead="Every build is quoted for your stack. Free, in 48 hours, yours to keep."
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
                <p className="text-ink-dim mt-3 text-[15px] leading-[1.55]">
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
