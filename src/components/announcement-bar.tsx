"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLiveStats } from "@/components/live-stats-provider";
import { registerUrl } from "@/lib/dashboard";

/**
 * Status announcement bar with a live day countdown to the next intake.
 *
 * Data flow:
 *   1. Server pre-renders with `initialOpenAt` — read from the dashboard's
 *      public-stats endpoint at SSR (5-minute ISR cache). This keeps first
 *      paint accurate and SEO-correct.
 *   2. After hydration the bar subscribes to the shared
 *      <LiveStatsProvider /> context (driven by /api/stats/stream SSE) so
 *      a `php artisan platform:set next_cohort_open_at YYYY-MM-DD` on the
 *      dashboard ripples to every open tab within ~5 s.
 *   3. If no date is set anywhere (operator hasn't scheduled a cohort, or
 *      the dashboard is down on first paint), the bar shows a static
 *      "now open" state instead of inventing a countdown — so there is no
 *      hard-coded date that silently expires.
 *
 * When a future date IS set, the day count is recomputed every minute on
 * the client so the countdown flips at midnight UTC without a page reload.
 *
 * Visual treatment:
 *   - Inverted: white ground, black ink.
 *   - Entry slide, marching-ants bottom edge, slow shimmer sweep, idle
 *     arrow nudge. prefers-reduced-motion silences all of them.
 *
 * Stickiness is owned by the shared `<header>` wrapper in layout.tsx so
 * this bar and the SiteNav stack as one chrome unit.
 */

function parseOpenAt(value: string | null | undefined): Date | null {
  if (!value) return null;
  // Accept YYYY-MM-DD (treat as UTC midnight) or full ISO.
  const asDate = value.length === 10 ? new Date(`${value}T00:00:00Z`) : new Date(value);
  return Number.isNaN(asDate.getTime()) ? null : asDate;
}

function daysUntil(date: Date, now: Date): number {
  return Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function formatYmd(date: Date): string {
  // Stable YYYY-MM-DD in UTC — server + client render the same string.
  return date.toISOString().slice(0, 10);
}

export function AnnouncementBar({
  initialOpenAt,
}: {
  /** YYYY-MM-DD or ISO timestamp from server-side `getPlatformStats()`. */
  initialOpenAt: string | null;
}) {
  const live = useLiveStats();
  const liveOpenAt = live?.next_cohort_open_at ?? null;

  // Source-of-truth precedence: live SSE > server-rendered prop. No build
  // default — when nothing is set we render the static "now open" state
  // rather than counting down to an arbitrary date.
  const openAt = parseOpenAt(liveOpenAt ?? initialOpenAt);

  // Tick the countdown every minute on the client so the day flip
  // happens without a page reload. SSR uses the server's initial value.
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const days = openAt ? daysUntil(openAt, now) : 0;
  // "Open" = no scheduled date (rolling intake) OR the date has arrived.
  const open = openAt === null || days <= 0;
  const dateLabel = openAt ? formatYmd(openAt) : null;

  return (
    <div
      role="region"
      aria-label="Launch announcement"
      className="bg-violet text-bg ann-enter ann-rail ann-shimmer relative"
    >
      {/* Sweep highlight — sits behind the content, never intercepts pointer events. */}
      <span aria-hidden className="ann-shimmer-bar" />

      <div className="mx-auto flex max-w-[1280px] flex-col items-stretch divide-y divide-bg/20 text-[11px] uppercase tracking-[0.16em] sm:flex-row sm:items-center sm:divide-y-0 sm:divide-x sm:text-[13px] sm:tracking-[0.18em]">
        {/* NOTICE label with live pip — hidden on mobile to keep the
            sticky header short; the pip moves into the countdown line. */}
        <div className="hidden items-center gap-2.5 px-5 py-3.5 font-mono font-semibold sm:flex sm:py-3">
          <span
            aria-hidden
            className="bg-bg pulse-glow inline-block h-2 w-2 rounded-full"
          />
          Notice
        </div>

        {/* Countdown — day number bumped to draw the eye */}
        <div className="flex flex-1 items-baseline gap-2.5 px-5 py-2.5 font-mono sm:py-3">
          {/* mobile-only live pip, since the Notice cell is hidden there */}
          <span
            aria-hidden
            className="bg-bg pulse-glow inline-block h-1.5 w-1.5 shrink-0 self-center rounded-full sm:hidden"
          />
          {open ? (
            <span>
              Flowstack is live ·{" "}
              <span className="text-bg/65">
                {dateLabel ? `open since ${dateLabel}` : "onboarding new teams"}
              </span>
            </span>
          ) : (
            <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span>Next intake opens</span>
              <span aria-hidden className="text-bg/55">·</span>
              <span className="tabular-nums">{dateLabel}</span>
              <span aria-hidden className="text-bg/55">·</span>
              <span className="text-[17px] font-bold leading-none tabular-nums tracking-[0.04em] sm:text-[22px]">
                {days}
              </span>
              <span>{days === 1 ? "day" : "days"}</span>
            </span>
          )}
        </div>

        {/* CTA — full inversion on hover, idle arrow nudge. Open state
            sends to registration; a scheduled intake sends to the audit,
            the useful action while signup waits. */}
        <Link
          href={open ? registerUrl() : "/audit"}
          className="group hover:bg-bg hover:text-ink inline-flex items-center justify-between gap-3 px-5 py-2.5 font-mono font-bold transition-colors sm:justify-center sm:py-3"
        >
          <span>{open ? "Try it for €99" : "Book the audit"}</span>
          <span aria-hidden className="ann-arrow inline-block">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
