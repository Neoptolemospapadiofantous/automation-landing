import Script from "next/script";

import { DASHBOARD_URL } from "@/lib/dashboard";

/**
 * Loads the Flowstack chat widget (served by the dashboard app at
 * `${DASHBOARD_URL}/widget/{slug}.js`) onto the landing page.
 *
 * OFF BY DEFAULT: renders nothing unless NEXT_PUBLIC_FLOWSTACK_AGENT_SLUG is
 * set. So the widget only appears in an environment that has explicitly opted
 * in (e.g. `.env.local` for local testing) — it will not show in production
 * until that env var is deliberately configured there.
 *
 * The widget itself (launcher, theme, domain allowlist) is controlled in the
 * dashboard's Install page for the chosen agent; nothing about its appearance
 * lives here.
 */
export function FlowstackWidget() {
  const slug = process.env.NEXT_PUBLIC_FLOWSTACK_AGENT_SLUG;
  if (!slug) return null;

  return (
    <Script
      src={`${DASHBOARD_URL}/widget/${encodeURIComponent(slug)}.js`}
      strategy="afterInteractive"
    />
  );
}
