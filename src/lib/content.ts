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
 * transcripts, lead routing, the real-time dashboard, the four web +
 * webhook channels, EUR pricing. No SLAs, no integrations that live in
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
    desc: "Greets every inbound visit, qualifies on ICP fit, and hands only the warm conversations to your team — with the full transcript on every touch.",
    metaTitle: "AI lead qualification agent for your website",
    metaDescription:
      "Qualify every inbound visitor on ICP fit before your team spends a minute. Full transcripts, lead routing and a real-time dashboard. Live in 60 seconds, from €99/mo.",
    h1: "The lead that arrives at midnight",
    h1Accent: "shouldn't wait until morning.",
    lead: "Inbound interest doesn't keep office hours — but by the time your team sees a form fill, the lead has gone cold or gone elsewhere. The lead-qualification agent greets every visitor the moment they land, qualifies on ICP fit, and hands your team only the conversations worth their time, full transcript attached.",
    does: [
      {
        ref: "N-01",
        title: "Greets every inbound visit",
        desc: "No forms, no queue — every visitor gets an instant first touch, on your site, at any hour.",
      },
      {
        ref: "N-02",
        title: "Qualifies on ICP fit",
        desc: "Asks the questions that matter for your ICP and scores each conversation before anyone on your team gets pinged.",
      },
      {
        ref: "N-03",
        title: "Hands over only the warm conversations",
        desc: "Warm leads land in your real-time dashboard with the full transcript on every touch; the rest never cost your team a minute.",
      },
    ],
  },
  {
    slug: "sales",
    ref: "ROLE-02",
    name: "Sales",
    desc: "Walks visitors through your offer, answers pricing and scope questions, and books qualified demos straight onto your calendar.",
    metaTitle: "AI sales agent for your website",
    metaDescription:
      "An AI sales agent that walks visitors through your offer, answers pricing and scope questions, and books qualified demos onto your calendar. Live in 60 seconds, from €99/mo.",
    h1: "Most visitors with a buying question",
    h1Accent: "never ask it. They leave.",
    lead: "The visitor who's ready to buy rarely fills in a form — they have a question about pricing, scope or fit, no one to ask, and a competitor one tab away. The sales agent answers from the knowledge you upload the moment the question comes up, and books qualified demos straight onto your calendar.",
    does: [
      {
        ref: "N-01",
        title: "Walks visitors through your offer",
        desc: "Answers what you do, for whom, and why it fits — sourced from the knowledge you upload, not generic filler.",
      },
      {
        ref: "N-02",
        title: "Handles pricing and scope questions",
        desc: "The questions that stall deals get answered on the spot, inside the conversation where they came up.",
      },
      {
        ref: "N-03",
        title: "Books qualified demos",
        desc: "Qualified conversations end on your calendar, and every exchange lands in the dashboard as a transcript.",
      },
    ],
  },
  {
    slug: "customer-support",
    ref: "ROLE-03",
    name: "Customer support",
    desc: "First-line answers from your knowledge base. Escalates only when a human is actually needed. Trained on your tone, not generic.",
    metaTitle: "AI customer support agent for your website",
    metaDescription:
      "First-line support answers from your own knowledge base, escalation only when a human is actually needed, and every conversation captured. Live in 60 seconds, from €99/mo.",
    h1: "First-line support that sounds like you,",
    h1Accent: "not a script.",
    lead: "One person can't answer every question the second it's asked — so customers wait, and the same ten questions eat your team's day. The support agent handles the repetitive first-line questions from your knowledge base instantly, in your tone, and escalates only when a human is genuinely needed. Visitors can ask for one at any time.",
    does: [
      {
        ref: "N-01",
        title: "Answers from your knowledge base",
        desc: "Upload your docs and FAQs; the agent answers with what you actually ship — trained on your tone, not generic.",
      },
      {
        ref: "N-02",
        title: "Escalates only when needed",
        desc: "Recurring questions get resolved on the spot; conversations that need a human reach one, and visitors can ask for a human at any time.",
      },
      {
        ref: "N-03",
        title: "Captures every conversation",
        desc: "Every thread lands in the dashboard as a full transcript, so you see what customers ask without anyone watching a queue.",
      },
    ],
  },
  {
    slug: "onboarding",
    ref: "ROLE-04",
    name: "Onboarding",
    desc: "Walks new customers through setup step by step, answers the recurring questions from your docs, and routes anything that needs a human to your team.",
    metaTitle: "AI customer onboarding agent",
    metaDescription:
      "Walk every new customer through setup step by step, answer the recurring questions from your docs, and route the rest to your team. Live in 60 seconds, from €99/mo.",
    h1: "New customers sign up excited,",
    h1Accent: "then get stuck.",
    lead: "The gap between signup and first value is where new customers quietly churn. The onboarding agent walks each one through setup step by step, answers the recurring questions straight from your docs, and routes anything that needs a human to your team — before they give up.",
    does: [
      {
        ref: "N-01",
        title: "Guides setup step by step",
        desc: "New customers get walked through setup interactively instead of digging through documentation alone.",
      },
      {
        ref: "N-02",
        title: "Answers the recurring questions",
        desc: "The same ten questions every new account asks get answered from your docs — instantly, every time.",
      },
      {
        ref: "N-03",
        title: "Routes the exceptions to your team",
        desc: "Anything that genuinely needs a human lands with your team, with the full conversation attached.",
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
    a: "It greets every visitor, takes the action your chosen role needs — qualify a lead, answer a sales question, resolve a support ticket, walk a new user through onboarding — captures the conversation, and pushes the lead into a real-time dashboard. You see every transcript without anyone watching a queue.",
  },
  {
    q: "What's in the Starter plan?",
    a: "€99/mo · 1 agent · 2,500 conversation credits · cancel anytime, no lock-in. Every feature is on — knowledge-base upload, transcript review, lead routing. Need more headroom? Buy a top-up pack or upgrade to Operator; either way nothing about your setup changes.",
  },
  {
    q: "Does it connect to my existing stack?",
    a: "What ships at Starter is the agent itself — the chat experience, knowledge base, transcripts and lead routing into your real-time dashboard. Wiring it into your CRM, helpdesk, internal APIs or anything bespoke sits inside the custom build engagement, which we scope to your specific stack — fixed scope, credentials encrypted in your isolated tenant, you keep the code. The 30-minute audit covers what you'd need wired up.",
  },
  {
    q: "When do I need a custom build instead of the off-the-shelf agent?",
    a: "When you need bespoke flows, integrations we don't ship by default (an internal CRM, a custom auth gateway, your own LLM), or your own UI on top of the chat. The trial covers the standardisable 80% of use cases; we build the rest — fixed scope, you keep the code.",
  },
  {
    q: "Are we locked in?",
    a: "No. The product is yours to trial and cancel anytime — no monthly minimums, no exit fees. Custom builds are fixed-scope and you keep the code; if you outgrow us, you walk with everything we shipped.",
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
