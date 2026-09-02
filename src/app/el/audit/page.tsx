import type { Metadata } from "next";
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
    "Τριάντα λεπτά και έχετε τιμή. Κάθε κατασκευή ξεκινά από εδώ: δωρεάν ραντεβού, και γραπτή προσφορά με σταθερό αντικείμενο σε 48 ώρες. Δική σας, ό,τι κι αν αποφασίσετε.",
  alternates: {
    canonical: "/el/audit",
    languages: {
      en: "/audit",
      el: "/el/audit",
      "x-default": "/audit",
    },
  },
  openGraph: {
    title: "Δωρεάν ραντεβού — Flowstack",
    url: "/el/audit",
    description:
      "Κάθε κατασκευή ξεκινά από εδώ: ένα δωρεάν 30λεπτο ραντεβού, και γραπτή προσφορά με σταθερό αντικείμενο μέσα σε 48 ώρες.",
  },
  // The root layout's Twitter card is English; without this a Greek
  // page shares in the wrong language on X while OG is already Greek.
  twitter: {
    title: "Δωρεάν ραντεβού — Flowstack",
    description:
      "Κάθε κατασκευή ξεκινά από εδώ: ένα δωρεάν 30λεπτο ραντεβού, και γραπτή προσφορά με σταθερό αντικείμενο μέσα σε 48 ώρες.",
  },
};

const expect = [
  {
    step: "01",
    title: "Ραντεβού 30 λεπτών",
    body: "Μας δείχνετε τη δουλειά που θέλετε να φύγει από τα χέρια σας. Χωρίς παρουσιάσεις από τη δική μας πλευρά.",
  },
  {
    step: "02",
    title: "Γραπτή προσφορά σε 48 ώρες",
    body: "Τι θα φτιάξουμε, πόσο θα πάρει, τι κοστίζει. Δική σας να την κρατήσετε.",
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
        eyebrow="Κατασκευή κατά παραγγελία"
        eyebrowTint="violet"
        title={
          <>
            Τριάντα λεπτά, και έχετε{" "}
            <span className="text-gradient">τιμή.</span>
          </>
        }
        lead="Κάθε κατασκευή τιμολογείται για τα δικά σας δεδομένα, πριν ξεκινήσει οποιαδήποτε δουλειά."
        ctas={[
          { href: "#audit", label: "Πάμε στη φόρμα →", variant: "primary" },
        ]}
      />

      <Tldr
        rows={[
          {
            k: "Κόστος",
            v: "Κανένα. Το ραντεβού και η γραπτή προσφορά είναι δωρεάν.",
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
