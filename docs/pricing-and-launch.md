# Pricing & Launch Plan — Flowstack

> Single source of truth for what we charge, why, and how we get to launch.
> Pricing constants live in `automation_dashboard/app/Billing/Plan.php` +
> `TopUpPack.php`. Landing copy reads from
> `automation-landing/src/lib/content.ts`. This doc is the rationale + plan
> behind those numbers.

**Updated:** 2026-06-11
**Status:** Pricing tiers final; top-up packs **need re-pricing** (see §3)
**Owner:** [TBC]

---

## 1. The product, in one paragraph

A real-time multi-tenant SaaS where every team configures their own AI agent
through a managed onboarding flow. Agents are powered by Flowstack's native
runtime (Anthropic Haiku + OpenAI embeddings + Typesense vector search) or
legacy Voiceflow (kept only for pre-migration agents). The dashboard ticks
live across all connected screens via WebSockets (Pusher in production,
Reverb as the self-hosted fallback), with lead-qualification, knowledge-base
upload, transcript review, and Kanban delegation built in. Customers pay
monthly for one or more agents and a pool of conversation credits;
custom-build engagements deliver bespoke flows, integrations, and internal
tooling on top of the same runtime.

---

## 2. Tier specification

Source of truth: `automation_dashboard/app/Billing/Plan.php`.

| | Starter | Operator | Custom |
|---|---|---|---|
| **Price** | $99/mo | $399/mo | scoped 4–6 week project |
| **Annual** | $988/yr ($82/mo equivalent, 17% off) | $3,972/yr ($331/mo equivalent, 17% off) | — |
| **Agents** | 1 | up to 5 | bespoke |
| **Conversation credits / month** | 2,500 | 25,000 | negotiated |
| **Top-ups** | ✅ | ✅ | n/a (project-based) |
| **Knowledge-base upload** | ✅ | ✅ | ✅ |
| **Real-time dashboard + transcripts** | ✅ | ✅ | ✅ |
| **Lead routing + Kanban** | ✅ | ✅ | ✅ |
| **Support** | community / email | 24h email | dedicated |
| **Custom integrations (AMS, CRM, telephony)** | — | — | ✅ |
| **Custom flows / your own LLM / your UI** | — | — | ✅ |
| **Lock-in** | none, cancel anytime | none, cancel anytime | order-form scoped |
| **CTA on landing** | `Try it for $99 →` | `Start with Operator` | `Book the audit` |

Notes from `Plan.php`:
- One credit = one message in either direction (user *or* agent reply).
- The runtime has a per-session ceiling of 100 turns (`RUNTIME_MAX_TURNS`),
  so a runaway session can't burn arbitrary credits even if a customer
  misconfigures their flow.
- The enum cases stayed `free` / `pro` / `business` because the
  `teams.plan` column persists the string; renaming the cases would need
  a data migration. The display labels are Starter / Operator / Custom
  via `label()`.

---

## 3. Top-up packs — **needs re-pricing**

Source of truth: `automation_dashboard/app/Billing/TopUpPack.php`.

### Current (broken)

| Pack | Credits | Price | Per-credit | vs Starter base | vs Operator base |
|---|---|---|---|---|---|
| Small | 1,000 | $10 | $0.0100 | **4× cheaper** | 60% cheaper |
| Medium | 5,000 | $39 | $0.0078 | 5× cheaper | **2× cheaper** |
| Large | 20,000 | $129 | $0.0065 | 6× cheaper | **2.5× cheaper** |

Plan rates as reference:
- Starter $99 / 2,500 = $0.0396 per credit
- Operator $399 / 25,000 = $0.0160 per credit

### Why it's broken

The TopUpPack docblock states the intended design: *"Pricing per credit is
INTENTIONALLY worse than the Operator tier on the small pack and only matches
Operator on the large pack."* That math was correct at the old $19 / $79
plan prices. After the price bump to $99 / $399, the relationship inverted —
top-ups are now massively cheaper per credit than the plans they're meant to
support.

