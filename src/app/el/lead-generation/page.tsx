import type { Metadata } from "next";
import { EL_OG_IMAGES } from "@/lib/seo";
import {
  ServicePage,
  SERVICE_PAGE_EL,
  type ServiceStep,
} from "@/components/service-page";
import { FREE_CALL_EL, serviceBySlugEl } from "@/lib/content";

/**
 * /el/lead-generation — Greek twin of /lead-generation (was /el/outreach;
 * /el/studio also redirects here). Owns «εύρεση πελατών με cold email».
 * Finding and emailing NEW customers only — call-back and SMS answer people
 * who already enquired, so they live under «Chat & φωνητικός βοηθός».
 */
const DESCRIPTION =
  "Βρίσκουμε επιχειρήσεις που σας ταιριάζουν, τους γράφουμε από τη δική σας διεύθυνση με τα δικά σας λόγια, και σας παραδίδουμε τις απαντήσεις.";

export const metadata: Metadata = {
  title: "Εύρεση πελατών με cold email",
  description: DESCRIPTION,
  alternates: {
    canonical: "/el/lead-generation",
    languages: {
      en: "/lead-generation",
      el: "/el/lead-generation",
      "x-default": "/lead-generation",
    },
  },
  openGraph: {
    images: EL_OG_IMAGES,
    title: "Εύρεση πελατών με cold email — Flowstack",
    url: "/el/lead-generation",
    description: DESCRIPTION,
  },
  twitter: {
    images: EL_OG_IMAGES,
    title: "Εύρεση πελατών με cold email — Flowstack",
    description: DESCRIPTION,
  },
};

const steps: readonly ServiceStep[] = [
  {
    ref: "LG-01",
    title: "Μας λέτε ποιους θέλετε",
    body: "Μισή ώρα για να ορίσουμε τον στόχο — κλινικές, γραφεία, ξενοδοχεία, εδώ ή στο εξωτερικό. Χτίζουμε τη λίστα, την εγκρίνετε.",
  },
  {
    ref: "LG-02",
    title: "Γράφουμε τα email",
    body: "Ένα πρώτο email και λίγα ευγενικά follow-up, στα Ελληνικά ή στα Αγγλικά. Εγκρίνετε κάθε λέξη.",
  },
  {
    ref: "LG-03",
    title: "Η αποστολή τρέχει μόνη της",
    body: "Από τη δική σας διεύθυνση. Μια απάντηση σταματά τη σειρά, και οι διαγραφές τηρούνται αυτόματα.",
  },
  {
    ref: "LG-04",
    title: "Βλέπετε τι δούλεψε",
    body: "Θέλετε άλλο είδος επιχείρησης; Πείτε το, και αλλάζουμε τη λίστα.",
  },
];

const yours = [
  "Μισή ώρα για να ορίσετε ποιους θέλετε να προσεγγίσουμε",
  "Την έγκρισή σας στα κείμενα των email",
  "Το όνομα με το οποίο στέλνονται τα email",
] as const;

export default function LeadGenerationElPage() {
  return (
    <div lang="el">
      <ServicePage
        service={serviceBySlugEl("lead-generation")}
        copy={SERVICE_PAGE_EL}
        watermark="LEADS"
        steps={steps}
        title={
          <>
            Μιλάτε μόνο με όσους{" "}
            <span className="text-gradient">ενδιαφέρονται ήδη.</span>
          </>
        }
        ctas={[
          {
            href: FREE_CALL_EL.href,
            label: `${FREE_CALL_EL.label} →`,
            short: `${FREE_CALL_EL.short} →`,
          },
        ]}
        languageLink={{ href: "/lead-generation", label: "Read this page in English", hrefLang: "en" }}
      >
        <section className="relative pb-16">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="border-border-line grid grid-cols-1 gap-8 border-t pt-10 lg:grid-cols-[1fr_1fr]">
              <div className="flex flex-col gap-4">
                <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                  Τι χρειαζόμαστε από εσάς.
                </h2>
                <ul className="flex flex-col gap-2.5">
                  {yours.map((y) => (
                    <li
                      key={y}
                      className="text-ink-dim flex items-start gap-3 leading-[1.55]"
                    >
                      <span className="bp-dot mt-2 shrink-0" aria-hidden />
                      {y}
                    </li>
                  ))}
                </ul>
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
      </ServicePage>
    </div>
  );
}
