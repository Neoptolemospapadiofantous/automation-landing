import { registerUrl } from "./dashboard";

/**
 * `cat` sorts a link under a category heading inside its group — how you
 * get in ("Start here") versus what you can buy ("What we build"), and on the
 * app side what it does / what it's for / what it costs. Surfaces that
 * want the structure (header panel, mobile menu) render the headings; the
 * footer flattens them, because a footer column is an index and does not
 * need the argument.
 */
export type SiteLink = {
  href: string;
  label: string;
  desc: string;
  cat?: string;
};

/**
 * Items in source order, bucketed under their `cat` heading. One
 * implementation, so the header panel and the mobile menu can never
 * disagree about the shape of a group — the two-copies drift this grid
 * has been bitten by before. An item with no `cat` forms its own
 * unlabelled bucket, which is what keeps the Company and Legal groups
 * rendering exactly as they do today.
 */
export function byCategory(
  items: readonly SiteLink[],
): { cat: string; items: SiteLink[] }[] {
  const out: { cat: string; items: SiteLink[] }[] = [];
  for (const item of items) {
    const cat = item.cat ?? "";
    const last = out[out.length - 1];
    if (last && last.cat === cat) last.items.push(item);
    else out.push({ cat, items: [item] });
  }
  return out;
}

/**
 * THE ONE ENTRY STEP (founder, 2026-09-13). Every build CTA on the site
 * says exactly this. It replaced four names for the same free call —
 * "Book the audit", "Free Leak Report", "Talk about custom", "Custom
 * build". What the Leak Report did (show where customers leak) is now
 * one line of what the call covers.
 */
export const FREE_CALL = {
  label: "Book a free 30-minute call",
  /** Below `sm` only: the full label wraps a full-width button at 320px
   *  (the 09-07 lesson). Same step, same destination, fewer words. */
  short: "Book a free call",
  href: "/audit",
  what: "We show you where you're losing customers, then send a written fixed price within 48 hours. It's yours to keep.",
} as const;

export type Service = {
  /** Target URL segment once Phase 2 renames the pages. */
  slug: "website" | "chat-assistant" | "automations" | "lead-generation";
  name: string;
  /** The service page — always `/${slug}` since the 2026-09-13 rename. */
  href: string;
  /** What it is — one sentence, ≤15 words. Catalogue + service-page hero. */
  oneLiner: string;
  /** The result, in a different sentence from oneLiner (say each fact once). */
  outcome: string;
  /** How you buy it, shown before the price question is asked. */
  buyPath: string;
  /** What you get — 3–5 concrete things. */
  get: readonly string[];
  forWho: string;
  cost: string;
  time: string;
  /** "What it isn't" / the honest line. */
  isnt: string;
  /** The catalogue's "what's included" line. */
  includes: string;
};

/**
 * WHAT WE SELL — the single source for every surface that names a service
 * (founder, 2026-09-13; plan: every surface names the same four, in this
 * order, with the same definition). Each service answers the same six
 * questions: what it is · what you get · who it's for · what it costs ·
 * how long it takes · how to start.
 *
 * HONESTY RULES THAT LIVE IN THIS DATA, not in the components:
 * - The phone assistant, instant call-back and SMS are BUILT TO ORDER.
 *   The app ships website chat + the hosted chat page only (§3.4), so
 *   every such line says "built for you".
 * - Call-back and SMS go to people who ENQUIRED. We do not sell cold SMS
 *   or cold automated calls (EU consent rules + AI Act disclosure).
 * - WhatsApp is not offered — not in the app, not built for clients.
 * - No build prices. Timelines are the founder's typical figures
 *   (2026-09-13): website ~2 weeks, automations + voice 2–4 weeks, first
 *   outreach emails within 2 weeks.
 * - Call-back + SMS sit under Chat & voice, not Lead generation: they
 *   answer people who already enquired. Lead generation is finding and
 *   emailing NEW customers — one job per service.
 */
