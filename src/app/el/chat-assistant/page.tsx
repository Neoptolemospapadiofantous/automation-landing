import type { Metadata } from "next";
import Link from "next/link";
import { EL_OG_IMAGES } from "@/lib/seo";
import { ServicePage, SERVICE_PAGE_EL } from "@/components/service-page";
import { SectionWatermark } from "@/components/section-watermark";
import { FREE_CALL_EL, serviceBySlugEl } from "@/lib/content";
import { dashboardUrl, registerUrl } from "@/lib/dashboard";

/**
 * /el/chat-assistant — Greek twin of /chat-assistant (was /el/suite).
 *
 * Same three absorbed parts as the English page: the four chat use-cases
 * (each linking to its Greek role page), the honest "in the chat today /
 * not yet" lists, and the phone assistant, call-back and SMS as BUILT FOR
 * THE CLIENT. WhatsApp gets no "we build it" line because we don't.
 * The Studio/App/Suite line names are gone from this page (2026-09-13).
 */
const DESCRIPTION =
  "Απαντά σε κάθε μήνυμα στο site σας, μέρα και νύχτα, καταγράφει το lead και σας το παραδίδει. Chat από €19,99/μήνα· φωνητικός βοηθός κατά παραγγελία.";

export const metadata: Metadata = {
  title: "Chat ιστοσελίδας & φωνητικός βοηθός",
  description: DESCRIPTION,
  alternates: {
    canonical: "/el/chat-assistant",
    languages: {
      en: "/chat-assistant",
      el: "/el/chat-assistant",
      "x-default": "/chat-assistant",
    },
  },
  openGraph: {
    images: EL_OG_IMAGES,
    title: "Chat ιστοσελίδας & φωνητικός βοηθός — Flowstack",
    url: "/el/chat-assistant",
    description: DESCRIPTION,
  },
  twitter: {
    images: EL_OG_IMAGES,
    title: "Chat ιστοσελίδας & φωνητικός βοηθός — Flowstack",
    description: DESCRIPTION,
  },
};

/** The four Greek role pages, as use-cases (names/desc mirror EL_ROLES). */
const uses = [
  {
    slug: "lead-qualification",
    name: "Αξιολόγηση leads",
    desc: "Ξεχωρίζει ποιος αξίζει τον χρόνο σας. Παίρνετε μόνο τους καλούς.",
  },
  {
    slug: "sales",
    name: "Πωλήσεις",
    desc: "Απαντά ερωτήσεις τιμών επιτόπου. Κλείνει το demo.",
  },
  {
    slug: "customer-support",
    name: "Εξυπηρέτηση πελατών",
    desc: "Απαντά τις ερωτήσεις που η ομάδα σας απαντά ξανά και ξανά.",
  },
  {
    slug: "onboarding",
    name: "Onboarding",
    desc: "Οδηγεί τους νέους πελάτες στο στήσιμο, στέλνει τα υπόλοιπα σε εσάς.",
  },
] as const;

/** In the do-it-yourself chat today — verifiable in the app. */
const today = [
  {
    name: "Chat ιστοσελίδας",
    body: "Απαντά στους επισκέπτες από το δικό σας υλικό, στη γλώσσα τους — στο site σας και σε σελίδα chat με link.",
  },
  {
    name: "Τα κείμενά σας, ως απαντήσεις",
    body: "Ανεβάζετε FAQ, τιμοκαταλόγους και σελίδες. Το chat απαντά από αυτά και δείχνει από πού ήρθε η απάντηση.",
  },
  {
    name: "Leads, καταγεγραμμένα και βαθμολογημένα",
    body: "Κάθε συζήτηση με όνομα ή email φτάνει στον πίνακά σας, με όλη τη συζήτηση μαζί.",
  },
  {
    name: "Μπαίνετε εσείς",
    body: "Αναλαμβάνετε όποια συζήτηση θέλετε. Ο επισκέπτης βλέπει άνθρωπο· ο βοηθός περιμένει μέχρι να του την δώσετε πίσω.",
  },
  {
    name: "Σύνοψη κάθε Δευτέρα",
    body: "Οι συζητήσεις και τα leads της εβδομάδας, σε μία σύνοψη στο inbox σας κάθε Δευτέρα.",
  },
  {
    name: "Τα leads στα εργαλεία σας",
    body: "Από το Starter και πάνω, κάθε νέο lead και κάθε αίτημα για άνθρωπο πάει αμέσως με webhook στο Zapier, το Make, τα Google Sheets ή το CRM σας — υπογεγραμμένο με το δικό σας μυστικό. Χωρίς δημόσιο API.",
  },
] as const;

