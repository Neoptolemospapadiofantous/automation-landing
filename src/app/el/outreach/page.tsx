import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";

/**
 * /el/outreach — the Greek twin of /outreach. Vocabulary aligned with
 * OUTREACH_PITCH_EL / SERVICES_EL («Μηχανή cold outreach», the sheet
 * keeps "cold outreach" untranslated, so the page does too).
 */
export const metadata: Metadata = {
  title: "Εύρεση πελατών με cold email",
  description:
    "Βρίσκουμε τις επιχειρήσεις που θέλετε για πελάτες, τους γράφουμε στη φωνή σας — Ελληνικά ή Αγγλικά — και σας παραδίδουμε τις απαντήσεις. Εγκρίνετε κάθε λέξη.",
  alternates: {
    canonical: "/el/outreach",
    languages: {
      en: "/outreach",
      el: "/el/outreach",
      "x-default": "/outreach",
    },
  },
  openGraph: {
    title: "Εύρεση πελατών με cold email — Flowstack",
    url: "/el/outreach",
    description:
      "Βρίσκουμε τις επιχειρήσεις που σας ταιριάζουν, τους γράφουμε στη φωνή σας, και σας παραδίδουμε τις απαντήσεις.",
  },
  // The root layout's Twitter card is English; without this a Greek
  // page shares in the wrong language on X while OG is already Greek.
  twitter: {
    title: "Εύρεση πελατών με cold email — Flowstack",
    description:
      "Βρίσκουμε τις επιχειρήσεις που σας ταιριάζουν, τους γράφουμε στη φωνή σας, και σας παραδίδουμε τις απαντήσεις.",
  },
};

const steps = [
  {
    ref: "O-01",
    title: "Μας λέτε ποιους θέλετε",
    body: "Μισή ώρα για να ορίσουμε τον στόχο — κλινικές, γραφεία, ξενοδοχεία, εδώ ή στο εξωτερικό. Χτίζουμε τη λίστα. Την εγκρίνετε.",
  },
  {
    ref: "O-02",
    title: "Γράφουμε τα email",
    body: "Ένα πρώτο email και λίγα ευγενικά follow-up, στα Ελληνικά ή στα Αγγλικά. Εγκρίνετε κάθε λέξη.",
  },
  {
    ref: "O-03",
    title: "Η αποστολή τρέχει μόνη της",
    body: "Λίγα την ημέρα, από τη δική σας διεύθυνση. Μια απάντηση σταματά τη σειρά. Bounces και διαγραφές τακτοποιούνται μόνα τους.",
  },
  {
    ref: "O-04",
    title: "Βλέπετε τα πάντα",
    body: "Μηνιαία αναφορά: τι στάλθηκε, ποιος απάντησε, τι δοκιμάζουμε μετά. Θέλετε άλλο είδος επιχείρησης; Το λέτε και αλλάζουμε.",
  },
] as const;

export default function OutreachElPage() {
  return (
    <div lang="el">
      <PageHero
        eyebrow="Cold outreach"
        eyebrowTint="violet"
        title={
          <>
            Μιλάτε μόνο με όσους{" "}
            <span className="text-gradient">ενδιαφέρονται ήδη.</span>
          </>
        }
        lead="Βρίσκουμε τις επιχειρήσεις που σας ταιριάζουν, τους γράφουμε στη φωνή σας, και σας παραδίδουμε τις απαντήσεις."
        ctas={[
          { href: "/audit", label: "Κλείστε το δωρεάν ραντεβού →", variant: "primary" },
        ]}
      />

      <Tldr
        rows={[
          {
            k: "Τι είναι",
            v: "Χτίζουμε τη λίστα, γράφουμε τα email, και τα στέλνουμε από τη δική σας διεύθυνση.",
          },
          {
            k: "Ο δικός σας ρόλος",
            v: "Μισή ώρα για να πείτε ποιους θέλετε. Μετά, εγκρίνετε τα κείμενα.",
          },
          {
            k: "Τι κοστίζει",
            v: "Προσφορά μετά από ένα δωρεάν 30λεπτο τηλεφώνημα. Σταθερή τιμή πριν ξεκινήσουμε.",
          },
        ]}
      />

      <section className="relative isolate overflow-hidden pb-16">
        <SectionWatermark text="REACH" />
        <div className="mx-auto max-w-[1280px] px-6">
          <ol className="grid grid-cols-1 gap-px border bg-border-line border-border-line sm:grid-cols-2">
            {steps.map((s) => (
              <li key={s.ref} className="bg-bg flex flex-col gap-3 px-7 py-9">
                <span className="bp-ref text-violet">{s.ref}</span>
                <h2 className="text-ink text-xl font-semibold tracking-[-0.02em]">
                  {s.title}
                </h2>
                <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line grid grid-cols-1 gap-8 border-t pt-10 lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-col gap-4">
              <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Τι χρειαζόμαστε από εσάς.
              </h2>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Μισή ώρα για να ορίσετε ποιους θέλετε να προσεγγίσουμε",
                  "Την έγκρισή σας στα κείμενα των email",
                  "Το όνομα με το οποίο στέλνονται τα email",
                ].map((y) => (
                  <li
                    key={y}
                    className="text-ink-dim flex items-start gap-3 leading-[1.5]"
                  >
                    <span className="bp-dot mt-1.5 shrink-0" aria-hidden />
                    {y}
                  </li>
                ))}
              </ul>
              <p className="bp-annot normal-case mt-1">
                Αυτό ήταν — τα υπόλοιπα τα αναλαμβάνουμε εμείς.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Τι δεν θα κάνουμε.
              </h2>
              <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                Δεν στέλνουμε τίποτα που δεν έχετε διαβάσει. Δεν αγοράζουμε
                έτοιμες λίστες. Σταματάμε στην πρώτη απάντηση.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-col items-start gap-5 border-t pt-10">
            <p className="text-ink-dim max-w-[52ch] leading-[1.6]">
              Προσαρμοσμένο στην αγορά σας, με προσφορά μετά το δωρεάν
              ραντεβού.{" "}
              <span className="text-ink font-semibold">
                Σταθερή τιμή πριν ξεκινήσουμε.
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/audit" className={ctaClass()}>
                Κλείστε το ραντεβού →
              </Link>
              <Link
                href="/outreach"
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
