"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLiveStats } from "@/components/live-stats-provider";

/**
 * Pre-launch announcement bar with a live day countdown.
 *
 * Data flow:
 *   1. Server pre-renders with `initialOpenAt` — read from the dashboard's
 *      public-stats endpoint at SSR (5-minute ISR cache). This keeps first
 *      paint accurate and SEO-correct.
 *   2. After hydration the bar subscribes to the shared
 *      <LiveStatsProvider /> context (driven by /api/stats/stream SSE) so
 *      a `php artisan platform:set next_cohort_open_at YYYY-MM-DD` on the
 *      dashboard ripples to every open tab within ~5 s.
 *   3. If both are missing (dashboard down + first paint before SSE), we
 *      fall back to BUILD_DEFAULT_OPEN_AT.
 *
 * The day count is recomputed every minute on the client so the
 * countdown flips at midnight UTC without a page reload.
 *
 * Visual treatment:
 *   - Inverted: white ground, black ink.
 *   - Entry slide, marching-ants bottom edge, slow shimmer sweep, idle
 *     arrow nudge. prefers-reduced-motion silences all of them.
 *
 * Stickiness is owned by the shared `<header>` wrapper in layout.tsx so
 * this bar and the SiteNav stack as one chrome unit.
 */

/**
 * Backstop only — used when neither SSR-fetched stats nor live SSE
 * carry a value. Operator sets the real date via
 * `php artisan platform:set next_cohort_open_at YYYY-MM-DD`.
 */
const BUILD_DEFAULT_OPEN_AT = "2026-06-24";

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

  // Source-of-truth precedence: live SSE > server-rendered prop > build default.
  const openAtRaw = liveOpenAt ?? initialOpenAt ?? BUILD_DEFAULT_OPEN_AT;
  const openAt = parseOpenAt(openAtRaw) ?? parseOpenAt(BUILD_DEFAULT_OPEN_AT)!;

  // Tick the countdown every minute on the client so the day flip
  // happens without a page reload. SSR uses the server's initial value.
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const days = daysUntil(openAt, now);
  const open = days <= 0;
  const dateLabel = formatYmd(openAt);

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
