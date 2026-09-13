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
  /* THE STUDIO — the done-for-you line. One of the two groups the header,
     mobile menu, footer and homepage index all read (founder, 2026-09-06:
     regroup the header to the two lines, keep every page). */
  studio: {
    heading: "The Studio",
    note: "// done for you, in Cyprus",
    pitch:
      "You hand it over. We build it, run it and report on it \u2014 one team, one quote.",
    /* Labels are the four service names from `buildCatalogue`, verbatim.
       The header used to run its own vocabulary ("Website build", "Cold
       outreach", "What works") beside the catalogue's, which is half of
       why the offer read as a long list of unrelated things. /what-works
       is deliberately NOT here since 2026-09-13 — reports are part of
       Automations; the page is linked from the homepage end-to-end band. */
    items: [
      {
        href: "/studio",
        label: "The Studio",
        desc: "Done for you, in Cyprus. Starts with the free Leak Report.",
        cat: "Start here",
      },
      {
        href: "/audit",
        label: "Custom build",
        desc: "Free 30-minute call, written price in 48 hours.",
        cat: "Start here",
      },
      {
        href: "/website-build",
        label: "Website",
        desc: "Built or rebuilt, with the chat on it from day one.",
        cat: "What we build",
      },
      {
        href: "/studio#packages",
        label: "Chat & voice assistant",
        desc: "Answers every enquiry on your site and phone, and books it.",
        cat: "What we build",
      },
      {
        href: "/email-automation",
        label: "Automations",
        desc: "Your CRM, follow-ups, invoices and reports, running themselves.",
        cat: "What we build",
      },
      {
        href: "/outreach",
        label: "Lead generation",
        desc: "Cold email, instant call-back and SMS follow-up.",
        cat: "What we build",
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
  links: [
    { href: "/outreach", label: "Lead generation" },
    { href: "/studio", label: "The Studio" },
    { href: "/pricing", label: "Pricing" },
  ],
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
 * The roles group of the site map — derived, so adding a role to `rolePages`
 * puts it in the header panel, the mobile menu, the footer and the homepage
 * index with no second edit.
 */
export const roleLinks: SiteLink[] = rolePages.map((r) => ({
  href: `/roles/${r.slug}`,
  label: r.name,
  desc: r.desc,
  cat: "What it's for",
}));

/* THE APP — the self-serve line: plans, the module page, then the chat's
   four jobs (derived from rolePages, so a new role still reaches every
   surface with no second edit). */
export const siteMapApp = {
  heading: "The app",
  note: "// the chat you run yourself",
  /* The offer in one line, and every clause of it is live today per
     /suite: it answers from the customer's own material, it captures and
     scores, the board is real, and Free is one agent. Nothing that is
     still "not yet available" may be implied here. */
  pitch: "You run it. Answers from your own material, captures and scores the lead, hands you the board — free for one agent.",
  items: [
    {
      href: "/suite",
      label: "Module by module",
      desc: "Six things live today, five not yet — and where to ask for them.",
      cat: "What it does",
    },
    ...roleLinks,
    {
      href: "/pricing",
      label: "Chat plans",
      desc: "Free for one agent, then €9 to €39 a month. Cancel any month.",
      cat: "What it costs",
    },
  ] satisfies SiteLink[],
};

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
export const buildCatalogue = [
  {
    name: "Website",
    href: "/website-build",
    desc: "A fast site in English or Greek, with the chat installed from day one.",
    covers: "New site or a rebuild \u00b7 built for phones \u00b7 you own the code",
  },
  {
    name: "Chat & voice assistant",
    href: "/studio#packages",
    desc: "Trained on your business. Answers on your site and your phone, books appointments, and hands you the lead.",
    covers: "Website chat \u00b7 phone assistant \u00b7 booking \u00b7 handover to your team",
  },
  {
    name: "Automations",
    href: "/email-automation",
    desc: "Connected to your CRM, so follow-ups, reminders and invoices go out without anyone pressing send.",
    covers:
      "CRM sync \u00b7 email follow-ups \u00b7 invoice chasers \u00b7 inbox triage \u00b7 live reports",
  },
  {
    name: "Lead generation",
    href: "/outreach",
    desc: "Cold email to companies that fit you, plus an instant call-back and SMS to everyone who enquires.",
    covers:
      "Checked lists \u00b7 your own sending address \u00b7 instant call-back \u00b7 replies to you",
  },
] as const;

export const faqItems = [
  {
    q: "Is this just a chat widget?",
    a: "No. The chat is the front door. Behind it we automate the busywork and put your numbers in one view.",
  },
  {
    q: "What do the plans cost?",
    a: "Free for one agent. Then €9, €19 or €39 a month. €39 is the top plan. Every feature on at every tier.",
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
    a: "Paid plans push each new lead and handoff request to Zapier, Make, Google Sheets or your CRM by webhook, as it happens. Deeper wiring is a custom build — fixed scope, you keep the code.",
  },
  {
    q: "When do I need a custom build?",
    a: "For a website, integrations, data pipelines or your own UI. The subscription covers the standard 80%.",
  },
  {
    q: "Are we locked in?",
    a: "No. Cancel anytime, no minimums, no exit fees. You keep the code."
  },
] as const;

export type Tint = "violet" | "cyan" | "success" | "warn" | "danger";

/* ---------- Pricing tiers (Pricing page) ---------- */
export const pricingTiers = [
  {
    name: "Free",
    price: "€0/mo",
    cadence: "1 agent · no card required",
    tint: "cyan",
    tagline: "Put it on your own site and watch it answer.",
    features: [
      "1 agent, any role",
      "250 conversation credits / month",
      "Knowledge-base upload + transcripts",
      "Real-time leads dashboard",
      "No card, no expiry",
    ],
    cta: { href: registerUrl(), label: "Start free" },
    featured: false,
  },
  {
    name: "Starter",
    deal: { strike: "€108", annual: "€90" },
    price: "€9/mo",
    cadence: "1 agent · cancel anytime",
    tint: "cyan",
    tagline: "One agent, live in a minute. Every feature on.",
    features: [
      "1 agent, any role",
      "2,500 conversation credits / month",
      "Top-up credits anytime",
      "Knowledge-base upload + transcripts",
      "Cancel anytime · no lock-in",
    ],
    cta: { href: registerUrl(), label: "Try it for €9" },
    featured: false,
  },
  {
    name: "Growth",
    deal: { strike: "€228", annual: "€190" },
    price: "€19/mo",
    cadence: "up to 5 agents · cancel anytime",
    tint: "violet",
    tagline: "For a site with real traffic.",
    features: [
      "Everything in Starter",
      "Up to 5 agents",
      "10,000 conversation credits / month",
      "Or your own API key — 10,000 messages, no credits",
      "Top-up credits anytime",
      "Cancel anytime · no lock-in",
    ],
    cta: { href: registerUrl(), label: "Choose Growth" },
    featured: true,
  },
  {
    name: "Operator",
    deal: { strike: "€468", annual: "€390" },
    price: "€39/mo",
    cadence: "up to 5 agents · cancel anytime",
    tint: "violet",
    tagline: "For teams running several agents every day.",
    features: [
      "Everything in Growth",
      "Free website build with the annual plan",
      "Up to 5 agents",
      "25,000 conversation credits / month",
      "Or your own API key — 25,000 messages, no credits",
      "Best rate per credit · our top plan",
      "Cancel anytime · no lock-in",
    ],
    cta: { href: registerUrl(), label: "Choose Operator" },
    featured: false,
  },
  {
    name: "Custom",
    price: "Let's talk",
    cadence: "scoped · 4–6 week build",
    tint: "success",
    tagline: "When the standard chat is not enough.",
    features: [
      "Bespoke flows on your stack",
      "Custom integrations (CRM, telephony, internal tools)",
      "Your own LLM, your own UI",
      "Trained on your knowledge + voice",
      "Runbooks + handover · optional retainer",
    ],
    cta: { href: "/audit", label: "Book the audit" },
    featured: false,
  },
] as const;
