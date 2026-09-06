import type { Metadata } from "next";
import { EL_OG_IMAGES } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";

/**
 * /el/email-automation — the Greek twin of /email-automation, seventh
 * EL page. Same argument in the same order, EM-01..04 refs shared with
 * the English page so both languages use one drawing set.
 *
 * The load-bearing line travels with the translation: this service
 * mails people the business ALREADY KNOWS, from its own address —
 * never a cold list — stated three times (TL;DR, what-we-won't-do,
 * the three-jobs band), exactly like the English page.
 *
 * Vocabulary is the Greek sales sheet's («Αυτοματοποίηση email»,
 * follow-up, όχληση τιμολογίων), so a prospect holding the PDF and one
 * reading the page meet the same words. Unpriced, per the standing rule.
 */
export const metadata: Metadata = {
  title: "Αυτοματοποίηση email για μικρές επιχειρήσεις",
  description:
    "Follow-up, υπενθυμίσεις και όχληση τιμολογίων που στέλνονται μόνα τους — από τη διεύθυνσή σας, στη φωνή σας. Προσφορά μετά από ένα δωρεάν τηλεφώνημα.",
  alternates: {
    canonical: "/el/email-automation",
    languages: {
      en: "/email-automation",
      el: "/el/email-automation",
      "x-default": "/email-automation",
    },
  },
  openGraph: {
    images: EL_OG_IMAGES,
    title: "Αυτοματοποίηση email — Flowstack",
    url: "/el/email-automation",
    description:
      "Τα email που ήδη χρωστάτε — follow-up, υπενθυμίσεις, όχληση τιμολογίων — σταλμένα μόνα τους, από τη δική σας διεύθυνση.",
  },
  // The root layout's Twitter card is English; without this a Greek
  // page shares in the wrong language on X while OG is already Greek.
  twitter: {
    images: EL_OG_IMAGES,
    title: "Αυτοματοποίηση email — Flowstack",
    description:
      "Τα email που ήδη χρωστάτε — follow-up, υπενθυμίσεις, όχληση τιμολογίων — σταλμένα μόνα τους, από τη δική σας διεύθυνση.",
  },
};

const steps = [
  {
    ref: "EM-01",
    title: "Μας δείχνετε τα email που στέλνετε με το χέρι",
    body: "Μισή ώρα: τα follow-up που ξεχνιούνται, οι υπενθυμίσεις που ξαναγράφετε κάθε εβδομάδα, τα τιμολόγια που κυνηγάτε τις Παρασκευές.",
  },
  {
    ref: "EM-02",
    title: "Τα γράφουμε στη φωνή σας",
    body: "Κάθε πρότυπο είναι δικά σας λόγια, δουλεμένα από εμάς. Εγκρίνετε το καθένα πριν σταλεί οτιδήποτε.",
  },
  {
    ref: "EM-03",
    title: "Τα συνδέουμε με τα εργαλεία σας",
    body: "Inbox, ημερολόγιο, τιμολόγηση. Το email φεύγει όταν συμβεί αυτό που το προκαλεί — όχι όταν το θυμηθείτε.",
  },
  {
    ref: "EM-04",
    title: "Το βλέπετε να τρέχει",
    body: "Κάθε αποστολή καταγράφεται. Παγώνετε όποια σειρά θέλετε, και οι απαντήσεις έρχονται στο δικό σας inbox, όπως πάντα.",
  },
] as const;

export default function EmailAutomationElPage() {
  return (
    <div lang="el">
      <PageHero
        eyebrow="Αυτοματοποίηση email"
        eyebrowTint="violet"
        title={
          <>
            Τα email που ήδη χρωστάτε —{" "}
            <span className="text-gradient">
              σταλμένα στην ώρα τους, κάθε φορά.
            </span>
          </>
        }
        lead="Follow-up, υπενθυμίσεις, αιτήματα για κριτικές και όχληση τιμολογίων — από τη δική σας διεύθυνση, στη φωνή σας. Για μικρές επιχειρήσεις στη Λεμεσό και σε όλη την Κύπρο."
        ctas={[
          { href: "/el/audit", label: "Κλείστε το ραντεβού →", variant: "primary" },
        ]}
      />

      <Tldr
        rows={[
          {
            k: "Τι είναι",
            v: "Follow-up, υπενθυμίσεις, απαντήσεις και όχληση τιμολογίων που στέλνονται μόνα τους — από τη δική σας διεύθυνση, στη φωνή σας.",
          },
          {
            k: "Τι δεν είναι",
            v: "Cold email. Εδώ γράφουμε σε ανθρώπους που σας ξέρουν ήδη. Η εύρεση νέων πελατών είναι δική της υπηρεσία — το cold outreach.",
          },
          {
            k: "Τι κοστίζει",
            v: "Προσφορά μετά από ένα δωρεάν 30λεπτο τηλεφώνημα. Σταθερή τιμή πριν ξεκινήσουμε — και κάθε πρότυπο σας ανήκει.",
          },
        ]}
      />

      {/* How it runs — same four beats and refs as the English page. */}
      <section className="relative isolate overflow-hidden pb-16">
        <SectionWatermark text="MAIL" />
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

      {/* Scope — the not-a-cold-list line, in the same two columns. */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line grid grid-cols-1 gap-8 border-t pt-10 lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-col gap-4">
              <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Τι καλύπτει.
              </h2>
              <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                Τα email που η επιχείρησή σας ήδη χρωστάει: επιβεβαιώσεις και
                υπενθυμίσεις κρατήσεων, follow-up μετά από μια δουλειά,
                αιτήματα για κριτικές, όχληση τιμολογίων, απαντήσεις στις
                φόρμες του site σας.
              </p>
              <p className="bp-annot normal-case mt-1">
                Θέλετε νέους πελάτες; Αυτό είναι το{" "}
                <Link
                  href="/el/outreach"
                  hrefLang="el"
                  className="text-ink inline-block py-1.5 underline underline-offset-4"
                >
                  cold outreach
                </Link>{" "}
                — δική του υπηρεσία, μετά το ίδιο δωρεάν τηλεφώνημα.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Τι δεν θα κάνουμε.
              </h2>
              <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                Να αγοράσουμε λίστα. Να γράψουμε σε αγνώστους. Να στείλουμε
                λέξη που δεν έχετε εγκρίνει. Η διεύθυνση που στέλνει είναι η
                δική σας — η φήμη της μένει καθαρή, και κάθε μήνυμα είναι ένα
                που θα στέλνατε κι εσείς.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where this fits — email's three jobs, same honest map. */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line max-w-[860px] border-l-2 pl-6 sm:pl-8">
            <span className="bp-ref text-violet">πού ταιριάζει</span>
            <p className="text-ink-dim mt-4 max-w-[62ch] leading-[1.6]">
              Το email έχει τρεις δουλειές. Το{" "}
              <Link
                href="/el/outreach"
                hrefLang="el"
                className="text-ink inline-block py-1.5 underline underline-offset-4"
              >
                cold outreach
              </Link>{" "}
              γράφει σε αγνώστους που σας ταιριάζουν. Η ταξινόμηση
              εισερχομένων τακτοποιεί ό,τι φτάνει. Αυτή είναι η τρίτη: τα
              email που ήδη χρωστάτε, σταλμένα χωρίς εσάς.
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
                Σταθερή τιμή πριν ξεκινήσουμε — και κάθε πρότυπο σας ανήκει.
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/el/audit" hrefLang="el" className={ctaClass()}>
                Κλείστε το ραντεβού →
              </Link>
              <Link
                href="/email-automation"
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
