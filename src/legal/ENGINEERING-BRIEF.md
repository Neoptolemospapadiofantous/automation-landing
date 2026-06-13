# Engineering brief — legal go-live changes (Flowstack)

> **Audience:** the coding agent implementing the changes. This is a
> self-contained brief — you should not need other docs to act, but each
> task cites its legal source under `docs/legal/` if you want the why.
>
> **Prepared:** 2026-06-13. **Status:** ready to implement the items
> marked *Ship now*; the *Launch-gated* items must wait for the two gates
> below.

---

## 0. Mission

Flowstack is going to production. The legal/compliance drafts are done
and being reviewed by counsel. Your job is the **code and content work**
that makes the product legally shippable in Cyprus/EU: fix one
correctness bug, build consumer-checkout compliance (the product now
sells B2C, not just B2B), make pricing/imprint compliant, and wire the
acceptance + transfer settings. Do **not** make legal decisions — where a
task says "counsel-approved text", use the approved markdown as the
source and do not invent legal wording.

## 1. Two hard gates (do not cross without sign-off)

- **GATE-ENTITY** — the company `[Company Name] Ltd` is not yet
  incorporated. Anywhere you see `[Company Name] Ltd`, `[address,
  registration no.]`, `[privacy@…]`, leave the placeholder *unless* given
  the real values. **Do not invent entity details.**
- **GATE-COUNSEL** — the published legal pages stay `robots: { index:
  false }` with their `DraftBanner` until counsel signs off. **Do not
  flip pages to indexable and do not enable registration acceptance
  (Task 7) with draft text.**

## 2. The golden rule (carried from `docs/legal/claims-vs-reality.md`)

Customer-facing copy may only claim controls that are actually
implemented. If you change what the code does, update
`claims-vs-reality.md`. If a claim isn't true yet, it does not ship.

## 3. Repo map

Two repos, both under `/home/theone`:

| Repo | Stack | Role |
|---|---|---|
| `automation-landing` | Next.js 16 (App Router), TSX | Public marketing site + the **published** legal pages |
| `automation_dashboard` | Laravel 12 + Inertia/Vue 3 (Jetstream) | The product: auth, billing (Stripe), agents, leads |

**Critical fact:** the published legal pages are **hand-written TSX**, not
generated from markdown. The counsel-reviewed source of truth lives in
`automation_dashboard/docs/legal/*.md`; the live pages are separate React
components that must be **transcribed by hand**:

| Live page (landing) | Source of truth (dashboard) |
|---|---|
| `src/app/privacy/page.tsx` | `docs/legal/privacy-policy.md` |
| `src/app/terms/page.tsx` | `docs/legal/compliance-framework.md` (Schedule 2 + 2A) |
| `src/app/dpa/page.tsx` | `docs/legal/compliance-framework.md` (Schedule 1) |
| `src/app/security/page.tsx` | `docs/legal/trust-page.md` §7 |

Rendered through `src/components/legal/legal-doc.tsx` (provides the
`DraftBanner`, TOC, §-anchors). Keep that component; only change content.

---

## 4. Tasks

Each task: **repo · files · do · why · acceptance · depends-on.**
Priority tags: **[Ship now]** (no gate), **[Consumer]** (needed before any
consumer can buy), **[Launch-gated]** (needs GATE-COUNSEL/GATE-ENTITY).

---

### TASK 1 — Fix the /privacy cookie disclosure (correctness bug) **[Ship now]**

- **Repo / files:** `automation-landing` · `src/app/privacy/page.tsx`
- **Do:** The live privacy page states (or implies) "no analytics
  cookies / no banner". That is **false** — the site runs Google
  Analytics 4 (`src/components/analytics.tsx`). Update the cookie section
  to match reality, transcribing the corrected table from
  `docs/legal/privacy-policy.md` → "Cookie Policy". It must disclose:
  - `flowstack-consent` (localStorage; remembers the choice; strictly necessary)
  - **Google Analytics 4** (`_ga`, `_ga_*`; analytics; **consent-required**; loaded `analytics_storage: denied` by default, granted only on Accept)
  - the dashboard session + `fs_embed` widget cookies (strictly necessary)
