import type { Metadata } from "next";
import { EL_OG_IMAGES } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { SectionWatermark } from "@/components/section-watermark";
import { registerUrl } from "@/lib/dashboard";
import { ctaClass } from "@/components/ui/button";

/**
 * /el/roles/[role] — Greek twins of the four role pages, completing the
 * Greek marketing set (the legal pages stay English by design).
 *
 * Same template shape as /roles/[role], same slugs and ROLE-/N-/D- refs
 * so both languages share one drawing set. Copy lives HERE rather than
 * in content.ts: content.ts is the English source the homepage derives
 * from, and the EL pages carry their own words (the pattern every EL
 * twin follows).
 *
 * Channel names stay English — `Website widget` and `Hosted chat page`
 * are §3.4 canonical product names, not prose. Watermarks are passed as
 * unaccented uppercase per the all-caps-Greek rule.
 */

export const dynamicParams = false;

type ElRole = {
  slug: string;
  ref: string;
  name: string;
  wm: string;
  desc: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  h1Accent: string;
  lead: string;
  does: { ref: string; title: string; desc: string }[];
};

const EL_ROLES: ElRole[] = [
  {
    slug: "lead-qualification",
    ref: "ROLE-01",
    name: "Αξιολόγηση leads",
    wm: "LEADS",
    desc: "Ξεχωρίζει ποιος αξίζει τον χρόνο σας. Παίρνετε μόνο τους καλούς.",
    metaTitle: "Αυτόματη αξιολόγηση leads για το site σας",
    metaDescription:
      "Κάθε επισκέπτης αξιολογείται πριν η ομάδα σας ξοδέψει λεπτό. Απομαγνητοφωνήσεις, δρομολόγηση leads, ζωντανός πίνακας. Δωρεάν για αρχή, πλάνα από €9.",
    h1: "Το lead που φτάνει τα μεσάνυχτα",
    h1Accent: "δεν πρέπει να περιμένει το πρωί.",
    lead: "Οι ερωτήσεις έρχονται όλες τις ώρες. Το chat τις ξεδιαλέγει και σας δίνει τις καλές.",
    does: [
      {
        ref: "N-01",
        title: "Υποδέχεται κάθε επίσκεψη",
        desc: "Χωρίς φόρμες, χωρίς ουρά — μια άμεση πρώτη επαφή, όποια ώρα κι αν είναι.",
      },
      {
        ref: "N-02",
        title: "Βαθμολογεί όσους αξίζουν τον χρόνο σας",
        desc: "Κάνει λίγες ερωτήσεις και βαθμολογεί τον επισκέπτη πριν ειδοποιηθεί κανείς.",
      },
      {
        ref: "N-03",
        title: "Παραδίδει μόνο τις ζεστές συζητήσεις",
        desc: "Τα καλά leads φτάνουν στον πίνακά σας με όλη τη συζήτηση μαζί.",
      },
    ],
  },
  {
    slug: "sales",
    ref: "ROLE-02",
    name: "Πωλήσεις",
    wm: "SALES",
    desc: "Απαντά ερωτήσεις τιμών επιτόπου. Κλείνει το demo.",
    metaTitle: "Αυτόματος agent πωλήσεων για το site σας",
    metaDescription:
      "Ξεναγεί τους επισκέπτες στην προσφορά σας, απαντά ερωτήσεις τιμών, και κλείνει ραντεβού στο ημερολόγιό σας. Δωρεάν για αρχή, πλάνα από €9 τον μήνα.",
    h1: "Οι περισσότεροι επισκέπτες με ερώτηση αγοράς",
    h1Accent: "δεν τη ρωτούν ποτέ. Φεύγουν.",
    lead: "Ο αγοραστής με απορία δεν περιμένει. Το chat απαντά και κλείνει το ραντεβού.",
    does: [
      {
        ref: "N-01",
        title: "Ξεναγεί τους επισκέπτες στην προσφορά σας",
        desc: "Τι κάνετε, για ποιον, γιατί ταιριάζει — από τη δική σας γνώση.",
      },
      {
        ref: "N-02",
        title: "Απαντά ερωτήσεις τιμών και αντικειμένου",
        desc: "Τιμή και αντικείμενο απαντώνται επιτόπου.",
      },
      {
        ref: "N-03",
        title: "Κλείνει αξιολογημένα demo",
        desc: "Οι καλές συζητήσεις καταλήγουν στο ημερολόγιό σας.",
      },
    ],
  },
  {
    slug: "customer-support",
    ref: "ROLE-03",
    name: "Εξυπηρέτηση πελατών",
    wm: "SUPPORT",
    desc: "Απαντά τις ερωτήσεις που η ομάδα σας απαντά ξανά και ξανά.",
    metaTitle: "Αυτόματη εξυπηρέτηση πελατών στο site σας",
    metaDescription:
      "Απαντήσεις πρώτης γραμμής από τη δική σας βάση γνώσης, κλιμάκωση μόνο όταν χρειάζεται άνθρωπος, κάθε συζήτηση καταγεγραμμένη. Δωρεάν για αρχή.",
    h1: "Πρώτη γραμμή υποστήριξης που μιλά σαν εσάς,",
    h1Accent: "όχι σαν σενάριο.",
    lead: "Οι ίδιες δέκα ερωτήσεις τρώνε τη μέρα σας. Το chat τις απαντά από τα δικά σας κείμενα.",
    does: [
      {
        ref: "N-01",
        title: "Απαντά από τη βάση γνώσης σας",
        desc: "Απαντήσεις από τα δικά σας κείμενα και FAQ, στον δικό σας τόνο — όχι γενικές.",
      },
      {
        ref: "N-02",
        title: "Κλιμακώνει μόνο όταν χρειάζεται",
        desc: "Οι επαναλαμβανόμενες ερωτήσεις λύνονται άμεσα. Ο άνθρωπος είναι ένα βήμα μακριά.",
      },
      {
        ref: "N-03",
        title: "Καταγράφει κάθε συζήτηση",
        desc: "Κάθε συζήτηση αποθηκεύεται στον πίνακά σας. Κανείς δεν παρακολουθεί ουρά.",
      },
    ],
  },
  {
    slug: "onboarding",
    ref: "ROLE-04",
    name: "Onboarding",
    wm: "ONBOARD",
    desc: "Οδηγεί τους νέους πελάτες στο στήσιμο, στέλνει τα υπόλοιπα σε εσάς.",
    metaTitle: "Αυτόματο onboarding νέων πελατών",
    metaDescription:
      "Οδηγεί κάθε νέο πελάτη στο στήσιμο, απαντά τις επαναλαμβανόμενες ερωτήσεις από τα κείμενά σας, και δρομολογεί τα υπόλοιπα στην ομάδα σας. Δωρεάν για αρχή.",
    h1: "Οι νέοι πελάτες εγγράφονται με όρεξη,",
    h1Accent: "και μετά κολλάνε.",
    lead: "Οι νέοι πελάτες κολλάνε αμέσως μετά την εγγραφή. Το chat τους οδηγεί στο στήσιμο.",
    does: [
      {
        ref: "N-01",
        title: "Οδηγεί το στήσιμο βήμα-βήμα",
        desc: "Οδηγίες βήμα-βήμα αντί για έναν τοίχο από κείμενα.",
      },
      {
        ref: "N-02",
        title: "Απαντά τις επαναλαμβανόμενες ερωτήσεις",
        desc: "Οι ερωτήσεις που κάνει κάθε νέος λογαριασμός, απαντημένες άμεσα.",
      },
      {
        ref: "N-03",
        title: "Δρομολογεί τις εξαιρέσεις στην ομάδα σας",
        desc: "Ό,τι θέλει άνθρωπο φτάνει στην ομάδα σας, με τη συζήτηση μαζί.",
      },
    ],
  },
];