/** Not in the do-it-yourself chat yet — in those words. */
const notYet = [
  {
    name: "Κρατήσεις & ραντεβού",
    body: "Το chat κοιτάζει το ημερολόγιό σας, κλείνει τη θέση, και στέλνει επιβεβαίωση και υπενθύμιση.",
    built: true,
  },
  {
    name: "Μηνύματα από inbox & portals",
    body: "Ερωτήματα από email, booking portals και καταχωρίσεις, απαντημένα από τον ίδιο βοηθό.",
    built: true,
  },
  {
    name: "WhatsApp",
    body: "Ο ίδιος βοηθός στο WhatsApp Business νούμερό σας.",
    built: false,
  },
] as const;

export default function ChatAssistantElPage() {
  return (
    <div lang="el">
      <ServicePage
        service={serviceBySlugEl("chat-assistant")}
        copy={SERVICE_PAGE_EL}
        watermark="ASK"
        title={
          <>
            Κάθε μήνυμα απαντημένο —{" "}
            <span className="text-gradient">μέρα, νύχτα, στο site ή στο τηλέφωνο.</span>
          </>
        }
        ctas={[
          { href: registerUrl(), label: "Ξεκινήστε το chat — €19,99/μήνα →", short: "Chat →" },
          {
            href: FREE_CALL_EL.href,
            label: `${FREE_CALL_EL.label} →`,
            short: `${FREE_CALL_EL.short} →`,
            variant: "secondary",
          },
        ]}
        languageLink={{ href: "/chat-assistant", label: "Read this page in English", hrefLang: "en" }}
      >
        <section className="relative pb-16">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="border-border-line border-t pt-10">
              <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Τι μπορεί να κάνει.
              </h2>
            </div>
            <ul className="border-border-line bg-border-line mt-6 grid grid-cols-1 gap-px border sm:grid-cols-2">
              {uses.map((u) => (
                <li key={u.slug} className="bg-bg">
                  <Link
                    href={`/el/roles/${u.slug}`}
                    hrefLang="el"
                    className="lift-hover group flex h-full flex-col gap-2 px-6 py-7"
                  >
                    <span className="text-ink flex items-center gap-2.5 text-lg font-semibold tracking-[-0.02em]">
                      {u.name}
                      <span
                        aria-hidden
                        className="text-violet ml-auto transition-transform group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                    <span className="text-ink-dim leading-[1.55]">{u.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative isolate overflow-hidden pb-16">
          <SectionWatermark text="LIVE" />
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="border-border-line flex flex-wrap items-end justify-between gap-3 border-t pt-10">
              <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Στο chat σήμερα.
              </h2>
              <Link
                href="/el/pricing"
                hrefLang="el"
                className="bp-annot inline-block py-1.5 normal-case underline underline-offset-4"
              >
                Σε κάθε πλάνο εκτός αν λέει αλλιώς · δείτε τις τιμές
              </Link>
            </div>
            <ul className="border-border-line bg-border-line mt-6 grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-3">
              {today.map((m) => (
                <li key={m.name} className="bg-bg flex flex-col gap-3 px-7 py-8">
                  <h3 className="text-ink text-lg font-semibold tracking-[-0.02em]">
                    {m.name}
                  </h3>
                  <p className="text-ink-dim max-w-[40ch] leading-[1.6]">
                    {m.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative pb-16">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="border-border-line border-t pt-10">
              <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Όχι ακόμη στο chat.
              </h2>
              <p className="text-ink-dim mt-4 max-w-[62ch] leading-[1.6]">
                Κανένα από αυτά δεν δουλεύει στο chat σήμερα. Ζητήστε τα από{" "}
                <a
                  href={dashboardUrl("/suite")}
                  className="text-ink inline-block py-1.5 underline underline-offset-4"
                >
                  το dashboard σας
                </a>{" "}
                — χτίζουμε με τη σειρά που τα ζητούν.
              </p>
            </div>
            <ul className="border-border-line bg-border-line mt-6 grid grid-cols-1 gap-px border sm:grid-cols-3">
              {notYet.map((m) => (
                <li
                  key={m.name}
                  className="bg-bg-elev flex flex-col gap-3 px-7 py-8"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-ink text-lg font-semibold tracking-[-0.02em]">
                      {m.name}
                    </h3>
                    <span className="bp-ref shrink-0">όχι ακόμη</span>
                  </div>
                  <p className="text-ink-dim max-w-[40ch] leading-[1.6]">
                    {m.body}
                  </p>
                  {m.built && (
                    <p className="text-ink-mute mt-auto pt-1 text-[13px] leading-[1.5]">
                      Το φτιάχνουμε για εσάς σήμερα:{" "}
                      <Link
                        href="/el/automations"
                        hrefLang="el"
                        className="text-ink underline underline-offset-4"
                      >
                        Αυτοματισμοί
                      </Link>
                      .
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ServicePage>
    </div>
  );
}
