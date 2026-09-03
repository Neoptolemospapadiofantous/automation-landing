import type { Metadata } from "next";
import { EL_OG_IMAGES } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";

/**
 * /el/what-works — the Greek twin of /what-works.
 *
 * Built because the Greek homepage points here TWICE — the ΜΕΤΡΑΜΕ verb
 * and the «Μία ζωντανή εικόνα» catalogue cell — and until now both jumps
 * dropped a Greek reader onto an English page.
 *
 * Same argument in the same order as the English page: the live view, then
 * the loop, then the proof that we run it on ourselves. Unpriced, ending
 * at the audit, like every service page.
 *
 * The English page opens with <ProductWindow />, which is omitted here for
 * the reason the Greek homepage omits the animated sections: its labels
 * are hardwired English, and an English product mock is the wrong first
 * impression on a Greek page.
 *
 * «Business intelligence» stays in the description, where people search
 * it, and out of the headlines — the buyers are clinics, firms and hotels,
 * and the plain Greek sentence outsells the acronym.
 */
export const metadata: Metadata = {
  title: "Dashboard επιχείρησης και ανάλυση δεδομένων",
  description:
    "Business intelligence για μικρές επιχειρήσεις στην Κύπρο: οι αριθμοί σας σε ένα ζωντανό dashboard, και τα πειράματα που τους αλλάζουν — κρατάμε ό,τι δουλεύει.",
  alternates: {
    canonical: "/el/what-works",
    languages: {
      en: "/what-works",
      el: "/el/what-works",
      "x-default": "/what-works",
    },
  },
  openGraph: {
    images: EL_OG_IMAGES,
    title: "Τι δουλεύει — Flowstack",
    url: "/el/what-works",
    description:
      "Μία ζωντανή εικόνα των αριθμών σας, και ο κύκλος που τους βελτιώνει. Δωρεάν 30λεπτο ραντεβού, γραπτή προσφορά σε 48 ώρες.",
  },
  // The root layout's Twitter card is English; without this a Greek
  // page shares in the wrong language on X while OG is already Greek.
  twitter: {
    images: EL_OG_IMAGES,
    title: "Τι δουλεύει — Flowstack",
    description:
      "Μία ζωντανή εικόνα των αριθμών σας, και ο κύκλος που τους βελτιώνει. Δωρεάν 30λεπτο ραντεβού, γραπτή προσφορά σε 48 ώρες.",
  },
};

/* Refs W-01/W-02 match the English page — same drawing set, both languages. */
const halves = [
  {
    ref: "W-01",
    name: "Μία ζωντανή εικόνα",
    what: "Φτιάχνεται μία φορά, γύρω από τα δικά σας εργαλεία.",
    body: "Πωλήσεις, leads και οι εβδομαδιαίοι αριθμοί σας, από σκόρπια εργαλεία σε ένα dashboard που ενημερώνεται μόνο του.",
    points: [
      "CRM, φύλλα, inbox και τιμολόγηση, διαβασμένα σε ένα σημείο",
      "Η εβδομαδιαία αναφορά παύει να είναι δουλειά κάποιου",
      "Αριθμοί για να δράσετε την ίδια μέρα, όχι την επόμενη Δευτέρα",
    ],
  },
  {
    ref: "W-02",
    name: "Ο κύκλος",
    what: "Τρέχει κάθε μήνα, στους δικούς σας αριθμούς.",
    body: "Ένα dashboard σας λέει τι έγινε. Ο κύκλος σας λέει τι να αλλάξετε, και τι κουνήθηκε όταν το αλλάξατε.",
    points: [
      "Θέματα, σειρές email και μορφές δοκιμάζονται μεταξύ τους",
      "Ό,τι κερδίζει μένει, ό,τι χάνει αποσύρεται — με στοιχεία, όχι με το μάτι",
      "Ένα μηνιαίο σημείωμα για το τι άλλαξε, σε απλά λόγια",
    ],
  },
] as const;

/* Method only — no counts that decay, no absolute volumes, same as the
   English page. Each line is something that actually happened to us. */
