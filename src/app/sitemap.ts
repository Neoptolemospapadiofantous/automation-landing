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
const LAST_MOD = "2026-09-29"; // homepage narrowed to ONE service (the chat + its wiring)
const ROLES_LAST_MOD = "2026-08-27"; // role copy simplified, TL;DR band added
const LEGAL_LAST_MOD = "2026-08-31"; // terms: registered office + HE number filled in
const LEGAL_BYOK_LAST_MOD = "2026-09-15"; // security/dpa/privacy: BYOK on any paid plan (Growth retired 2026-09-15), Google added, premium engines customer-key only
const EL_LAST_MOD = "2026-09-29"; // /el narrowed to ONE service
const EL_ROLES_LAST_MOD = "2026-09-05"; // /el/email-automation + the four Greek role pages
const EL_AUDIT_LAST_MOD = "2026-09-13"; // /el/audit became the free call
const RENAMED_LAST_MOD = "2026-09-29"; // /chat-assistant is the one service page; /website, /automations, /lead-generation, /what-works, /studio, /suite redirect to it

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
      url: `${SITE_URL}/chat-assistant`,
      lastModified: RENAMED_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: pair("/chat-assistant", "/el/chat-assistant"),
    },
    {
      url: `${SITE_URL}/el/chat-assistant`,
      lastModified: RENAMED_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: pair("/chat-assistant", "/el/chat-assistant"),
    },
    {
      url: `${SITE_URL}/el`,
      lastModified: EL_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: pair("/", "/el"),
    },
    {
      url: `${SITE_URL}/el/pricing`,
      lastModified: EL_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: pair("/pricing", "/el/pricing"),
    },
    {
      url: `${SITE_URL}/el/audit`,
      lastModified: EL_AUDIT_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: pair("/audit", "/el/audit"),
    },
    {
      url: `${SITE_URL}/audit`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: pair("/audit", "/el/audit"),
    },
    ...rolePages.map((r) => ({
      url: `${SITE_URL}/roles/${r.slug}`,
      lastModified: ROLES_LAST_MOD,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: pair(`/roles/${r.slug}`, `/el/roles/${r.slug}`),
    })),
    ...rolePages.map((r) => ({
      url: `${SITE_URL}/el/roles/${r.slug}`,
      lastModified: EL_ROLES_LAST_MOD,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: pair(`/roles/${r.slug}`, `/el/roles/${r.slug}`),
    })),
    ...[
      ["privacy", LEGAL_BYOK_LAST_MOD],
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
