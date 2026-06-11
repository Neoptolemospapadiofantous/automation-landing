import Link from "next/link";
import { registerUrl } from "@/lib/dashboard";
import { SectionWatermark } from "@/components/section-watermark";

export function FinalCTA() {
  const title = "Start the agent. Custom build optional.";
  const subtitle =
    "60 seconds to a live agent, $99/mo, cancel anytime. Bring us in for bespoke work when — or if — you outgrow it.";
  const primary = { href: registerUrl(), label: "Try it for $99 →" };
  const secondary = { href: "/audit", label: "Talk about custom" };

  return (
    <section className="relative isolate overflow-hidden py-24">
      <SectionWatermark text="GO" />
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="glass-strong relative px-8 py-16 sm:px-16 sm:py-20">
          {/* corner registration ticks */}
          <span
            aria-hidden
            className="border-violet pointer-events-none absolute -left-px -top-px h-4 w-4 border-l border-t"
          />
          <span
            aria-hidden
            className="border-violet pointer-events-none absolute -right-px -top-px h-4 w-4 border-r border-t"
          />
          <span
            aria-hidden
            className="border-violet pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-b border-l"
          />
          <span
            aria-hidden
            className="border-violet pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b border-r"
          />

          {/* sheet reference, top-left */}
          <div className="bp-ref absolute left-6 top-6 sm:left-8 sm:top-8">
            SHEET 09 / NEXT STEP
          </div>

          <div className="relative flex flex-col items-center text-center">
            <span className="bp-annot mb-6 block" aria-hidden>
              {"// commit"}
            </span>

            <h2 className="max-w-[22ch] text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[56px]">
              {title}
            </h2>

            <p className="text-ink-dim mt-6 max-w-[58ch] text-balance font-mono text-sm leading-[1.7] tracking-[0.04em]">
              {subtitle}
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href={primary.href}
                className="btn-grad inline-flex items-center justify-center px-7 py-4 text-[13px]"
              >
                {primary.label}
              </Link>
              <Link
                href={secondary.href}
                className="btn-draw inline-flex items-center justify-center px-7 py-4 text-[13px]"
              >
                {secondary.label}
              </Link>
            </div>
          </div>

          {/* title-block strip: bordered mono key/value cells */}
          <div className="mt-14 grid grid-cols-2 border-t border-border-line font-mono text-[10px] uppercase tracking-[0.18em] sm:grid-cols-4">
            <div className="flex flex-col gap-1 border-b border-r border-border-line px-4 py-3 sm:border-b-0">
              <span className="text-ink-mute">Starter</span>
              <span className="text-draw">$99/MO · CANCEL ANYTIME</span>
            </div>
            <div className="flex flex-col gap-1 border-b border-border-line px-4 py-3 sm:border-b-0 sm:border-r">
              <span className="text-ink-mute">Setup</span>
              <span className="text-draw">~60 SECONDS</span>
            </div>
            <div className="flex flex-col gap-1 border-r border-border-line px-4 py-3">
              <span className="text-ink-mute">Custom build</span>
              <span className="text-draw">BY SCOPE</span>
            </div>
            <div className="flex flex-col gap-1 px-4 py-3">
              <span className="text-ink-mute">Lock-in</span>
              <span className="text-violet">NONE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