The leak: a Starter customer can keep their plan at minimum usage and buy
all credits via Medium packs at $0.008/credit instead of the $0.040/credit
base rate. That's a 5× margin loss on those credits and removes the
upgrade-pressure mechanism entirely.

### Fix — proposed new top-up pricing

Anchor top-ups at ~1.1–1.2× the per-credit rate of the tier they belong to,
matching the original design intent.

| Pack | Credits | Price | Per-credit | Relation |
|---|---|---|---|---|
| **Small** | 1,000 | **$45** | $0.0450 | 1.14× Starter base (slight relief, clear upgrade pressure) |
| **Medium** | 5,000 | **$95** | $0.0190 | 1.19× Operator base (sized for Operator overruns) |
| **Large** | 20,000 | **$320** | $0.0160 | matches Operator base (volume floor, parity with plan) |

Implementation: change the `priceUsd()` return values in `TopUpPack.php`,
create new Stripe SKUs at the new amounts, update
`config/billing.stripe_price.topup_*`, then existing
`grantTopUp()` flow is untouched.

UI consequence: the Billing/Index.vue page currently shows a per-credit
breakdown; with the new prices the "buy a pack" feels less like a deal and
more like a buffer — which is the intent.

---

## 4. Unit economics — what each plan actually costs us

### Per-message cost basis (native engine)

From `automation_dashboard/docs/runtime-native.md`:
> Native cost basis: ~$0.005–0.01 per customer message
> (Anthropic Haiku + OpenAI embeddings) → ~99% gross margin at the $99
> Starter price.

So one credit on the native engine costs us about $0.0075 average.

### Per-customer cost at full credit utilisation

| Plan | Credits/mo | LLM cost | Plan revenue | LLM gross margin |
|---|---|---|---|---|
| Starter | 2,500 | $18.75 | $99 | 81% |
| Operator | 25,000 | $187.50 | $399 | 53% |

These are *worst case* (customer burns every credit). Typical utilisation is
40–60% based on usage patterns in `runtime_sessions`, so realistic margins
are 88–95%.

### Fixed monthly costs (single Forge box, native runtime)

| Item | Cost | Notes |
|---|---|---|
| Forge VPS (1–2 GB) | $5–20/mo | Hetzner / DO / Vultr |
| Domain | ~$1/mo amortised | `.com` at standard pricing |
| Resend (transactional email) | $0 → $20/mo | free up to 100/day |
| Pusher (real-time WebSocket) | $0 → $49/mo | free at 100 concurrent / 200k msgs/day |
| Anthropic + OpenAI | usage-based | bundled into per-credit cost above |
| Typesense | self-hosted on same VPS | $0 |
| **Stripe** | 2.9% + 30¢ per transaction | comes off revenue |
| **Total fixed** | **$25–90/mo** | scales with traffic, not customer count |

### Margin math at typical customer mix (90% Starter / 9% Operator / 1% Custom)

| Customers | Revenue/mo | LLM cost (50% util.) | Stripe (3%) | Fixed | Net | Margin |
|---|---|---|---|---|---|---|
| 5 | $625 | $50 | $19 | $40 | **$516** | 83% |
| 20 | $2,505 | $200 | $75 | $50 | **$2,180** | 87% |
| 50 | $6,260 | $500 | $188 | $70 | **$5,502** | 88% |
| 100 | $12,510 | $1,000 | $375 | $80 | **$11,055** | 88% |
| 250 | $31,275 | $2,500 | $938 | $120 | **$27,717** | 89% |

The model holds: native runtime gives us ~88% sustained gross margin from
customer 5 through customer 250, after which infrastructure step-up costs
(bigger VPS, larger Pusher tier, possibly horizontal scaling — see
`automation-landing/docs/deploy-forge.md` §13) shift the curve.

Stage-2 ceiling on a single Forge box: roughly 250 customers before
infrastructure becomes interesting. Stage 3 = Reverb self-hosted +
horizontal pub/sub.

---

## 5. Pricing rationale

### Why $99 / $399 / Custom (and not the prior $19 / $79)

