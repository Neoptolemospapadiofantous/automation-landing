# SEO Keyword Strategy — Flowstack

> Where to invest content + on-page optimisation effort. Anchored to the
> current site copy in `src/lib/content.ts`, the SEO surfaces in
> `src/app/layout.tsx`, and the structured data in
> `src/components/jsonld.tsx`. Pair with `docs/pricing-and-launch.md` for
> the business plan and `docs/deploy-forge.md` for the technical surface.

**Updated:** 2026-06-11
**Status:** Strategy + on-page mapping ready; content production deferred until post-launch
**Owner:** [TBC]

---

## 1. Current keyword density (audit of served homepage)

Pulled from the live `http://localhost:3000/` rendered HTML on 2026-06-11:

| Term | Occurrences | Assessment |
|---|---|---|
| AI agent | 32 | Strong primary signal |
| lead qualification | 15 | Strong secondary |
| sales | 14 | Strong secondary |
| onboarding | 14 | Strong secondary |
| live in 60 seconds | 14 | Strong brand-keyword |
| cancel anytime | 11 | Conversion trigger, fine density |
| real-time | 10 | Decent tertiary |
| dashboard | 10 | Decent tertiary |
| automation | 10 | Decent tertiary |
| transcript | 4 | Weak — should appear more |
| knowledge base | 4 | Weak — should appear more |
| chatbot | 4 | Weak — common search term, increase |
| customer support | 2 | Very weak — major use case, under-represented |

**Top finding**: the secondary keyword cluster (lead qualification / sales /
onboarding) has strong density, but **customer support** is significantly
under-represented even though it's listed as a primary use case in the
agent-roles section and the FAQ. That's a real on-page tune-up
opportunity (see §4).

---

## 2. Target keyword strategy (4 tiers)

### Tier 1 — Brand keywords (free, easy)

Will rank #1 within ~30 days of indexing once `NEXT_PUBLIC_SITE_URL` is set
and the site is in Google Search Console.

- `flowstack`
- `flowstack ai`
- `flowstack agent`
- `flowstack pricing`
- `flowstack vs <competitor>` — write a comparison page per major competitor (deferred)

### Tier 2 — Primary commercial-intent (saturated, hard, valuable)

These are what we actually want to win for paid customer acquisition. They
have heavy competition; ranking takes months of authority-building.

- `AI agent for business` — primary target for homepage
- `AI chatbot for sales` — primary target for /pricing
- `customer support AI agent`
- `lead qualification AI`
- `AI agent for SaaS`

### Tier 3 — Mid-intent vertical (specific, less saturated)

These are realistic 6-month targets. Less competition, qualified visitors.

- `AI agent for lead qualification`
- `AI chatbot for customer onboarding`
- `real-time lead dashboard AI`
- `AI agent with knowledge base`
- `multi-tenant AI chatbot platform`
- `AI agent platform for teams`
- `custom AI agent build`
- `bespoke AI agent integration`

### Tier 4 — Long-tail (low competition, fast wins, drive blog content)

These should be the content marketing topic list. Each can become a blog
post targeting a specific question.

- `how to add an AI agent to my website in 60 seconds`
- `ai agent vs chatbot for sales` — comparison
- `cost of running an AI agent per conversation`
- `AI agent with real-time lead delegation`
- `how to qualify leads with an AI chatbot`
- `AI agent for B2B SaaS onboarding flow`
- `AI agent that escalates to a human`
- `agent platform with transcript audit trail`
- `Voiceflow vs custom AI agent runtime`
- `Anthropic Claude for customer-facing agent`
- `AI agent with knowledge base RAG setup`

---

## 3. Page-to-keyword mapping

Every page should target exactly one primary keyword and 2–3 secondary
keywords. Overlap dilutes ranking. Current state + recommendations:

| Page | Current primary | Recommended primary | Recommended secondaries |
|---|---|---|---|
| `/` (homepage) | "AI agent for your team" | **AI agent for business** | AI agent platform · AI chatbot platform |
| `/pricing` | implicit | **AI agent pricing** | AI chatbot pricing · AI agent platform cost |
| `/audit` | "custom build" | **custom AI agent build** | bespoke AI agent integration · AI agent consultation |
| `/privacy`, `/terms`, `/security`, `/dpa` | n/a | **n/a — `noindex`** | (drafts; flip when FINAL per `counsel-handover.md` §7) |

### Concrete title-tag/meta-description changes

These are deferred until you have the real domain set (so we don't bake
`flowstack.example` into the title); but plan ahead:

| Page | Current title | Proposed title |
|---|---|---|
| `/` | `Flowstack — An AI agent for your team, live in 60 seconds.` | (keep — already targets primary + brand) |
| `/pricing` | `Pricing — Flowstack` | `AI agent pricing & plans — Flowstack` |
| `/audit` | `Custom build — Flowstack` | `Custom AI agent build & integration — Flowstack` |

---

## 4. Quick on-page wins (do these before Stripe goes live)

These are ~1-hour copy tweaks that improve keyword density without changing
brand voice:

1. **Surface "customer support" more aggressively in the hero subhead.**
   It's currently in the role list but reads as 4th-tier. Move it forward
   so it appears in the first 200 chars of the meta description.
   Edit target: `src/lib/content.ts` brand tagline + hero subhead in
   `src/components/sections/hero.tsx`.

