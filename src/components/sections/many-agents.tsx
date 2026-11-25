import Link from "next/link";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";
import { FREE_CALL, FREE_CALL_EL } from "@/lib/content";

/**
 * Custom — many agents (2026-09-29). Starter and Operator cap a team at five
 * chat assistants; the Custom plan has no cap (`Plan::Business->maxAgents()`
 * is unbounded in the dashboard). This band sells that: one assistant per
 * location, brand or department, each on its own documents and its own site
 * or page, every lead on the one team board.
 *
 * The picture of "many assistants" is the 3D backdrop's ring of bubbles
 * (its "many" pose), so this band is text only.
 *
 * HONESTY LINE: the dashboard's agent-to-agent relay is an operator-only
 * tool, not a customer feature, so nothing here says the assistants pass
 * conversations to each other. Custom stays unpriced (08-11 rule).
 */
export type ManyAgentsCopy = {
  sheetRef?: string;
  heading: string;
  headingDim: string;
  body: string;
  cases: { ref: string; name: string; desc: string }[];
  cta: { href: string; label: string; short: string };
  note: string;
  hrefLang?: "en" | "el";
};

export const MANY_AGENTS_EN: ManyAgentsCopy = {
  heading: "One chat, or one for every part of the business.",
  headingDim: "That is Custom.",
  body: "Starter and Operator run up to five chat assistants. Custom has no cap: each one trained on its own documents, speaking in its own voice, on its own site or page — and every lead lands on one board.",
  cases: [
    {
      ref: "C-01",
      name: "Several locations",
      desc: "One assistant per hotel, clinic or branch, answering from that place's own rooms, hours and prices.",
    },
    {
      ref: "C-02",
      name: "Several brands",
      desc: "Each brand keeps its own name, tone and site. You see all of them in one dashboard.",
    },
    {
      ref: "C-03",
      name: "Several departments",
      desc: "Sales, support and bookings as separate assistants, each with only the knowledge it needs.",
    },
  ],
  cta: { href: FREE_CALL.href, label: "Talk about Custom", short: "Talk about Custom" },
  note: "Scoped on a free call · fixed price in 48 hours",
};

export const MANY_AGENTS_EL: ManyAgentsCopy = {
  heading: "Ένα chat, ή ένα για κάθε κομμάτι της επιχείρησης.",
  headingDim: "Αυτό είναι το Custom.",
  body: "Τα Starter και Operator έχουν έως πέντε βοηθούς chat. Το Custom δεν έχει όριο: ο καθένας εκπαιδευμένος στα δικά του έγγραφα, με τη δική του φωνή, στο δικό του site ή σελίδα — και κάθε lead καταλήγει σε έναν πίνακα.",
  cases: [
    {
      ref: "C-01",
      name: "Πολλά σημεία",
      desc: "Ένας βοηθός ανά ξενοδοχείο, ιατρείο ή κατάστημα, που απαντά με τα δικά του δωμάτια, ωράρια και τιμές.",
    },
    {
      ref: "C-02",
      name: "Πολλά brands",
      desc: "Κάθε brand κρατά το όνομα, το ύφος και το site του. Τα βλέπετε όλα σε ένα dashboard.",
    },
    {
      ref: "C-03",
      name: "Πολλά τμήματα",
      desc: "Πωλήσεις, υποστήριξη και κρατήσεις ως ξεχωριστοί βοηθοί, ο καθένας μόνο με τη γνώση που χρειάζεται.",
    },
  ],
  cta: { href: FREE_CALL_EL.href, label: "Συζητήστε το Custom", short: "Custom" },
  note: "Με δωρεάν ραντεβού · σταθερή τιμή σε 48 ώρες",
  hrefLang: "el",
};

export function ManyAgents({ copy = MANY_AGENTS_EN }: { copy?: ManyAgentsCopy }) {
  return (
    <section id="many-agents" className="relative isolate overflow-hidden py-24 sm:py-28">
      <SectionWatermark text="MANY" />
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="max-w-[760px]">
          {copy.sheetRef && <span className="bp-ref text-violet">{copy.sheetRef}</span>}
          <h2 className="text-ink mt-4 max-w-[20ch] text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-4xl lg:text-[44px] lg:leading-[1.06]">
            {copy.heading} <span className="text-ink-dim">{copy.headingDim}</span>
          </h2>
          <p className="text-ink-dim mt-5 max-w-[56ch] leading-[1.6]">{copy.body}</p>

          <ul className="border-border-line mt-8 grid grid-cols-1 gap-px border bg-border-line sm:grid-cols-3">
            {copy.cases.map((c) => (
              <li key={c.ref} className="bg-bg flex flex-col gap-2 px-5 py-5">
                <span className="bp-ref">{c.ref}</span>
                <span className="text-ink font-semibold tracking-[-0.01em]">{c.name}</span>
                <p className="text-ink-dim text-[14px] leading-[1.55]">{c.desc}</p>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link href={copy.cta.href} hrefLang={copy.hrefLang} className={ctaClass()}>
              <span className="sm:hidden">{copy.cta.short} →</span>
              <span className="hidden sm:inline">{copy.cta.label} →</span>
            </Link>
            <span className="bp-annot normal-case">{copy.note}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