export const services: readonly Service[] = [
  {
    slug: "website",
    name: "Website",
    href: "/website",
    oneLiner: "A fast website for your business, in English or Greek.",
    outcome: "A site that looks right, loads fast and turns visitors into enquiries.",
    buyPath: "We build it · quoted",
    get: [
      "Design and words for up to about six pages",
      "Built for phones first",
      "The chat installed from day one",
      "Your own domain, and you own the code",
    ],
    forWho: "Businesses with no site, or a site that no longer brings enquiries.",
    cost: "Fixed price after a free call. Free with the yearly Operator chat plan (€390). A shop or portal is quoted separately.",
    time: "Live in about two weeks.",
    isnt: "A shop or booking portal. Those are quoted as their own build.",
    includes: "New site or a rebuild · built for phones · you own the code",
  },
  {
    slug: "chat-assistant",
    name: "Chat & voice assistant",
    href: "/chat-assistant",
    oneLiner: "Answers every enquiry on your site, day and night, and on your phone.",
    outcome: "Nobody who asks at 11pm waits until morning.",
    buyPath: "Chat free · voice quoted",
    get: [
      "Answers from your own documents, in the visitor's language",
      "Every lead captured, with the full conversation",
      "New leads sent to your CRM or Google Sheets",
      "A phone assistant that answers and books — built for you",
      "An instant call-back and SMS to everyone who enquires — built for you",
    ],
    forWho: "Car rental desks, clinics, hotels and villas — anyone whose customers ask after hours.",
    cost: "Chat: free to start, then €9–€39 a month. Phone, call-back and SMS: fixed price after a free call.",
    time: "Chat: live in about a minute. Phone, call-back and SMS: 2–4 weeks.",
    /* The "not yet in the do-it-yourself chat" list lives on the page as its
       own section; this line says something different so the page states
       each fact once. */
    isnt: "A call centre. Anything the assistant can't answer goes to your team, with the conversation attached.",
    includes: "Website chat · phone assistant · instant call-back · SMS follow-up",
  },
  {
    slug: "automations",
    name: "Automations",
    href: "/automations",
    oneLiner: "The follow-ups, reminders and invoices you send by hand, sent automatically.",
    outcome: "Your CRM, follow-ups and invoices stop needing a person to push them.",
    buyPath: "We build it · quoted",
    get: [
      "Connected to your CRM and inbox",
      "Follow-ups and reminders in your words, from your own address",
      "Invoice chasers",
      "Enquiries sorted and sent to the right person",
      "A live report of your numbers",
    ],
    forWho: "Firms, agencies and clinics where someone spends hours a week on the same emails.",
    cost: "Fixed price after a free call. You own everything we build.",
    time: "Live in 2–4 weeks.",
    isnt: "Cold email to strangers. That's Lead generation.",
    includes: "CRM sync · email follow-ups · invoice chasers · inbox triage · live reports",
  },
  {
    slug: "lead-generation",
    name: "Lead generation",
    href: "/lead-generation",
    oneLiner: "We find new customers who fit you, and email them for you.",
    outcome: "A steady flow of new customers, found and contacted for you.",
    buyPath: "We run it · quoted",
    get: [
      "A checked list of companies that fit you",
      "Cold emails in your words, from your own address",
      "Replies handed straight to you",
      "A monthly report on who replied and what to try next",
    ],
    forWho: "Businesses that want more customers than referrals bring — here or abroad.",
    cost: "Fixed price after a free call.",
    time: "First emails within two weeks. Volume grows as your address builds trust.",
    isnt: "Cold SMS or cold automated calls. We don't sell them.",
    includes: "Checked lists · your own sending address · replies to you · monthly report",
  },
];

/**
 * Greek twins of FREE_CALL and `services` — same slugs, same order, same
 * honesty rules, native Greek in the formal σας register. The EL pages and
 * the shared ServicePage / Catalogue components read these, so the Greek
 * site cannot drift from the English one in structure, only in words.
 * Greek names (2026-09-13, landing session — logged in SHARED.md §3.4):
 * Website = «Ιστοσελίδα», Chat & voice assistant = «Chat & φωνητικός
 * βοηθός», Automations = «Αυτοματισμοί», Lead generation = «Εύρεση
 * πελατών» (the Greek page already owns that search phrase).
 */
export const FREE_CALL_EL = {
  label: "Κλείστε δωρεάν ραντεβού 30 λεπτών",
  short: "Δωρεάν ραντεβού",
  href: "/el/audit",
  what: "Σας δείχνουμε πού χάνετε πελάτες και στέλνουμε γραπτή σταθερή τιμή μέσα σε 48 ώρες. Δική σας να την κρατήσετε.",
} as const;

