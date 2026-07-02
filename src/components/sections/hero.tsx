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
  { v: "60s", l: "from signup to answering visitors" },
  { v: "24/7", l: "covered — including the hours you're closed" },
  { v: "€99", l: "to start · cancel anytime" },
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
              FIG. 00 — where your after-hours leads go
            </span>

            <h1 className="hero-headline-parallax mt-6 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[76px]">
              Your customers reach out around the clock.{" "}
              <span className="text-gradient">Your team can&apos;t.</span>
            </h1>

            <p className="text-ink-dim mt-7 max-w-[52ch] text-pretty text-lg leading-[1.6]">
              Put an always-on agent on your site that greets every visitor,
              answers from your own knowledge, and hands your team only the
              conversations worth their time — the moment someone messages, at
              2pm or 2am. Every lead and transcript in one real-time dashboard.
              From €99/mo, live in 60 seconds.
            </p>

            {/* Manifesto — the opinion */}
            <div className="border-border-hi mt-7 border-l pl-4">
              <p className="bp-annot leading-[1.8]">
                {"// every inbound answered · nothing waits for morning"}
                <br />
                {"// pick the job to be done · we provision the agent"}
              </p>
            </div>

            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href={registerUrl()}
                className="btn-grad inline-flex items-center justify-center px-6 py-4 text-[13px] font-semibold tracking-[0.12em] uppercase"
              >
                Try it for €99 →
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
            <dl className="flow-edge border-border-line mt-12 grid grid-cols-1 border sm:grid-cols-3">
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
