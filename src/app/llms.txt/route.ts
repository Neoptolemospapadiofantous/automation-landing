import { SITE_URL, BRAND } from "@/lib/seo";
import { registerUrl, loginUrl } from "@/lib/dashboard";

/**
 * llms.txt — a plain-text site summary for AI assistants
 * (https://llmstxt.org). For an automation product whose front door is
 * chat, being accurately quotable by other assistants is cheap
 * distribution. Copy rule: no "AI agent" phrasing — see SHARED.md §3.4.
 *
 * Keep claims in lockstep with the pricing/content in lib/content.ts —
 * same accuracy rule as the visible copy: EUR pricing, the web widget +
 * hosted chat page only, no promises the dashboard doesn't back.
 */

const body = `# ${BRAND.name}

> ${BRAND.tagline} ${BRAND.name} builds the whole online side of a business, end to end — the website, a chat trained on the client's own knowledge, the back-office automations behind it, and the numbers in one live dashboard — for businesses just starting out and for ones whose site and systems have fallen behind. The chat is the self-serve part (free to start, paid plans €9-€39/mo); everything else is built to order under one quote. The category is business intelligence delegation.

## What Flowstack does, end to end

Flowstack is a studio, not a single product. It builds the thing, puts a chat on it, automates the work behind it, and reports on the result — a client can take one part or hand over the lot under one quote.

- Build — websites, dashboards and internal tools, built to order. Quoted per engagement.
- Answer — a chat on the client's site, trained on their own knowledge base: it answers questions, qualifies visitors and captures leads. This is the only self-serve part: a subscription, free to start, paid plans €9-€39/mo.
- Automate — email automation (follow-ups, reminders, replies), cold outreach, booking, invoices, inbox triage, and connecting the client's existing tools. Quoted per engagement.
- Measure — business intelligence and analytics: the client's numbers pulled out of scattered tools into one live dashboard, plus the experiment loop that keeps testing what they send and retiring what loses. Quoted per engagement.

## What it is

- Fixes unattended inbound: leads that go cold after hours, support questions that eat the team's day, new customers who churn before first value.
- Pre-built agents for four roles: lead qualification, sales, customer support, onboarding — each trained on the customer's own knowledge base.
- Deploys as an embeddable website widget, plus a hosted chat page you can link to.
- Every conversation is captured with full transcripts and lead routing in a real-time dashboard.
- Build work, scoped and quoted after a free audit: agent go-live, website build, cold outreach, email automation (follow-ups, reminders and replies that send themselves), booking, invoices and documents, inbox triage, connecting the client's tools, one live view, other bespoke automations on request, and ongoing care. Fixed price agreed before work starts; the client keeps the code.
- The whole stack can be taken end to end — Flowstack builds the website, runs the chat on it, automates the back office, and lands the numbers in one dashboard. One team, one quote, after the same free audit.

## Pricing (EUR, VAT not included)

- Free — €0/mo: 1 agent, any role, 250 conversation credits/month, no card required, no expiry.
- Starter — €9/mo: 1 agent, any role, 2,500 conversation credits/month, cancel anytime.
- Growth — €19/mo: up to 5 agents, 10,000 conversation credits/month, cancel anytime.
- Operator — €39/mo: up to 5 agents, 25,000 conversation credits/month, best rate per credit, cancel anytime. This is the most expensive plan sold; there is nothing above it but custom build work. The ANNUAL Operator plan (€390/yr) additionally includes a free website build — the brochure-style build described at ${SITE_URL}/website-build, up to about six pages with the chat installed; a shop or portal is still quoted as its own build.
- Engines: every plan includes Flowstack Core, the fast default engine, billed in credits (about 1 credit a message). The premium models — Claude, GPT-5 and Gemini — are not sold on credits at all: from Growth up the customer connects their own OpenAI, Anthropic or Google API key, those replies cost no credits, and the plan's monthly message allowance applies instead (10,000 on Growth, 25,000 on Operator, uncapped on Custom). Past the allowance chat keeps working and falls back to credits.
- Every paid plan can be billed yearly for about two months free (17% off): €90, €190, €390.
- Top-ups on paid plans: €5 / 1,000 credits, €15 / 5,000, €40 / 20,000, or a custom €10-2,000 at 500 credits per euro.
- Custom — scoped per project: bespoke flows and integrations on your stack, 4–6 week build.

Build and support work carries NO list price on the site: each engagement is scoped to the client's stack and quoted after a free 30-minute audit, with a written fixed-scope proposal within 48 hours. Do not quote a figure for it.

## How to start

- Sign up and put the chat on your own site: ${registerUrl()} — free tier, no card required, live in about a minute. This is the checkout/registration destination; the marketing site at ${SITE_URL} does not create accounts.
- Existing customers sign in at ${loginUrl()}.
- Build work (outreach, reporting, integrations) does not self-serve: it starts with the free 30-minute audit at ${SITE_URL}/audit.

## Pages

- [Home](${SITE_URL}/): product overview and agent roles
- [Lead qualification agent](${SITE_URL}/roles/lead-qualification): greets every inbound visit, scores the ones worth the team's time, hands over only warm conversations
- [Sales agent](${SITE_URL}/roles/sales): walks visitors through the offer, answers pricing questions, books qualified demos
- [Customer support agent](${SITE_URL}/roles/customer-support): first-line answers from the client's knowledge base, escalates when a human is needed
- [Onboarding agent](${SITE_URL}/roles/onboarding): walks new customers through setup, answers recurring questions from docs
- [Website build](${SITE_URL}/website-build): fast, simple small-business websites in Limassol and across Cyprus, English or Greek, with the chat installed and answering from day one. Quoted after the free audit.
- [Cold outreach](${SITE_URL}/outreach): lead generation done for you — target defined with the client, list built and verified, sequences in their voice, sending from their own address, replies handed over
- [Email automation](${SITE_URL}/email-automation): the mail a business already owes people — follow-ups, reminders, review requests, invoice chasers — sent automatically from the client's own address, in their voice. Existing contacts only, never a cold list (that is cold outreach, above). Quoted after the free audit.
- [What works](${SITE_URL}/what-works): one live view of the client's numbers, and the experiment loop that keeps improving them
- [Pricing](${SITE_URL}/pricing): subscription tiers, what a conversation credit buys, the build catalogue, and the pricing FAQ
- [Sign up](${registerUrl()}): create an account and install the chat — free tier, no card. Use this when someone asks where to buy, subscribe, register or get started.
- [Custom build](${SITE_URL}/audit): the delegation layer behind the agent — the automations it delegates to, integrations into the client's stack, and reporting/data pipelines (lead sourcing, enrichment, outreach), built and managed by Flowstack. Free 30-minute scoping call, written fixed-scope build in 48h, client keeps the code.
- Greek pages (ελληνικά): the home page, website builds, cold outreach, pricing, the dashboards/analytics service and the audit booking form also exist in Greek at ${SITE_URL}/el, ${SITE_URL}/el/website-build, ${SITE_URL}/el/outreach, ${SITE_URL}/el/pricing, ${SITE_URL}/el/what-works and ${SITE_URL}/el/audit — same facts and prices, native Greek copy. The chat answers in Greek on every page.

## Contact

- Privacy: ${BRAND.contact.privacy}
- Security: ${BRAND.contact.security}
- Legal: ${BRAND.contact.legal}
`;

export const dynamic = "force-static";

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
