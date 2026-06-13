import type { Language } from "../../I18n";

/** Format a number as euros, locale-aware. FR: "1 000 €", EN: "€1,000". */
export const fmtEur = (n: number, language: Language = "fr"): string =>
  new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

/** Format a BTC amount, trimming trailing zeros. e.g. 0.4999 → "0.4999 BTC", 0.5000 → "0.5 BTC" */
export const fmtBTC = (n: number): string => n.toFixed(8).replace(/\.?0+$/, "") + " BTC";