**Premium positioning.** B2B SaaS at $19/mo signals consumer-tier; the
target customer (operations leaders at companies serious enough to need an
agent platform with knowledge base, transcripts, real-time delegation) is
not the buyer who's deciding at $19 vs $25. The buyer at $99 is the one
who already understands they're going to spend on tooling and wants quality.

**Operator at 4× the price for 10× the credits.** That's the standard SaaS
shape — volume discount as you scale. Pulls Starter customers up once their
usage stabilises above ~3,000 credits/month.

**Custom hides the dollar number.** "Let's talk" / "By scope" signals the
work is bespoke; once you put a number on Custom you anchor every
conversation to that number, even when the actual scope is half or twice.
The prior `from $15k` was removed for this reason; the landing now uses
`Let's talk` in the pricing card and `BY SCOPE` in the final-CTA strip.

### Why no free trial

Per `Plan.php` docblock: *"No free trial — product decision 2026-06-09. The
$99 Starter tier IS the entry point; cancel anytime via the Stripe Billing
Portal."*

Implementation note: do not add `trial_period_days` to Stripe Checkout
sessions in `StripeClient.php`. Cancel-anytime via the Billing Portal is the
risk-reversal that replaces a trial.

### Why annual is 17% off (and not more)

17% = the SaaS convention for "2 months free on annual" (10/12 ≈ 0.83).
Higher would erode margins on annual customers without proportional
retention upside. Lower would not move the conversion needle. Hard-coded
in `Plan::annualSavingsPct()`; switch to reading from the Stripe price
object if you ever want different ratios per tier.

### Why credits over flat seat pricing

Conversation credits map directly to LLM cost, the dominant variable. Per-
seat would punish low-message, many-user customers and undercharge high-
message customers. Credit packs also give us a natural upsell path
without renegotiating a contract.

---

## 6. Launch plan — re-anchored to today

Today: 2026-06-11 — day 2 of the soft-launch window.

### Path A — Founder cohort (target soft launch 2026-06-24, **13 days out**)

| Week | Days | Owner | What |
|---|---|---|---|
| 1 | 06-10 → 06-16 | 🧑 you | Domain + DNS + SSL; real `BRAND.contact.*` inboxes; deploy to Forge; uptime monitor; `php artisan platform:set` with real `founder_slots_total`, `next_cohort_label`, `featured_proof`. |
| 2 | 06-17 → 06-23 | 🧑 you | One-page founder MSA template; manual Stripe invoicing setup; sitemap submitted to Google Search Console; soft-launch comms to personal network. |
| 3 | 06-24 → 06-30 | 🧑 you | Open the gate — 5 founder cohort onboardings, one-on-one; capture quotes + screenshots for the (re-added) testimonials section. |

Critical-path block: the domain. Until `NEXT_PUBLIC_SITE_URL` resolves,
SEO surfaces (sitemap, canonical, OG image) all advertise
`flowstack.example`. Everything downstream stalls.

### Path B — Public self-serve launch (target 2026-07-22)

| Week | Days | Owner | What |
|---|---|---|---|
| 3 | 06-24 → 06-30 | ⚖ counsel + 🧑 you | Engage counsel; send the `docs/counsel-handover.md` brief + TBC inventory. Stripe products configured ($99 Starter, $399 Operator, annual variants); Stripe Checkout wired in dashboard; **fix top-up pricing — see §3**. |
| 4 | 07-01 → 07-07 | 🛠 dashboard repo | Subscription state machine on dashboard (`trialing` / `active` / `past_due` / `canceled`); end-to-end test (signup → Stripe → tenant provisioning); Sentry on both projects; cancellation + refund flows. |
| 5 | 07-08 → 07-14 | ⚖ counsel + 🧑 you | Counsel revisions; you resolve every `[TBC]` (hosting region, sub-processor list, breach window, governing law, retention); flip the four legal pages DRAFT → FINAL via the §7 checklist in `counsel-handover.md`. |
| 6 | 07-15 → 07-21 | 🧑 you | Press kit + announcement post + HN / Product Hunt scheduling; open self-serve registration; first 72h: monitor uptime, Stripe events, Sentry, SSE connection counts. |

