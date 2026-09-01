import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { registerUrl } from "@/lib/dashboard";
import { ctaClass } from "@/components/ui/button";

/**
 * /el/pricing — the Greek twin of /pricing.
 *
 * Tier NUMBERS mirror src/lib/content.ts pricingTiers exactly (Free €0 /
 * Starter €9 / Growth €19 / Operator €39 / Custom quoted, annual deals
 * €90/€190/€390 = 2 months free). Only the words are translated — if a
 * price changes there, it changes here in the same commit.
 *
 * VAT label: pricing-display.ts vatLabel() is English-only; «χωρίς ΦΠΑ»
 * below is its Greek rendering of treatment="exclusive"/rate=null. If
 * PRICING_CONFIG flips to inclusive, update this page's label too.
 */
export const metadata: Metadata = {
  title: "Τιμές — chat από €0 τον μήνα",
  description:
    "Ξεκινήστε δωρεάν με έναν agent. Τα συνδρομητικά πλάνα κοστίζουν €9 έως €39 τον μήνα. Ό,τι κατασκευάζουμε τιμολογείται με προσφορά ανά έργο. Χωρίς δεσμεύσεις.",
  alternates: {
    canonical: "/el/pricing",
    languages: {
      en: "/pricing",
      el: "/el/pricing",
      "x-default": "/pricing",
    },
  },
  openGraph: {
    title: "Τιμές — Flowstack",
    url: "/el/pricing",
    description:
      "Ξεκινήστε δωρεάν με έναν agent. Πλάνα από €9/μήνα. Κατασκευές με προσφορά ανά έργο.",
  },
};

const tiers = [
  {
    name: "Free",
    price: "€0/μήνα",
    cadence: "1 agent · χωρίς κάρτα",
    tagline: "Βάλτε το στο site σας και δείτε το να απαντά.",
    features: [
      "1 agent, όποιος ρόλος θέλετε",
      "250 πιστώσεις συνομιλίας / μήνα",
      "Ανέβασμα γνώσης + απομαγνητοφωνήσεις",
      "Πίνακας leads σε πραγματικό χρόνο",
      "Χωρίς κάρτα, χωρίς λήξη",
    ],
    cta: "Ξεκινήστε δωρεάν",
    featured: false,
  },
  {
    name: "Starter",
    price: "€9/μήνα",
    deal: { strike: "€108", annual: "€90" },
    cadence: "1 agent · ακύρωση όποτε θέλετε",
    tagline: "Ένας agent, ζωντανός σε ένα λεπτό. Όλα ενεργά.",
    features: [
      "1 agent, όποιος ρόλος θέλετε",
      "2.500 πιστώσεις συνομιλίας / μήνα",
      "Έξτρα πιστώσεις όποτε χρειαστεί",
      "Ανέβασμα γνώσης + απομαγνητοφωνήσεις",
      "Ακύρωση όποτε θέλετε · καμία δέσμευση",
    ],
    cta: "Δοκιμάστε το με €9",
    featured: false,
  },
  {
    name: "Growth",
    price: "€19/μήνα",
    deal: { strike: "€228", annual: "€190" },
    cadence: "έως 5 agents · ακύρωση όποτε θέλετε",
    tagline: "Για site με πραγματική κίνηση.",
    features: [
      "Όλα όσα έχει το Starter",
      "Έως 5 agents",
      "10.000 πιστώσεις συνομιλίας / μήνα",
      "Έξτρα πιστώσεις όποτε χρειαστεί",
      "Ακύρωση όποτε θέλετε · καμία δέσμευση",
    ],
    cta: "Επιλέξτε το Growth",
    featured: true,
  },
  {
    name: "Operator",
    price: "€39/μήνα",
    deal: { strike: "€468", annual: "€390" },
    cadence: "έως 5 agents · ακύρωση όποτε θέλετε",
    tagline: "Για ομάδες με πολλούς agents κάθε μέρα.",
    features: [
      "Όλα όσα έχει το Growth",
      "Έως 5 agents",
      "25.000 πιστώσεις συνομιλίας / μήνα",
      "Ή το δικό σας API key — 25.000 μηνύματα, χωρίς πιστώσεις",
      "Η καλύτερη τιμή ανά πίστωση · το κορυφαίο μας πλάνο",
      "Ακύρωση όποτε θέλετε · καμία δέσμευση",
    ],
    cta: "Επιλέξτε το Operator",
    featured: false,
  },
  {
    name: "Custom",
    price: "Ας τα πούμε",
    cadence: "με προσφορά · παράδοση σε 4–6 εβδομάδες",
    tagline: "Όταν το έτοιμο chat δεν αρκεί.",
    features: [
      "Ροές φτιαγμένες για τα δικά σας συστήματα",
      "Συνδέσεις με CRM, τηλεφωνία, εσωτερικά εργαλεία",
      "Δικό σας μοντέλο, δικό σας περιβάλλον",
      "Εκπαιδευμένο στη γνώση και τη φωνή σας",
      "Εγχειρίδια + παράδοση · προαιρετική συντήρηση",
    ],
    cta: "Κλείστε το ραντεβού",
    featured: false,
  },
] as const;

