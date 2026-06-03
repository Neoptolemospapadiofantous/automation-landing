import Link from "next/link";
import { Eyebrow } from "./eyebrow";
import type { Tint } from "@/lib/content";

type CTA = { href: string; label: string; variant?: "primary" | "secondary" };

export function PageHero({
  eyebrow,
  eyebrowTint = "violet",
  title,
  lead,
  ctas,
}: {
  eyebrow: string;
  eyebrowTint?: Tint;
  title: React.ReactNode;
  lead?: React.ReactNode;
  ctas?: CTA[];
}) {
  return (
    <section className="relative pt-16 pb-16 sm:pt-24 sm:pb-20">
      <div className="relative mx-auto max-w-[1280px] px-6">
        {/* Corner registration ticks — crop marks framing the sheet. */}
        <span
          aria-hidden
          className="absolute top-0 left-6 h-3 w-3 border-t border-l border-border-hi"
        />
        <span
          aria-hidden
          className="absolute top-0 right-6 h-3 w-3 border-t border-r border-border-hi"
        />

        <div className="flex flex-col items-center text-center">
          <Eyebrow tint={eyebrowTint}>{eyebrow}</Eyebrow>

          <h1 className="mt-7 max-w-[20ch] text-balance text-4xl leading-[1.04] font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            {title}
          </h1>

          {/* Wire + dimension annotation under the headline. */}
          <div aria-hidden className="mt-6 flex items-center gap-3">
            <span className="bp-dim w-10" />
            <span className="bp-wire w-12" />
            <span className="bp-dim w-10" />
          </div>

          {lead && (
            <p className="text-ink-dim mt-6 max-w-[60ch] text-pretty font-mono text-base leading-[1.7] tracking-[0.01em] sm:text-lg">
              {lead}
            </p>
          )}

          {ctas && ctas.length > 0 && (
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              {ctas.map((c) =>
                (c.variant ?? "primary") === "primary" ? (
                  <Link
                    key={c.href + c.label}
                    href={c.href}
                    className="btn-grad inline-flex items-center justify-center px-6 py-4 text-xs font-semibold tracking-[0.18em] uppercase"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <Link
                    key={c.href + c.label}
                    href={c.href}
                    className="btn-draw inline-flex items-center justify-center px-6 py-4 text-xs font-semibold tracking-[0.18em] uppercase"
                  >
                    {c.label}
                  </Link>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
