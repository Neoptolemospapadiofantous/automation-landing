import Link from "next/link";
import { registerUrl } from "@/lib/dashboard";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";

export function FinalCTA() {
  const title = "Hand it off.";
  const subtitle =
    "Book a free call and we'll say what you can hand over. Or add the chat now — it takes about a minute.";
  const primary = { href: registerUrl(), label: "Start free →" };
  const secondary = { href: "/audit", label: "Talk about custom" };

  return (
    <section id="commit" className="relative isolate overflow-hidden py-24">
      <SectionWatermark text="GO" />
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="depth-rise relative px-2 py-10 sm:py-14">
          <div className="relative flex flex-col items-center text-center">
            {/* sheet reference */}
            <span className="bp-ref">S/09 / commit</span>

            <h2 className="mt-6 max-w-[14ch] text-[56px] leading-[0.98] font-bold tracking-[-0.05em] text-balance sm:text-[80px] lg:text-[104px]">
              <span className="text-gradient">{title}</span>
            </h2>

            <p className="text-ink-dim mt-7 max-w-[52ch] text-lg leading-[1.6] text-balance">
              {subtitle}
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href={primary.href}
                className={ctaClass()}
              >
                {primary.label}
              </Link>
              <Link
                href={secondary.href}
                className={ctaClass({ variant: "ghost" })}
              >
                {secondary.label}
              </Link>
            </div>
          </div>

          {/* title-block strip: bordered mono key/value cells */}
          <div className="border-border-line mx-auto mt-16 grid max-w-[900px] grid-cols-2 border font-mono text-[10px] uppercase tracking-[0.18em] sm:grid-cols-4">
            <div className="flex flex-col gap-1 border-b border-r border-border-line px-4 py-3 sm:border-b-0">
              <span className="text-ink-mute">Starter</span>
              <span className="text-draw">FREE TO START · CANCEL ANYTIME</span>
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
