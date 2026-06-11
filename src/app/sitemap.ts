import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Sitemap. Only includes pages we want crawled and indexed; the four
 * legal drafts opt out via per-page `robots: { index: false }` so they
 * are deliberately absent here too.
 *
 * lastModified is hard-coded per route. Bump these when the page
 * actually changes — fake-fresh dates train crawlers to ignore the
 * sitemap. Date must be passed in via constant; `new Date()` would
 * make every build re-crawl everything.
 */
const LAST_MOD = "2026-06-09";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: LAST_MOD,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/audit`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
