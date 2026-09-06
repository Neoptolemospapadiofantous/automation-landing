import type { Metadata } from "next";
import { EL_OG_IMAGES } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";
import { dashboardUrl, registerUrl } from "@/lib/dashboard";

/**
 * /el/suite — the Greek twin of /suite: the app, module by module.
 *
 * The honesty rule travels with the translation: everything under
 * «Ζωντανά σήμερα» is verifiable against the dashboard, and everything
 * else says «Δεν είναι ακόμη διαθέσιμο» in those words — a coming
 * module is listed so a visitor can REQUEST it, never as a promise.
 * Module list mirrors the EN page; change one, change both.
 */
export const metadata: Metadata = {
  title: "Τι κάνει το Flowstack app, λειτουργία προς λειτουργία",
  description:
    "Chat, βάση γνώσης, καταγραφή leads, live ανάληψη, αναλυτικά — ζωντανά σήμερα. Κρατήσεις, WhatsApp, email — όχι ακόμη· τα ζητάτε από το dashboard σας.",
  alternates: {
    canonical: "/el/suite",
    languages: {
      en: "/suite",
      el: "/el/suite",
      "x-default": "/suite",
    },
  },
  openGraph: {
    images: EL_OG_IMAGES,
    title: "Τι κάνει το Flowstack app — Flowstack",
    url: "/el/suite",
    description:
      "Τι είναι ζωντανό στο app σήμερα, τι δεν είναι ακόμη διαθέσιμο, και πού το ζητάτε.",
  },
  // The root layout's Twitter card is English; without this a Greek
  // page shares in the wrong language on X while OG is already Greek.
  twitter: {
    images: EL_OG_IMAGES,
    title: "Τι κάνει το Flowstack app — Flowstack",
    description:
      "Τι είναι ζωντανό στο app σήμερα, τι δεν είναι ακόμη διαθέσιμο, και πού το ζητάτε.",
  },
};

const live = [
  {
    name: "Chat ιστοσελίδας",
    body: "Απαντά στους επισκέπτες από το δικό σας υλικό, στη γλώσσα τους — στο site σας και σε φιλοξενούμενη σελίδα chat.",
  },
  {
    name: "Βάση γνώσης",
    body: "Ανεβάζετε έγγραφα και σελίδες· το chat απαντά από αυτά και δείχνει από πού ήρθε η απάντηση.",
  },
  {
    name: "Καταγραφή & βαθμολόγηση leads",
    body: "Κάθε συζήτηση με όνομα ή email φτάνει στον πίνακά σας, βαθμολογημένη, με την απομαγνητοφώνηση μαζί.",
  },
  {
    name: "Live ανάληψη",
    body: "Μπαίνετε σε όποια συζήτηση θέλετε ως εσείς. Ο επισκέπτης βλέπει άνθρωπο· το chat περιμένει μέχρι να του ξαναδώσετε.",
  },
  {
    name: "Αναλυτικά & η σύνοψη της Δευτέρας",
    body: "Συζητήσεις, leads και ποσοστό καταγραφής ανά agent, και μία σύνοψη στο inbox σας κάθε Δευτέρα.",
  },
  {
    name: "Το δικό σας κλειδί μηχανής",
    body: "Από το Growth και πάνω, τα προηγμένα μοντέλα τρέχουν στο δικό σας κλειδί OpenAI, Anthropic ή Google — χωρίς πιστώσεις.",
  },
] as const;

const coming = [
  {
    name: "Κρατήσεις & ραντεβού",
    body: "Το chat κοιτάζει το ημερολόγιό σας, κλείνει τη θέση, στέλνει επιβεβαίωση και υπενθύμιση.",
  },
  {
    name: "Κανάλι WhatsApp",
    body: "Ο ίδιος agent στο WhatsApp Business νούμερό σας, απομαγνητοφώνηση στον ίδιο πίνακα.",
  },
  {
    name: "Μηνύματα από inbox & portals",
    body: "Ερωτήματα που φτάνουν με email — booking portals, καταχωρίσεις, η φόρμα σας — δρομολογημένα στον agent.",
  },
  {
    name: "Αυτοματοποίηση email",
    body: "Follow-up, υπενθυμίσεις και επανενεργοποίηση σε όσους σας ξέρουν ήδη, από τη δική σας διεύθυνση.",
  },
  {
    name: "Μία ζωντανή εικόνα",
    body: "Οι αριθμοί σας από τα εργαλεία που είναι σκορπισμένοι, σε ένα dashboard που ανανεώνεται μόνο του.",
  },
] as const;

