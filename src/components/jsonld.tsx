import { SITE_URL, BRAND } from "@/lib/seo";
import { pricingTiers, faqItems } from "@/lib/content";

/**
 * Structured data for the homepage. Three graphs in one `<script>`:
 *
 *   - Organization — who runs the site
 *   - WebSite — the site itself + a search action placeholder
 *   - SoftwareApplication — the agent platform, with its pricing tiers
 *     expressed as schema.org Offer entries
 *
 * Inline `<script type="application/ld+json">` is the standard
 * delivery; Google's structured-data guidance prefers it over
 * external files. dangerouslySetInnerHTML is the correct way to ship
 * a script body in React.
 */
export function HomepageJsonLd() {
  const offers = pricingTiers.map((t) => {
    // Operator/Starter price like "€99/mo" → 99 EUR recurring monthly.
    // Custom tier has no fixed price (was set to "Let's talk"), so no
    // Offer price field for that one — only the URL and name.
    const monthlyMatch = /^€([\d,]+)\/mo$/.exec(t.price);
    const numericPrice = monthlyMatch
      ? Number(monthlyMatch[1].replace(/,/g, ""))
      : null;
    return {
      "@type": "Offer",
      name: `${BRAND.name} ${t.name}`,
      url: `${SITE_URL}/pricing`,
      ...(numericPrice !== null && {
        price: numericPrice,
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: numericPrice,
          priceCurrency: "EUR",
          billingDuration: "P1M",
          unitText: "MONTH",
        },
      }),
      availability: "https://schema.org/InStock",
      description: t.tagline,
    };
  });

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: BRAND.legalName,
        alternateName: BRAND.name,
        url: SITE_URL,
        logo: `${SITE_URL}/icon`,
        sameAs: [
          // TBC: real LinkedIn / X / GitHub URLs when they exist
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            email: BRAND.contact.privacy,
            contactType: "privacy",
            availableLanguage: ["en"],
          },
          {
            "@type": "ContactPoint",
            email: BRAND.contact.security,
            contactType: "security",
            availableLanguage: ["en"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#site`,
        url: SITE_URL,
        name: BRAND.name,
        description: BRAND.tagline,
        publisher: { "@id": `${SITE_URL}/#org` },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#product`,
        name: BRAND.name,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "AI Chatbot Platform",
        operatingSystem: "Web",
        description:
          "Pre-built AI agents for sales, support, lead qualification and onboarding, deployed on your stack with a real-time dashboard.",
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}/#org` },
        offers,
      },
      {
        // FAQPage schema — Google renders these as expandable
        // rich-snippet items directly in the SERP. Source of truth is
        // `faqItems` in lib/content.ts so the schema can never drift
        // from the rendered FAQ accordion.
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Stringified JSON only — no executable code goes through
      // dangerouslySetInnerHTML, so this is the canonical pattern for
      // shipping JSON-LD with React.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
