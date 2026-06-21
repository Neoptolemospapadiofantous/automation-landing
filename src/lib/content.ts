import { registerUrl } from "./dashboard";

export const brand = {
  name: "Flowstack",
  tagline:
    "AI agents for sales, support, lead qualification and onboarding — and bespoke automation when off-the-shelf isn't enough.",
};

export const nav = {
  links: [
    { href: "/audit", label: "Custom build" },
    { href: "/pricing", label: "Pricing" },
  ],
};

/**
 * Pre-built agent roles offered on signup. Each card on the homepage
 * roles list links to the dashboard's /register flow; role selection
 * happens inside the onboarding wizard. Order = priority.
 */
export const agentRoles = [
  {
    ref: "ROLE-01",
    name: "Lead qualification",
    desc: "Greets every inbound visit, qualifies on ICP fit, and hands only the warm conversations to your team — with the full transcript on every touch.",
    available: true,
  },
  {
    ref: "ROLE-02",
    name: "Sales",
    desc: "Walks visitors through your offer, answers pricing and scope questions, and books qualified demos straight onto your calendar.",
    available: true,
  },
  {
    ref: "ROLE-03",
    name: "Customer support",
    desc: "First-line answers from your knowledge base. Escalates only when a human is actually needed. Trained on your tone, not generic.",
    available: true,
  },
  {
    ref: "ROLE-04",
    name: "Onboarding",
    desc: "Walks new customers through setup step by step, answers the recurring questions from your docs, and routes anything that needs a human to your team.",
    available: true,
  },
] as const;

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
    a: "What ships at Starter is the agent itself — the chat experience, knowledge base, transcripts and lead routing into your real-time dashboard. Wiring it into your CRM, helpdesk, internal APIs or anything bespoke sits inside the Custom-build engagement, which we scope to your specific stack — fixed scope, credentials encrypted in your isolated tenant, you keep the code. The 30-minute audit covers what you'd need wired up.",
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
