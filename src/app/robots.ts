import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * robots.txt — generated dynamically so it tracks SITE_URL. The legal
 * pages already opt out of indexing via their own `robots: { index:
 * false }` metadata, so we don't list them here. Crawlers see one allow
 * rule and a sitemap pointer.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
