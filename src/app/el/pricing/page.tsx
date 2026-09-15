import type { Metadata } from "next";
import { EL_OG_IMAGES } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { registerUrl } from "@/lib/dashboard";
import { Catalogue, CATALOGUE_EL } from "@/components/sections/catalogue";
import { buildCatalogueEl } from "@/lib/content";
import { ctaClass } from "@/components/ui/button";

/**
 * /el/pricing — the Greek twin of /pricing.
 *
 * Tier NUMBERS mirror src/lib/content.ts pricingTiers exactly (Starter
 * €19,99 / Operator €39,99 / Custom quoted, annual deals €199/€399 ≈ 2
 * months free — no free tier since 2026-09-15), and so do the bullets —
 * including the own-key line on Starter and Operator. Only the words are
 * translated — if a price or an entitlement changes there, it changes here
 * in the same commit. The engine paragraph below the grid carries what the
 * English page says in its FAQ, which this page does not have.
 *
 * VAT label: pricing-display.ts vatLabel() is English-only; «χωρίς ΦΠΑ»
 * below is its Greek rendering of treatment="exclusive"/rate=null. If
 * PRICING_CONFIG flips to inclusive, update this page's label too.
 */
export const metadata: Metadata = {
  title: "Τιμές — chat από €19,99 τον μήνα",
  description:
    "Δύο τρόποι: το φτιάχνουμε εμείς με σταθερή τιμή μετά από δωρεάν ραντεβού, ή τρέχετε μόνοι σας το chat — €19,99 ή €39,99 τον μήνα, ακύρωση όποτε θέλετε.",
  alternates: {
    canonical: "/el/pricing",
    languages: {
      en: "/pricing",
      el: "/el/pricing",
      "x-default": "/pricing",
    },
  },
  openGraph: {
    images: EL_OG_IMAGES,
    title: "Τιμές — Flowstack",
    url: "/el/pricing",
    description:
      "Φτιαγμένο για εσάς με σταθερή τιμή, ή το chat μόνοι σας από €19,99/μήνα.",
  },
  // The root layout's Twitter card is English; without this a Greek
  // page shares in the wrong language on X while OG is already Greek.
  twitter: {
    images: EL_OG_IMAGES,
    title: "Τιμές — Flowstack",
    description:
      "Φτιαγμένο για εσάς με σταθερή τιμή, ή το chat μόνοι σας από €19,99/μήνα.",
  },
};

/* Chat plans in CUSTOMER UNITS — the same chats ranges as the English
   pricingTiers, from the same rate (a short chat ≈ 5–8 credits). Numbers and
   entitlements must change here in the same commit as content.ts. */
