/**
 * Edge BRB worker — covers the failure nginx can't: the whole origin box
 * unreachable (Cloudflare 52x), like the 2026-07-08 freeze. Passes every
 * request through untouched; only replaces Cloudflare's branded connection
 * error with our BRB card (503 + Retry-After + 30s client auto-retry).
 *
 * The BRB_HTML constant below is injected by deploy.sh from
 * public/brb.html at deploy time — single source of truth with the
 * nginx-served card. (The injection placeholder must appear exactly
 * once in this file: on the const line, never in comments.)
 *
 * Deployed to routes: flowstack.run/*, www.flowstack.run/*,
 * app.flowstack.run/* (NOT ws.flowstack.run — websockets stay untouched).
 * Origin 502/503/504 are NOT intercepted here: nginx already serves the
 * BRB body for those (=503) and it passes through.
 */

const BRB_HTML = __BRB_HTML__;

// Cloudflare-generated origin-connection failures. If we see one of these
// as a subrequest status, the box itself is unreachable.
const ORIGIN_DEAD = new Set([520, 521, 522, 523, 524, 525, 526, 530]);

function brb() {
  return new Response(BRB_HTML, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Retry-After": "120",
      "Cache-Control": "no-store",
      "X-Served-By": "edge-brb",
    },
  });
}

const worker = {
  async fetch(request) {
    let response;
    try {
      // The race guards the header phase only: once fetch resolves, the
      // body streams through untouched (SSE included). 20s with no
      // response headers = the origin is gone for practical purposes.
      response = await Promise.race([
        fetch(request),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("origin timeout")), 20000),
        ),
      ]);
    } catch {
      return brb();
    }
    if (ORIGIN_DEAD.has(response.status)) return brb();
    return response;
  },
};

export default worker;
