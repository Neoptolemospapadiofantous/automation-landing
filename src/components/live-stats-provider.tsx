"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { PlatformStats } from "@/lib/stats";

/**
 * Browser-side fan-out for /api/stats/stream.
 *
 * Without this, every <LiveStat> cell opens its own EventSource. On the
 * homepage that's 6 cells + 1 <LiveRelativeTime> = 7 concurrent SSE
 * connections per tab. HTTP/1.1 browsers cap at 6 connections per host,
 * so the SSE connections starve everything else (JS chunks, fonts, CSS,
 * navigation) → page feels frozen.
 *
 * The provider opens ONE EventSource for the whole tree and exposes the
 * latest snapshot via context. Consumers re-render only when the field
 * they care about changes. Server side of the same pattern (one poller
 * fanning out to N visitors) lives in stats-broadcaster.ts.
 *
 * If no consumer is mounted, the EventSource is never opened — refCount
 * gates it. So pages without live cells (pricing, audit) pay nothing.
 */

const Ctx = createContext<PlatformStats | null>(null);

/**
 * Hook used by leaf islands (LiveStat, LiveRelativeTime) to read the
 * current snapshot. Returns null when no SSE event has landed yet.
 */
export function useLiveStats(): PlatformStats | null {
  return useContext(Ctx);
}

let refCount = 0;
let es: EventSource | null = null;
let last: PlatformStats | null = null;
const listeners = new Set<(s: PlatformStats | null) => void>();

function broadcast(next: PlatformStats | null) {
  last = next;
  for (const fn of listeners) fn(next);
}

function acquire(): () => void {
  refCount += 1;
  if (refCount === 1) {
    es = new EventSource("/api/stats/stream");
    es.onmessage = (e) => {
      try {
        broadcast(JSON.parse(e.data));
      } catch {
        // Keep last good snapshot on malformed frames.
      }
    };
    // Browser handles reconnect/backoff itself — don't close on error.
  }
  return () => {
    refCount -= 1;
    if (refCount === 0) {
      es?.close();
      es = null;
    }
  };
}

/**
 * Mount this once near the root of any page that uses live-stat
 * islands. Children may freely sprinkle <LiveStat> / <LiveRelativeTime>
 * inside without paying the per-island EventSource cost.
 */
export function LiveStatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<PlatformStats | null>(last);
  const release = useRef<(() => void) | null>(null);

  useEffect(() => {
    listeners.add(setStats);
    release.current = acquire();
    // If we missed the first event (already-open EventSource), seed
    // with the most recent snapshot we've cached.
    if (last) setStats(last);
    return () => {
      listeners.delete(setStats);
      release.current?.();
      release.current = null;
    };
  }, []);

  return <Ctx.Provider value={stats}>{children}</Ctx.Provider>;
}
