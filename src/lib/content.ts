import { registerUrl } from "./dashboard";

export const brand = {
  name: "Flowstack",
  tagline:
    "AI agents for sales, support, lead-qual and onboarding — and bespoke automation when off-the-shelf isn't enough.",
};

export const nav = {
  links: [
    { href: "/audit", label: "Custom build" },
    { href: "/pricing", label: "Pricing" },
  ],
};

/**
 * Pre-built agent roles offered on signup. Each card on the homepage
 * "agent roles" picker links to the dashboard's /register flow; role
 * selection itself happens inside the onboarding wizard. Order = priority.
 */
export const agentRoles = [
  {
    ref: "ROLE-01",
    name: "Lead qualification",
    desc: "Greets every inbound visit, qualifies on ICP fit, and hands only the warm conversations to your sales team — with full transcript.",
    available: true,
  },
  {
    ref: "ROLE-02",
    name: "Sales",
    desc: "Walks visitors through your offer, answers pricing and scope questions, and books qualified demos onto your calendar.",
    available: true,
  },
  {
    ref: "ROLE-03",
    name: "Customer support",
    desc: "First-line answers from your knowledge base, escalates only when a human is actually needed. Trained on your tone, not generic.",
    available: true,
  },
  {
    ref: "ROLE-04",
    name: "Onboarding",
    desc: "Walks new customers through setup, provisions accounts, and routes the rest to CSM. From signup to first value, hands-off.",
    available: true,
  },
] as const;

export const testimonials = [
  {
    quote:
      "We stopped hiring ops people. The Flowstack system replaced our next two hires. The audit alone was worth the engagement.",
    name: "Maya Okafor",
    role: "COO, Northwind Logistics",
    tint: "violet",
    initials: "MO",
  },
  {
    quote:
      "Inbound used to sit for a day. Now it gets a call booked before the lead closes the tab. Pipeline up 3×, headcount flat.",
    name: "Jonas Eriksen",
    role: "Head of GTM, Pendola",
    tint: "cyan",
    initials: "JE",
  },
  {
    quote:
      "What I liked: they refused to scope a thing until they'd actually shadowed our team for a week. The diagnosis was the product.",
    name: "Rui Pereira",
    role: "Founder, Atlas Studio",
    tint: "success",
    initials: "RP",
  },
] as const;

export const faqItems = [
  {
    q: "What does the agent actually do?",
    a: "It greets every visitor, qualifies them via the role you picked (sales, support, lead-qual, onboarding), captures the lead, and pushes it into a real-time dashboard. You see every conversation and every transcript — without anyone watching a queue.",
  },
  {
    q: "How is the trial limited?",
    a: "1 agent · 200 conversation credits · 14 days · no credit card. Every feature is on — knowledge-base upload, transcript review, lead routing, integrations. When credits or the trial expire you pick a plan or walk away with your data.",
  },
  {
    q: "Can I bring my own Voiceflow account, or do I have to use yours?",
    a: "Either. Managed: we provision a Voiceflow project under our workspace, one click — fastest path to live. BYOK: paste your own Voiceflow API key + project ID and we wire the agent to it. Credentials are encrypted at rest and never leave your account.",
  },
  {
    q: "When do I need a custom build instead of the off-the-shelf agent?",
    a: "When you need bespoke flows, integrations we don't ship by default (an internal CRM, a custom auth gateway, niche telephony, a different LLM), or your own UI on top of the chat. The trial covers the standardisable 80%; we build the rest — one week, fixed scope, you keep the code.",
  },
  {
    q: "Are you an agency? Will I be locked in?",
    a: "We're a SaaS first, custom-build studio second — not a retainer agency. The product is yours to trial and cancel anytime. Custom builds are fixed-scope and you keep the code; if you outgrow us you walk with everything we shipped. No monthly minimums on either side.",
  },
] as const;

export const tickerLogos = [
  "Northwind", "Pendola", "Atlas Studio", "Helio Group", "Mosaic OS",
  "Bristol & Co", "Kettlebell", "Latitude.ai", "Outpost", "Stratus Labs",
];

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
    price: "$19/mo",
    cadence: "1 agent · cancel anytime",
    tint: "cyan",
    tagline: "One agent live in 60 seconds. Full feature set.",
    features: [
      "1 agent, any role",
      "1,000 conversation credits / month",
      "Real-time leads dashboard",
      "Knowledge-base upload",
      "Cancel anytime · no lock-in",
    ],
    cta: { href: registerUrl(), label: "Try it for $19" },
    featured: false,
  },
  {
    name: "Operator",
    price: "$79/mo",
    cadence: "up to 5 agents · cancel anytime",
    tint: "violet",
    tagline: "For teams running agents in production.",
    features: [
      "Everything in Starter",
      "Up to 5 agents",
      "10,000 conversation credits / month",
      "Top-up credits anytime",
      "Email support · 24h response",
    ],
    cta: { href: registerUrl(), label: "Start with Operator" },
    featured: true,
  },
  {
    name: "Custom",
    price: "from $6k",
    cadence: "scoped to your need",
    tint: "success",
    tagline: "When the off-the-shelf agent isn't enough.",
    features: [
      "Bespoke Voiceflow flows on your stack",
      "Custom n8n operations + workflows",
      "Custom integrations (CRM, telephony, internal tools)",
      "Trained on your knowledge base + voice",
      "Runbooks + handover · optional retainer",
    ],
    cta: { href: "/audit", label: "Book the audit" },
    featured: false,
  },
] as const;
