"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
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
const listeners = new Set<() => void>();

function broadcast(next: PlatformStats | null) {
  last = next;
  for (const fn of listeners) fn();
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

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  const release = acquire();
  return () => {
    listeners.delete(onChange);
    release();
  };
}

/**
 * Mount this once near the root of any page that uses live-stat
 * islands. Children may freely sprinkle <LiveStat> / <LiveRelativeTime>
 * inside without paying the per-island EventSource cost.
 *
 * useSyncExternalStore reads the module-level snapshot directly, so a
 * provider mounting after the EventSource is already open picks up the
 * cached `last` without any seed-in-effect dance.
 */
export function LiveStatsProvider({ children }: { children: ReactNode }) {
  const stats = useSyncExternalStore(
    subscribe,
    () => last,
    () => null,
  );

  return <Ctx.Provider value={stats}>{children}</Ctx.Provider>;
}