export const servicesEl: readonly Service[] = [
  {
    slug: "website",
    name: "Ιστοσελίδα",
    href: "/el/website",
    oneLiner: "Μια γρήγορη ιστοσελίδα για την επιχείρησή σας, στα Ελληνικά ή στα Αγγλικά.",
    outcome: "Ένα site που δείχνει σωστό, ανοίγει γρήγορα και φέρνει μηνύματα.",
    buyPath: "Το φτιάχνουμε · προσφορά",
    get: [
      "Σχεδιασμός και κείμενα για έως περίπου έξι σελίδες",
      "Φτιαγμένο πρώτα για κινητό",
      "Το chat εγκατεστημένο από την πρώτη μέρα",
      "Δικό σας domain, και ο κώδικας δικός σας",
    ],
    forWho: "Επιχειρήσεις χωρίς site, ή με site που δεν φέρνει πια μηνύματα.",
    cost: "Σταθερή τιμή μετά από δωρεάν ραντεβού. Δωρεάν με το ετήσιο πλάνο Operator (€390). E-shop ή portal με ξεχωριστή προσφορά.",
    time: "Ζωντανό σε περίπου δύο εβδομάδες.",
    isnt: "E-shop ή σύστημα κρατήσεων. Αυτά είναι δική τους κατασκευή, με προσφορά.",
    includes: "Νέο site ή ανανέωση · πρώτα για κινητό · ο κώδικας δικός σας",
  },
  {
    slug: "chat-assistant",
    name: "Chat & φωνητικός βοηθός",
    href: "/el/chat-assistant",
    oneLiner: "Απαντά σε κάθε μήνυμα στο site σας, μέρα και νύχτα, και στο τηλέφωνο.",
    outcome: "Όποιος ρωτά στις 23:00 δεν περιμένει ως το πρωί.",
    buyPath: "Chat δωρεάν · φωνή: τιμή",
    get: [
      "Απαντήσεις από τα δικά σας κείμενα, στη γλώσσα του επισκέπτη",
      "Κάθε lead καταγεγραμμένο, με όλη τη συζήτηση",
      "Τα νέα leads πάνε στο CRM σας ή στα Google Sheets",
      "Φωνητικός βοηθός που απαντά και κλείνει ραντεβού — τον στήνουμε εμείς",
      "Άμεση επανάκληση και SMS σε όποιον στείλει μήνυμα — τα στήνουμε εμείς",
    ],
    forWho: "Ενοικιάσεις αυτοκινήτων, κλινικές, ξενοδοχεία και βίλες — όσοι δέχονται ερωτήσεις εκτός ωραρίου.",
    cost: "Chat: δωρεάν για αρχή, μετά €9–€39 τον μήνα. Τηλέφωνο, επανάκληση και SMS: σταθερή τιμή μετά από δωρεάν ραντεβού.",
    time: "Chat: ζωντανό σε περίπου ένα λεπτό. Τηλέφωνο, επανάκληση και SMS: 2–4 εβδομάδες.",
    isnt: "Τηλεφωνικό κέντρο. Ό,τι δεν μπορεί να απαντήσει πάει στην ομάδα σας, με τη συζήτηση μαζί.",
    includes: "Chat ιστοσελίδας · φωνητικός βοηθός · άμεση επανάκληση · SMS",
  },
  {
    slug: "automations",
    name: "Αυτοματισμοί",
    href: "/el/automations",
    oneLiner: "Τα follow-up, οι υπενθυμίσεις και τα τιμολόγια που στέλνετε με το χέρι, αυτόματα.",
    outcome: "Το CRM, τα follow-up και τα τιμολόγια δεν θέλουν πια κάποιον να τα σπρώχνει.",
    buyPath: "Το φτιάχνουμε · προσφορά",
    get: [
      "Σύνδεση με το CRM και το inbox σας",
      "Follow-up και υπενθυμίσεις με τα δικά σας λόγια, από τη δική σας διεύθυνση",
      "Όχληση τιμολογίων",
      "Τα μηνύματα ταξινομούνται και πάνε στον σωστό άνθρωπο",
      "Ζωντανή αναφορά με τους αριθμούς σας",
    ],
    forWho: "Γραφεία, εταιρείες και κλινικές όπου κάποιος ξοδεύει ώρες την εβδομάδα στα ίδια email.",
    cost: "Σταθερή τιμή μετά από δωρεάν ραντεβού. Ό,τι φτιάχνουμε είναι δικό σας.",
    time: "Ζωντανό σε 2–4 εβδομάδες.",
    isnt: "Cold email σε αγνώστους. Αυτό είναι η Εύρεση πελατών.",
    includes: "Σύνδεση CRM · follow-up · όχληση τιμολογίων · ταξινόμηση εισερχομένων · ζωντανές αναφορές",
  },
  {
    slug: "lead-generation",
    name: "Εύρεση πελατών",
    href: "/el/lead-generation",
    oneLiner: "Βρίσκουμε νέους πελάτες που σας ταιριάζουν, και τους στέλνουμε email για εσάς.",
    outcome: "Σταθερή ροή νέων πελατών — τους βρίσκουμε και τους προσεγγίζουμε εμείς.",
    buyPath: "Το τρέχουμε · προσφορά",
    get: [
      "Ελεγμένη λίστα επιχειρήσεων που σας ταιριάζουν",
      "Cold email με τα δικά σας λόγια, από τη δική σας διεύθυνση",
      "Οι απαντήσεις έρχονται κατευθείαν σε εσάς",
      "Μηνιαία αναφορά: ποιος απάντησε και τι δοκιμάζουμε μετά",
    ],
    forWho: "Επιχειρήσεις που θέλουν περισσότερους πελάτες από όσους φέρνουν οι συστάσεις — εδώ ή στο εξωτερικό.",
    cost: "Σταθερή τιμή μετά από δωρεάν ραντεβού.",
    time: "Τα πρώτα email μέσα σε δύο εβδομάδες. Ο όγκος μεγαλώνει καθώς η διεύθυνσή σας κερδίζει εμπιστοσύνη.",
    isnt: "Cold SMS ή αυτόματες κλήσεις σε αγνώστους. Δεν τα πουλάμε.",
    includes: "Ελεγμένες λίστες · η δική σας διεύθυνση · απαντήσεις σε εσάς · μηνιαία αναφορά",
  },
];

