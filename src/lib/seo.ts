/**
 * Single source of truth for the production URL. Used by metadata,
 * sitemap, robots.txt, JSON-LD and any absolute link in OG.
 *
 * TBC: replace `https://flowstack.example` with the real production
 * domain before launch. Override locally via NEXT_PUBLIC_SITE_URL if
 * you need preview deployments to advertise their own host.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://flowstack.example";

/**
 * Google Analytics 4 measurement ID. Set NEXT_PUBLIC_GA_ID in Forge env.
 * When unset, the analytics surface (script tag, consent gating) does not
 * render at all — keeping the dev / preview pages tracking-free.
 *
 * Format: G-XXXXXXXXXX. Created in the GA4 admin UI under Data Streams →
 * web stream → Measurement ID.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Brand constants reused by OG image, JSON-LD and a few headings. */
export const BRAND = {
  name: "Flowstack",
  legalName: "Flowstack Studio",
  tagline: "AI agents for your team, live in 60 seconds.",
  twitter: "@flowstack" as const, // TBC: real handle
  locale: "en_US" as const,
  contact: {
    privacy: "privacy@flowstack.example", // TBC
    security: "security@flowstack.example", // TBC
    legal: "legal@flowstack.example", // TBC
  },
};
