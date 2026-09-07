import type { Metadata } from "next";
import { EL_OG_IMAGES } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";

/**
 * /el/studio — the Greek twin of /studio, the done-for-you line.
 *
 * Greek names, logged in §3.4: the Leak Report is «Αναφορά Διαρροής»,
 * the packages are «Κανένα Μήνυμα Αναπάντητο» and «Γεμάτο Ημερολόγιο».
 * "Studio" and "app" stay Latin — line names, not prose.
 *
 * Owns the Greek acquisition query family («προσέλκυση πελατών») —
 * distinct from /el/outreach, which owns «εύρεση πελατών με cold
 * email». Unpriced; every path ends at the audit. The «Γιατί εμείς»
 * band is the AQ-03 edge in four lines — the stack, not a feature.
 */
export const metadata: Metadata = {
  title: "Προσέλκυση πελατών — όλα από εμάς",
  description:
    "Βρίσκουμε πού χάνετε πελάτες, το διορθώνουμε, και το παρακολουθούμε να τρέχει. Ξεκινά με μία δωρεάν Αναφορά Διαρροής μίας σελίδας. Λεμεσός και όλη η Κύπρος.",
  alternates: {
    canonical: "/el/studio",
    languages: {
      en: "/studio",
      el: "/el/studio",
      "x-default": "/studio",
    },
  },
  openGraph: {
    images: EL_OG_IMAGES,
    title: "Προσέλκυση πελατών — Flowstack Studio",
    url: "/el/studio",
    description:
      "Βρίσκουμε πού χάνετε πελάτες, το διορθώνουμε, και το παρακολουθούμε να τρέχει. Ξεκινά με μία δωρεάν Αναφορά Διαρροής.",
  },
  // The root layout's Twitter card is English; without this a Greek
  // page shares in the wrong language on X while OG is already Greek.
  twitter: {
    images: EL_OG_IMAGES,
    title: "Προσέλκυση πελατών — Flowstack Studio",
    description:
      "Βρίσκουμε πού χάνετε πελάτες, το διορθώνουμε, και το παρακολουθούμε να τρέχει. Ξεκινά με μία δωρεάν Αναφορά Διαρροής.",
  },
};

const leak = [
  {
    ref: "SD-01",
    title: "Μας δίνετε μία εβδομάδα πρόσβαση",
    body: "Το site σας, οι καταχωρίσεις σας, τα μηνύματα που φτάνουν. Μόνο ανάγνωση, με τη συγκατάθεσή σας, χωρίς καμία εγκατάσταση.",
  },
  {
    ref: "SD-02",
    title: "Μετράμε πού χάνονται πελάτες",
    body: "Πόσο γρήγορα απαντιούνται τα μηνύματα. Πόσα δεν απαντιούνται ποτέ. Ποιες γλώσσες και ώρες βρίσκουν κανέναν εκεί.",
  },
  {
    ref: "SD-03",
    title: "Παίρνετε μία σελίδα",
    body: "Οι αριθμοί σας από πάνω, τρεις διορθώσεις από κάτω, με σειρά κόστους. Σε πέντε εργάσιμες.",
  },
  {
    ref: "SD-04",
    title: "Μιλάμε για τριάντα λεπτά",
    body: "Ελληνικά ή αγγλικά. Μετά, γραπτή τιμή σε 48 ώρες — δική σας, είτε μας προσλάβετε είτε όχι.",
  },
] as const;

