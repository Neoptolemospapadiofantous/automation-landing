import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/seo";

/**
 * Web app manifest — makes the site installable and gives the home-screen
 * launch a black ground that matches the chrome. Icons point at the
 * generated routes in `icon.tsx`.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND.name} — ${BRAND.tagline}`,
    short_name: BRAND.name,
    description: BRAND.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/icon/192", sizes: "192x192", type: "image/png" },
      { src: "/icon/512", sizes: "512x512", type: "image/png" },
    ],
  };
}
