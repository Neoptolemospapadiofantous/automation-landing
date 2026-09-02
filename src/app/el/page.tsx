import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";

/**
 * /el — the Greek homepage.
 *
 * A condensed twin of the English one: hero → TL;DR → the four verbs →
 * the twelve-service catalogue → pricing line → commit. The animated
 * EN sections (Hero, Ticker, Proof, Pipeline…) carry hardwired English
 * copy, so this page states the same argument in Greek with the shared
 * primitives (PageHero, Tldr) and the same grid language.
 *
 * Catalogue names AND ORDER mirror buildCatalogue / SERVICES_EL.html —
 * the Greek names come from the Greek sales sheet, so a prospect who
 * got the PDF and a prospect who found the page read the same words.
 * Unpriced throughout, same as everywhere.
 */
export const metadata: Metadata = {
  title: "Ιστοσελίδες, chat, αυτοματισμοί & dashboards",
  description:
    "Κατασκευάζουμε την ιστοσελίδα ή το dashboard σας, βάζουμε chat που απαντά από τη δική σας γνώση, αυτοματοποιούμε email και γραφειοκρατία, και βλέπετε τους αριθμούς σας ζωντανά.",
  alternates: {
    canonical: "/el",
    languages: {
      en: "/",
      el: "/el",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Flowstack — Ιστοσελίδες, chat, αυτοματισμοί & dashboards",
    url: "/el",
    description:
      "Studio στη Λεμεσό: ιστοσελίδες, chat εκπαιδευμένο στη γνώση σας, αυτοματισμοί και ζωντανά dashboards. Το chat ξεκινά δωρεάν.",
  },
  // The root layout's Twitter card is English; without this a Greek
  // page shares in the wrong language on X while OG is already Greek.
  twitter: {
    title: "Flowstack — Ιστοσελίδες, chat, αυτοματισμοί & dashboards",
    description:
      "Studio στη Λεμεσό: ιστοσελίδες, chat εκπαιδευμένο στη γνώση σας, αυτοματισμοί και ζωντανά dashboards. Το chat ξεκινά δωρεάν.",
  },
};

const verbs = [
  {
    name: "Χτιζουμε",
    how: "Το φτιάχνουμε εμείς · με προσφορά",
    desc: "Την ιστοσελίδα, το dashboard, ή το εσωτερικό εργαλείο που όλο λέτε να φτιάξετε.",
    href: "/el/website-build",
    cue: "Κατασκευή ιστοσελίδας",
  },
  {
    name: "Απανταμε",
    how: "Το στήνετε μόνοι σας · από €0",
    desc: "Chat στο site σας, εκπαιδευμένο στη δική σας γνώση. Απαντά, αξιολογεί, και σας παραδίδει τα leads.",
    href: "/el/pricing",
    cue: "Δείτε τα πλάνα",
  },
  {
    name: "Αυτοματοποιουμε",
    how: "Το τρέχουμε για εσάς · με προσφορά",
    desc: "Email, follow-up, cold outreach, τιμολόγια, εισερχόμενα — η δουλειά που επαναλαμβάνεται.",
    href: "/el/outreach",
    cue: "Πώς δουλεύει το outreach",
  },
  {
    name: "Μετραμε",
    how: "Το φτιάχνουμε για εσάς · με προσφορά",
    desc: "Οι αριθμοί σας, από σκόρπια εργαλεία σε ένα ζωντανό dashboard — και τα πειράματα που τους ανεβάζουν.",
    href: "/what-works",
    // No Greek twin yet, so say so rather than dropping a Greek reader
    // onto an English page with no warning.
    cue: "Πώς δουλεύει ο κύκλος · EN",
  },
] as const;

/* Names + order mirror buildCatalogue (content.ts) / SERVICES_EL.html. */
const catalogue = [
  {
    name: "Έναρξη λειτουργίας agent",
    desc: "Φορτώνουμε τη γνώση σας, ρυθμίζουμε τη φωνή, και το εγκαθιστούμε στο site σας.",
  },
  {
    name: "Κατασκευή ιστοσελίδας",
    href: "/el/website-build",
    desc: "Χωρίς site, ή με παλιό; Το φτιάχνουμε — με το chat πάνω του από την πρώτη μέρα.",
  },
  {
    name: "Cold outreach",
    href: "/el/outreach",
    desc: "Η δική σας διεύθυνση, ελεγμένη λίστα, email γραμμένα στη φωνή σας.",
  },
  {
    name: "Αυτοματοποίηση email",
    desc: "Follow-up, υπενθυμίσεις και απαντήσεις που στέλνονται μόνες τους, στη φωνή σας.",
  },
  {
    name: "Ραντεβού & κρατήσεις",
    desc: "Κράτηση, επιβεβαίωση και υπενθύμιση. Χωρίς κυνήγι στο τηλέφωνο.",
  },
  {
    name: "Τιμολόγια & έγγραφα",
    desc: "Τιμολόγια που εκδίδονται, στέλνονται και κυνηγιούνται. Το follow-up τρέχει μόνο του.",
  },
  {
    name: "Ταξινόμηση εισερχομένων",
    desc: "Τα εισερχόμενα ταξινομούνται και δρομολογούνται αυτόματα.",
  },
  {
    name: "Σύνδεση των εργαλείων σας",
    desc: "CRM, φύλλα και inbox σταματούν να θέλουν το ίδιο πράγμα δύο φορές.",
  },
  {
    name: "Μία ζωντανή εικόνα",
    href: "/what-works",
    desc: "Οι αριθμοί που φτιάχνετε με το χέρι, σε ένα ζωντανό dashboard.",
  },
  {
    name: "Συνεχής φροντίδα",
    desc: "Προσέχουμε ό,τι φτιάξαμε και το διορθώνουμε πριν το προσέξετε.",
  },
  {
    name: "Κάτι άλλο",
    desc: "Γίνεται με το χέρι, κάθε εβδομάδα, για πάντα; Ρωτήστε μας. Τα περισσότερα αυτοματοποιούνται.",
  },
  {
    name: "Όλα, από άκρη σε άκρη",
    href: "/audit",
    desc: "Ιστοσελίδα, chat, αυτοματισμοί, outreach, ένα dashboard. Μία ομάδα, μία προσφορά.",
  },
] as const;

export default function HomeElPage() {
  return (
    <div lang="el">
      <PageHero
        eyebrow="Flowstack Studio · Λεμεσός"
        eyebrowTint="violet"
        title={
          <>
            Χτίζουμε το site, απαντά το chat, τρέχουν οι αυτοματισμοί —{" "}
            <span className="text-gradient">
              και βλέπετε τους αριθμούς ζωντανά.
            </span>
          </>
        }
        lead="Ιστοσελίδες, chat εκπαιδευμένο στη δική σας γνώση, αυτοματισμοί και dashboards — για επιχειρήσεις στη Λεμεσό και σε όλη την Κύπρο."
        ctas={[
          { href: "/audit", label: "Κλείστε το δωρεάν ραντεβού →", variant: "primary" },
          { href: "/el/pricing", label: "Δείτε τις τιμές", variant: "secondary" },
        ]}
      />

      <Tldr
        rows={[
          {
            k: "Τι κάνουμε",
            v: "Κατασκευάζουμε την ιστοσελίδα ή το dashboard σας, βάζουμε chat που απαντά από τη δική σας γνώση, αυτοματοποιούμε τα email και τη γραφειοκρατία, και μαζεύουμε τους αριθμούς σας σε μία ζωντανή εικόνα.",
          },
          {
            k: "Τι κοστίζει",
            v: "Το chat ξεκινά δωρεάν, μετά €9 έως €39 τον μήνα. Ό,τι κατασκευάζουμε για εσάς τιμολογείται πρώτα, με σταθερή τιμή.",
          },
          {
            k: "Πώς ξεκινάτε",
            v: "Βάλτε το chat στο site σας σε ένα λεπτό, ή κλείστε ένα δωρεάν 30λεπτο τηλεφώνημα.",
          },
        ]}
      />

      {/* The four verbs — same cells as ServiceLines, in Greek. */}
      <section className="relative pt-4">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-wrap items-end justify-between gap-4 border-b pb-5">
            <div>
              <span className="bp-ref">τι κάνουμε</span>
              <h2 className="text-ink mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Τέσσερα πράγματα, από άκρη σε άκρη. Μία ομάδα.
              </h2>
            </div>
            <p className="bp-annot normal-case">
              Πάρτε ένα, ή δώστε μας τα όλα.
            </p>
          </div>

          <div className="border-border-line mt-px grid grid-cols-1 gap-px bg-border-line sm:grid-cols-2 lg:grid-cols-4">
            {verbs.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                hrefLang={l.href.startsWith("/el") ? "el" : "en"}
                className="bg-bg lift-hover group flex flex-col gap-3 px-6 py-8"
              >
                <span className="text-ink flex items-center gap-2.5 font-mono text-[12px] tracking-[0.12em] uppercase">
                  <span className="bp-dot shrink-0" aria-hidden />
                  {l.name}
                </span>
                <span className="bp-annot normal-case text-violet">{l.how}</span>
                <p className="text-ink-dim max-w-[34ch] leading-[1.55]">
                  {l.desc}
                </p>
                <span className="bp-annot normal-case mt-auto flex items-center gap-2 pt-2">
                  {l.cue}
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

      {/* The twelve services — B-01..B-12, mirroring the priced sheet. */}
      <section className="relative isolate overflow-hidden pt-16 pb-16">
        <SectionWatermark text="MENU" />
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-wrap items-end justify-between gap-4 border-b pb-5">
            <div>
              <span className="bp-ref">τι κατασκευάζουμε</span>
              <h2 className="text-ink mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Ό,τι κάνετε με το χέρι, το αυτοματοποιούμε.
              </h2>
            </div>
            <p className="bp-annot normal-case">
              Με προσφορά μετά το δωρεάν ραντεβού — ποτέ τιμοκατάλογος.
            </p>
          </div>

          <ul className="border-border-line mt-px grid grid-cols-1 gap-px bg-border-line sm:grid-cols-2">
            {catalogue.map((item, i) => {
              const ref = `B-${String(i + 1).padStart(2, "0")}`;
              const inner = (
                <>
                  <span className="bp-ref text-ink-mute">{ref}</span>
                  <h3 className="text-ink mt-2 text-lg font-semibold tracking-[-0.02em]">
                    {item.name}
                  </h3>
                  <p className="text-ink-dim mt-2 max-w-[52ch] leading-[1.55]">
                    {item.desc}
                  </p>
                </>
              );
              return (
                <li key={item.name} className="bg-bg">
                  {"href" in item ? (
                    <Link
                      href={item.href}
                      hrefLang={item.href.startsWith("/el") ? "el" : "en"}
                      className="lift-hover group flex h-full flex-col px-6 py-7"
                    >
                      {inner}
                      <span className="bp-annot normal-case mt-auto flex items-center gap-2 pt-3">
                        Περισσότερα
                        <span
                          aria-hidden
                          className="text-violet transition-transform group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <div className="flex h-full flex-col px-6 py-7">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Pricing line + commit. */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-col items-start gap-5 border-t pt-10">
            <p className="text-ink-dim max-w-[56ch] leading-[1.6]">
              Το chat ξεκινά δωρεάν — €9 έως €39 τον μήνα όταν μεγαλώσετε.
              Οι κατασκευές τιμολογούνται με προσφορά, με σταθερή τιμή πριν
              ξεκινήσουμε.{" "}
              <span className="text-ink font-semibold">
                Χωρίς δεσμεύσεις, και ο κώδικας δικός σας.
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/audit" className={ctaClass()}>
                Κλείστε το δωρεάν ραντεβού →
              </Link>
              <Link
                href="/el/pricing"
                className={ctaClass({ variant: "ghost" })}
              >
                Δείτε τις τιμές
              </Link>
              <Link
                href="/"
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