/** Greek service by slug — same contract as serviceBySlug. */
export function serviceBySlugEl(slug: Service["slug"]): Service {
  const found = servicesEl.find((sv) => sv.slug === slug);
  if (!found) throw new Error(`Unknown Greek service slug: ${slug}`);
  return found;
}

/* Greek catalogue view — never a hand-kept second grid. */
export const buildCatalogueEl = servicesEl.map((sv) => ({
  name: sv.name,
  href: sv.href,
  desc: sv.oneLiner,
  covers: sv.includes,
}));

/** A service by slug. Throws rather than returning undefined: a page that
 *  asks for a slug which is not in `services` is a build-time bug. */
export function serviceBySlug(slug: Service["slug"]): Service {
  const found = services.find((sv) => sv.slug === slug);
  if (!found) throw new Error(`Unknown service slug: ${slug}`);
  return found;
}

/* The catalogue is a VIEW of `services`, never a second list. */
export const buildCatalogue = services.map((s) => ({
  name: s.name,
  href: s.href,
  desc: s.oneLiner,
  covers: s.includes,
}));

/**
 * THE SITE MAP — one source for the header dropdown, the mobile menu, the
 * footer columns and the homepage index band.
 *
 * These four surfaces used to be four hand-kept lists, and they had already
 * drifted: the role pages sat in the footer and nowhere in the header, so a
 * visitor on a desktop could not reach half the product from the top of the
 * page. Anything added here appears in all four places at once.
 *
 * `roles` is derived from rolePages further down, so a new role never has to
 * be registered in a second list.
 */
export const siteMap = {
  /* WHAT WE SELL — the four services, DERIVED from `services`, so the
     header panel, mobile menu and footer can never name them differently.
     Replaced the Studio/App groups on 2026-09-13: those line names left
     public copy and stay internal (dashboard, sales). */
  services: {
    heading: "What we sell",
    items: services.map((sv) => ({
      href: sv.href,
      label: sv.name,
      desc: sv.oneLiner,
    })) satisfies SiteLink[],
  },
  start: {
    heading: "Get started",
    items: [
      { href: FREE_CALL.href, label: FREE_CALL.label, desc: FREE_CALL.what },
      {
        href: "/pricing",
        label: "Pricing",
        desc: "Chat plans from €0, and how building for you works.",
      },
    ] satisfies SiteLink[],
  },
  company: {
    heading: "Company",
    note: "// talk to us",
    items: [
      {
        href: "https://www.linkedin.com/company/flowstack-run",
        label: "LinkedIn",
        desc: "What we are shipping, in public.",
      },
      {
        href: "mailto:hello@flowstack.run",
        label: "hello@flowstack.run",
        desc: "A human reads this one.",
      },
    ] satisfies SiteLink[],
  },
  legal: {
    heading: "Legal",
    note: "// in force",
    items: [
      { href: "/privacy", label: "Privacy", desc: "What we collect and why." },
      { href: "/terms", label: "Terms", desc: "The agreement you are on." },
      { href: "/security", label: "Security", desc: "How your data is held." },
      { href: "/dpa", label: "DPA", desc: "Our data processing agreement." },
    ] satisfies SiteLink[],
  },
} as const;

