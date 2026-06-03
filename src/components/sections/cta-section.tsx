import Link from "next/link";

type Btn = { href: string; label: string };

export function CTASection({
  title = "Stop paying humans to do robot work.",
  subtitle = "30-minute audit. Written diagnosis. Yours to keep — even if you never hire us.",
  primary = { href: "/audit", label: "Book the audit →" },
  secondary = { href: "mailto:hello@flowstack.example", label: "Email us instead" },
}: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  primary?: Btn;
  secondary?: Btn | null;
}) {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="glass bg-grid bg-grid-fade relative border border-border-hi px-8 py-16 sm:px-14 sm:py-20">
          {/* corner registration ticks */}
          <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-draw" />
          <span aria-hidden className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-draw" />
          <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-draw" />
          <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-draw" />

          {/* sheet reference */}
          <span aria-hidden className="bp-ref absolute left-8 top-5 sm:left-14">
            SHEET 00 / NEXT STEP
          </span>

          <div className="relative flex flex-col items-center text-center">
            <h2 className="mt-8 max-w-[22ch] text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[56px]">
              {title}
            </h2>

            {/* dimension line measuring the headline */}
            <div aria-hidden className="mt-6 flex items-center gap-3">
              <span className="bp-annot">SCOPE</span>
              <span className="bp-dim w-24 sm:w-40" />
              <span className="bp-annot">1 CALL</span>
            </div>

            <p className="bp-annot mt-6 max-w-[60ch] text-balance text-sm leading-[1.7] text-ink-dim">
              {subtitle}
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href={primary.href}
                className="btn-grad inline-flex items-center justify-center px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.18em]"
              >
                {primary.label}
              </Link>
              {secondary && (
                <Link
                  href={secondary.href}
                  className="btn-draw inline-flex items-center justify-center px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.18em]"
                >
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>

          {/* title-block strip */}
          <dl
            aria-hidden
            className="mt-14 grid grid-cols-2 border border-border-line text-left font-mono sm:grid-cols-4"
          >
            {[
              ["PROJECT", "FLOWSTACK"],
              ["DELIVERABLE", "DIAGNOSIS"],
              ["DURATION", "00:30:00"],
              ["REV", "A-01"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex flex-col gap-1 border-border-line px-4 py-3 [&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-t-0"
              >
                <dt className="text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                  {k}
                </dt>
                <dd className="text-xs uppercase tracking-[0.12em] text-draw">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
