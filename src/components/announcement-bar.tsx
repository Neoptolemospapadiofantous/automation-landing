import Link from "next/link";

/**
 * Pre-launch announcement bar. Sits above the site nav and announces
 * the founder cohort opening date with a live day countdown. Flips to
 * an "open now" variant once OPEN_DATE has passed.
 *
 * Visual treatment:
 *   - Inverted: white ground, black ink — strongest pop in the mono
 *     palette without introducing a new color.
 *   - Entry: slides down from the top on first paint (.ann-enter).
 *   - Bottom edge: marching-ants dashed border (.ann-rail).
 *   - Background: slow shimmer sweep every ~7s (.ann-shimmer).
 *   - CTA arrow: idle nudge animation, paused on hover (.ann-arrow).
 *   - prefers-reduced-motion silences every animation above.
 *
 * Day count is computed at render time. The homepage revalidates
 * every 5 minutes (ISR), keeping the countdown accurate within
 * minutes.
 */

// Founder-cohort opening — keep aligned with the date communicated to
// counsel + on the audit-form intake. Bump when the cohort opens.
const OPEN_DATE = new Date("2026-06-24T00:00:00Z");

function daysUntilOpen(): number {
  const now = new Date();
  const ms = OPEN_DATE.getTime() - now.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

function formatOpenDate(): string {
  // Stable YYYY-MM-DD in UTC so server + client render the same string.
  return OPEN_DATE.toISOString().slice(0, 10);
}

export function AnnouncementBar() {
  const days = daysUntilOpen();
  const open = days <= 0;
  const dateLabel = formatOpenDate();

  return (
    <div
      role="region"
      aria-label="Launch announcement"
      className="bg-ink text-bg ann-enter ann-rail ann-shimmer relative"
    >
      {/* Sweep highlight — sits behind the content, never intercepts pointer events. */}
      <span aria-hidden className="ann-shimmer-bar" />

      <div className="mx-auto flex max-w-[1280px] flex-col items-stretch divide-y divide-bg/20 text-[13px] uppercase tracking-[0.18em] sm:flex-row sm:items-center sm:divide-y-0 sm:divide-x">
        {/* NOTICE label with live pip */}
        <div className="flex items-center gap-2.5 px-5 py-3.5 font-mono font-semibold sm:py-3">
          <span
            aria-hidden
            className="bg-bg pulse-glow inline-block h-2 w-2 rounded-full"
          />
          Notice
        </div>

        {/* Countdown — day number bumped to draw the eye */}
        <div className="flex flex-1 items-baseline gap-2.5 px-5 py-3.5 font-mono sm:py-3">
          {open ? (
            <span>
              Founder cohort 01 ·{" "}
              <span className="text-bg/65">open as of {dateLabel}</span>
            </span>
          ) : (
            <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span>Founder cohort 01 opens</span>
              <span aria-hidden className="text-bg/55">·</span>
              <span className="tabular-nums">{dateLabel}</span>
              <span aria-hidden className="text-bg/55">·</span>
              <span className="text-[20px] font-bold leading-none tabular-nums tracking-[0.04em] sm:text-[22px]">
                {days}
              </span>
              <span>{days === 1 ? "day" : "days"}</span>
            </span>
          )}
        </div>

        {/* CTA — full inversion on hover, idle arrow nudge */}
        <Link
          href="/audit"
          className="group hover:bg-bg hover:text-ink inline-flex items-center justify-between gap-3 px-5 py-3.5 font-mono font-bold transition-colors sm:justify-center sm:py-3"
        >
          <span>{open ? "Join the cohort" : "Reserve a slot"}</span>
          <span aria-hidden className="ann-arrow inline-block">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
