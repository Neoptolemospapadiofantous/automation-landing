"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { CountField } from "@/lib/stats";

type Props = {
  /**
   * Initial bucket label rendered from the parent's server fetch — server
   * render is correct on first paint (SEO + no flash); SSE only takes
   * over after hydration.
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
 * Subscribes to /api/stats/stream (Server-Sent Events) and re-renders
 * the bucketed display label whenever the dashboard reports a change.
 *
 * One EventSource per tab. EventSource auto-reconnects on transient
 * network errors with built-in backoff — we only close it on unmount.
 * If the JSON ever fails to parse (server hiccup, partial frame) we
 * keep the last good value instead of blank-rendering trust signals.
 */
export function LiveStat({ initial, field, fallback = null }: Props) {
  const [value, setValue] = useState<string | null>(initial);

  useEffect(() => {
    const es = new EventSource("/api/stats/stream");

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        setValue(data?.display?.[field] ?? null);
      } catch {
        // Keep the last good value on a malformed frame.
      }
    };

    es.onerror = () => {
      // EventSource handles reconnect + backoff itself; don't close here.
      // Closing would prevent recovery on transient network blips.
    };

    return () => es.close();
  }, [field]);

  return <>{value === null ? fallback : value}</>;
}
