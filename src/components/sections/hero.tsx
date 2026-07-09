import Link from "next/link";
import { HeroSchematic } from "./hero-interactive";
import { SectionWatermark } from "@/components/section-watermark";
import { registerUrl } from "@/lib/dashboard";

/**
 * Proof cells. Three claims that are structurally true — the 48h scope
 * turnaround is the audit-page promise, the other two describe the
 * always-on product. No time-based metric is hard-coded that we can't
 * back. The real "hours given back" / "leads qualified" / "messages
 * handled" counters are in <LiveOutcomes /> below the fold, driven off
 * the dashboard SSE.
 */
const proof = [
  { v: "48h", l: "from audit call to a written, fixed-scope build" },
  { v: "24/7", l: "your ops keep running — including while you're closed" },
  { v: "60s", l: "to add the chat agent · from €99/mo" },
] as const;

export function Hero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden pb-20 pt-10 sm:pt-14">
      <SectionWatermark text="FLOWSTACK" />
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Left column — the pitch */}
          <div className="max-w-[640px]">
            <span className="bp-ref inline-flex items-center gap-2.5">
              <span className="bp-dot" aria-hidden />
              FIG. 00 — the work eating your week
            </span>

            <h1 className="hero-headline-parallax mt-6 text-balance text-[44px] font-semibold leading-[0.99] tracking-[-0.045em] sm:text-[50px] lg:text-[54px]">
              <span className="block">Automate the busywork.</span>
              <span className="text-ink-dim block">Aggregate the data.</span>
              <span className="text-gradient block">Answer every inbound.</span>
            </h1>

            <p className="text-ink-dim mt-7 max-w-[52ch] text-pretty text-lg leading-[1.6]">
              We build the automations that run your repetitive work, pull
              your data from scattered tools into one live view, and put chat
              on your site so nothing inbound waits. One product, end to end.
              From €99/mo.
            </p>

            {/* Manifesto — the opinion */}
            <div className="border-border-hi mt-7 border-l pl-4">
              <p className="bp-annot leading-[1.8]">
                {"// the busywork runs itself · the data lands in one place"}
                <br />
                {"// the chat agent answers the front door"}
              </p>
            </div>

            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href="/audit"
                className="btn-grad inline-flex items-center justify-center px-6 py-4 text-[13px] font-semibold tracking-[0.12em] uppercase"
              >
                Book the free audit →
              </Link>
              <Link
                href={registerUrl()}
                className="btn-draw inline-flex items-center justify-center px-6 py-4 text-[13px] font-semibold tracking-[0.12em] uppercase"
              >
                Try the chat for €99
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
