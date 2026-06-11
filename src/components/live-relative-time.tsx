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

  const [label, setLabel] = useState<string>(initial);

  useEffect(() => {
    if (!iso) return;
    const formatted = relativeTime(iso);
    if (formatted) setLabel(formatted);
    const id = setInterval(() => {
      const next = relativeTime(iso);
      if (next) setLabel(next);
    }, 60_000);
    return () => clearInterval(id);
  }, [iso]);

  return <span>{label}</span>;
}
