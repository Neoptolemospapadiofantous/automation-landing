import { registerUrl } from "./dashboard";

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
export type SiteLink = { href: string; label: string; desc: string };

export const siteMap = {
  services: {
    heading: "Services",
    note: "// what we sell",
    items: [
      {
        href: "/pricing",
        label: "Chat plans",
        desc: "What the chat costs. Free, then €9 to €39 a month.",
      },
      {
        href: "/outreach",
        label: "Cold outreach",
        desc: "We find companies that fit you and email them in your voice.",
      },
      {
        href: "/what-works",
        label: "What works",
        desc: "Your numbers in one dashboard, and the tests behind them.",
      },
      {
        href: "/audit",
        label: "Custom build",
        desc: "Free 30-minute call, written price in 48 hours.",
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
    { href: "/what-works", label: "What works" },
    { href: "/audit", label: "Custom build" },
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
}));

export const siteMapRoles = {
  heading: "The chat, by job",
  note: "// same product, four jobs",
  items: roleLinks,
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
 * Names track that sheet exactly, because a customer sees both.
 * Source: master-vm-system/docs/SERVICES_EN.html.
 */
export const buildCatalogue = [
  {
    name: "Agent go-live",
    desc: "We load your knowledge, tune the voice, and install it on your site.",
  },
  {
    name: "Cold outreach",
    href: "/outreach",
    desc: "Your own address, a checked list, emails written in your voice.",
  },
  {
    name: "One live view",
    href: "/what-works",
    desc: "The numbers you rebuild by hand, pulled into one dashboard.",
  },
  {
    name: "Booking",
    desc: "Booking, confirmation and reminders. No phone tag.",
  },
  {
    name: "Invoices & documents",
    desc: "Invoices made, sent and chased. The follow-up runs itself.",
  },
  {
    name: "Connect your tools",
    desc: "Your CRM, sheets and inbox stop needing the same thing typed twice.",
  },
  {
    name: "Inbox triage",
    desc: "Incoming mail sorted, labelled and routed automatically.",
  },
  {
    name: "Ongoing care",
    desc: "We watch what we built and fix it before you notice.",
  },
] as const;

export const faqItems = [
  {
    q: "Is this just a chat widget?",
    a: "No. The chat answers your website. Behind it, we automate your repetitive work and pull your numbers into one view.",
  },
  {
    q: "What do the plans cost?",
    a: "Free · 1 agent · 250 credits. Then €9, €19 or €39/mo for more agents and volume. €39 is our most expensive plan. Every feature on at every tier.",
  },
  {
    q: "Does it connect to my existing stack?",
    a: "The subscription ships the chat. Wiring into your CRM, helpdesk or internal APIs is the custom build — fixed scope, you keep the code.",
  },
  {
    q: "When do I need a custom build?",
    a: "When you need integrations, data pipelines, or your own UI. The subscription covers the standard 80% — we build the rest.",
  },
  {
    q: "Are we locked in?",
    a: "No. Cancel anytime, no minimums, no exit fees. Custom builds: you keep the code.",
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
    price: "€19/mo",
    cadence: "up to 5 agents · cancel anytime",
    tint: "violet",
    tagline: "For a site with real traffic.",
    features: [
      "Everything in Starter",
      "Up to 5 agents",
      "10,000 conversation credits / month",
      "Top-up credits anytime",
      "Cancel anytime · no lock-in",
    ],
    cta: { href: registerUrl(), label: "Choose Growth" },
    featured: true,
  },
  {
    name: "Operator",
    price: "€39/mo",
    cadence: "up to 5 agents · cancel anytime",
    tint: "violet",
    tagline: "For teams running several agents every day.",
    features: [
      "Everything in Growth",
      "Up to 5 agents",
      "25,000 conversation credits / month",
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
