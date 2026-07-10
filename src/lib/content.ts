import { registerUrl } from "./dashboard";

export const nav = {
  links: [
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
    desc: "Qualifies every inbound visit on ICP fit. Your team gets only the warm ones, transcript attached.",
    metaTitle: "Automated lead qualification for your website",
    metaDescription:
      "Qualify every inbound visitor on ICP fit before your team spends a minute. Full transcripts, lead routing and a real-time dashboard. Live in 60 seconds, from €99/mo.",
    h1: "The lead that arrives at midnight",
    h1Accent: "shouldn't wait until morning.",
    lead: "Inbound doesn't keep office hours. The agent greets every visitor the moment they land, qualifies on ICP fit, and hands your team only the conversations worth their time.",
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
    desc: "Answers pricing and scope questions on the spot. Books qualified demos onto your calendar.",
    metaTitle: "Automated sales agent for your website",
    metaDescription:
      "An automated sales agent that walks visitors through your offer, answers pricing and scope questions, and books qualified demos onto your calendar. Live in 60 seconds, from €99/mo.",
    h1: "Most visitors with a buying question",
    h1Accent: "never ask it. They leave.",
    lead: "Ready-to-buy visitors rarely fill in forms — they have a pricing question and a competitor one tab away. The sales agent answers on the spot and books the demo.",
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
    desc: "First-line answers from your knowledge base, in your tone. Escalates only when a human is needed.",
    metaTitle: "Automated customer support agent for your website",
    metaDescription:
      "First-line support answers from your own knowledge base, escalation only when a human is actually needed, and every conversation captured. Live in 60 seconds, from €99/mo.",
    h1: "First-line support that sounds like you,",
    h1Accent: "not a script.",
    lead: "The same ten questions eat your team's day. The support agent resolves them instantly from your knowledge base, in your tone — a human is one ask away.",
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
    desc: "Walks new customers through setup, answers the recurring questions from your docs, routes the rest to you.",
    metaTitle: "Automated customer onboarding agent",
    metaDescription:
      "Walk every new customer through setup step by step, answer the recurring questions from your docs, and route the rest to your team. Live in 60 seconds, from €99/mo.",
    h1: "New customers sign up excited,",
    h1Accent: "then get stuck.",
    lead: "The gap between signup and first value is where customers quietly churn. The onboarding agent walks each one through setup and routes the stuck ones to your team.",
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

export const faqItems = [
  {
    q: "What does the agent actually do?",
    a: "It greets every visitor, does the job your role needs — qualify, answer, resolve, onboard — and pushes every conversation and lead into a real-time dashboard.",
  },
  {
    q: "What's in the Starter plan?",
    a: "€99/mo · 1 agent · 2,500 conversation credits · cancel anytime. Every feature on. Need more? Top up or move to Operator.",
  },
  {
    q: "Does it connect to my existing stack?",
    a: "Starter ships the chat: knowledge base, transcripts, lead routing, live dashboard. Wiring into your CRM, helpdesk or internal APIs is the custom build — fixed scope, you keep the code.",
  },
  {
    q: "When do I need a custom build instead of the off-the-shelf agent?",
    a: "When you need bespoke flows, integrations we don't ship by default, data pipelines, or your own UI. The €99 product covers the standardisable 80% — we build the rest.",
  },
  {
    q: "Are we locked in?",
    a: "No. Cancel anytime, no minimums, no exit fees. Custom builds are fixed-scope and you keep the code.",
  },
] as const;

export type Tint = "violet" | "cyan" | "success" | "warn" | "danger";

export const tintMap: Record<Tint, { text: string; bg: string; border: string }> = {
  violet: {
    text: "text-violet",
    bg: "bg-violet/12",
    border: "border-violet/40",
  },
  cyan: {
    text: "text-cyan",
    bg: "bg-cyan/12",
    border: "border-cyan/40",
  },
  success: {
    text: "text-success",
    bg: "bg-success/12",
    border: "border-success/40",
  },
  warn: {
    text: "text-warn",
    bg: "bg-warn/12",
    border: "border-warn/40",
  },
  danger: {
    text: "text-danger",
    bg: "bg-danger/12",
    border: "border-danger/40",
  },
};

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
