import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { AuditForm } from "@/components/sections/audit-form";

export const metadata: Metadata = {
  title: "Book a free audit — Flowstack",
  description:
    "30-minute call, written diagnosis in 48 hours. Yours to keep, even if you never hire us. No credit card, no pitch.",
};

const expect = [
  {
    step: "01",
    tint: "cyan",
    title: "30-minute call",
    body: "We ask where the manual work lives. You talk, we map. No slides, no pitch deck.",
  },
  {
    step: "02",
    tint: "violet",
    title: "We diagnose",
    body: "Within 48 hours you get a written report scoring your top 5 leaks by hours saved and difficulty.",
  },
  {
    step: "03",
    tint: "success",
    title: "You decide",
    body: "Hire us, take the report to someone else, or do it yourself. The document is yours either way.",
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
        eyebrow="Free — 30 min — no pitch"
        eyebrowTint="success"
        title={
          <>
            Book your free{" "}
            <span className="text-gradient">automation audit.</span>
          </>
        }
        lead="Tell us where the bleeding is. We come back inside 48 hours with a written diagnosis of your top 5 leaks — hours saved and difficulty scored."
        ctas={[{ href: "#audit", label: "Jump to the form →", variant: "primary" }]}
      />

      {/* What to expect */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-[1280px] px-6">
          <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {expect.map((e) => (
              <li key={e.step} className="glass rounded-3xl p-8">
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
