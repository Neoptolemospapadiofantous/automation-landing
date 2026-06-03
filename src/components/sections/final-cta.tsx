import Link from "next/link";

export function FinalCTA() {
  const title = "Stop paying humans to do robot work.";
  const subtitle =
    "30-minute audit. Written diagnosis. Yours to keep — even if you never hire us.";
  const primary = { href: "/audit", label: "Book the audit →" };
  const secondary = {
    href: "mailto:hello@flowstack.example",
    label: "Email us instead",
  };

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="glass-strong relative px-8 py-16 sm:px-16 sm:py-20">
          {/* corner registration ticks */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-px -top-px h-4 w-4 border-l border-t border-violet"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-px -top-px h-4 w-4 border-r border-t border-violet"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-b border-l border-violet"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b border-r border-violet"
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
              <span className="text-ink-mute">Format</span>
              <span className="text-draw">30 MIN CALL</span>
            </div>
            <div className="flex flex-col gap-1 border-b border-border-line px-4 py-3 sm:border-b-0 sm:border-r">
              <span className="text-ink-mute">Output</span>
              <span className="text-draw">WRITTEN DIAGNOSIS</span>
            </div>
            <div className="flex flex-col gap-1 border-r border-border-line px-4 py-3">
              <span className="text-ink-mute">Cost</span>
              <span className="text-draw">$0</span>
            </div>
            <div className="flex flex-col gap-1 px-4 py-3">
              <span className="text-ink-mute">Commitment</span>
              <span className="text-violet">NONE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