2. **Strengthen "knowledge base" density.** Currently 4 mentions across
   the site. Add to:
   - The Overview agent-roles descriptions (one mention each role).
   - The pricing tier features array (already says "Knowledge-base
     upload + transcripts" once — add to Operator features too).
   - The hero manifesto block.

3. **Mention "chatbot" explicitly in the FAQ section.** Search volume on
   "AI chatbot for X" is significantly higher than "AI agent for X" but we
   undersell it. Add a Q like *"Is this a chatbot or an AI agent?"* and
   answer with the distinction (chatbot = scripted; agent = LLM-driven
   with tools). Targets a high-volume keyword cluster while educating.

4. **Strengthen the H1 sub-clause.** Current H1: *"An AI agent for your
   team. Live in 60 seconds."* — consider *"An AI agent for your sales,
   support and onboarding team. Live in 60 seconds."* The longer version
   triples the secondary-keyword presence in the most weighted on-page
   signal Google reads.

5. **Add image `alt=""` text to the OG image and any future product
   screenshots** with keyword-rich descriptions. The OG image already has
   `alt: "Flowstack — AI agents for your team, live in 60 seconds."` —
   make sure any added images follow the same pattern.

---

## 5. Structured data already in place

What Google sees in our JSON-LD (verified via the served HTML):

- **Organization** — knowledge-graph eligible once `sameAs:` array is
  filled with real social profile URLs.
- **WebSite** — connects publisher to brand for brand-search ranking.
- **SoftwareApplication** — defines product category, including Offer
  entries for Starter $99 and Operator $399. Triggers product-snippet
  eligibility in SERPs.
- **FAQPage** (added 2026-06-11) — 5 Question + 5 Answer entries from
  `faqItems`. **High-impact rich snippet** — Google will expand FAQ
  items directly in the search result, dramatically increasing SERP
  real estate and click-through rate.

Validation: after deploy, paste the production URL into
`search.google.com/test/rich-results` — expect Organization + WebSite +
SoftwareApplication + FAQPage all detected, zero errors.

---

## 6. Content marketing topic queue

Each topic targets a Tier-3 or Tier-4 keyword. Order by ease-of-write × likely
traffic.

1. **"How we provision an AI agent in 60 seconds (real teardown)"** —
   targets brand keyword + the "60 seconds" promise. Easy to write because
   it's how the product already works.
2. **"AI agent vs chatbot: when each one fits"** — Tier 3, high search
   volume.
3. **"Real-time lead routing with an AI agent: what changes in the
   pipeline"** — Tier 3, vertical-specific.
4. **"Anthropic Claude as a customer-facing agent: trade-offs"** —
   Tier 4, technical-buyer audience.
5. **"AI agent with RAG knowledge base: setup time, cost, gotchas"** —
   Tier 4, deep-technical, qualifies traffic.
6. **"Voiceflow vs Flowstack's native runtime"** — Tier 4 but high commercial
   intent. Mention the legacy adapter we have for migration.
7. **"What does an AI agent cost per conversation?"** — Tier 4 cost
   question, directly supports validating the $99/$399 tiers from search
   traffic.

Plan: 2 posts/month post-launch, targeting these in order. Each ~1,500–2,000
words with a single CTA to the audit form.

---

## 7. Tracking — measuring what works (post-deploy)

Once GA4 + Search Console are both live:

### Search Console weekly check (5 min/week)
- **Search Performance** → which queries are bringing impressions?
  Add new ones to the keyword targeting list if traffic is real.
- **Coverage** → all indexed pages still in the index?
- **Rich Results** → FAQPage + SoftwareApplication snippets healthy?

### GA4 weekly check (10 min/week)
- **Acquisition → Organic Search** by landing page. Which pages convert
  organic traffic into audit-form submissions?
- **Engagement → Pages and screens** by source. Bounce rate on each
  page; under 60% is good for B2B landing.
- **Conversions → Audit form submitted** (will need to define this as a
  custom event once the form has a real submit destination).

### Set up KPIs in GA4 admin (one-time)
- Custom event: `audit_form_submit` → fire from the audit page on a
  successful server-action response.
- Custom event: `pricing_cta_click` → fire from the pricing-page CTAs.
- Conversion mark both events so they appear in conversions reports.

---

## 8. Open SEO decisions

1. **Set `NEXT_PUBLIC_SITE_URL` to the real domain** — blocks all
   absolute-URL SEO surfaces.
2. **Add Google Search Console verification token** to
   `metadata.verification.google` in `src/app/layout.tsx`.
3. **Decide whether to add the recommended H1 secondary-keyword sub-clause**
   (§4 item 4). Visually heavier; SEO improvement is real but not enormous.
4. **Commit to a content-publishing cadence** before week 6 of the launch
   plan. Without content, organic growth plateaus at brand traffic +
   long-tail accidents.
5. **Hreflang setup** — currently English-only. If you add Greek or
   Portuguese pages later, set `alternates.languages` in page metadata
   and configure `hreflang` properly.

---

## 9. Cross-references

- On-page copy + keyword surfaces: `src/lib/content.ts`
- Title + meta tags: `src/app/layout.tsx`, per-page `metadata` exports
- Structured data: `src/components/jsonld.tsx`
- Search Console verification slot: `src/app/layout.tsx` (`metadata.verification`)
- Sitemap: `src/app/sitemap.ts` (regenerate `LAST_MOD` when content changes materially)
- GA4 + Consent Mode v2: `src/components/analytics.tsx`, `src/components/cookie-consent.tsx`
- Launch timeline that gates content publishing: `docs/pricing-and-launch.md` §6

---

## 10. When this doc goes stale

Refresh when any of these change:
- New primary product use case added (e.g. "compliance agent")
- Major competitor launches (need a `flowstack vs X` comparison page)
- Search Console reports a major impression spike on a query we didn't target
- Google changes rich-snippet eligibility rules (FAQPage snippets have
  been narrowed twice in the last 3 years)
- We add a new top-level page or sub-product

End of doc.