const packages = [
  {
    name: "Κανένα Μήνυμα Αναπάντητο",
    promise:
      "Κάθε μήνυμα — site, WhatsApp, email — απαντημένο σε λιγότερο από ένα λεπτό, στη γλώσσα του επισκέπτη, με την κράτηση κλεισμένη.",
    includes: [
      "Το chat στο site σας, ζωντανό από την πρώτη μέρα, εκπαιδευμένο στο υλικό σας",
      "WhatsApp και email στο ίδιο σύστημα, ίδιος πίνακας",
      "Κράτηση στο ημερολόγιό σας, με επιβεβαίωση και υπενθύμιση",
      "Έτοιμες απαντήσεις για τις είκοσι ερωτήσεις που ακούτε κάθε μέρα",
      "Εβδομαδιαία αναφορά μίας γραμμής: μηνύματα, απαντήσεις, κρατήσεις",
      "Φροντίδα — το παρακολουθούμε, το διορθώνουμε, το βελτιώνουμε κάθε μήνα",
    ],
    who: "Ενοικιάσεις αυτοκινήτων, ξενοδοχεία και βίλες, χώροι εκδηλώσεων, στούντιο, κλινικές — όποιος έχει πελάτη που ρωτάει στις 23:40.",
  },
  {
    name: "Γεμάτο Ημερολόγιο",
    promise:
      "Όλα τα παραπάνω — και πηγαίνουμε να βρούμε εμείς τους πελάτες, αλλάζοντας κάθε μήνα ό,τι λένε οι αριθμοί.",
    includes: [
      "Όλα όσα έχει το Κανένα Μήνυμα Αναπάντητο",
      "Cold outreach από δικό σας domain αποστολής: λίστα χτισμένη και ελεγμένη, email στη φωνή σας",
      "Αυτοματοποίηση email σε όσους σας ξέρουν ήδη: follow-up, υπενθυμίσεις, επανενεργοποίηση",
      "Μία ζωντανή εικόνα — οι αριθμοί σας σε ένα dashboard που ανανεώνεται μόνο του",
      "Managed — μηνιαία αναφορά για το τι ήρθε και τι απέδωσε, και οι αλλαγές που έγιναν εξαιτίας της",
    ],
    who: "Οι ίδιες επιχειρήσεις όταν το πρώτο πακέτο έχει αποδώσει — και κάθε εταιρεία που ο επόμενος πελάτης της είναι ένα email μακριά.",
  },
] as const;

const edge = [
  "Ό,τι πουλάμε το τρέχουμε πρώτα στη δική μας επιχείρηση — έτσι βρήκαμε κι εσάς.",
  "Ολόκληρο το κύκλωμα, όχι ένα widget: chat, outreach, κρατήσεις, ένα dashboard.",
  "Κάθε μήνα κάτι αλλάζει με βάση τους αριθμούς. Σκέτο λογισμικό δεν το υπόσχεται αυτό.",
  "Ελληνικά και αγγλικά, στην ώρα της Κύπρου. Το μήνυμα των 23:40 απαντιέται στις 23:40.",
] as const;

