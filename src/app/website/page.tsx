import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";
import { ServicePage, type ServiceStep } from "@/components/service-page";
import { serviceBySlug } from "@/lib/content";

/**
 * /website — the Website service (was /website-build; renamed 2026-09-13
 * so the URL says the service name, with a permanent redirect).
 *
 * Owns "web design limassol": the <title> keeps the buyer query while the
 * page itself uses the service name. Scope honesty is load-bearing — this
 * sells the brochure-style site, and `isnt` says a shop or portal is its
 * own quote, so the small site never anchors an e-commerce project.
 * Unpriced: build prices stay on the sales sheet.
 */
export const metadata: Metadata = {
  title: "Web design & website builds, Limassol",
  description:
    "Fast websites for small businesses in Limassol and across Cyprus, in English or Greek, with the chat on from day one. Live in about two weeks.",
  alternates: {
    canonical: "/website",
    languages: { en: "/website", el: "/el/website", "x-default": "/website" },
  },
  openGraph: {
    images: OG_IMAGES,
    title: "Web design & website builds, Limassol — Flowstack",
    url: "/website",
    description:
      "Fast websites for small businesses in Cyprus, in English or Greek, with the chat on from day one. Fixed price after a free call.",
  },
};

const steps: readonly ServiceStep[] = [
  {
    ref: "WB-01",
    title: "You tell us what it's for",
    body: "Half an hour: what you sell, who it's for, and the language — English, Greek, or both.",
  },
  {
    ref: "WB-02",
    title: "We design and write it",
    body: "Your words, shaped by us. You approve every page before it goes anywhere.",
  },
  {
    ref: "WB-03",
    title: "We build it and switch on the chat",
    body: "On your own domain, answering visitors from the day it launches.",
  },
  {
    ref: "WB-04",
    title: "You keep all of it",
    body: "Domain, code and content are yours. Update it yourself, or we look after it.",
  },
];

export default function WebsitePage() {
  return (
    <ServicePage
      service={serviceBySlug("website")}
      watermark="SITE"
      steps={steps}
      title={
        <>
          A website that turns visitors{" "}
          <span className="text-gradient">into enquiries.</span>
        </>
      }
    />
  );
}
