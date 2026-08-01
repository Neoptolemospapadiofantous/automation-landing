import Link from "next/link";
import { registerUrl } from "@/lib/dashboard";

/**
 * Status announcement bar — a static "we're open" notice plus the primary
 * CTA.
 *
 * It used to count down to a scheduled intake date pulled from the
 * dashboard's public-stats feed; that pipeline was removed 2026-08-01
 * along with the live-readouts strip, and no cohort date was ever set in
 * production, so the bar now renders the open state directly. No
 * hard-coded date lives here — nothing to silently expire.
 *
 * Visual treatment:
 *   - Inverted: white ground, black ink.
 *   - Entry slide, marching-ants bottom edge, slow shimmer sweep, idle
 *     arrow nudge. prefers-reduced-motion silences all of them.
 *
 * Stickiness is owned by the shared chrome wrapper in layout.tsx so this
 * bar and the SiteNav stack as one unit.
 */
export function AnnouncementBar() {
  return (
    <div
      role="region"
      aria-label="Launch announcement"
      className="bg-violet text-bg ann-enter ann-rail ann-shimmer relative"
    >
      {/* Sweep highlight — sits behind the content, never intercepts pointer events. */}
      <span aria-hidden className="ann-shimmer-bar" />

      <div className="mx-auto flex max-w-[1280px] flex-col items-stretch divide-y divide-bg/20 text-[11px] uppercase tracking-[0.16em] sm:flex-row sm:items-center sm:divide-y-0 sm:divide-x sm:text-[13px] sm:tracking-[0.18em]">
        {/* NOTICE label with pip — hidden on mobile to keep the sticky
            header short; the pip moves into the notice line. */}
        <div className="hidden items-center gap-2.5 px-5 py-3.5 font-mono font-semibold sm:flex sm:py-3">
          <span
            aria-hidden
            className="bg-bg pulse-glow inline-block h-2 w-2 rounded-full"
          />
          Notice
        </div>

        <div className="flex flex-1 items-baseline gap-2.5 px-5 py-2.5 font-mono sm:py-3">
          {/* mobile-only pip, since the Notice cell is hidden there */}
          <span
            aria-hidden
            className="bg-bg pulse-glow inline-block h-1.5 w-1.5 shrink-0 self-center rounded-full sm:hidden"
          />
          <span>
            Flowstack is live ·{" "}
            <span className="text-bg/65">onboarding new teams</span>
          </span>
        </div>

        {/* CTA — full inversion on hover, idle arrow nudge. */}
        <Link
          href={registerUrl()}
          className="group hover:bg-bg hover:text-ink inline-flex items-center justify-between gap-3 px-5 py-2.5 font-mono font-bold transition-colors sm:justify-center sm:py-3"
        >
          <span>Try it for €99</span>
          <span aria-hidden className="ann-arrow inline-block">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