export default function StudioElPage() {
  return (
    <div lang="el">
      <PageHero
        eyebrow="Το Studio"
        eyebrowTint="violet"
        title={
          <>
            Προσέλκυση πελατών,{" "}
            <span className="text-gradient">όλα από εμάς.</span>
          </>
        }
        lead="Βρίσκουμε πού χάνει πελάτες η επιχείρησή σας, το διορθώνουμε, και το παρακολουθούμε να τρέχει. Στη Λεμεσό και σε όλη την Κύπρο. Ξεκινά με μία δωρεάν αναφορά μίας σελίδας."
        ctas={[
          {
            href: "/el/audit",
            label: "Δωρεάν Αναφορά Διαρροής →",
            variant: "primary",
          },
        ]}
      />

      <Tldr
        rows={[
          {
            k: "Τι είναι",
            v: "Η πλευρά του Flowstack που την κάνουμε εμείς: το στήνουμε, το εγκαθιστούμε και το παρακολουθούμε — δεν ανοίγετε ποτέ σελίδα ρυθμίσεων.",
          },
          {
            k: "Τι δεν είναι",
            v: (
              <>
                Το app. Το chat που τρέχετε μόνοι σας είναι ξεχωριστή συνδρομή στα{" "}
                <Link
                  href="/el/pricing"
                  hrefLang="el"
                  className="text-ink inline-block py-1.5 underline underline-offset-4"
                >
                  €0 έως €39 τον μήνα
                </Link>
                . Η δουλειά του Studio τιμολογείται χωριστά.
              </>
            ),
          },
          {
            k: "Τι κοστίζει",
            v: "Προσφορά μετά τη δωρεάν Αναφορά Διαρροής. Σταθερή τιμή πριν ξεκινήσουμε — και ό,τι χτίζουμε σας ανήκει.",
          },
        ]}
      />

      {/* The trial is a result, not a login — same SD-01..04 refs. */}
      <section className="relative isolate overflow-hidden pb-16">
        <SectionWatermark text="LEAK" />
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-8 flex flex-col gap-3">
            <span className="bp-ref text-violet">δωρεάν · πέντε εργάσιμες</span>
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Ξεκινήστε με την Αναφορά Διαρροής.
            </h2>
            <p className="text-ink-dim max-w-[52ch] leading-[1.6]">
              Μία σελίδα για το πού χάνετε πελάτες αυτόν τον μήνα. Δωρεάν,
              χωρίς καμία εγκατάσταση, και δική σας ό,τι κι αν αποφασίσετε.
            </p>
          </div>
          <ol className="grid grid-cols-1 gap-px border bg-border-line border-border-line sm:grid-cols-2">
            {leak.map((s) => (
              <li key={s.ref} className="bg-bg flex flex-col gap-3 px-7 py-9">
                <span className="bp-ref text-violet">{s.ref}</span>
                <h3 className="text-ink text-xl font-semibold tracking-[-0.02em]">
                  {s.title}
                </h3>
                <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Two packages, named by the outcome. No prices. */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line mb-8 flex flex-col gap-3 border-t pt-10">
            <span className="bp-ref text-violet">μετά, ένα από τα δύο</span>
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Δύο πακέτα. Αγοράζετε το αποτέλεσμα, όχι τα κομμάτια.
            </h2>
            <p className="text-ink-dim max-w-[52ch] leading-[1.6]">
              Το καθένα είναι ένα στήσιμο που ξέρουμε να τρέχουμε. Πρόσθετα —
              ιστοσελίδα, τιμολόγια, ταξινόμηση εισερχομένων — έρχονται μετά,
              ποτέ αντί.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px border bg-border-line border-border-line lg:grid-cols-2">
            {packages.map((p) => (
              <article key={p.name} className="bg-bg flex flex-col gap-5 px-7 py-9">
                <div className="flex flex-col gap-2">
                  <h3 className="text-ink text-2xl font-semibold tracking-[-0.03em]">
                    {p.name}
                  </h3>
                  <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                    {p.promise}
                  </p>
                </div>
                <ul className="text-ink-dim flex flex-col gap-2 leading-[1.5]">
                  {p.includes.map((line) => (
                    <li key={line} className="border-border-line border-l-2 pl-4">
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="bp-annot normal-case mt-auto pt-2">{p.who}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why us — the AQ-03 edge in four lines. The stack, not a feature. */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line mb-6 flex flex-col gap-3 border-t pt-10">
            <span className="bp-ref text-violet">γιατί εμείς</span>
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Οι άλλοι πουλούν λογισμικό. Εμείς το τρέχουμε.
            </h2>
          </div>
          <ul className="text-ink-dim flex max-w-[70ch] flex-col gap-3 leading-[1.6]">
            {edge.map((line) => (
              <li key={line} className="border-border-line border-l-2 pl-4">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The app is separate — say so where a reader might conflate them. */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line max-w-[860px] border-l-2 pl-6 sm:pl-8">
            <span className="bp-ref text-violet">πού ταιριάζει το app</span>
            <p className="text-ink-dim mt-4 max-w-[62ch] leading-[1.6]">
              Κάθε πελάτης του Studio τρέχει το ίδιο chat που μπορείτε να
              ξεκινήσετε μόνοι σας από τις{" "}
              <Link
                href="/el/pricing"
                hrefLang="el"
                className="text-ink inline-block py-1.5 underline underline-offset-4"
              >
                τιμές
              </Link>
              . Το εγκαθιστούμε και χτίζουμε γύρω του· η συνδρομή μένει δική
              σας. Τι κάνει το app μόνο του, λειτουργία προς λειτουργία:{" "}
              <Link
                href="/el/suite"
                hrefLang="el"
                className="text-ink inline-block py-1.5 underline underline-offset-4"
              >
                δείτε το Suite
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-col items-start gap-5 border-t pt-10">
            <p className="text-ink-dim max-w-[52ch] leading-[1.6]">
              Προσφορά μετά τη δωρεάν Αναφορά Διαρροής.{" "}
              <span className="text-ink font-semibold">
                Σταθερή τιμή πριν ξεκινήσουμε — και ό,τι χτίζουμε σας ανήκει.
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/el/audit" hrefLang="el" className={ctaClass()}>
                Δωρεάν Αναφορά Διαρροής →
              </Link>
              <Link
                href="/studio"
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
