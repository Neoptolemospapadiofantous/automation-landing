/**
 * Pricing display configuration.
 *
 * Currency, VAT rate, and VAT-treatment (incl. vs excl.) are all open
 * questions for the product owner — see the Engineering Brief:
 *
 *   OQ-1 Currency  — pricing is shown in USD for a Cyprus/EU company.
 *                    Confirm selling currency before launch.
 *   OQ-2 VAT        — Cyprus standard VAT is 19% as of 2026; OSS
 *                    registration is a tax-adviser decision.
 *
 * The values below are placeholders chosen so the page is valid
 * today: USD currency (unchanged from prior state), VAT not added to
 * the displayed sticker (treatment="exclusive"), label reads "ex. VAT".
 * Flipping any one of these to the real value is a one-line edit.
 *
 * For consumers, EU consumer law (CRD Art. 6) requires the **total
 * price incl. VAT** to be shown before contracting. When the seller
 * confirms VAT collection on the buyer side, switch `treatment` to
 * `"inclusive"` and the label below updates automatically.
 */
export type VatTreatment = "inclusive" | "exclusive";

export type PricingConfig = {
  currency: "USD" | "EUR";
  /** Decimal rate, e.g. 0.19 for 19%. Null when not yet registered. */
  vatRate: number | null;
  /**
   * inclusive — sticker price is what the buyer pays in total (the
   *             EU consumer-default; CRD-compliant for B2C).
   * exclusive — sticker is ex-VAT; total = sticker × (1 + rate). Only
   *             defensible for B2B-only sales.
   */
  treatment: VatTreatment;
};

export const PRICING_CONFIG: PricingConfig = {
  currency: "USD", // OQ-1
  vatRate: null, // OQ-2 — set to 0.19 once registered
  treatment: "exclusive", // OQ-2 — flip to "inclusive" for B2C sales
};

/**
 * Short label rendered next to every numeric price on the public site.
 * Examples:
 *
 *   { treatment: "exclusive", vatRate: 0.19 }   → "ex. 19% VAT"
 *   { treatment: "exclusive", vatRate: null }   → "VAT not added"
 *   { treatment: "inclusive", vatRate: 0.19 }   → "incl. 19% VAT"
 *   { treatment: "inclusive", vatRate: null }   → "incl. VAT"
 */
export function vatLabel(cfg: PricingConfig = PRICING_CONFIG): string {
  const pct = cfg.vatRate !== null ? `${Math.round(cfg.vatRate * 100)}% VAT` : null;
  if (cfg.treatment === "inclusive") {
    return pct ? `incl. ${pct}` : "incl. VAT";
  }
  return pct ? `ex. ${pct}` : "VAT not added";
}
