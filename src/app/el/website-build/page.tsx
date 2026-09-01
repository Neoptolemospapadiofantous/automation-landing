import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";

/**
 * /el/website-build — the Greek twin of /website-build.
 *
 * Greek SERPs for «κατασκευή ιστοσελίδας Λεμεσός» are near-empty, and
 * the outreach data showed the buyer is usually a Greek-speaking
 * Cypriot behind an English-language site. Copy is native Greek in the
 * same TL;DR register, vocabulary aligned with the Greek sales sheet
 * (SERVICES_EL: «Κατασκευή ιστοσελίδας», «Έναρξη λειτουργίας»).
 *
 * hreflang pairs both directions; content wrapped in lang="el" since
 * the root layout's <html> stays lang="en" (single root layout — a
 * route-group split is the eventual clean fix, noted in the plan).
 * Unpriced, same as the English page.
 */
export const metadata: Metadata = {
  title: "Κατασκευή ιστοσελίδας στη Λεμεσό",
  description:
    "Γρήγορες, απλές ιστοσελίδες για μικρές επιχειρήσεις στη Λεμεσό και σε όλη την Κύπρο — στα Ελληνικά ή στα Αγγλικά, με chat που απαντά από την πρώτη μέρα.",
  alternates: {
    canonical: "/el/website-build",
    languages: {
      en: "/website-build",
      el: "/el/website-build",
      "x-default": "/website-build",
    },
  },
  openGraph: {
    title: "Κατασκευή ιστοσελίδας στη Λεμεσό — Flowstack",
    url: "/el/website-build",
    description:
      "Γρήγορες, απλές ιστοσελίδες με chat που απαντά από την πρώτη μέρα. Προσφορά μετά από ένα δωρεάν 30λεπτο τηλεφώνημα.",
  },
};

const steps = [
  {
    ref: "WB-01",
    title: "Μας λέτε τι θέλετε",
    body: "Μισή ώρα: τι πουλάτε, σε ποιον απευθύνεστε, και η γλώσσα — Ελληνικά, Αγγλικά, ή και τα δύο. Φέρτε το παλιό σας site ή τίποτα απολύτως.",
  },
  {
    ref: "WB-02",
    title: "Το σχεδιάζουμε και το γράφουμε",
    body: "Τα δικά σας λόγια, δουλεμένα από εμάς, σε σελίδες φτιαγμένες πρώτα για κινητό. Εγκρίνετε κάθε σελίδα πριν δημοσιευτεί οτιδήποτε.",
  },
  {
    ref: "WB-03",
    title: "Το χτίζουμε και ανάβουμε το chat",
    body: "Γρήγορο, έτοιμο για κινητά, στο δικό σας domain. Το chat μπαίνει μαζί του — εκπαιδευμένο στη δική σας γνώση, απαντά από την πρώτη μέρα.",
  },
  {
    ref: "WB-04",
    title: "Όλα σας ανήκουν",
    body: "Domain, κώδικας, περιεχόμενο — δικά σας. Το ενημερώνετε μόνοι σας, ή το προσέχουμε εμείς με τη συνεχή υποστήριξη.",
  },
] as const;

export default function WebsiteBuildElPage() {
  return (
    <div lang="el">
      <PageHero
        eyebrow="Κατασκευή ιστοσελίδας"
        eyebrowTint="violet"
        title={
          <>
            Μια γρήγορη, απλή ιστοσελίδα —{" "}
            <span className="text-gradient">
              με το chat πάνω της από την πρώτη μέρα.
            </span>
          </>
        }
        lead="Ιστοσελίδες για μικρές επιχειρήσεις στη Λεμεσό και σε όλη την Κύπρο. Στα Ελληνικά, στα Αγγλικά, ή και στα δύο."
        ctas={[
          { href: "/audit", label: "Κλείστε το δωρεάν ραντεβού →", variant: "primary" },
        ]}
      />

      <Tldr
        rows={[
          {
            k: "Τι είναι",
            v: "Ένα γρήγορο, απλό site — οι σελίδες σας, τα λόγια σας, έτοιμο για κινητά, στο δικό σας domain.",
          },
          {
            k: "Τι το κάνει διαφορετικό",
            v: "Έρχεται με το chat εγκατεστημένο, εκπαιδευμένο στη δική σας γνώση. Το site σας απαντά όσο κοιμάστε.",
          },
          {
            k: "Τι κοστίζει",
            v: "Προσφορά μετά από ένα δωρεάν 30λεπτο τηλεφώνημα. Σταθερή τιμή πριν ξεκινήσουμε — και όλα σας ανήκουν.",
          },
        ]}
      />

      <section className="relative isolate overflow-hidden pb-16">
        <SectionWatermark text="SITE" />
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
                Τι περιλαμβάνει.
              </h2>
              <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                Ένα site παρουσίασης — μέχρι περίπου έξι σελίδες. Ποιοι
                είστε, τι κάνετε, πώς σας βρίσκουν, και ένα chat που απαντά
                στα υπόλοιπα.
              </p>
              <p className="bp-annot normal-case mt-1">
                E-shop, σύστημα κρατήσεων, ή κάτι ειδικό; Πάλι εμείς — με
                δική του προσφορά, μετά το ίδιο δωρεάν τηλεφώνημα.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Τι δεν θα κάνουμε.
              </h2>
              <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                Να κρατήσουμε το domain σας. Να κλειδώσουμε το περιεχόμενό
                σας. Να εξαφανιστούμε μετά το launch. Ό,τι παραδίδουμε είναι
                δικό σας — και ο κώδικας.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line max-w-[860px] border-l-2 pl-6 sm:pl-8">
            <span className="bp-ref text-violet">γιατί μετράει το chat</span>
            <p className="text-ink-dim mt-4 max-w-[62ch] leading-[1.6]">
              Τα περισσότερα sites μικρών επιχειρήσεων διαβάζονται και
              κλείνουν. Το δικό σας έρχεται με chat εκπαιδευμένο στη γνώση
              σας — απαντά σε ερωτήσεις, αξιολογεί επισκέπτες, και σας
              παραδίδει τα leads. Στα Ελληνικά και στα Αγγλικά, αυτόματα.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-col items-start gap-5 border-t pt-10">
            <p className="text-ink-dim max-w-[52ch] leading-[1.6]">
              Προσφορά μετά από ένα δωρεάν 30λεπτο τηλεφώνημα.{" "}
              <span className="text-ink font-semibold">
                Σταθερή τιμή πριν ξεκινήσουμε — και ο κώδικας δικός σας.
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/audit" className={ctaClass()}>
                Κλείστε το ραντεβού →
              </Link>
              <Link
                href="/website-build"
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
