import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { rolePages } from "@/lib/content";

/**
 * Sitemap — every page we want crawled and indexed, legal documents
 * included (they went in force 2026-07-08; the old draft noindex is
 * gone).
 *
 * lastModified is hard-coded per route. Bump these when the page
 * actually changes — fake-fresh dates train crawlers to ignore the
 * sitemap. Date must be passed in via constant; `new Date()` would
 * make every build re-crawl everything.
 */
const LAST_MOD = "2026-07-08"; // brand repositioning shipped
const ROLES_LAST_MOD = "2026-07-08"; // meta titles reworded
const LEGAL_LAST_MOD = "2026-07-08"; // in force, indexable

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
    ...rolePages.map((r) => ({
      url: `${SITE_URL}/roles/${r.slug}`,
      lastModified: ROLES_LAST_MOD,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...["privacy", "terms", "security", "dpa"].map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: LEGAL_LAST_MOD,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