export default function SuiteElPage() {
  return (
    <div lang="el">
      <PageHero
        eyebrow="Το app"
        eyebrowTint="violet"
        title={
          <>
            Τι κάνει το app —{" "}
            <span className="text-gradient">λειτουργία προς λειτουργία.</span>
          </>
        }
        lead="Το chat που τρέχετε μόνοι σας. Δωρεάν για αρχή, ζωντανό σε περίπου ένα λεπτό, €9 έως €39 τον μήνα μετά. Τι έχει σήμερα, και τι όχι ακόμη."
        ctas={[
          { href: registerUrl(), label: "Ξεκινήστε δωρεάν →", variant: "primary" },
          { href: "/el/pricing", label: "Δείτε τα πλάνα", variant: "secondary" },
        ]}
      />

      <Tldr
        rows={[
          {
            k: "Ζωντανά σήμερα",
            v: "Chat ιστοσελίδας, βάση γνώσης, καταγραφή και βαθμολόγηση leads, live ανάληψη, αναλυτικά, το δικό σας κλειδί μηχανής.",
          },
          {
            k: "Όχι ακόμη",
            v: "Κρατήσεις, WhatsApp, μηνύματα inbox, αυτοματοποίηση email, μία ζωντανή εικόνα. Τα ζητάτε από το dashboard σας — χτίζουμε με τη σειρά που ζητιούνται.",
          },
          {
            k: "Το θέλετε τώρα",
            v: (
              <>
                Το{" "}
                <Link
                  href="/el/studio"
                  hrefLang="el"
                  className="text-ink inline-block py-1.5 underline underline-offset-4"
                >
                  Studio
                </Link>{" "}
                σας τα στήνει όλα — με ξεχωριστή προσφορά και τιμολόγηση.
              </>
            ),
          },
        ]}
      />

      <section className="relative isolate overflow-hidden pb-16">
        <SectionWatermark text="LIVE" />
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-8 flex flex-col gap-3">
            <span className="bp-ref text-violet">ζωντανά τώρα · σε κάθε πλάνο εκτός αν λέει αλλιώς</span>
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Στο app σήμερα.
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-px border bg-border-line border-border-line sm:grid-cols-2 lg:grid-cols-3">
            {live.map((m) => (
              <li key={m.name} className="bg-bg flex flex-col gap-3 px-7 py-8">
                <h3 className="text-ink text-lg font-semibold tracking-[-0.02em]">
                  {m.name}
                </h3>
                <p className="text-ink-dim max-w-[40ch] leading-[1.6]">{m.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NOT AVAILABLE, in those words. The only action is to ask for it. */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line mb-8 flex flex-col gap-3 border-t pt-10">
            <span className="bp-ref text-violet">δεν είναι ακόμη διαθέσιμο · ζητήστε το</span>
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Όχι ακόμη στο app.
            </h2>
            <p className="text-ink-dim max-w-[52ch] leading-[1.6]">
              Κανένα από αυτά δεν δουλεύει σήμερα. Συνδεθείτε, ανοίξτε το{" "}
              <a
                href={dashboardUrl("/suite")}
                className="text-ink inline-block py-1.5 underline underline-offset-4"
              >
                Suite
              </a>{" "}
              στο dashboard σας και πατήστε «Ζητήστε το» σε όσα χρειάζεστε —
              χτίζουμε με αυτή τη σειρά και σας ειδοποιούμε όταν το δικό σας
              είναι έτοιμο.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-px border bg-border-line border-border-line sm:grid-cols-2 lg:grid-cols-3">
            {coming.map((m) => (
              <li key={m.name} className="bg-bg-elev flex flex-col gap-3 px-7 py-8">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-ink text-lg font-semibold tracking-[-0.02em]">
                    {m.name}
                  </h3>
                  <span className="bp-ref shrink-0">έρχεται</span>
                </div>
                <p className="text-ink-dim max-w-[40ch] leading-[1.6]">{m.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-col items-start gap-5 border-t pt-10">
            <p className="text-ink-dim max-w-[52ch] leading-[1.6]">
              Δωρεάν για αρχή, χωρίς κάρτα.{" "}
              <span className="text-ink font-semibold">
                Ζωντανό στο δικό σας site σε περίπου ένα λεπτό.
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href={registerUrl()} className={ctaClass()}>
                Ξεκινήστε δωρεάν →
              </a>
              <Link href="/el/studio" hrefLang="el" className={ctaClass({ variant: "ghost" })}>
                Ή να το στήσει το Studio
              </Link>
              <Link
                href="/suite"
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