/**
 * Primary nav bar.
 *
 * FOUR ITEMS IS STILL THE CEILING — at the `lg` breakpoint where these first
 * appear there is ~112px of slack in the header row and a fifth link costs
 * ~105px. That is why the full set is reached through the `Services` panel
 * rather than by growing this list: the bar keeps the two highest-intent
 * destinations one click away, and the panel holds everything else.
 */
export const nav = {
  /** The item that opens the structured panel. */
  menuLabel: "Services",
  /** Flat items to the right of the panel trigger. */
  links: [{ href: "/pricing", label: "Pricing" }],
};


/**
 * Per-role landing pages (/roles/{slug}) — the single source for both
 * the homepage role cards AND the long-form role pages, so the two can
 * never drift. Copy rule (same as everywhere): every claim must be
 * backed by what the dashboard actually ships — knowledge-base upload,
 * transcripts, lead routing, the real-time dashboard, the web widget +
 * hosted chat page, EUR pricing. No SLAs, no integrations that live in
 * the custom build engagement.
 */
export type RoleDoes = { ref: string; title: string; desc: string };

export type RolePage = {
  slug: string;
  ref: string;
  name: string;
  /** Short card copy (homepage roles list). */
  desc: string;
  /** SEO title — the query the page targets. Brand appended by template. */
  metaTitle: string;
  metaDescription: string;
  /** Headline split so the template can gradient the accent. */
  h1: string;
  h1Accent: string;
  lead: string;
  does: RoleDoes[];
};

export const rolePages: RolePage[] = [
  {
    slug: "lead-qualification",
    ref: "ROLE-01",
    name: "Lead qualification",
    desc: "Works out who is worth your time. You only get the good ones.",
    metaTitle: "Automated lead qualification for your website",
    metaDescription:
      "Qualify every visitor before your team spends a minute on them. Transcripts, lead routing and a live dashboard. Free to start, €9/mo paid.",
    h1: "The lead that arrives at midnight",
    h1Accent: "shouldn't wait until morning.",
    lead: "Questions arrive at all hours. The chat sorts them and passes you the good ones.",
    does: [
      {
        ref: "N-01",
        title: "Greets every inbound visit",
        desc: "No forms, no queue — an instant first touch, at any hour.",
      },
      {
        ref: "N-02",
        title: "Scores the ones worth your time",
        desc: "Asks a few questions and scores the visitor before anyone is pinged.",
      },
      {
        ref: "N-03",
        title: "Hands over only the warm conversations",
        desc: "Good leads land on your dashboard with the whole conversation attached.",
      },
    ],
  },
  {
    slug: "sales",
    ref: "ROLE-02",
    name: "Sales",
    desc: "Answers pricing questions on the spot. Books the demo.",
    metaTitle: "Automated sales agent for your website",
    metaDescription:
      "Walks visitors through your offer, answers pricing and scope questions, and books qualified demos onto your calendar. Free to start, €9/mo paid.",
    h1: "Most visitors with a buying question",
    h1Accent: "never ask it. They leave.",
    lead: "A buyer with a question won't wait. The chat answers it and books the call.",
    does: [
      {
        ref: "N-01",
        title: "Walks visitors through your offer",
        desc: "What you do, for whom, why it fits — from your own knowledge.",
      },
      {
        ref: "N-02",
        title: "Handles pricing and scope questions",
        desc: "Price and scope questions answered on the spot.",
      },
      {
        ref: "N-03",
        title: "Books qualified demos",
        desc: "Good conversations end on your calendar.",
      },
    ],
  },
  {
    slug: "customer-support",
    ref: "ROLE-03",
    name: "Customer support",
    desc: "Answers the questions your team keeps answering.",
    metaTitle: "Automated customer support agent for your website",
    metaDescription:
      "First-line answers from your own knowledge base, escalation only when a human is needed, every conversation captured. Free to start, €9/mo paid.",
    h1: "First-line support that sounds like you,",
    h1Accent: "not a script.",
    lead: "The same ten questions eat your day. The chat answers them from your own docs.",
    does: [
      {
        ref: "N-01",
        title: "Answers from your knowledge base",
        desc: "Answers from your docs and FAQs, in your tone — not generic.",
      },
      {
        ref: "N-02",
        title: "Escalates only when needed",
        desc: "Repeat questions handled instantly. A human is one ask away.",
      },
      {
        ref: "N-03",
        title: "Captures every conversation",
        desc: "Every conversation saved on your dashboard. Nobody watches a queue.",
      },
    ],
  },
  {
    slug: "onboarding",
    ref: "ROLE-04",
    name: "Onboarding",
    desc: "Walks new customers through setup, routes the rest to you.",
    metaTitle: "Automated customer onboarding agent",
    metaDescription:
      "Walk every new customer through setup, answer the recurring questions from your docs, and route the rest to your team. Free to start, €9/mo paid.",
    h1: "New customers sign up excited,",
    h1Accent: "then get stuck.",
    lead: "New customers get stuck right after signing up. The chat walks them through setup.",
    does: [
      {
        ref: "N-01",
        title: "Guides setup step by step",
        desc: "Step-by-step setup instead of a wall of docs.",
      },
      {
        ref: "N-02",
        title: "Answers the recurring questions",
        desc: "The questions every new account asks, answered instantly.",
      },
      {
        ref: "N-03",
        title: "Routes the exceptions to your team",
        desc: "Whatever needs a human lands with your team, conversation attached.",
      },
    ],
  },
];

