import type { Metadata } from "next";
import { EL_OG_IMAGES } from "@/lib/seo";
import {
  ServicePage,
  SERVICE_PAGE_EL,
  type ServiceStep,
} from "@/components/service-page";
import { FREE_CALL_EL, serviceBySlugEl } from "@/lib/content";

/**
 * /el/website — Greek twin of /website, on the shared service template
 * with the Greek copy set. Owns «κατασκευή ιστοσελίδας Λεμεσός». Scope cap
 * (brochure site; shop/portal quoted separately) lives in `servicesEl`.
 */
const DESCRIPTION =
  "Γρήγορες ιστοσελίδες για μικρές επιχειρήσεις στη Λεμεσό και σε όλη την Κύπρο, στα Ελληνικά ή στα Αγγλικά, με chat από την πρώτη μέρα.";

export const metadata: Metadata = {
  title: "Κατασκευή ιστοσελίδας στη Λεμεσό",
  description: DESCRIPTION,
  alternates: {
    canonical: "/el/website",
    languages: { en: "/website", el: "/el/website", "x-default": "/website" },
  },
  openGraph: {
    images: EL_OG_IMAGES,
    title: "Κατασκευή ιστοσελίδας στη Λεμεσό — Flowstack",
    url: "/el/website",
    description: DESCRIPTION,
  },
  twitter: {
    images: EL_OG_IMAGES,
    title: "Κατασκευή ιστοσελίδας στη Λεμεσό — Flowstack",
    description: DESCRIPTION,
  },
};

const steps: readonly ServiceStep[] = [
  {
    ref: "WB-01",
    title: "Μας λέτε τι θέλετε",
    body: "Μισή ώρα: τι πουλάτε, σε ποιον απευθύνεστε, και η γλώσσα — Ελληνικά, Αγγλικά ή και τα δύο.",
  },
  {
    ref: "WB-02",
    title: "Το σχεδιάζουμε και το γράφουμε",
    body: "Τα δικά σας λόγια, δουλεμένα από εμάς. Εγκρίνετε κάθε σελίδα πριν βγει.",
  },
  {
    ref: "WB-03",
    title: "Το χτίζουμε και ανάβουμε το chat",
    body: "Στο δικό σας domain, και απαντά στους επισκέπτες από τη μέρα που ανοίγει.",
  },
  {
    ref: "WB-04",
    title: "Τα κρατάτε όλα",
    body: "Domain, κώδικας και περιεχόμενο είναι δικά σας. Το αλλάζετε μόνοι σας, ή το προσέχουμε εμείς.",
  },
];

export default function WebsiteElPage() {
  return (
    <div lang="el">
      <ServicePage
        service={serviceBySlugEl("website")}
        copy={SERVICE_PAGE_EL}
        watermark="SITE"
        steps={steps}
        title={
          <>
            Ένα site που φέρνει{" "}
            <span className="text-gradient">μηνύματα, όχι μόνο επισκέπτες.</span>
          </>
        }
        ctas={[
          {
            href: FREE_CALL_EL.href,
            label: `${FREE_CALL_EL.label} →`,
            short: `${FREE_CALL_EL.short} →`,
          },
        ]}
        languageLink={{ href: "/website", label: "Read this page in English", hrefLang: "en" }}
      />
    </div>
  );
}
