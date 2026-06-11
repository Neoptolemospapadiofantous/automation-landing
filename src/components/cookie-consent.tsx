"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Cookie consent prompt for analytics (Google Analytics 4).
 *
 *   - Hidden until the visitor has neither accepted nor declined.
 *   - Stores the choice in localStorage under `flowstack-consent`.
 *   - Dispatches a `flowstack-consent` window event when the choice
 *     changes so the GA4 layer (`components/analytics.tsx`) can update
 *     Google Consent Mode v2 without prop drilling.
 *   - SSR-safe: renders nothing on first paint, hydrates after mount.
 *
 * Visual treatment: bottom-of-viewport mono editorial panel. Hairline
 * border + black background to match the announcement bar inverted
 * style. Sits above all content via fixed positioning.
 */

const STORAGE_KEY = "flowstack-consent";
const EVENT_NAME = "flowstack-consent";

export type ConsentValue = "granted" | "denied";

export function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "granted" || v === "denied" ? v : null;
}

function writeConsent(v: ConsentValue) {
  window.localStorage.setItem(STORAGE_KEY, v);
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: v }));
}

export function CookieConsent() {
  // null until we've checked localStorage post-hydration; this avoids
  // any SSR/CSR mismatch.
  const [decision, setDecision] = useState<ConsentValue | null | "pending">(
    "pending",
  );

  useEffect(() => {
    setDecision(readConsent());
  }, []);

  if (decision !== null) return null;

  const accept = () => {
    writeConsent("granted");
    setDecision("granted");
  };

  const decline = () => {
    writeConsent("denied");
    setDecision("denied");
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="bg-bg border-border-hi text-ink fixed inset-x-0 bottom-0 z-50 border-t-2 shadow-[0_-1px_24px_rgba(0,0,0,0.4)]"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:gap-6">
        {/* Status pip + copy */}
        <div className="flex items-start gap-3 sm:flex-1">
          <span
            aria-hidden
            className="bg-ink pulse-glow mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full"
          />
          <p className="text-ink-dim font-mono text-[12.5px] leading-[1.55] tracking-[0.02em]">
            <span className="text-ink font-semibold tracking-[0.18em] uppercase">
              Cookies ·
            </span>{" "}
            We use Google Analytics to understand how visitors use the
            site. No advertising cookies, no third-party tracking beyond
            analytics. Detail in the{" "}
            <Link
              href="/privacy"
              className="text-ink underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-row items-center gap-3 sm:flex-row sm:gap-2">
          <button
            type="button"
            onClick={decline}
            className="btn-draw inline-flex items-center justify-center px-5 py-2.5 text-[12px] font-semibold tracking-[0.12em] uppercase"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className="btn-grad inline-flex items-center justify-center px-5 py-2.5 text-[12px] font-semibold tracking-[0.12em] uppercase"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Exposed so the analytics layer can subscribe to consent changes
 * without depending on the component implementation.
 */
export const CONSENT_EVENT = EVENT_NAME;
