"use client";

import { reopenConsent } from "./cookie-consent";

/**
 * Footer "Cookie settings" link. Reopens the consent banner via the
 * shared `reopenConsent()` helper — single source of truth so we
 * never drift from the rest of the consent plumbing.
 *
 * Rendered inline in the footer baseline row; styled to match the
 * mono ↘ underlined links there.
 */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={reopenConsent}
      className="text-ink-dim hover:text-ink cursor-pointer font-mono text-[12px] tracking-[0.04em] transition-colors underline-offset-4 hover:underline"
    >
      Cookie settings
    </button>
  );
}
