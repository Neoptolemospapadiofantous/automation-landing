import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BlueprintChrome } from "@/components/blueprint-chrome";

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

export const metadata: Metadata = {
  title: "Flowstack — AI agents for your team, live in 60 seconds",
  description:
    "Pre-built AI agents for sales, support, lead-qualification and onboarding — provisioned on your stack with leads streaming into a real-time dashboard. Starter $19/mo, cancel anytime. Custom builds when off-the-shelf isn't enough.",
  metadataBase: new URL("https://flowstack.example"),
  openGraph: {
    title: "Flowstack — AI agents for your team, live in 60 seconds",
    description:
      "Pick a role. We provision the agent — $19/mo to start, scale when it works. Hire the custom-build studio when you outgrow the off-the-shelf flow.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-ink min-h-full flex flex-col overflow-x-hidden">
        <BlueprintChrome />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
