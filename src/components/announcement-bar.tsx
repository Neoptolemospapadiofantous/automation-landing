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
 * Visual treatment ("ink on paper", 2026-08):
 *   - Inverted against the paper sheet: black strip, paper text, the
 *     live pip in signal yellow.
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
      className="bg-ink text-bg ann-enter ann-rail ann-shimmer relative"
    >
      {/* Sweep highlight — sits behind the content, never intercepts pointer events. */}
      <span aria-hidden className="ann-shimmer-bar" />

      <div className="mx-auto flex max-w-[1280px] items-center divide-x divide-bg/20 text-[10px] uppercase tracking-[0.08em] sm:text-[13px] sm:tracking-[0.18em]">
        {/* NOTICE label with pip — hidden on mobile to keep the sticky
            header short; the pip moves into the notice line. */}
        <div className="hidden items-center gap-2.5 px-5 py-3.5 font-mono font-semibold sm:flex sm:py-3">
          <span
            aria-hidden
            className="pulse-glow inline-block h-2 w-2 rounded-full bg-[var(--signal)]"
          />
          Notice
        </div>

        {/* On phones this is the whole bar: one fixed-height row (h-9)
            so layout.tsx can pin the sticky wrapper at -top-9 and let
            the bar scroll away, keeping only the nav stuck. min-w-0 +
            truncate keep it a single line down to the narrowest phones. */}
        <div className="flex h-9 min-w-0 flex-1 items-center gap-2 px-4 font-mono sm:h-auto sm:gap-2.5 sm:px-5 sm:py-3">
          {/* mobile-only pip, since the Notice cell is hidden there */}
          <span
            aria-hidden
            className="pulse-glow inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--signal)] sm:hidden"
          />
          <span className="truncate">
            Flowstack is live ·{" "}
            <span className="text-bg/65">onboarding new teams</span>
          </span>
        </div>

        {/* CTA — full inversion on hover, idle arrow nudge. Hidden on
            phones: the nav directly below carries the same CTA, and a
            second full-width yellow row doubled the sticky header. */}
        <Link
          href={registerUrl()}
          className="group hover:bg-bg hover:text-ink hidden items-center justify-center gap-3 px-5 py-3 font-mono font-bold transition-colors sm:inline-flex"
        >
          <span>Start free</span>
          <span aria-hidden className="ann-arrow inline-block">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