/**
 * Homepage role cards — derived from rolePages so card copy and page
 * copy share one source. Order = priority.
 */
export const agentRoles = rolePages.map(({ ref, name, desc, slug }) => ({
  ref,
  name,
  desc,
  slug,
  available: true,
}));

/**
 * What we build for you — the service catalogue, shared by the homepage
 * band and the pricing page so the two can never drift.
 *
 * DELIBERATELY UNPRICED (founder decision, 2026-08-10). Build work is
 * scoped and quoted after the audit, never listed: a list price on a
 * bespoke build is a guess the client would later hold us to. The
 * priced document is the services sheet, delivered with the proposal —
 * it stays a sales artefact and never becomes a web page.
 *
 * FOUR SERVICES (founder, 2026-09-13: "a website, a website chat/voice
 * system, automations if needed in their CRM, and lead generation").
 * Cut from twelve to five on 09-08, then to four: the dashboard service
 * ("Numbers") folds into Automations as live reports, and /what-works
 * stays live for its search traffic, linked from the end-to-end band.
 * `covers` is what keeps "fewer services" from meaning "less offer", so
 * do not drop it when editing a cell.
 *
 * ⚠ VOICE AND SMS ARE BUILD WORK, NOT PRODUCT. The app ships website
 * chat and the hosted chat page only (§3.4 channels). The phone
 * assistant, instant call-back and SMS follow-up are sold here as things
 * the Studio builds for a client — never describe them as part of a plan.
 * Call-back and SMS go to people who ENQUIRED; cold SMS and cold
 * automated calls are not offered (EU consent + AI Act disclosure).
 *
 * ⚠ The priced sheets (master-vm-system/docs/SERVICES_EN|EL.html) still
 * carry the twelve-row table and are now the drifted copy — they need
 * re-cutting to these five when next rendered.
 */