- **Why:** The cookie banner links to `/privacy`; a policy that denies the
  analytics it actually runs is a direct ePrivacy/GDPR exposure under
  Cyprus Law 112(I)/2004. (`docs/legal/cyprus-compliance.md` §4.)
- **Acceptance:** `/privacy` cookie section lists GA4 as consent-gated
  analytics and names the consent mechanism; no remaining "we set no
  analytics cookies" sentence.
- **Depends-on:** none. Safe to ship immediately — it makes a live page
  *more* accurate.

---

### TASK 2 — Persistent "Cookie settings" re-open control **[Ship now]**

- **Repo / files:** `automation-landing` · `src/components/cookie-consent.tsx`, `src/components/site-footer.tsx`
- **Do:** After a visitor accepts/declines, the banner never returns.
  Add a footer "Cookie settings" link that re-opens the banner (clears or
  overrides the stored decision so the user can change it), and on change
  dispatch the existing `flowstack-consent` event so `analytics.tsx`
  updates Consent Mode. Reuse the existing `writeConsent` / `CONSENT_EVENT`
  plumbing — do not build a parallel store.
- **Why:** Consent must be as easy to withdraw as to give (Cyprus
  Commissioner position). The mechanism exists; it just lacks a re-entry
  point.
- **Acceptance:** From any page footer, a user can re-open the consent UI
  and switch granted⇄denied; GA4 `analytics_storage` follows the change
  without a reload.
- **Depends-on:** none.

---

### TASK 3 — Consumer checkout: immediate-performance consent + withdrawal waiver **[Consumer]**

This is the most important new mechanic and the one most specific to your
stack. **Background:** checkout uses **Stripe *hosted* Checkout** —
`SubscribeController::start` (`app/Http/Controllers/SubscribeController.php`)
creates a session via `StripeClient::createSubscriptionCheckout` and
`redirect()->away()`s the browser to Stripe. Activation happens in the
Stripe webhook. So you **cannot** put the consent UI on Stripe's page;
collect it **before** the redirect and enforce server-side.

- **Repo:** `automation_dashboard`
- **Files:**
  - the dashboard page holding the "Subscribe/Upgrade" buttons (the plan picker that POSTs to `subscribe.start`; likely `resources/js/Pages/Billing/*` — find the form that hits `/subscribe/{plan}`)
  - `app/Http/Controllers/SubscribeController.php` (`start`)
  - a new migration + model for the consent record (e.g. `purchase_consents`)
- **Do:**
  1. **UI:** before the subscribe POST, show a **required, un-ticked**
     checkbox: *"I want my subscription to start immediately and I
     understand that by doing so I lose my 14-day right of withdrawal
     once the service begins."* Plus a normal "I accept the Terms &
     Privacy Policy" check. Submit must be blocked until ticked.
  2. **Server enforcement:** in `SubscribeController::start`, reject
     (422 / back-with-errors) if the consent flags are absent — never
     rely on the client alone.
  3. **Persist a consent record**: `user_id`, `team_id`, `plan_key`,
     `terms_version`, `immediate_performance_consent = true`,
     `withdrawal_right_waived = true`, `consented_at` (server timestamp),
     `ip`. Write it **before** creating the Stripe session; pass its id in
     the Checkout `metadata` so the webhook can correlate.
- **Why:** Consumer Rights Directive 2011/83/EU (transposed in Cyprus).
  A digital service may start within the 14-day window only with express
  prior consent **and** acknowledged loss of the withdrawal right;
  otherwise you owe pro-rata refunds. (`compliance-framework.md`
  Schedule 2A; `cyprus-compliance.md` §6.)
