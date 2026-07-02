import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BlueprintChrome } from "@/components/blueprint-chrome";
import { Atmosphere } from "@/components/atmosphere";
import { LiveStatsProvider } from "@/components/live-stats-provider";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CookieConsent } from "@/components/cookie-consent";
import { Analytics } from "@/components/analytics";
import { FlowstackWidget } from "@/components/flowstack-widget";
import { SITE_URL, BRAND } from "@/lib/seo";
import { getPlatformStats } from "@/lib/stats";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const TITLE_DEFAULT = `${BRAND.name} — ${BRAND.tagline}`;
const DESCRIPTION =
  "Every message that waits for business hours is a customer you're losing. Flowstack puts an always-on AI agent on your site — greeting, qualifying, answering and onboarding the moment someone reaches out, every conversation in a real-time dashboard. Live in 60 seconds, from €99/mo, cancel anytime.";

// Next 16 requires viewport/themeColor as a separate export, not
// inside `metadata`. Keeps mobile browser chrome on-brand black.
export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Per-page metadata can pass a string to use the template, or a
    // string-with-the-brand-already-attached to override entirely.
    default: TITLE_DEFAULT,
    template: `%s — ${BRAND.name}`,
  },
  description: DESCRIPTION,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.legalName }],
  creator: BRAND.legalName,
  publisher: BRAND.legalName,
  keywords: [
    "AI agent",
    "AI agents",
    "chatbot",
    "lead qualification",
    "customer support AI",
    "sales chatbot",
    "onboarding automation",
    "automation studio",
    "Flowstack",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    locale: BRAND.locale,
    url: SITE_URL,
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    // The image referenced here is supplied by `src/app/opengraph-image.tsx`
    // — Next generates the route and the metadata entry automatically.
  },
  twitter: {
    card: "summary_large_image",
    site: BRAND.twitter,
    creator: BRAND.twitter,
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
  },
  // Verification placeholders — populate when the search-console
  // properties exist. Leaving the keys present makes it obvious where
  // they go.
  verification: {
    // google: "TBC",
    // yandex: "TBC",
    // me: "mailto:" + BRAND.contact.privacy,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // SSR the announcement bar with the dashboard's current open-date so
  // first paint is correct + SEO-stable. The bar then subscribes to the
  // SSE stream after hydration to flip on operator changes (`php artisan
  // platform:set next_cohort_open_at YYYY-MM-DD`) without a page reload.
  const stats = await getPlatformStats();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-ink min-h-full flex flex-col overflow-x-hidden">
        {/* Keyboard/screen-reader escape hatch past the sticky chrome.
            Visually hidden until focused. z-[60] clears the cookie
            prompt (z-50). */}
        <a
          href="#main"
          className="bg-ink text-bg sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:tracking-[0.18em] focus:uppercase"
        >
          Skip to content
        </a>
        <LiveStatsProvider>
          <Atmosphere />
          <BlueprintChrome />
          {/* Sticky chrome — announcement bar stacks on top, site nav
              sits underneath. Both move as one unit. z-40 sits above
              the persistent blueprint chrome (z-30) and below the
              cookie consent prompt (z-50).
              view-transition-name anchors it during page transitions:
              the chrome must not fade or move while the sheet below
              swaps (see the site-chrome rules in globals.css). */}
          <div className="sticky top-0 z-40 [view-transition-name:site-chrome]">
            <AnnouncementBar initialOpenAt={stats.next_cohort_open_at} />
            <SiteNav />
          </div>
          <main id="main" className="flex-1">
            {/* Page navigations crossfade the sheet content — subtle
                fade + 8px rise ("new sheet laid on the table"), chrome
                anchored. Animation lives in globals.css (.page-swap),
                zeroed under prefers-reduced-motion. */}
            <ViewTransition default="page-swap">{children}</ViewTransition>
          </main>
          <SiteFooter />
          <CookieConsent />
          <Analytics />
          {/* Live chat widget — mounted site-wide so the visitor can reach
              a real Flowstack agent from any page. Off unless
              NEXT_PUBLIC_FLOWSTACK_AGENT_SLUG is set. */}
          <FlowstackWidget />
        </LiveStatsProvider>
      </body>
    </html>
  );
}
