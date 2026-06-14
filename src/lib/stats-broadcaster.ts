import {
  fetchPlatformStatsFresh,
  type PlatformStats,
} from "./stats";

/**
 * Singleton stats broadcaster — one Node-process-wide poller that fans
 * out to all open SSE subscribers. Cost optimisation: the dashboard
 * sees one /api/public/stats hit every POLL_INTERVAL_MS regardless of
 * how many visitors are on the landing site.
 *
 * Lifecycle:
 *   - subscribe()  → adds a listener; first subscriber starts the poll
 *   - unsubscribe  → removes the listener; last unsub stops the poll
 *   - diff-and-emit: visitors get an event ONLY when display.* (or the
 *     editable fields) actually change. Idle visitors get heartbeats
 *     from the route handler, not payload events from here.
 *
 * Requires a long-lived Node process for the singleton to be shared
 * across requests — see briefing's "Deployment constraints" section.
 * Edge runtime would defeat the design (no shared module state).
 */

const POLL_INTERVAL_MS = 5_000;

type Subscriber = (stats: PlatformStats) => void;

const subscribers = new Set<Subscriber>();
let current: PlatformStats | null = null;
let pollTimer: ReturnType<typeof setInterval> | null = null;
let polling = false;

/**
 * Key for diff-and-emit. Only fields the landing renders care about:
 * the five bucket labels under display.*, plus the four operator-curated
 * fields. generated_at is intentionally excluded — it ticks every poll
 * and would force a broadcast every cycle, defeating the optimisation.
 */
function snapshotKey(s: PlatformStats): string {
  return JSON.stringify({
    d: s.display,
    f: {
      founder_slots_remaining: s.founder_slots_remaining,
      founder_slots_total: s.founder_slots_total,
      next_cohort_label: s.next_cohort_label,
      featured_proof: s.featured_proof,
      next_cohort_open_at: s.next_cohort_open_at,
    },
  });
}

async function pollOnce(): Promise<void> {
  if (polling) return; // skip overlapping ticks (slow dashboard, etc.)
  polling = true;
  try {
    const next = await fetchPlatformStatsFresh();
    const changed =
      current === null || snapshotKey(current) !== snapshotKey(next);
    current = next;
    if (changed) {
      for (const fn of subscribers) {
        try {
          fn(next);
        } catch {
          // One bad subscriber must not silence the others.
        }
      }
    }
  } finally {
    polling = false;
  }
}

function startPolling(): void {
  if (pollTimer) return;
  void pollOnce(); // fire first poll immediately; don't wait POLL_INTERVAL_MS
  pollTimer = setInterval(() => {
    void pollOnce();
  }, POLL_INTERVAL_MS);
}

function stopPolling(): void {
  if (!pollTimer) return;
  clearInterval(pollTimer);
  pollTimer = null;
}

export function subscribe(onChange: Subscriber): () => void {
  subscribers.add(onChange);
  if (subscribers.size === 1) startPolling();
  return () => {
    subscribers.delete(onChange);
    if (subscribers.size === 0) stopPolling();
  };
}

/**
 * Last polled snapshot, or null if no poll has resolved yet. Route
 * handlers should fall back to a direct fetchPlatformStatsFresh() on
 * the very first connection if this returns null, so the client never
 * waits POLL_INTERVAL_MS for its first event.
 */
export function getCurrent(): PlatformStats | null {
  return current;
}
