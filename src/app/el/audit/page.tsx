import type { Metadata } from "next";
import { EL_OG_IMAGES } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { AuditForm, AUDIT_FORM_EL } from "@/components/sections/audit-form";

/**
 * /el/audit — the Greek twin of /audit, and the last English destination
 * the Greek pages were still sending people to.
 *
 * The FORM is the same component, not a copy: it takes a label set and
 * keeps the shared validation, consent gate and server action. A
 * duplicated Greek form would drift from the English one the first time a
 * field changed, and this is the page where a drifted field means a lost
 * lead rather than a cosmetic bug.
 *
 * It posts a hidden `lang=el`, so the action answers in Greek and the
 * notification email tells the founder to reply in Greek.
 *
 * The consent line links to the English /privacy — the legal documents
 * stay in one language on purpose, and the link is marked hrefLang="en".
 */
export const metadata: Metadata = {
  title: "Δωρεάν ραντεβού 30 λεπτών",
  description:
    "Τριάντα λεπτά στο τηλέφωνο: σας δείχνουμε πού χάνετε πελάτες, και στέλνουμε γραπτή σταθερή τιμή μέσα σε 48 ώρες. Δική σας να την κρατήσετε.",
  alternates: {
    canonical: "/el/audit",
    languages: {
      en: "/audit",
      el: "/el/audit",
      "x-default": "/audit",
    },
  },
  openGraph: {
    images: EL_OG_IMAGES,
    title: "Δωρεάν ραντεβού — Flowstack",
    url: "/el/audit",
    description:
      "Δωρεάν ραντεβού 30 λεπτών, και γραπτή σταθερή τιμή μέσα σε 48 ώρες.",
  },
  // The root layout's Twitter card is English; without this a Greek
  // page shares in the wrong language on X while OG is already Greek.
  twitter: {
    images: EL_OG_IMAGES,
    title: "Δωρεάν ραντεβού — Flowstack",
    description:
      "Δωρεάν ραντεβού 30 λεπτών, και γραπτή σταθερή τιμή μέσα σε 48 ώρες.",
  },
};

const expect = [
  {
    step: "01",
    title: "Ραντεβού 30 λεπτών",
    body: "Μας δείχνετε πώς φτάνουν σήμερα τα μηνύματα και η δουλειά. Σας δείχνουμε πού χάνονται πελάτες.",
  },
  {
    step: "02",
    title: "Γραπτή τιμή σε 48 ώρες",
    body: "Τι θα φτιάξουμε, πόσο θα πάρει, και η σταθερή τιμή. Δική σας να την κρατήσετε.",
  },
  {
    step: "03",
    title: "Αποφασίζετε εσείς",
    body: "Μας αναθέτετε τη δουλειά, πάτε την προσφορά αλλού, ή το φτιάχνετε μόνοι σας. Δεν θα σας κυνηγήσουμε με email.",
  },
] as const;

export default function AuditElPage() {
  return (
    <div lang="el">
      <PageHero
        eyebrow="Δωρεάν ραντεβού 30 λεπτών"
        eyebrowTint="violet"
        title={
          <>
            Τριάντα λεπτά, και έχετε{" "}
            <span className="text-gradient">τιμή.</span>
          </>
        }
        lead="Για ιστοσελίδα, βοηθό chat και τηλεφώνου, αυτοματισμούς ή νέους πελάτες — όποιο από τα τέσσερα."
        ctas={[
          { href: "#audit", label: "Πάμε στη φόρμα →", variant: "primary" },
        ]}
      />

      <Tldr
        rows={[
          {
            k: "Κόστος",
            v: "Κανένα. Το ραντεβού και η γραπτή τιμή είναι δωρεάν.",
          },
          {
            k: "Χρόνος",
            v: "Τριάντα λεπτά στο τηλέφωνο, και γραπτή τιμή μέσα σε 48 ώρες.",
          },
          {
            k: "Δέσμευση",
            v: "Καμία. Πάρτε την προσφορά αλλού αν θέλετε. Δεν θα σας κυνηγήσουμε.",
          },
        ]}
      />

      {/* What to expect — same grid as the English page. */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-[1280px] px-6">
          <ol className="depth-rise flow-edge border-border-line grid grid-cols-1 border-t border-l md:grid-cols-3">
            {expect.map((e) => (
              <li
                key={e.step}
                className="lift-hover bg-surface/40 border-border-line relative border-r border-b p-8"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-ink font-mono text-5xl font-semibold leading-none tracking-[-0.04em]">
                    {e.step}
                  </span>
                  <span className="bp-dim flex-1" aria-hidden />
                </div>
                <h2 className="text-ink mt-5 text-xl font-semibold tracking-[-0.02em]">
                  {e.title}
                </h2>
                <p className="text-ink-dim mt-3 text-[15px] leading-[1.55]">
                  {e.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <AuditForm copy={AUDIT_FORM_EL} />
    </div>
  );
}
