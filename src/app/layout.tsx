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
  title: "Flowstack — Stop paying humans to do robot work",
  description:
    "Custom automation studio. We diagnose the leaks in your operation, then ship the systems that quietly run the boring parts of your business.",
  metadataBase: new URL("https://flowstack.example"),
  openGraph: {
    title: "Flowstack — Stop paying humans to do robot work",
    description:
      "30-min audit. Written diagnosis. Yours to keep — even if you never hire us.",
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
