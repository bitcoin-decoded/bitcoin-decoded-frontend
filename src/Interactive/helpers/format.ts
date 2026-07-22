import type { Language } from "../../I18n";

export const fmtEur = (n: number, language: Language = "fr"): string =>
  new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

export const fmtBTC = (n: number): string => n.toFixed(8).replace(/\.?0+$/, "") + " BTC";