const tiers = [
  {
    name: "Starter",
    price: "€19,99/μήνα",
    deal: { strike: "€239,88", annual: "€199" },
    cadence: "έως 5 βοηθοί chat · ακύρωση όποτε θέλετε",
    tagline: "Το chat στο site σας, ζωντανό σε ένα λεπτό.",
    features: [
      "Έως 5 βοηθοί chat",
      "Περίπου 1.250–2.000 συνομιλίες τον μήνα",
      "Απαντά από τα δικά σας κείμενα",
      "Τα leads με webhook στο CRM σας ή στα Google Sheets",
      "Το δικό σας κλειδί AI (για προχωρημένους)",
      "Ακύρωση όποτε θέλετε · καμία δέσμευση",
    ],
    cta: "Ξεκινήστε με Starter",
    featured: false,
  },
  {
    name: "Operator",
    price: "€39,99/μήνα",
    deal: { strike: "€479,88", annual: "€399" },
    cadence: "έως 5 βοηθοί chat · ακύρωση όποτε θέλετε",
    tagline: "Για chat που δουλεύει πολύ κάθε μέρα.",
    features: [
      "Όλα όσα έχει το Starter",
      "Δωρεάν κατασκευή ιστοσελίδας με το ετήσιο πλάνο",
      "Περίπου 3.000–5.000 συνομιλίες τον μήνα",
      "Η καλύτερη τιμή ανά συνομιλία · το κορυφαίο μας πλάνο",
      "Ακύρωση όποτε θέλετε · καμία δέσμευση",
    ],
    cta: "Επιλέξτε Operator",
    featured: true,
  },
  {
    name: "Custom",
    price: "Ας τα πούμε",
    cadence: "σταθερή τιμή μετά από δωρεάν ραντεβού",
    tagline: "Όταν χρειάζεστε κάτι παραπάνω από το chat.",
    features: [
      "Φωνητικός βοηθός, επανάκληση και SMS",
      "Σύνδεση με το CRM και τα εργαλεία σας",
      "Δικό σας μοντέλο AI ή περιβάλλον",
      "Παράδοση, και προαιρετική φροντίδα μετά",
    ],
    cta: "Κλείστε ραντεβού",
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
            Δύο τρόποι να αγοράσετε.{" "}
            <span className="text-gradient">Το φτιάχνουμε εμείς, ή το κάνετε μόνοι σας.</span>
          </>
        }
      />

      <Tldr
        rows={[
          {
            k: "Φτιαγμένο για εσάς",
            v: "Χωρίς τιμοκατάλογο. Σταθερή τιμή μετά από δωρεάν ραντεβού 30 λεπτών.",
          },
          {
            k: "Μόνοι σας",
            v: "Το chat κοστίζει €19,99 ή €39,99 τον μήνα, έως 5 βοηθοί.",
          },
          {
            k: "Δεσμεύσεις",
            v: "Καμία. Ακυρώνετε όποιον μήνα θέλετε. Στις κατασκευές, ο κώδικας μένει δικός σας.",
          },
        ]}
      />

      {/* Built for you FIRST, as on /pricing — a cheap chat plan under the hero
          read like the price of a website. */}
      <Catalogue items={buildCatalogueEl} copy={CATALOGUE_EL} />

      <section className="relative pb-12">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-ink mb-10 flex flex-wrap items-end justify-between gap-4 border-b-[1.5px] pb-5">
            <div>
              <span className="bp-ref text-violet">μόνοι σας</span>
              <h2 className="text-ink mt-4 max-w-[26ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                Πλάνα chat.
              </h2>
            </div>
            <span className="bp-annot hidden normal-case sm:block">
              Ακύρωση όποιον μήνα θέλετε
            </span>
          </div>
          <div className="depth-rise grid grid-cols-1 gap-0 border-t border-l border-border-line md:grid-cols-2 lg:grid-cols-3">
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
                  <h3 className="text-ink mt-2 font-mono text-[13px] uppercase tracking-[0.22em]">
                    {tier.name}
                  </h3>

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
                    href={tier.name === "Custom" ? "/el/audit" : registerUrl()}
                    className={ctaClass({
                      variant: tier.featured ? "primary" : "ghost",
                      className:
                        // Greek labels run ~10% longer than the English ones, so the
                        // EN lg step (px-3/12px) still wraps "Επιλέξτε Operator"
                        // in the 1024-1279 band, and the EN xl step wraps it at
                        // 1280 too. Each step is one notch tighter than the
                        // English page and the shared recipe returns at 2xl,
                        // where there is finally room for it.
                        "mt-auto w-full lg:px-2 lg:text-[11px] xl:px-3 xl:text-[12px] 2xl:px-6 2xl:text-[13px]",
                    })}
                  >
                    {tier.cta}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* How the chats ranges are counted — credits named only here, in
              the small print, as on the English page. */}
          <p className="text-ink-dim mx-auto mt-8 max-w-[62ch] text-center text-[14px] leading-[1.6]">
            Πώς μετράμε: μια σύντομη συνομιλία χρησιμοποιεί 5–8 πιστώσεις, και οι
            αριθμοί παραπάνω βασίζονται σε αυτό. Δεν χρεώνονται ο χαιρετισμός,
            ένας επισκέπτης που επιστρέφει σε παλιά συνομιλία, οι έτοιμες
            απαντήσεις, και όσες συνομιλίες αναλαμβάνει η ομάδα σας.
          </p>

          <p className="text-ink-mute mx-auto mt-3 max-w-[62ch] text-center text-[13px] leading-[1.6]">
            Χρειάζεστε περισσότερα; Έξτρα πιστώσεις από €5. Και στα δύο πλάνα
            μπορείτε να βάλετε το δικό σας κλειδί AI — εκείνες οι απαντήσεις
            δεν χρησιμοποιούν πιστώσεις.
          </p>

          <p className="text-ink-dim mx-auto mt-3 max-w-[62ch] text-center text-[14px] leading-[1.6]">
            Το ετήσιο Operator (€399/χρόνο) περιλαμβάνει δωρεάν κατασκευή
            ιστοσελίδας — site παρουσίασης έως έξι σελίδες, με το chat. E-shop
            ή portal είναι δική του κατασκευή, με προσφορά.
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
            <Link href="/el/audit" className={ctaClass()}>
              Δωρεάν ραντεβού →
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