export const faqItems = [
  {
    q: "Is this just a chat widget?",
    a: "No. We sell four things: a website, a chat and voice assistant, automations and lead generation. The chat is the only one you set up yourself.",
  },
  {
    q: "What do the chat plans cost?",
    /* Not "every feature on at every tier" — that was false: leads to your
       CRM start at Starter and your own AI key at Growth. */
    a: "Free for one chat assistant. Then €9, €19 or €39 a month, and €39 is the top plan. The core chat is on every plan.",
  },
  {
    q: "Can I use my own OpenAI, Anthropic or Google key?",
    a: "From Growth up, yes. Premium models run only on your own key — no credits, 10,000 messages a month on Growth, 25,000 on Operator. Every plan includes Flowstack Core on credits.",
  },
  {
    q: "Does Operator really include a free website?",
    a: "Yes — on the annual plan (€390/yr). The brochure-style site, up to about six pages, chat installed. A shop or portal is its own quoted build.",
  },
  {
    q: "Does it connect to my existing stack?",
    a: "From Starter up, each new lead and handoff request goes by webhook to Zapier, Make, Google Sheets or your CRM as it happens. Deeper wiring is our Automations service — a fixed price, and you keep the code.",
  },
  {
    q: "When should I have it built for me?",
    a: "When you want a website, a phone assistant, automations in your CRM, or new customers found for you. The chat plans cover the website chat on its own.",
  },
  {
    q: "Are we locked in?",
    a: "No. Cancel anytime, no minimums, no exit fees. You keep the code."
  },
] as const;

export type Tint = "violet" | "cyan" | "success" | "warn" | "danger";

/* ---------- Pricing tiers (Pricing page) ---------- */
/**
 * The do-it-yourself chat plans, in CUSTOMER UNITS (plan 2026-09-13).
 * A buyer cannot price "2,500 conversation credits"; they can price
 * "about 300–500 chats a month". Every chats range uses the one rate the
 * chat's own knowledge base states (docs/landing-kb/pricing.md: a short chat
 * is about 5–8 credits), so the site and the chat can never quote two
 * different numbers. Credits, top-ups and own-AI-key detail live in the
 * small print under the grid and in the FAQ. Names and prices are §3.4.
 */
export const pricingTiers = [
  {
    name: "Free",
    price: "€0/mo",
    cadence: "1 chat assistant · no card required",
    tint: "cyan",
    tagline: "Put it on your own site and watch it answer.",
    features: [
      "1 chat assistant",
      "About 30–50 chats a month",
      "Answers from your own documents",
      "Every lead on your dashboard",
      "No card, no expiry",
    ],
    cta: { href: registerUrl(), label: "Start free" },
    featured: false,
  },
  {
    name: "Starter",
    deal: { strike: "€108", annual: "€90" },
    price: "€9/mo",
    cadence: "1 chat assistant · cancel anytime",
    tint: "cyan",
    tagline: "One chat assistant, live in a minute.",
    features: [
      "1 chat assistant",
      "About 300–500 chats a month",
      "Leads sent to your CRM or Google Sheets",
      "Answers from your own documents",
      "Cancel anytime · no lock-in",
    ],
    cta: { href: registerUrl(), label: "Try it for €9" },
    featured: false,
  },
  {
    name: "Growth",
    deal: { strike: "€228", annual: "€190" },
    price: "€19/mo",
    cadence: "up to 5 chat assistants · cancel anytime",
    tint: "violet",
    tagline: "For a site with real traffic.",
    features: [
      "Everything in Starter",
      "Up to 5 chat assistants",
      "About 1,250–2,000 chats a month",
      "Bring your own AI key (advanced)",
      "Cancel anytime · no lock-in",
    ],
    cta: { href: registerUrl(), label: "Choose Growth" },
    featured: true,
  },
  {
    name: "Operator",
    deal: { strike: "€468", annual: "€390" },
    price: "€39/mo",
    cadence: "up to 5 chat assistants · cancel anytime",
    tint: "violet",
    tagline: "For a chat that is busy every day.",
    features: [
      "Everything in Growth",
      "Free website build with the annual plan",
      "About 3,000–5,000 chats a month",
      "Best price per chat · our top plan",
      "Cancel anytime · no lock-in",
    ],
    cta: { href: registerUrl(), label: "Choose Operator" },
    featured: false,
  },
  {
    name: "Custom",
    price: "Let's talk",
    cadence: "fixed price after a free call",
    tint: "success",
    tagline: "When you need more than the chat.",
    features: [
      "A phone assistant, call-back and SMS",
      "Wired into your CRM and tools",
      "Your own AI model or interface",
      "Handover, and optional care after",
    ],
    /* Shortest form of FREE_CALL. At 1024px a five-column card holds 15
       characters on one line ("Choose Operator"); "Book a free call" is 16
       and wrapped (measured 2026-09-13 — the lg band has now broken three
       times). */
    cta: { href: FREE_CALL.href, label: "Book a call" },
    featured: false,
  },
] as const;
