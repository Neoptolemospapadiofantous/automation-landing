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
const LAST_MOD = "2026-09-13"; // homepage, /pricing and /audit rewritten around the four services
const ROLES_LAST_MOD = "2026-08-27"; // role copy simplified, TL;DR band added
const LEGAL_LAST_MOD = "2026-08-31"; // terms: registered office + HE number filled in
const LEGAL_BYOK_LAST_MOD = "2026-09-02"; // security/dpa/privacy: BYOK from Growth up, Google added, premium engines customer-key only
const SERVICES_LAST_MOD = "2026-08-27"; // copy simplified to the TL;DR pass
const EL_LAST_MOD = "2026-09-13"; // /el and /el/pricing rewritten around the four services
const EL_WHAT_WORKS_LAST_MOD = "2026-09-02"; // the fifth and sixth Greek pages: /el/what-works, /el/audit
const EL_ROLES_LAST_MOD = "2026-09-05"; // /el/email-automation + the four Greek role pages
const EL_AUDIT_LAST_MOD = "2026-09-13"; // /el/audit became the free call
const RENAMED_LAST_MOD = "2026-09-13"; // service pages renamed to the service names (/website, /chat-assistant, /automations, /lead-generation) and rewritten; /studio + /suite redirect

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
      alternates: pair("/what-works", "/el/what-works"),
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
      url: `${SITE_URL}/website`,
      lastModified: "2026-09-01",
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: pair("/website", "/el/website"),
    },
    {
      url: `${SITE_URL}/lead-generation`,
      lastModified: RENAMED_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: pair("/lead-generation", "/el/lead-generation"),
    },
    {
      url: `${SITE_URL}/automations`,
      lastModified: "2026-09-05",
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: pair("/automations", "/el/automations"),
    },
    {
      url: `${SITE_URL}/el/automations`,
      lastModified: RENAMED_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: pair("/automations", "/el/automations"),
    },
    {
      url: `${SITE_URL}/el`,
      lastModified: EL_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: pair("/", "/el"),
    },
    {
      url: `${SITE_URL}/el/website`,
      lastModified: RENAMED_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: pair("/website", "/el/website"),
    },
    {
      url: `${SITE_URL}/el/lead-generation`,
      lastModified: RENAMED_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: pair("/lead-generation", "/el/lead-generation"),
    },
    {
      url: `${SITE_URL}/el/pricing`,
      lastModified: EL_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: pair("/pricing", "/el/pricing"),
    },
    {
      url: `${SITE_URL}/el/what-works`,
      lastModified: EL_WHAT_WORKS_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: pair("/what-works", "/el/what-works"),
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
