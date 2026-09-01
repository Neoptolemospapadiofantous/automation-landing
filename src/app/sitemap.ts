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
const LAST_MOD = "2026-08-27"; // copy simplified sitewide; homepage gained the TL;DR + index bands
const ROLES_LAST_MOD = "2026-08-27"; // role copy simplified, TL;DR band added
const LEGAL_LAST_MOD = "2026-08-31"; // terms/privacy: registered office + HE number filled in
const LEGAL_BYOK_LAST_MOD = "2026-08-30"; // security/dpa: model-provider claims scoped to our own accounts
const SERVICES_LAST_MOD = "2026-08-27"; // copy simplified to the TL;DR pass
const EL_LAST_MOD = "2026-09-01"; // Greek twins of the four money pages went live

/** hreflang pair for a page with a Greek twin — mirrors the pages' own
 *  metadata.alternates.languages so the sitemap and the <link> tags can
 *  never disagree. */
const pair = (en: string, el: string) => ({
  languages: { en: `${SITE_URL}${en}`, el: `${SITE_URL}${el}` },
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: LAST_MOD,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: pair("/", "/el"),
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: pair("/pricing", "/el/pricing"),
    },
    {
      url: `${SITE_URL}/what-works`,
      lastModified: SERVICES_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/website-build`,
      lastModified: "2026-09-01",
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: pair("/website-build", "/el/website-build"),
    },
    {
      url: `${SITE_URL}/outreach`,
      lastModified: SERVICES_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: pair("/outreach", "/el/outreach"),
    },
    {
      url: `${SITE_URL}/el`,
      lastModified: EL_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: pair("/", "/el"),
    },
    {
      url: `${SITE_URL}/el/website-build`,
      lastModified: EL_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: pair("/website-build", "/el/website-build"),
    },
    {
      url: `${SITE_URL}/el/outreach`,
      lastModified: EL_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: pair("/outreach", "/el/outreach"),
    },
    {
      url: `${SITE_URL}/el/pricing`,
      lastModified: EL_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: pair("/pricing", "/el/pricing"),
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
    ...[
      ["privacy", LEGAL_LAST_MOD],
      ["terms", LEGAL_LAST_MOD],
      ["security", LEGAL_BYOK_LAST_MOD],
      ["dpa", LEGAL_BYOK_LAST_MOD],
    ].map(([slug, lastMod]) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: lastMod,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