- **Acceptance:** Cannot reach Stripe Checkout without both boxes ticked;
  a `purchase_consents` row exists for every started checkout with a
  server timestamp and terms version; server rejects a forged/absent
  consent; the metadata links session→consent.
- **Depends-on:** terms version string (Task 7 / counsel). If terms text
  isn't final, store a provisional version tag and make it
  forward-compatible.

> **Scope note for the product owner, not you:** if "consumers" are
> actually sole traders buying for their business, this is legally B2B and
> Task 3 may be descoped. Build it unless told otherwise.

---

### TASK 4 — Durable-medium purchase confirmation **[Consumer]**

- **Repo / files:** `automation_dashboard` · the post-checkout webhook
  path (`StripeWebhookController` handling `checkout.session.completed`) +
  a new Mailable; email via AWS SES.
- **Do:** On successful subscription activation, email the buyer a
  confirmation containing: what they bought, total price **incl. VAT**,
  the Terms + Privacy at the purchased version, and an explicit line
  confirming the immediate-performance consent / withdrawal-right waiver
  recorded in Task 3.
- **Why:** CRD Art. 8 — confirmation on a durable medium, including
  confirmation of the prior consent. (`compliance-framework.md`
  Schedule 2A.)
- **Acceptance:** A real email is sent on `checkout.session.completed`
  containing price-incl-VAT and the consent confirmation; content pulls
  the same `terms_version` as the consent record.
- **Depends-on:** Task 3 (consent record), Task 5 (VAT figure).

---

### TASK 5 — VAT-aware pricing display **[Consumer / Ship-now-able]**

- **Repo / files:** `automation-landing` · `src/app/pricing/page.tsx`
  (plan data + price cells), and any dashboard plan labels that show price.
- **Do:** Two issues on the pricing page today: prices are shown in **USD
  ($99/mo, $399/mo)** for a Cyprus/EU seller, and there is **no VAT
  treatment shown**. (a) Confirm/standardise the currency (product-owner
  decision — see open question OQ-1). (b) State whether displayed prices
  **include or exclude VAT**; for consumer-facing prices show the **total
  price incl. VAT**, businesses may be shown ex-VAT with a clear label.
- **Why:** E-Commerce Law 156(I)/2004 + CRD require total price incl. all
  charges shown before contracting. (`cyprus-compliance.md` §2, §6.)
- **Acceptance:** Every price on `/pricing` carries an unambiguous VAT
  label; consumer total incl. VAT is shown before checkout begins.
- **Depends-on:** OQ-1 (currency) + OQ-2 (VAT rate/registration) — flag to
  product owner; implement the display logic now with the rate as config.

---

### TASK 6 — Public-site imprint / company identity **[Launch-gated: GATE-ENTITY]**

- **Repo / files:** `automation-landing` · `src/components/site-footer.tsx`
- **Do:** Add the legal identity block: **registered legal name,
  DRCIP registration number, registered Cyprus office address, contact
  email**. Use the values supplied post-incorporation; until then leave a
  clearly-marked placeholder and do **not** invent.
- **Why:** 156(I)/2004 identity-transparency duty for online providers.
  (`cyprus-compliance.md` §6.)
- **Acceptance:** Footer shows the four identity fields on every page once
  real values exist.
- **Depends-on:** GATE-ENTITY.

---

### TASK 7 — Enforce Terms/Privacy acceptance at registration **[Launch-gated: GATE-COUNSEL]**

- **Repo / files:** `automation_dashboard` · `config/jetstream.php`
- **Do:** Uncomment `Features::termsAndPrivacyPolicy()` in the `features`
  array (currently line ~61, commented). The Jetstream `Register.vue`
  (`resources/js/Pages/Auth/Register.vue`) acceptance checkbox appears
  automatically. Ensure the linked Terms/Privacy routes resolve to the
  published (approved) pages.
- **Why:** Lawful-basis / contract acceptance at signup. Per
  `claims-vs-reality.md`, this feature is "ready but OFF — enable only
  when counsel approves the policy text."
