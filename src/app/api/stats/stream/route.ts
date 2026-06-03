import type { NextRequest } from "next/server";
import { subscribe, getCurrent } from "@/lib/stats-broadcaster";
import { fetchPlatformStatsFresh } from "@/lib/stats";

/**
 * Server-Sent Events stream for public platform stats.
 *
 *   Browser ── SSE ──▶ this route ── subscribes ▶ stats-broadcaster
 *
 * The broadcaster is a module-level singleton, so N visitor connections
 * collapse onto one /api/public/stats poll every 5 s on the dashboard
 * side. Each connection here:
 *
 *   - receives the current snapshot immediately on connect,
 *   - receives `data: <json>\n\n` events only when display.* (or the
 *     editable fields) actually change,
 *   - receives a `:heartbeat\n\n` SSE comment every 30 s so proxies /
 *     load balancers don't kill an idle connection.
 *
 * Requires the Node runtime: Edge has no shared module state between
 * requests, which would break the singleton. Per the briefing this also
 * means the landing site must be deployed on a persistent Node host —
 * NOT Vercel serverless functions or Edge.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HEARTBEAT_MS = 30_000;

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  // Make sure we always have something to send on the very first event —
  // don't make the client wait up to POLL_INTERVAL_MS for the broadcaster
  // to fill its cache.
  let initial = getCurrent();
  if (!initial) initial = await fetchPlatformStatsFresh();

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      let closed = false;
      const send = (chunk: string) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(chunk));
        } catch {
          // controller was closed by the runtime; stop trying.
          closed = true;
        }
      };

      // Initial event — current snapshot, so the client renders fresh
      // values straight away instead of holding the SSR fallback for 5 s.
      send(`data: ${JSON.stringify(initial)}\n\n`);

      const unsub = subscribe((stats) => {
        send(`data: ${JSON.stringify(stats)}\n\n`);
      });

      const heartbeat = setInterval(() => {
        send(`:heartbeat\n\n`);
      }, HEARTBEAT_MS);

      const cleanup = () => {
        if (closed) return;
        closed = true;
        clearInterval(heartbeat);
        unsub();
        try {
          controller.close();
        } catch {
          // already closed
        }
      };

      // Browser tab closed / navigated away → AbortSignal fires.
      req.signal.addEventListener("abort", cleanup);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      // Disable Nginx response buffering; without this proxies sit on the
      // stream until they accumulate a chunk, defeating "instant".
      "X-Accel-Buffering": "no",
    },
  });
}
