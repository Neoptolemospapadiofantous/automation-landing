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

export const problems = [
  {
    label: "REVENUE LEAK",
    tint: "danger",
    title: "Leads die in your inbox before anyone replies.",
    body: "The average B2B inbound waits 47 hours for a first response. Your competitor replies in 4 minutes. The deal was decided before you woke up.",
    metric: { value: "78%", label: "of inbound leads go cold within 24h" },
    wide: true,
  },
  {
    label: "TIME LEAK",
    tint: "warn",
    title: "Your best people are doing data entry.",
    body: "Copy-paste between Notion, CRM, Sheets, Slack. You hired senior talent. They're now glorified clipboards.",
  },
  {
    label: "INSIGHT LEAK",
    tint: "violet",
    title: "You can't see your own funnel.",
    body: "Stripe says one thing, HubSpot another, Sheets a third. By the time the numbers reconcile, the quarter's over.",
  },
  {
    label: "QUALITY LEAK",
    tint: "cyan",
    title: "Manual work means human errors at scale.",
    body: "Wrong pricing sent. Duplicate invoices. The 1-in-200 mistake that costs a customer.",
  },
  {
    label: "GROWTH LEAK",
    tint: "success",
    title: "You can't onboard faster than you hire.",
    body: "Every new customer = a Slack channel, a calendar invite, three docs, two integrations. So you hire. Then hire again.",
  },
] as const;

export const steps = [
  {
    num: "01",
    phase: "DAY 1",
    title: "Audit",
    tint: "cyan",
    body: "We map every process where humans touch a computer. We score each one by hours-leaked × difficulty-to-fix. You get a written report. Yours to keep.",
  },
  {
    num: "02",
    phase: "DAYS 2–4",
    title: "Ship",
    tint: "violet",
    body: "We build the top 3 automations against your real stack — your CRM, your tools, your edge cases. Tested on live data. Documented.",
  },
  {
    num: "03",
    phase: "DAY 5",
    title: "Hand off",
    tint: "success",
    body: "Your team gets a walkthrough, runbooks, and a Slack channel for the first 30 days. After that, you own it. No lock-in.",
  },
] as const;

export const services = [
  {
    kicker: "LEAD OPS",
    tint: "violet",
    title: "Inbound that replies in 47 seconds, not 47 hours.",
    body: "Form → enrichment → ICP scoring → calendar booking → Slack ping → CRM sync. Zero touches.",
    badge: "+312% MQL",
    wide: true,
  },
  {
    kicker: "FINANCE OPS",
    tint: "cyan",
    title: "Books that close themselves.",
    body: "Stripe ↔ Xero ↔ Sheets reconciliation, dunning workflows, anomaly alerts.",
    badge: "9hr/wk saved",
  },
  {
    kicker: "ONBOARDING",
    tint: "success",
    title: "Day-zero magic for every new customer.",
    body: "Provision accounts, send welcome sequences, route to CSM, create channels — fired by signup.",
    badge: "0→1 in 2min",
  },
  {
    kicker: "DATA OPS",
    tint: "warn",
    title: "One source of truth across 9 tools.",
    body: "Reverse-ETL, dashboards that update at 6:55am, alerts when revenue drifts off-trend.",
    badge: "Live in 14d",
  },
  {
    kicker: "INTERNAL AI",
    tint: "danger",
    title: "Your team's private operator.",
    body: "Slack-native AI agent that drafts replies, summarizes calls, queries your data. Lives behind SSO.",
    badge: "GPT-5 + RAG",
  },
] as const;

export const outcomes = [
  { v: "31×", l: "faster lead response", c: "violet" },
  { v: "€127k", l: "avg. annual ops savings", c: "cyan" },
  { v: "<60d", l: "to project payback", c: "success" },
  { v: "4.9/5", l: "NPS from operators", c: "warn" },
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
    q: "How is this different from hiring an agency on retainer?",
    a: "We're not. We scope a finite project, ship, hand it over, and leave. If something breaks, we fix it. If something new comes up, you decide whether to bring us back. No monthly minimums.",
  },
  {
    q: "What tools do you use? Will I be locked in?",
    a: "We build on your stack — n8n, Zapier, Make, custom code, depending on what fits. Everything we ship lives in your accounts, with your credentials. We don't run anything on our infra you can't see.",
  },
  {
    q: "How fast can we start?",
    a: "Audit kicks off within 3 business days of the call. Most projects ship within a week of kickoff.",
  },
  {
    q: "What if the audit shows nothing worth automating?",
    a: "Then we tell you that and we don't take the project. It happens. Roughly 1 in 8 audits end this way. You still keep the report.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, before any audit work. Standard mutual NDA. We're SOC-2 aware though not certified — we can walk through our security posture on the call.",
  },
] as const;

export const tickerLogos = [
  "Northwind", "Pendola", "Atlas Studio", "Helio Group", "Mosaic OS",
  "Bristol & Co", "Kettlebell", "Latitude.ai", "Outpost", "Stratus Labs",
];

export type Tint = "violet" | "cyan" | "success" | "warn" | "danger";

