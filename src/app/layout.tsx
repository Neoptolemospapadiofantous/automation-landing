import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BlueprintChrome } from "@/components/blueprint-chrome";
import { Atmosphere } from "@/components/atmosphere";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CookieConsent } from "@/components/cookie-consent";
import { Analytics } from "@/components/analytics";
import { FlowstackWidget } from "@/components/flowstack-widget";
import { SITE_URL, BRAND } from "@/lib/seo";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Two titles, deliberately different.
 *
 * TITLE_HOME is the homepage <title> — what Google prints and what a
 * browser tab shows. The tagline version ran to 76 characters, so
 * "Answer every inbound." was cut off in results, and the words that
 * survived were brand poetry rather than anything anyone searches for.
 * This one is 58, leads with the three things we sell, and ends on the
 * brand like the `%s — Flowstack` template every other page uses.
 *
 * TITLE_SOCIAL keeps the canonical tagline for OG and Twitter cards,
 * where there is no 60-character guillotine and the line is doing brand
 * work next to the OG image that renders the same three beats. The
 * tagline itself (BRAND.tagline, SHARED.md §3.4) is untouched and still
 * drives OG, JSON-LD, the manifest and llms.txt.
 */
const TITLE_HOME = "Website chat, cold outreach and live reporting — Flowstack";
const TITLE_SOCIAL = `${BRAND.name} — ${BRAND.tagline}`;
const DESCRIPTION =
  "We set up systems that answer your website, send your follow-ups, and put your numbers in one live view — so you stop doing it by hand. Chat is free to start.";

// Next 16 requires viewport/themeColor as a separate export, not
// inside `metadata`. Keeps mobile browser chrome on the paper sheet.
export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Per-page metadata can pass a string to use the template, or a
    // string-with-the-brand-already-attached to override entirely.
    default: TITLE_HOME,
    template: `%s — ${BRAND.name}`,
  },
  description: DESCRIPTION,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.legalName }],
  creator: BRAND.legalName,
  publisher: BRAND.legalName,
  keywords: [
    "lead qualification",
    "after-hours leads",
    "customer support automation",
    "onboarding automation",
    "workflow automation",
    "data pipelines",
    "data aggregation",
    "website chat widget",
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
    title: TITLE_SOCIAL,
    description: DESCRIPTION,
    // The image referenced here is supplied by `src/app/opengraph-image.tsx`
    // — Next generates the route and the metadata entry automatically.
  },
  twitter: {
    card: "summary_large_image",
    site: BRAND.twitter,
    creator: BRAND.twitter,
    title: TITLE_SOCIAL,
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} sheet-white h-full antialiased`}
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
        <Atmosphere />
        <BlueprintChrome />
        {/* Sticky chrome — announcement bar stacks on top, site nav
            sits underneath. Both move as one unit. z-40 sits above
            the persistent blueprint chrome (z-30) and below the
            cookie consent prompt (z-50).
            view-transition-name anchors it during page transitions:
            the chrome must not fade or move while the sheet below
            swaps (see the site-chrome rules in globals.css).
            On phones the announcement bar is a fixed h-9 (36px) single
            row, and -top-9 lets exactly that row scroll away so only
            the nav stays pinned — the two-bar stack ate ~20% of a
            phone viewport. At sm+ the full stack sticks as before. */}
        <div className="sticky -top-9 z-40 [view-transition-name:site-chrome] sm:top-0">
          <AnnouncementBar />
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
      </body>
    </html>
  );
}