- **Acceptance:** New registrations require ticking acceptance; links go to
  live approved Terms + Privacy.
- **Depends-on:** **GATE-COUNSEL** (approved page text) + Task 1.

---

### TASK 8 — EU endpoints for Pusher & AWS SES **[Ship now, recommended]**

- **Repo / files:** `automation_dashboard` · `.env` / deployment env
  (`PUSHER_*` cluster, AWS SES region) and any hardcoded region.
- **Do:** Point Pusher at its **EU cluster** and AWS SES at an **EU
  region**. Verify the realtime payloads (which can carry lead
  names/snippets) and transactional email both transit EU infrastructure.
- **Why:** Eliminates two international-transfer questions entirely —
  cleaner than relying on SCCs/DPF for these two. (`cyprus-compliance.md`
  §7.)
- **Acceptance:** Pusher cluster = `eu`; SES region = an EU region;
  realtime + email verified working post-change.
- **Depends-on:** none (config-only), but coordinate with whoever holds
  the prod credentials.

---

### TASK 9 — Transcribe approved legal markdown → live TSX **[Launch-gated: GATE-COUNSEL]**

- **Repo / files:** `automation-landing` · `src/app/{terms,privacy,dpa,security}/page.tsx`
- **Do:** Once counsel approves the markdown, transcribe the final text
  into the four TSX pages, run the **placeholder fill-in** (real entity
  details), keep `DraftBanner` until the final flip. The terms page must
  include the **consumer terms (Schedule 2A)** content for B2C buyers.
- **Why:** Markdown is the source of truth; the live pages must match the
  approved text exactly.
- **Acceptance:** Live pages match approved markdown; no `[PLACEHOLDER]`
  remains; Schedule 2A consumer terms present on `/terms`.
- **Depends-on:** GATE-COUNSEL, GATE-ENTITY, Task 1.

---

## 5. Do NOT touch (already correct)

- **GA4 consent mechanism** — `analytics.tsx` + `cookie-consent.tsx`
  implement Google Consent Mode v2 with `analytics_storage: 'denied'` by
  default, equal Decline/Accept, and replay of prior choice. This already
  meets the Cyprus prior-opt-in standard. Only fix the *policy text*
  (Task 1) and add the *re-open link* (Task 2); leave the mechanism.
- **AI Act Art. 50 disclosure + human handoff** — implemented and tested.
  Do not alter the chat-header "AI assistant — not a person" banner or the
  `request_handoff` path.
- **Server-side LLM keys, credit metering, log redaction, rate limits** —
  all tested; out of scope here.

## 6. Open questions for the product owner (don't guess — surface these)

- **OQ-1 Currency:** pricing is in USD for a Cyprus/EU company. Confirm
  the selling currency before finalising Task 5.
- **OQ-2 VAT:** standard Cyprus VAT is 19%; registration + OSS status is a
  tax-adviser decision (`cyprus-compliance.md` §2, §6). Implement Task 5
  with the rate/flags as config, not hardcoded assumptions.
- **OQ-3 B2C vs sole-trader:** confirms whether Tasks 3/4 are in scope.

## 7. Suggested PR order

1. **PR-1 [Ship now]:** Task 1 + Task 2 (cookie correctness + re-open) + Task 8 (EU endpoints).
2. **PR-2 [Consumer]:** Task 3 + Task 4 + Task 5 (consent record, durable email, VAT display).
3. **PR-3 [Launch]:** Task 9 + Task 6 + Task 7 — after GATE-ENTITY and GATE-COUNSEL clear. This is the flip-to-live PR.

After each PR, update `docs/legal/claims-vs-reality.md` for anything whose
implementation status changed.

---

## 8. References

### Internal (this folder — the "why" behind each task)

