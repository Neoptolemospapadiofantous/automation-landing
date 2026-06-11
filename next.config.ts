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
};

export default nextConfig;
