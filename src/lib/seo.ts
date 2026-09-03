/**
 * Single source of truth for the production URL. Used by metadata,
 * sitemap, robots.txt, JSON-LD and any absolute link in OG.
 *
 * Production canonical: https://www.flowstack.run (GA4 stream
 * "Flowstack", id 15073273062). Override locally via
 * NEXT_PUBLIC_SITE_URL if a preview deployment needs to advertise
 * its own host instead.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.flowstack.run";

/**
 * Google Analytics 4 measurement ID. Set NEXT_PUBLIC_GA_ID in Forge env.
 * When unset, the analytics surface (script tag, consent gating) does not
 * render at all — keeping the dev / preview pages tracking-free.
 *
 * Format: G-XXXXXXXXXX. Created in the GA4 admin UI under Data Streams →
 * web stream → Measurement ID.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Social-card images for any page that defines its own `openGraph` or
 * `twitter` metadata block.
 *
 * Why these exist: Next merges metadata SHALLOWLY — a page-level
 * openGraph/twitter block REPLACES the inherited one wholesale, and the
 * file-convention images (src/app/opengraph-image.tsx, src/app/el/
 * opengraph-image.tsx) ride on the segment that owns the file. So a
 * page that writes its own openGraph block ships with NO og:image at
 * all unless it names one — which is exactly what /pricing, /outreach,
 * /audit, /what-works, /website-build and the role pages did until
 * 2026-09-03, and the /el pages did for both og AND twitter.
 *
 * Rule: every `openGraph:` block in a page must carry
 * `images: OG_IMAGES` (or EL_OG_IMAGES under /el), and every page-level
 * `twitter:` block likewise. The URLs are the file-convention routes
 * themselves, so there is still exactly one drawing per language.
 */
export const OG_IMAGES = [
  { url: "/opengraph-image", width: 1200, height: 630 },
];
export const EL_OG_IMAGES = [
  { url: "/el/opengraph-image", width: 1200, height: 630 },
];

/** Brand constants reused by OG image, JSON-LD and a few headings. */
export const BRAND = {
  name: "Flowstack",
  legalName: "Flowstack Studio",
  tagline: "Automate the busywork. Aggregate the data. Answer every inbound.",
  twitter: "@flowstack" as const, // TBC: real handle
  locale: "en_US" as const,
  contact: {
    privacy: "privacy@flowstack.run",
    security: "security@flowstack.run",
    legal: "legal@flowstack.run",
  },
};
