import { registerUrl } from "./dashboard";

export const nav = {
  links: [
    { href: "/#agents", label: "Product" },
    { href: "/#pipeline", label: "How it works" },
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
    desc: "Qualifies every visit on ICP fit. Your team gets only the warm ones.",
    metaTitle: "Automated lead qualification for your website",
    metaDescription:
      "Qualify every inbound visitor on ICP fit before your team spends a minute. Full transcripts, lead routing and a real-time dashboard. Live in 60 seconds, from €99/mo.",
    h1: "The lead that arrives at midnight",
    h1Accent: "shouldn't wait until morning.",
    lead: "Inbound doesn't keep office hours. The agent qualifies every visitor and hands over only the warm ones.",
    does: [
      {
        ref: "N-01",
        title: "Greets every inbound visit",
        desc: "No forms, no queue — an instant first touch, at any hour.",
      },
      {
        ref: "N-02",
        title: "Qualifies on ICP fit",
        desc: "Asks the questions that matter, scores each conversation before anyone is pinged.",
      },
      {
        ref: "N-03",
        title: "Hands over only the warm conversations",
        desc: "Warm leads land on your dashboard with full transcripts; the rest cost nothing.",
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
      "An automated sales agent that walks visitors through your offer, answers pricing and scope questions, and books qualified demos onto your calendar. Live in 60 seconds, from €99/mo.",
    h1: "Most visitors with a buying question",
    h1Accent: "never ask it. They leave.",
    lead: "Buying questions don't wait — a competitor is one tab away. The agent answers on the spot and books the demo.",
    does: [
      {
        ref: "N-01",
        title: "Walks visitors through your offer",
        desc: "What you do, for whom, why it fits — from your own knowledge.",
      },
      {
        ref: "N-02",
        title: "Handles pricing and scope questions",
        desc: "Deal-stalling questions answered on the spot, inside the conversation.",
      },
      {
        ref: "N-03",
        title: "Books qualified demos",
        desc: "Qualified conversations end on your calendar, transcribed.",
      },
    ],
  },
  {
    slug: "customer-support",
    ref: "ROLE-03",
    name: "Customer support",
    desc: "First-line answers from your knowledge base, in your tone.",
    metaTitle: "Automated customer support agent for your website",
    metaDescription:
      "First-line support answers from your own knowledge base, escalation only when a human is actually needed, and every conversation captured. Live in 60 seconds, from €99/mo.",
    h1: "First-line support that sounds like you,",
    h1Accent: "not a script.",
    lead: "The same ten questions eat your day. The agent resolves them from your knowledge base — a human is one ask away.",
    does: [
      {
        ref: "N-01",
        title: "Answers from your knowledge base",
        desc: "Answers from your docs and FAQs, in your tone — not generic.",
      },
      {
        ref: "N-02",
        title: "Escalates only when needed",
        desc: "Recurring questions resolved instantly; a human is one ask away.",
      },
      {
        ref: "N-03",
        title: "Captures every conversation",
        desc: "Every thread transcribed on your dashboard — no one watches a queue.",
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
      "Walk every new customer through setup step by step, answer the recurring questions from your docs, and route the rest to your team. Live in 60 seconds, from €99/mo.",
    h1: "New customers sign up excited,",
    h1Accent: "then get stuck.",
    lead: "Customers churn between signup and first value. The agent walks each one through setup, routes the stuck ones to you.",
    does: [
      {
        ref: "N-01",
        title: "Guides setup step by step",
        desc: "Interactive setup guidance instead of digging through docs alone.",
      },
      {
        ref: "N-02",
        title: "Answers the recurring questions",
        desc: "The questions every new account asks, answered instantly from your docs.",
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
 * Names track that sheet exactly, because a customer sees both.
 * Source: master-vm-system/docs/SERVICES_EN.html.
 */
export const buildCatalogue = [
  {
    name: "Agent go-live",
    desc: "We load your knowledge, write the instant answers for your common questions, tune how it speaks and install it on your site.",
  },
  {
    name: "Cold outreach",
    desc: "Your own sending domain, your ideal-customer list built and verified, sequences in your voice, sending on a schedule.",
  },
  {
    name: "One live view",
    desc: "The numbers you rebuild by hand every week, pulled out of the tools they're scattered across into one dashboard.",
  },
  {
    name: "Booking",
    desc: "A real calendar connection: request, availability, booking, confirmation and reminder — end to end, no phone tag.",
  },
  {
    name: "Invoices & documents",
    desc: "Documents generated, sent and chased automatically, with the payment follow-up running itself.",
  },
  {
    name: "Connect your tools",
    desc: "Two or more systems kept in step, so your CRM, spreadsheets and inbox stop needing the same thing typed twice.",
  },
  {
    name: "Inbox triage",
    desc: "Incoming mail sorted, labelled and routed to the right person automatically.",
  },
  {
    name: "Ongoing care",
    desc: "We watch everything we built and are alerted before you notice a problem. Breakages are never billed.",
  },
] as const;

export const faqItems = [
  {
    q: "Is this just a chat widget?",
    a: "No. The chat answers your website. Behind it, we build the systems that do your repetitive work and gather your numbers into one view.",
  },
  {
    q: "What's in the Starter plan?",
    a: "€99/mo · 1 agent · 2,500 conversation credits · cancel anytime. Every feature on.",
  },
  {
    q: "Does it connect to my existing stack?",
    a: "Starter ships the chat. Wiring into your CRM, helpdesk or internal APIs is the custom build — fixed scope, you keep the code.",
  },
  {
    q: "When do I need a custom build?",
    a: "When you need integrations, data pipelines, or your own UI. The €99 product covers the standard 80% — we build the rest.",
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
    name: "Starter",
    price: "€99/mo",
    cadence: "1 agent · cancel anytime",
    tint: "cyan",
    tagline: "One agent live in 60 seconds. Full feature set.",
    features: [
      "1 agent, any role",
      "2,500 conversation credits / month",
      "Real-time leads dashboard",
      "Knowledge-base upload + transcripts",
      "Cancel anytime · no lock-in",
    ],
    cta: { href: registerUrl(), label: "Try it for €99" },
    featured: false,
  },
  {
    name: "Operator",
    price: "€399/mo",
    cadence: "up to 5 agents · cancel anytime",
    tint: "violet",
    tagline: "For teams running agents in production.",
    features: [
      "Everything in Starter",
      "Up to 5 agents",
      "25,000 conversation credits / month",
      "Top-up credits anytime",
      "Cancel anytime · no lock-in",
    ],
    cta: { href: registerUrl(), label: "Start with Operator" },
    featured: true,
  },
  {
    name: "Custom",
    price: "Let's talk",
    cadence: "scoped · 4–6 week build",
    tint: "success",
    tagline: "When the off-the-shelf agent isn't enough.",
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