---

## 7. Open pricing decisions to make before launch

Concrete things that need a yes/no, ordered by urgency:

1. **Fix the top-up pack prices** before Stripe products are created in §3.
   The Stripe SKUs you create now will be the ones live customers pay; bad
   prices baked into SKUs cost more to fix than to set correctly the first
   time. Recommended new values in §3.
2. **Confirm "no free trial" survives launch.** Some founders will ask
   for a 14-day trial; the rationale to refuse is in `Plan.php` and §5.
3. **Decide whether annual pricing is shown at launch.** Stripe SKUs need
   to exist for both Monthly + Annual; `Plan::stripePriceId()` already
   handles the cycle. Recommendation: ship Monthly only at soft launch
   (week 2–3), add Annual at public launch (week 6) once you have
   baseline retention data.
4. **Confirm Operator's "up to 5 agents"** matches what the dashboard
   actually enforces. `Plan::maxAgents()` returns 5 for Operator — verify
   no other code path bypasses this (search for `agent` creation flow in
   the dashboard).
5. **Document the Custom-build floor in counsel intake**, not in public
   copy. Tell counsel "we anchor Custom at ~$15k–25k internally" so they
   can flag if the MSA template needs different liability terms for
   sub-$10k engagements (it probably doesn't).
6. **Set a date for the next pricing review.** Recommend: 2026-12-11
   (six months post-launch). Things to revisit then: actual credit
   utilisation, churn rate by tier, did Custom upgrades materialise from
   Operator overruns, did the announcement-bar countdown drive any
   measurable conversion bump.

---

## 8. Risks / things to watch post-launch

- **Top-up price arbitrage** — if not fixed in §3, expect early adopters
  to optimise around it within weeks.
- **Annual cohort cohort retention** — annual customers are usually
  stickier, but the 17% discount eats margin if they churn at month 3.
- **Custom-build scope creep** — without a numeric anchor on the public
  page, every conversation starts fresh. Counsel-approved MSA + a one-page
  scoping deliverable mitigates.
- **Operator credit ceiling at 25,000** — at typical 20-msg conversations,
  that's ~1,250 conversations/month. Heavy claims-intake or quote-
  qualification customers might burn through faster. Watch the
  CreditMeter alert thresholds (`EvaluateCreditAlerts.php`).
- **Voiceflow-legacy customers** — legacy agents still cost ~$10/customer
  in pass-through LLM fees vs ~$0.50/customer on native. Migration to
  native is in progress per `runtime-native.md`; pricing assumes native
  margin. Track legacy share as a separate cohort.
- **Stripe processing fees at low volume** — 2.9% + 30¢ on a $99 charge =
  $3.17 (3.2%). On Annual $988 = $28.97 (2.9%). At low customer counts
  this is the second-largest line after LLM cost.

---

## 9. Cross-references

- Pricing constants: `automation_dashboard/app/Billing/Plan.php`
- Top-up packs: `automation_dashboard/app/Billing/TopUpPack.php`
- Cost basis: `automation_dashboard/docs/runtime-native.md` §"Economics note"
- Legacy economics (Voiceflow era, historical): `automation_dashboard/docs/operations/economics.md`
- Landing copy: `automation-landing/src/lib/content.ts` (`pricingTiers`)
- Landing FAQ tier description: `automation-landing/src/lib/content.ts` (`faqItems[1]`)
- Counsel handover: `automation-landing/docs/counsel-handover.md`
- Deploy guide: `automation-landing/docs/deploy-forge.md`
- JSON-LD Offer wiring: `automation-landing/src/components/jsonld.tsx`

---

## 10. When this doc goes stale

Update when any of these change:
- Anthropic Haiku or OpenAI embedding token pricing
- Forge / hosting / Pusher tier pricing
- Stripe fee structure
- Our plan tiers (`Plan.php`)
- Top-up pack prices (`TopUpPack.php`)
- Annual discount percentage (`Plan::annualSavingsPct()`)
- The launch dates in §6

End of doc.
