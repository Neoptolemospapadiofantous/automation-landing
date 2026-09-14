import type { Metadata } from "next";
import { EL_OG_IMAGES } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { Catalogue, CATALOGUE_EL } from "@/components/sections/catalogue";
import { ctaClass } from "@/components/ui/button";
import { registerUrl } from "@/lib/dashboard";
import { buildCatalogueEl, FREE_CALL_EL, servicesEl } from "@/lib/content";

/**
 * /el — the Greek homepage.
 *
 * A condensed twin of the English one: hero → TL;DR → the four services →
 * the catalogue → pricing line. The animated EN sections carry hardwired
 * English copy, so this page states the same argument in Greek with the
 * shared primitives. Since 2026-09-13 the four services and the catalogue
 * read `servicesEl` — the same data the Greek service pages use — so the
 * Greek homepage can no longer drift to a different menu (it had five cells
 * and four verbs while English had four services). Unpriced throughout.
 */
const DESCRIPTION =
  "Φτιάχνουμε την ιστοσελίδα σας, απαντάμε σε κάθε μήνυμα με chat ή τηλέφωνο, αυτοματοποιούμε τα follow-up και σας φέρνουμε πελάτες.";

export const metadata: Metadata = {
  title: "Ιστοσελίδες, chat, αυτοματισμοί & εύρεση πελατών",
  description: DESCRIPTION,
  alternates: {
    canonical: "/el",
    languages: { en: "/", el: "/el", "x-default": "/" },
  },
  openGraph: {
    images: EL_OG_IMAGES,
    title: "Flowstack — Ιστοσελίδες, chat, αυτοματισμοί & εύρεση πελατών",
    url: "/el",
    description: DESCRIPTION,
  },
  twitter: {
    images: EL_OG_IMAGES,
    title: "Flowstack — Ιστοσελίδες, chat, αυτοματισμοί & εύρεση πελατών",
    description: DESCRIPTION,
  },
};

export default function HomeElPage() {
  return (
    <div lang="el">
      <PageHero
        eyebrow="Flowstack · Λεμεσός"
        eyebrowTint="violet"
        title={
          <>
            Φτιάχνουμε την ιστοσελίδα σας, απαντάμε σε κάθε μήνυμα,{" "}
            <span className="text-gradient">και σας φέρνουμε πελάτες.</span>
          </>
        }
        lead="Για επιχειρήσεις που ξεκινούν ή ανανεώνονται. Μία ομάδα. Μία σταθερή τιμή."
        ctas={[
          {
            href: FREE_CALL_EL.href,
            label: `${FREE_CALL_EL.label} →`,
            short: `${FREE_CALL_EL.short} →`,
          },
          { href: registerUrl(), label: "Δοκιμάστε το chat δωρεάν", variant: "secondary" },
        ]}
      />

      <Tldr
        rows={[
          {
            k: "Τι πουλάμε",
            v: "Ιστοσελίδα, βοηθό chat και τηλεφώνου που απαντά σε κάθε μήνυμα, αυτοματισμούς στο CRM σας και εύρεση πελατών — τα φτιάχνουμε εμείς.",
          },
          {
            k: "Για ποιους",
            v: "Επιχειρήσεις που ξεκινούν, και επιχειρήσεις που το site και τα συστήματά τους έχουν μείνει πίσω. Ένα κομμάτι, ή όλα.",
          },
          {
            k: "Πώς ξεκινάτε",
            v: "Δωρεάν ραντεβού 30 λεπτών, μετά γραπτή σταθερή τιμή σε 48 ώρες. Ή δοκιμάστε πρώτα το chat, δωρεάν.",
          },
        ]}
      />

      {/* The four services — same cells as the English ServiceLines, read
          from servicesEl. */}
      <section className="relative pt-4">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-wrap items-end justify-between gap-4 border-b pb-5">
            <div>
              <span className="bp-ref">τι πουλάμε</span>
              <h2 className="text-ink mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Τέσσερα πράγματα. Μία ομάδα.
              </h2>
            </div>
            <p className="bp-annot normal-case">Πάρτε ένα, ή και τα τέσσερα.</p>
          </div>

          <div className="border-border-line bg-border-line mt-px grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
            {servicesEl.map((sv) => (
              <Link
                key={sv.slug}
                href={sv.href}
                hrefLang="el"
                className="bg-bg lift-hover group flex flex-col gap-3 px-6 py-8"
              >
                <span className="text-ink flex items-center gap-2.5 font-mono text-[12px] tracking-[0.12em] uppercase">
                  <span className="bp-dot shrink-0" aria-hidden />
                  {sv.name}
                </span>
                <span className="bp-annot text-violet normal-case">{sv.buyPath}</span>
                <p className="text-ink-dim max-w-[34ch] leading-[1.55]">{sv.outcome}</p>
                <span className="bp-annot mt-auto flex items-center gap-2 pt-2 normal-case">
                  Τι παίρνετε
                  <span
                    aria-hidden
                    className="text-violet transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Catalogue items={buildCatalogueEl} copy={CATALOGUE_EL} />

      {/* Pricing line — the chat's price list; everything built is in the
          catalogue's closing line, so it is not repeated here. */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-col items-start gap-5 border-t pt-10">
            <p className="text-ink-dim max-w-[56ch] leading-[1.6]">
              Το chat ξεκινά δωρεάν — €9 έως €39 τον μήνα όταν μεγαλώσετε.{" "}
              <span className="text-ink font-semibold">
                Χωρίς δεσμεύσεις, ακύρωση όποιον μήνα θέλετε.
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/el/pricing"
                hrefLang="el"
                className={ctaClass({ variant: "ghost" })}
              >
                Δείτε τις τιμές
              </Link>
              <Link
                href="/"
                hrefLang="en"
                className="bp-annot inline-block py-1.5 normal-case underline underline-offset-4"
              >
                Read this page in English
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