const ownGrowth = [
  "Κάθε email και κάθε δημοσίευση που στέλνουμε την αναθέτει ένα ζωντανό πείραμα, και κρίνεται από αυτό που γύρισε.",
  "Τα στοιχεία έδειξαν ότι τα βίντεό μας έφταναν στους μισούς. Αποσύραμε το βίντεο.",
  "Ένα σφάλμα είχε φουσκώσει το δικό μας ποσοστό απαντήσεων. Το βρήκαμε και διορθώσαμε τον αριθμό προς τα κάτω — δύο φορές.",
] as const;

export default function WhatWorksElPage() {
  return (
    <div lang="el">
      <PageHero
        eyebrow="Τι δουλεύει"
        eyebrowTint="violet"
        title={
          <>
            Οι αναφορές λένε τι έγινε.{" "}
            <span className="text-gradient">Αυτό λέει τι να κάνετε μετά.</span>
          </>
        }
        lead="Βάζουμε τους αριθμούς σας σε ένα dashboard, και μετά τρέχουμε τα τεστ που τους αλλάζουν."
        ctas={[
          {
            href: "/el/audit",
            label: "Κλείστε το δωρεάν ραντεβού →",
            variant: "primary",
          },
        ]}
      />

      <Tldr
        rows={[
          {
            k: "Τι είναι",
            v: "Όλοι σας οι αριθμοί σε ένα dashboard, φτιαγμένο γύρω από τα εργαλεία που ήδη χρησιμοποιείτε.",
          },
          {
            k: "Τι άλλο",
            v: "Κάθε μήνα δοκιμάζουμε αυτά που στέλνετε, κρατάμε ό,τι δουλεύει, και αφήνουμε ό,τι δεν δουλεύει.",
          },
          {
            k: "Τι κοστίζει",
            v: "Προσφορά μετά από ένα δωρεάν 30λεπτο τηλεφώνημα. Σταθερή τιμή, και ο κώδικας μένει δικός σας.",
          },
        ]}
      />

      {/* The two halves — what you own, and what keeps happening. */}
      <section className="relative isolate overflow-hidden py-16">
        <SectionWatermark text="LOOP" />
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line grid grid-cols-1 gap-px border bg-border-line lg:grid-cols-2">
            {halves.map((h) => (
              <div key={h.ref} className="bg-bg flex flex-col gap-4 px-7 py-9">
                <span className="bp-ref text-ink-mute">{h.ref}</span>
                <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                  {h.name}
                </h2>
                <p className="bp-annot normal-case">{h.what}</p>
                <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                  {h.body}
                </p>
                <ul className="mt-1 flex flex-col gap-2.5">
                  {h.points.map((p) => (
                    <li
                      key={p}
                      className="text-ink-dim flex items-start gap-3 text-[14px] leading-[1.5]"
                    >
                      <span className="bp-dot mt-1.5 shrink-0" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The proof. This is the page where the claim has to hold up. */}
      <section className="relative isolate overflow-hidden pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line max-w-[860px] border-l-2 pl-6 sm:pl-8">
            <span className="bp-ref text-violet">πρώτα στον εαυτό μας</span>
            <h2 className="text-ink mt-4 text-2xl font-semibold tracking-[-0.03em] text-balance sm:text-3xl">
              Ο κύκλος τρέχει πάνω μας από την αρχή.
            </h2>
            <div className="mt-7 flex flex-col gap-5">
              {ownGrowth.map((line) => (
                <p
                  key={line}
                  className="text-ink-dim max-w-[62ch] leading-[1.6]"
                >
                  {line}
                </p>
              ))}
              <p className="text-ink max-w-[62ch] font-semibold leading-[1.6]">
                Ο ίδιος κύκλος, στραμμένος στους δικούς σας αριθμούς.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Close — every unpriced service ends at the audit. */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-col items-start gap-5 border-t pt-10">
            <p className="text-ink-dim max-w-[52ch] leading-[1.6]">
              Προσαρμοσμένο στα δικά σας εργαλεία, με προσφορά μετά το
              δωρεάν ραντεβού.{" "}
              <span className="text-ink font-semibold">
                Σταθερή τιμή, και ο κώδικας μένει δικός σας.
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/el/audit" className={ctaClass()}>
                Κλείστε το ραντεβού →
              </Link>
              <Link
                href="/what-works"
                hrefLang="en"
                className="bp-annot normal-case inline-block py-1.5 underline underline-offset-4"
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
