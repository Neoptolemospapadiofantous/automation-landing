import Link from "next/link";
import { HeroSchematic } from "./hero-interactive";
import { SectionWatermark } from "@/components/section-watermark";
import { registerUrl } from "@/lib/dashboard";

/**
 * Proof cells. Three claims that are structurally true for an always-on
 * provisioned chat agent — no time-based metric is hard-coded, so we
 * don't ship a number we can't back. The real "hours given back" /
 * "leads qualified" / "messages handled" counters are in
 * <LiveOutcomes /> below the fold, driven off the dashboard SSE.
 */
const proof = [
  { v: "60s", l: "from signup to live agent" },
  { v: "24/7", l: "always-on, no humans needed" },
  { v: "$99", l: "to start · cancel anytime" },
] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-10 sm:pt-14">
      <SectionWatermark text="FLOWSTACK" />
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Left column — the pitch */}
          <div className="max-w-[640px]">
            <span className="bp-ref inline-flex items-center gap-2.5">
              <span className="bp-dot" aria-hidden />
              FIG. 00 — your AI agent, ready in 60 seconds
            </span>

            <h1 className="hero-headline-parallax mt-6 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[76px]">
              An AI agent for your team.{" "}
              <span className="text-gradient">Live in 60 seconds.</span>
            </h1>

            <p className="text-ink-dim mt-7 max-w-[52ch] text-pretty text-lg leading-[1.6]">
              Pick a role — sales, support, lead qualification, onboarding —
              and we provision an agent trained on your knowledge, with every
              conversation and lead streaming into a real-time dashboard.
              $99/mo to start; bring us in for custom integrations when
              you&apos;re ready.
            </p>

            {/* Manifesto — the opinion */}
            <div className="border-border-hi mt-7 border-l pl-4">
              <p className="bp-annot leading-[1.8]">
                {"// agent first · custom integrations on demand"}
                <br />
                {"// pick a role, paste your knowledge, watch leads land"}
              </p>
            </div>

            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href={registerUrl()}
                className="btn-grad inline-flex items-center justify-center px-6 py-4 text-[13px] font-semibold tracking-[0.12em] uppercase"
              >
                Try it for $99 →
              </Link>
              <Link
                href="/pricing"
                className="btn-draw inline-flex items-center justify-center px-6 py-4 text-[13px] font-semibold tracking-[0.12em] uppercase"
              >
                See pricing
              </Link>
            </div>

            {/* Proof — three structurally-true claims. Real platform
                counters live in <LiveOutcomes /> further down the page. */}
            <dl className="border-border-line mt-12 grid grid-cols-1 border sm:grid-cols-3">
              {proof.map((p, i) => (
                <div
                  key={p.l}
                  className={`px-4 py-4 ${
                    i > 0
                      ? "border-border-line border-t sm:border-l sm:border-t-0"
                      : ""
                  }`}
                >
                  <dt className="text-violet text-2xl font-semibold tracking-tight sm:text-3xl">
                    {p.v}
                  </dt>
                  <dd className="bp-annot mt-1 normal-case">{p.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right column — the interactive schematic, parallax-floated */}
          <div className="hero-schematic-parallax lg:pl-2">
            <HeroSchematic />
          </div>
        </div>
      </div>
    </section>
  );
}
