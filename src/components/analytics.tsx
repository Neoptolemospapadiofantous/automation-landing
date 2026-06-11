"use client";

import { useEffect } from "react";
import Script from "next/script";
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

export function Analytics() {
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
      {/* Set the default consent state BEFORE GA loads. Strategy
          "beforeInteractive" guarantees this script runs before
          @next/third-parties' GoogleAnalytics injects gtag.js. */}
      <Script
        id="ga-consent-default"
        strategy="beforeInteractive"
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
