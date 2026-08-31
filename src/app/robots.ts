import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * robots.txt — generated dynamically so it tracks SITE_URL. Everything
 * is indexable, legal pages included — they are in-force public
 * documents and sit in the sitemap. Crawlers see one allow rule and a
 * sitemap pointer.
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
