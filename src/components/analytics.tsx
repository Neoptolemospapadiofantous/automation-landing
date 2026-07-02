"use client";

import { useEffect } from "react";
import { useReportWebVitals } from "next/web-vitals";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_ID } from "@/lib/seo";
import { CONSENT_EVENT, readConsent, type ConsentValue } from "./cookie-consent";

/**
 * Google Analytics 4 with Google Consent Mode v2.
 *
 * Why a custom layer on top of `@next/third-parties/google`:
 *   - We must initialise `gtag('consent', 'default', ...)` BEFORE the
 *     GA library loads, so analytics_storage starts denied for every
 *     visitor.
 *   - When the visitor accepts via the cookie banner, we run
 *     `gtag('consent', 'update', ...)` to flip analytics_storage to
 *     granted; declines are also recorded so prior denied state is
 *     respected without needing to re-prompt.
 *   - When GA_ID is unset (preview / dev / pre-launch), the entire
 *     analytics surface renders nothing.
 *
 * Read more:
 *   https://developers.google.com/tag-platform/security/guides/consent
 */

declare global {
  interface Window {
    // gtag is injected by the GA library; declare so TypeScript stops
    // squawking when we call it from event handlers.
    gtag?: (...args: unknown[]) => void;
  }
}

// Module-level so the callback reference is stable — the hook re-fires
// accumulated metrics when handed a new function, double-counting them.
// GA wants integers; CLS is a small float, so scale it up first.
function reportWebVitals(metric: {
  id: string;
  name: string;
  value: number;
}) {
  window.gtag?.("event", metric.name, {
    value: Math.round(
      metric.name === "CLS" ? metric.value * 1000 : metric.value,
    ),
    event_category: "Web Vitals",
    event_label: metric.id,
    non_interaction: true,
  });
}

export function Analytics() {
  // Real-user Core Web Vitals into GA4. No-ops until gtag exists, and
  // consent mode governs how the events are transmitted.
  useReportWebVitals(reportWebVitals);

  // Subscribe to consent changes from the banner. We never call
  // gtag('consent', 'update', ...) for the initial paint — the
  // `consent default` set below establishes the deny-by-default state.
  useEffect(() => {
    if (!GA_ID) return;

    // If the visitor had previously decided, replay that decision now
    // so the GA library (just-loaded) gets the correct consent state.
    const prior = readConsent();
    if (prior) updateConsent(prior);

    const onChange = (e: Event) => {
      const v = (e as CustomEvent<ConsentValue>).detail;
      if (v === "granted" || v === "denied") updateConsent(v);
    };

    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      {/* Set the default consent state BEFORE GA loads. A plain inline
          <script> executes during HTML parse — always before the
          `afterInteractive` gtag.js loader from @next/third-parties.
          (next/script's beforeInteractive only works from the root
          layout and silently downgrades here.) */}
      <script
        id="ga-consent-default"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted',
              wait_for_update: 500,
            });
          `,
        }}
      />

      {/* The actual GA loader. @next/third-parties handles SPA pageviews
          across route changes automatically. */}
      <GoogleAnalytics gaId={GA_ID} />
    </>
  );
}

function updateConsent(v: ConsentValue) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    analytics_storage: v === "granted" ? "granted" : "denied",
  });
}
