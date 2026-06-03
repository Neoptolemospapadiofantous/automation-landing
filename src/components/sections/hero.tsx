import Link from "next/link";
import { HeroSchematic, HoursCounter } from "./hero-interactive";
import { registerUrl } from "@/lib/dashboard";

const proof = [
  { v: "60s", l: "from signup to live agent" },
  { v: "<2min", l: "first lead in dashboard" },
  { v: "0", l: "Voiceflow setup required" },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-10 sm:pt-14">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Left column — the pitch */}
          <div className="max-w-[640px]">
            <span className="bp-ref inline-flex items-center gap-2.5">
              <span className="bp-dot" aria-hidden />
              FIG. 00 — your agent, ready in 60 seconds
            </span>

            <h1 className="mt-6 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[76px]">
              An AI agent for your team.{" "}
              <span className="text-gradient">Live in 60 seconds.</span>
            </h1>

            <p className="text-ink-dim mt-7 max-w-[52ch] text-pretty text-lg leading-[1.6]">
              Pick a role — sales, support, lead qualification, onboarding —
              and we provision a chatbot trained on your knowledge, wired to
              your stack, with leads streaming into a real-time dashboard.
              Trial it free; bring us in for custom builds when you outgrow it.
            </p>

            {/* Manifesto — the opinion */}
            <div className="border-border-hi mt-7 border-l pl-4">
              <p className="bp-annot leading-[1.8]">
                {"// no Voiceflow account to set up · no integrations to wire"}
                <br />
                {"// pick a role, paste your knowledge, watch leads land"}
              </p>
            </div>

            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href={registerUrl()}
                className="btn-grad inline-flex items-center justify-center px-6 py-4 text-[13px] font-semibold tracking-[0.12em] uppercase"
              >
                Start free trial →
              </Link>
              <Link
                href="/pricing"
                className="btn-draw inline-flex items-center justify-center px-6 py-4 text-[13px] font-semibold tracking-[0.12em] uppercase"
              >
                See pricing
              </Link>
            </div>

            {/* Proof + live counter */}
            <dl className="border-border-line mt-12 grid grid-cols-2 border sm:grid-cols-4">
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
              <div className="border-border-line border-t px-4 py-4 sm:border-l sm:border-t-0">
                <dt className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  <HoursCounter />
                </dt>
                <dd className="bp-annot mt-1 normal-case">
                  hrs given back · live
                </dd>
              </div>
            </dl>
          </div>

          {/* Right column — the interactive schematic */}
          <div className="lg:pl-2">
            <HeroSchematic />
          </div>
        </div>
      </div>
    </section>
  );
}