| Doc | Covers | Tasks |
|---|---|---|
| [`go-live-checklist.md`](./go-live-checklist.md) | Sequenced launch plan; founder track A1–A10 | all |
| [`cyprus-compliance.md`](./cyprus-compliance.md) | Cyprus national layer — retention, VAT, ePrivacy, transfers, consumer law | 1,3,5,6,8 |
| [`compliance-framework.md`](./compliance-framework.md) | DPA/ToS skeletons; Schedule 2A consumer terms; Schedule 3 custom-build | 3,4,7,9 |
| [`privacy-policy.md`](./privacy-policy.md) | Corrected cookie table (GA4) = source for Task 1 | 1,9 |
| [`trust-page.md`](./trust-page.md) | Security §7 = source for the security page | 9 |
| [`breach-runbook.md`](./breach-runbook.md) | GDPR Art. 33–34 response | — (ops) |
| [`claims-vs-reality.md`](./claims-vs-reality.md) | Honesty ledger — the golden rule (§2) | all |

### External legal sources (verify currency at use)

**Cyprus authorities & statutes**
- Cyprus Commissioner for Personal Data Protection — https://www.dataprotection.gov.cy
- Law 125(I)/2018 (official EN translation) — https://www.dataprotection.gov.cy/dataprotection/dataprotection.nsf/2B53605103DCE4A4C225826300362211/$file/Law%20125(I)%20of%202018%20ENG%20final.pdf
- ePrivacy / cookies — Law 112(I)/2004, Part 14 (Cyprus Commissioner position: notice ≠ consent) — https://thecypruslawyer.com/cyprus-cookies-website-consent/  *(Tasks 1, 2)*
- Electronic Commerce Law 156(I)/2004 (identity + total-price transparency) — https://www.digequal.com/electronic-commerce-law-156i-2004/  *(Tasks 5, 6)*
- Cyprus consumer protection (CRD transposition) — ICLG 2025-26 — https://iclg.com/practice-areas/consumer-protection-laws-and-regulations/cyprus  *(Tasks 3, 4)*
- Tax/VAT/retention (2026 reform; 6-yr retention, €15,600 threshold, 19% VAT) — https://www.sovereigngroup.com/news/cyprus-brings-comprehensive-tax-reform-into-force/ · https://taxsummaries.pwc.com/cyprus/corporate/other-taxes  *(Task 5)*
- Company formation + UBO (90-day filing) — https://philippoulaw.com/articles/cyprus-ubo-register-essential-guide-to-beneficial-ownership-compliance  *(Task 6 / GATE-ENTITY)*

**EU instruments**
- GDPR — Regulation (EU) 2016/679 — https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng
- Consumer Rights Directive — Directive 2011/83/EU (Arts. 6, 8, 9, 16 — disclosures, durable medium, withdrawal, digital-service exception) — https://eur-lex.europa.eu/eli/dir/2011/83/oj  *(Tasks 3, 4)*
- ePrivacy Directive — Directive 2002/58/EC (as amended) — https://eur-lex.europa.eu/eli/dir/2002/58/oj  *(Tasks 1, 2)*
- EU AI Act — Regulation (EU) 2024/1689 (Art. 50 transparency) — https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng
- EU AI Act in Cyprus (DMRID national coordinator) — https://www.globallegalinsights.com/practice-areas/ai-machine-learning-and-big-data-laws-and-regulations/cyprus/

**International transfers**
- EU-US Data Privacy Framework — authoritative participant list — https://www.dataprivacyframework.gov/list  *(Task 8 context)*
- 2026 EU-US AI-transfer status (Anthropic/OpenAI/Google DPF) — https://notraced.com/articles/eu-us-ai-transfers-2026
- Stripe DPF — https://stripe.com/legal/dpa

**Technical guidance (for Tasks 1/2)**
- Google Consent Mode v2 — https://developers.google.com/tag-platform/security/guides/consent

> All external sources were checked on 2026-06-13. Law changes — counsel
> must confirm currency before any document relying on these is published.
> These references support the engineering work; they are **not** a
> substitute for the counsel sign-off required by GATE-COUNSEL.
