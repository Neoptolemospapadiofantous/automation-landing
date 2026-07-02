"use client";

import { useEffect, useState } from "react";
import { relativeTime } from "@/lib/stats";
import { useLiveStats } from "./live-stats-provider";

type Props = {
  /** Pre-rendered relative-time string from the server (no flash on hydrate). */
  initial: string;
  /** Which timestamp field on the SSE payload to subscribe to. */
  field: "last_activity_at";
};

/**
 * Reads `last_activity_at` from the shared <LiveStatsProvider /> context
 * and re-formats once a minute so "4 min ago" doesn't sit stale when the
 * upstream timestamp hasn't moved.
 */
export function LiveRelativeTime({ initial, field }: Props) {
  const live = useLiveStats();
  const iso = live?.[field] ?? null;

  // The label is derived during render; the interval only bumps a tick
  // counter so "4 min ago" re-formats once a minute without setting
  // derived state inside the effect body.
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!iso) return;
    const id = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(id);
  }, [iso]);

  const label = (iso ? relativeTime(iso) : null) || initial;

  return <span>{label}</span>;
}