export default function PricingElPage() {
  return (
    <div lang="el">
      <PageHero
        eyebrow="Τιμές"
        eyebrowTint="violet"
        title={
          <>
            Ξεκινήστε δωρεάν. Πληρώστε όταν δουλέψει.{" "}
            <span className="text-gradient">Custom όταν το χρειαστείτε.</span>
          </>
        }
        lead="Το chat έχει τιμοκατάλογο. Ό,τι κατασκευάζουμε τιμολογείται με προσφορά για τη δική σας περίπτωση."
      />

      <Tldr
        rows={[
          {
            k: "Το chat",
            v: "Δωρεάν για έναν agent. €9, €19 ή €39 τον μήνα για περισσότερους agents και περισσότερες συνομιλίες.",
          },
          {
            k: "Ό,τι κατασκευάζουμε",
            v: "Χωρίς τιμοκατάλογο. Προσφορά μετά από ένα δωρεάν 30λεπτο τηλεφώνημα — και η τιμή είναι σταθερή.",
          },
          {
            k: "Δεσμεύσεις",
            v: "Καμία. Ακυρώνετε όποιον μήνα θέλετε. Στις κατασκευές, ο κώδικας μένει δικός σας.",
          },
        ]}
      />

      <section className="relative pb-12">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="depth-rise grid grid-cols-1 gap-0 border-t border-l border-border-line md:grid-cols-2 lg:grid-cols-5">
            {tiers.map((tier, i) => {
              const ref = `TIER-0${i + 1}`;
              return (
                <div
                  key={tier.name}
                  className={`lift-hover relative flex flex-col border-r border-b border-border-line bg-surface/40 p-8 lg:p-4 xl:p-6 ${
                    tier.featured ? "flow-edge border-t-2 border-t-ink lg:-mt-px" : ""
                  }`}
                >
                  {tier.featured && (
                    <>
                      <span
                        aria-hidden
                        className="absolute -left-px -top-px h-3 w-3 border-l border-t border-ink"
                      />
                      <span
                        aria-hidden
                        className="absolute -right-px -top-px h-3 w-3 border-r border-t border-ink"
                      />
                      <span className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink">
                        Η ΣΥΝΗΘΗΣ ΕΠΙΛΟΓΗ
                      </span>
                    </>
                  )}

                  <span className="bp-ref text-ink-mute">{ref}</span>
                  <h2 className="text-ink mt-2 font-mono text-[13px] uppercase tracking-[0.22em]">
                    {tier.name}
                  </h2>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-ink text-4xl font-semibold tracking-[-0.03em] lg:text-3xl">
                      {tier.price}
                    </span>
                    {tier.price.startsWith("€") && (
                      <span className="text-ink-mute font-mono text-[11px] uppercase tracking-[0.18em]">
                        χωρίς ΦΠΑ
                      </span>
                    )}
                  </div>
                  <p className="text-ink-mute mt-1 text-[13px]">
                    {tier.cadence}
                  </p>

                  {"deal" in tier && (
                    <p className="mt-2 text-[13px]">
                      <s className="text-ink-mute">{tier.deal.strike}</s>{" "}
                      <span className="text-ink font-semibold">
                        {tier.deal.annual}
                      </span>{" "}
                      <span className="text-ink-dim">με ετήσια χρέωση</span>{" "}
                      <span className="bg-signal inline-block px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.08em] whitespace-nowrap text-black uppercase">
                        2 μήνες δωρεάν
                      </span>
                    </p>
                  )}

                  <div className="bp-dim mt-5 w-full" aria-hidden />

                  <p className="text-ink-dim mt-5 text-[15px] leading-[1.5] lg:text-[13px]">
                    {tier.tagline}
                  </p>

                  <ul className="mb-8 mt-7 space-y-3.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span aria-hidden className="bp-dot mt-2 shrink-0" />
                        <span className="text-ink text-[15px] leading-[1.45] lg:text-[13px]">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={tier.name === "Custom" ? "/audit" : registerUrl()}
                    className={ctaClass({
                      variant: tier.featured ? "primary" : "ghost",
                      className:
                        "mt-auto w-full lg:px-3 lg:text-[12px] xl:px-6 xl:text-[13px]",
                    })}
                  >
                    {tier.cta}
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="text-ink-dim mx-auto mt-8 max-w-[62ch] text-center text-[14px] leading-[1.6]">
            Μια σύντομη συνομιλία χρησιμοποιεί 5–8 πιστώσεις. Άρα το Starter
            καλύπτει περίπου{" "}
            <span className="text-ink font-semibold">
              300–500 συνομιλίες τον μήνα
            </span>
            , και το Operator περίπου δέκα φορές περισσότερες. Δεν χρεώνεστε
            για τον αρχικό χαιρετισμό, για επισκέπτη που επιστρέφει σε παλιά
            συνομιλία, για τις έτοιμες απαντήσεις στις συχνές ερωτήσεις, ούτε
            για συνομιλίες που αναλαμβάνει άνθρωπος της ομάδας σας.
          </p>

          <p className="bp-annot mt-8 text-center">
            {"// όλα τα έργα: στα δικά σας συστήματα · κώδικας & κωδικοί παραδίδονται · χωρίς ελάχιστη δέσμευση"}
          </p>
          <p className="text-ink-mute mt-3 text-center font-mono text-[11px] uppercase tracking-[0.18em]">
            Όλες οι τιμές σε EUR · χωρίς ΦΠΑ · το τελικό ποσό στο checkout
          </p>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-wrap items-center gap-4 border-t pt-8">
            <Link href="/audit" className={ctaClass()}>
              Κλείστε το δωρεάν ραντεβού →
            </Link>
            <Link
              href="/pricing"
              className="bp-annot normal-case inline-block py-1.5 underline underline-offset-4"
            >
              Read this page in English
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