/* §3.4 canonical product names — English on purpose. */
const CHANNELS = ["Website widget", "Hosted chat page"] as const;

const DASHBOARD_CELLS = [
  {
    ref: "D-01",
    title: "Πλήρεις απομαγνητοφωνήσεις",
    desc: "Κάθε συζήτηση αποθηκευμένη από άκρη σε άκρη — διαβάζετε τι ρώτησαν πραγματικά.",
  },
  {
    ref: "D-02",
    title: "Δρομολόγηση leads",
    desc: "Οι καλές συζητήσεις γίνονται leads, με το πλαίσιο που χρειάζεται η ομάδα σας.",
  },
  {
    ref: "D-03",
    title: "Εικόνα σε πραγματικό χρόνο",
    desc: "Βλέπετε chats και leads να φτάνουν την ώρα που συμβαίνουν. Χωρίς εξαγωγές, χωρίς αναμονή.",
  },
] as const;

export function generateStaticParams() {
  return EL_ROLES.map((r) => ({ role: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role } = await params;
  const r = EL_ROLES.find((p) => p.slug === role);
  if (!r) return {};
  return {
    title: r.metaTitle,
    description: r.metaDescription,
    alternates: {
      canonical: `/el/roles/${r.slug}`,
      languages: {
        en: `/roles/${r.slug}`,
        el: `/el/roles/${r.slug}`,
        "x-default": `/roles/${r.slug}`,
      },
    },
    openGraph: {
      images: EL_OG_IMAGES,
      title: `${r.metaTitle} — Flowstack`,
      url: `/el/roles/${r.slug}`,
      description: r.metaDescription,
    },
    twitter: {
      images: EL_OG_IMAGES,
      title: `${r.metaTitle} — Flowstack`,
      description: r.metaDescription,
    },
  };
}

export default async function RoleElPage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  const r = EL_ROLES.find((p) => p.slug === role);
  if (!r) notFound();

  const others = EL_ROLES.filter((p) => p.slug !== r.slug);

  return (
    <div lang="el">
      <PageHero
        eyebrow={`${r.ref} / Ρόλος agent`}
        title={
          <>
            {r.h1} <span className="text-gradient">{r.h1Accent}</span>
          </>
        }
        lead={r.lead}
        ctas={[
          { href: registerUrl(), label: "Ξεκινήστε δωρεάν →" },
          { href: "/el/pricing", label: "Δείτε τις τιμές", variant: "secondary" },
        ]}
      />

      <Tldr
        rows={[
          { k: "Τι κάνει", v: r.desc },
          {
            k: "Πού ζει",
            v: "Στο site σας, ή σε σελίδα chat με link. Ένα λεπτό στήσιμο.",
          },
          {
            k: "Τι κοστίζει",
            v: "Δωρεάν για έναν agent, μετά €9 έως €39 τον μήνα. Ακυρώνετε όποιον μήνα θέλετε.",
          },
        ]}
      />

      {/* What the role does — same drawing-index rows as the EN page. */}
      <section className="relative isolate overflow-hidden pb-20">
        <SectionWatermark text={r.wm} size="sm" />
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-wrap items-end justify-between gap-4 border-b pb-5">
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Τι κάνει αυτός ο agent
            </h2>
            <span className="bp-annot hidden sm:block">
              {`// ${r.ref.toLowerCase()} · σε κάθε πλάνο`}
            </span>
          </div>
          <ul>
            {r.does.map((d) => (
              <li
                key={d.ref}
                className="border-border-line grid grid-cols-[auto_1fr] items-start gap-5 border-b py-7 sm:gap-8"
              >
                <span className="bp-ref text-ink-mute w-14 shrink-0 sm:w-20">
                  {d.ref}
                </span>
                <div>
                  <h3 className="text-ink text-lg font-semibold tracking-[-0.02em] sm:text-xl">
                    {d.title}
                  </h3>
                  <p className="text-ink-dim mt-1.5 max-w-[68ch] text-sm leading-[1.55]">
                    {d.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it deploys — the two real channels, names untranslated. */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="depth-rise border-border-line relative border">
            <div className="border-border-line flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3">
              <span className="bp-ref text-ink">Πώς μπαίνει στον αέρα</span>
              <span className="bp-annot">
                {"// ζωντανό σε 60 δευτερόλεπτα · σε όποιο site έχετε"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
              {CHANNELS.map((name) => (
                <div
                  key={name}
                  className="border-border-line border-b px-5 py-5 sm:border-r sm:border-b-0 sm:[&:nth-child(2)]:border-r-0"
                >
                  <span className="text-ink block font-mono text-[13px] tracking-[0.08em] uppercase">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What you see in the dashboard. */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-wrap items-end justify-between gap-4 border-b pb-5">
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Κάθε συζήτηση, στον πίνακά σας
            </h2>
            <span className="bp-annot hidden sm:block">
              {"// κανείς δεν παρακολουθεί ουρά"}
            </span>
          </div>
          <div className="border-border-line grid grid-cols-1 border-l sm:grid-cols-3">
            {DASHBOARD_CELLS.map((d) => (
              <div
                key={d.ref}
                className="border-border-line border-r border-b px-5 py-6"
              >
                <span className="bp-ref text-ink-mute block">{d.ref}</span>
                <h3 className="text-ink mt-2 text-base font-semibold tracking-[-0.01em]">
                  {d.title}
                </h3>
                <p className="text-ink-dim mt-1.5 text-sm leading-[1.55]">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing summary — same numbers as /el/pricing, no drift. */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="depth-rise border-border-line relative border px-6 py-8 sm:px-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-[52ch]">
                <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                  Δωρεάν για αρχή. Ακύρωση όποτε θέλετε.
                </h2>
                <p className="text-ink-dim mt-3 font-mono text-sm leading-[1.7]">
                  €0 για έναν agent. €9 έως €39 για περισσότερους.
                </p>
                <p className="bp-annot mt-4">
                  {"// το θέλετε συνδεδεμένο με CRM ή εσωτερικά εργαλεία; "}
                  <Link
                    href="/el/audit"
                    hrefLang="el"
                    className="text-draw hover:text-violet inline-block py-2 underline-offset-4 hover:underline"
                  >
                    κλείστε custom κατασκευή →
                  </Link>
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 sm:items-end">
                <Link href={registerUrl()} className={ctaClass()}>
                  Ξεκινήστε δωρεάν →
                </Link>
                <Link
                  href="/el/pricing"
                  hrefLang="el"
                  className="text-ink-dim hover:text-ink inline-block py-2 font-mono text-[12px] tracking-[0.08em] uppercase transition-colors"
                >
                  Πλήρεις τιμές →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-links — the other three roles, plus the EN twin. */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line border-b pb-4">
            <span className="bp-ref">Οι άλλοι ρόλοι στο φύλλο</span>
          </div>
          <ul>
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/el/roles/${o.slug}`}
                  hrefLang="el"
                  className="group border-border-line hover:bg-bg-elev/60 grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b py-5 transition-colors sm:gap-8"
                >
                  <span className="bp-ref text-ink-mute group-hover:text-violet w-14 shrink-0 transition-colors sm:w-20">
                    {o.ref}
                  </span>
                  <span className="text-ink text-base font-semibold tracking-[-0.01em] sm:text-lg">
                    {o.name}
                  </span>
                  <span
                    aria-hidden
                    className="text-ink-mute group-hover:text-violet font-mono text-lg transition-colors"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link
              href={`/roles/${r.slug}`}
              hrefLang="en"
              className="bp-annot normal-case inline-block py-1.5 underline underline-offset-4"
            >
              Read this page in English
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
