import type { Metadata } from "next";
import Link from "next/link";
import { EL_OG_IMAGES } from "@/lib/seo";
import {
  ServicePage,
  SERVICE_PAGE_EL,
  type ServiceStep,
} from "@/components/service-page";
import { FREE_CALL_EL, serviceBySlugEl } from "@/lib/content";

/**
 * /el/automations — Greek twin of /automations. The never-a-cold-list line
 * (`isnt`) is load-bearing: this writes to people who already know the
 * business, from its own address. Finding new customers is «Εύρεση πελατών».
 */
const DESCRIPTION =
  "Follow-up, υπενθυμίσεις και όχληση τιμολογίων που στέλνονται μόνα τους, από τη δική σας διεύθυνση και συνδεδεμένα με το CRM σας.";

export const metadata: Metadata = {
  title: "Αυτοματισμοί email & CRM για μικρές επιχειρήσεις",
  description: DESCRIPTION,
  alternates: {
    canonical: "/el/automations",
    languages: {
      en: "/automations",
      el: "/el/automations",
      "x-default": "/automations",
    },
  },
  openGraph: {
    images: EL_OG_IMAGES,
    title: "Αυτοματισμοί email & CRM — Flowstack",
    url: "/el/automations",
    description: DESCRIPTION,
  },
  twitter: {
    images: EL_OG_IMAGES,
    title: "Αυτοματισμοί email & CRM — Flowstack",
    description: DESCRIPTION,
  },
};

const steps: readonly ServiceStep[] = [
  {
    ref: "EM-01",
    title: "Μας δείχνετε τι κάνετε με το χέρι",
    body: "Μισή ώρα: τα follow-up που ξεχνιούνται, οι υπενθυμίσεις που ξαναγράφετε, τα τιμολόγια που κυνηγάτε.",
  },
  {
    ref: "EM-02",
    title: "Τα γράφουμε με τα δικά σας λόγια",
    body: "Κάθε μήνυμα είναι δικό σας, δουλεμένο από εμάς. Εγκρίνετε το καθένα πριν σταλεί οτιδήποτε.",
  },
  {
    ref: "EM-03",
    title: "Τα συνδέουμε με τα εργαλεία σας",
    body: "CRM, inbox, ημερολόγιο, τιμολόγηση. Τρέχει όταν συμβεί αυτό που το προκαλεί, όχι όταν το θυμηθεί κάποιος.",
  },
  {
    ref: "EM-04",
    title: "Το βλέπετε να τρέχει",
    body: "Κάθε αποστολή καταγράφεται. Οι απαντήσεις έρχονται στο δικό σας inbox, όπως πάντα.",
  },
];

export default function AutomationsElPage() {
  return (
    <div lang="el">
      <ServicePage
        service={serviceBySlugEl("automations")}
        copy={SERVICE_PAGE_EL}
        watermark="AUTO"
        steps={steps}
        title={
          <>
            Η δουλειά που σπρώχνετε με το χέρι,{" "}
            <span className="text-gradient">γίνεται για εσάς.</span>
          </>
        }
        ctas={[
          {
            href: FREE_CALL_EL.href,
            label: `${FREE_CALL_EL.label} →`,
            short: `${FREE_CALL_EL.short} →`,
          },
        ]}
        languageLink={{ href: "/automations", label: "Read this page in English", hrefLang: "en" }}
      >
        <section className="relative pb-16">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="border-border-line max-w-[860px] border-l-2 pl-6 sm:pl-8">
              <span className="bp-ref text-violet">ζωντανές αναφορές</span>
              <p className="text-ink-dim mt-4 max-w-[62ch] leading-[1.6]">
                Θέλετε να δείτε μαζί τους αριθμούς που κρατά χωριστά κάθε εργαλείο;{" "}
                <Link
                  href="/el/what-works"
                  hrefLang="el"
                  className="text-ink inline-block py-1.5 underline underline-offset-4"
                >
                  Πώς δουλεύουν οι ζωντανές αναφορές
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </ServicePage>
    </div>
  );
}
