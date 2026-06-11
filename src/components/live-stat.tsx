"use client";

import { type ReactNode } from "react";
import type { CountField } from "@/lib/stats";
import { useLiveStats } from "./live-stats-provider";

type Props = {
  /**
   * Initial bucket label rendered from the parent's server fetch — server
   * render is correct on first paint (SEO + no flash); the client subscribes
   * to the shared live-stats context after hydration.
   */
  initial: string | null;
  /** Which display.* field to track. */
  field: CountField;
  /**
   * Rendered when the live value is null (count below the bucket). Default
   * is null (renders nothing). Pass an em-dash or other placeholder so the
   * cell stays visible while the underlying count is still calibrating.
   */
  fallback?: ReactNode;
};

/**
 * Reads the bucketed display label from the shared <LiveStatsProvider />
 * context — one EventSource per page total, regardless of how many
 * cells subscribe. Falls back to the SSR-rendered `initial` until the
 * first SSE frame lands.
 */
export function LiveStat({ initial, field, fallback = null }: Props) {
  const live = useLiveStats();
  const value = live ? (live.display[field] ?? null) : initial;
  return <>{value === null ? fallback : value}</>;
}
