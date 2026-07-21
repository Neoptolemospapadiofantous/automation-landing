import { SITE_URL, BRAND } from "@/lib/seo";
import { pricingTiers, faqItems, type RolePage } from "@/lib/content";

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
          "https://www.linkedin.com/in/neoptolemos-papadiofantous",
        ],
        founder: {
          "@type": "Person",
          name: "Neoptolemos Papadiofantous",
          sameAs: "https://www.linkedin.com/in/neoptolemos-papadiofantous",
        },
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
        applicationSubCategory: "Business Automation Platform",
        operatingSystem: "Web",
        description:
          "Automations, integrations and data pipelines scoped per project — repetitive work run automatically, data aggregated into one live view — with a chat agent answering every website visitor from the company's own knowledge base around the clock.",
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}/#org` },
        offers,
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

/**
 * Breadcrumbs for the per-role landing pages — tells crawlers where
 * /roles/{slug} sits in the site tree (there's no /roles index page;
 * the homepage roles list is the parent).
 */
export function RoleBreadcrumbJsonLd({ role }: { role: RolePage }) {
  const graph = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: BRAND.name,
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: role.name,
        item: `${SITE_URL}/roles/${role.slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

/**
 * Structured data for /pricing. FAQPage lives HERE, not on the
 * homepage — Google only honours FAQ markup on the page where the
 * questions are visible, and the accordion renders on /pricing.
 * Source of truth is `faqItems` in lib/content.ts so the schema can
 * never drift from the rendered FAQ.
 */
export function PricingJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/pricing#faq`,
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