export const tintMap: Record<Tint, { text: string; bg: string; border: string; shadow: string }> = {
  violet: {
    text: "text-violet",
    bg: "bg-violet/12",
    border: "border-violet/40",
    shadow: "shadow-[0_0_24px_rgba(124,92,255,0.35)]",
  },
  cyan: {
    text: "text-cyan",
    bg: "bg-cyan/12",
    border: "border-cyan/40",
    shadow: "shadow-[0_0_24px_rgba(0,229,255,0.35)]",
  },
  success: {
    text: "text-success",
    bg: "bg-success/12",
    border: "border-success/40",
    shadow: "shadow-[0_0_24px_rgba(54,229,160,0.35)]",
  },
  warn: {
    text: "text-warn",
    bg: "bg-warn/12",
    border: "border-warn/40",
    shadow: "shadow-[0_0_24px_rgba(255,181,71,0.35)]",
  },
  danger: {
    text: "text-danger",
    bg: "bg-danger/12",
    border: "border-danger/40",
    shadow: "shadow-[0_0_24px_rgba(255,91,110,0.35)]",
  },
};

/* ---------- Cost-of-manual-work stats (Problems page) ---------- */
export const costStats = [
  {
    v: "21 hrs",
    l: "lost per employee per week to manual, repetitive tasks",
    c: "warn",
  },
  {
    v: "47 hrs",
    l: "average B2B first-response time on inbound leads",
    c: "danger",
  },
  { v: "1 in 5", l: "manual data entries contains an error", c: "cyan" },
  {
    v: "€127k",
    l: "average annual ops cost we remove in year one",
    c: "success",
  },
] as const;

/* ---------- Process deliverables (How it works page) ---------- */
export const processDeliverables = [
  {
    phase: "DAY 1 · AUDIT",
    tint: "cyan",
    items: [
      "Live shadowing of 2–3 of your operators",
      "Process map of every human-in-the-loop step",
      "Leak scoring: hours × frequency × difficulty",
      "Written audit doc + Loom walkthrough — yours to keep",
    ],
  },
  {
    phase: "DAYS 2–4 · SHIP",
    tint: "violet",
    items: [
      "Top 3 automations built against your live stack",
      "Tested on real data, with error handling",
      "Runbooks + architecture diagram for each flow",
      "Staging review call before anything goes live",
    ],
  },
  {
    phase: "DAY 5 · HAND OFF",
    tint: "success",
    items: [
      "Team walkthrough + recorded training",
      "All credentials and code transferred to you",
      "30-day shared Slack channel for questions",
      "Optional monthly check-in — no obligation",
    ],
  },
] as const;

/* ---------- Integrations (Services page) ---------- */
export const integrations = [
  { group: "CRM & Sales", tools: ["HubSpot", "Salesforce", "Pipedrive", "Attio"] },
  { group: "Comms", tools: ["Slack", "Gmail", "Intercom", "Twilio"] },
  { group: "Data & Finance", tools: ["Stripe", "Xero", "BigQuery", "Sheets"] },
  { group: "Build layer", tools: ["n8n", "Zapier", "Make", "Custom code"] },
  { group: "AI", tools: ["GPT-5", "Claude", "Gemini", "Local RAG"] },
] as const;

/* ---------- Case studies (Outcomes page) ---------- */
export const caseStudies = [
  {
    company: "Northwind Logistics",
    tint: "violet",
    problem: "Ops team of 6 drowning in manual freight-status updates.",
    fix: "Event-driven status sync across TMS, email and customer portal.",
    result: "2 planned hires cancelled · 31 hrs/wk returned",
  },
  {
    company: "Pendola",
    tint: "cyan",
    problem: "Inbound leads sat 1–2 days before first contact.",
    fix: "Form → enrich → score → book → Slack, end to end.",
    result: "Response time 47h → 47s · pipeline up 3×",
  },
  {
    company: "Atlas Studio",
    tint: "success",
    problem: "Founder hand-onboarding every new retainer client.",
    fix: "Signup-triggered provisioning, docs and channel setup.",
    result: "Onboarding 3 days → 2 min · churn down 18%",
  },
] as const;

/* ---------- Pricing tiers (Pricing page) ---------- */
export const pricingTiers = [
  {
    name: "Trial",
    price: "Free",
    cadence: "14 days · no card",
    tint: "cyan",
    tagline: "One agent live in 60 seconds. Full feature set.",
    features: [
      "1 agent, any role",
      "200 conversation credits",
      "Real-time leads dashboard",
      "Knowledge-base upload",
      "No credit card required",
    ],
    cta: { href: registerUrl(), label: "Start free trial" },
    featured: false,
  },
  {
    name: "Operator",
    price: "from €49/mo",
    cadence: "billed monthly · cancel anytime",
    tint: "violet",
    tagline: "For teams running an agent in production.",
    features: [
      "Everything in Trial",
      "Up to 3 agents",
      "2,000 conversation credits / month",
      "Top-up credits anytime",
      "Email support · 24h response",
    ],
    cta: { href: registerUrl(), label: "Start free trial" },
    featured: true,
  },
  {
    name: "Custom build",
    price: "from €6k",
    cadence: "fixed-scope project · ~1 week",
    tint: "success",
    tagline: "When the off-the-shelf agent isn't enough.",
    features: [
      "Bespoke Voiceflow flows on your stack",
      "Custom integrations (CRM, telephony, internal tools)",
      "Trained on your knowledge base + voice",
      "Runbooks + handover",
      "Optional ongoing operator retainer",
    ],
    cta: { href: "/audit", label: "Book the audit" },
    featured: false,
  },
] as const;
