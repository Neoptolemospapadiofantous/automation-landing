import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained `.next/standalone/server.js` for VPS / container
  // deploys (Laravel Forge, Coolify, fly.io, raw Node). No
  // node_modules needed at runtime — Next copies the exact
  // tracing-resolved subset into standalone/, making the rsync to
  // the server fast and the on-box memory footprint small.
  //
  // Required complement at deploy time: copy `public/` and
  // `.next/static/` into the standalone bundle. See the Forge deploy
  // script for the exact commands.
  output: "standalone",

  // Baseline security headers on every response. A full CSP is
  // deliberately absent for now — the inline GA consent-default script
  // and gtag.js would need nonces/allowlists; frame-ancestors is the
  // piece with no such cost. X-Frame-Options covers pre-CSP browsers.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
