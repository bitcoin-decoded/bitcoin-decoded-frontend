/** Format a number as euros with French thousands separator. e.g. 1000 → "1 000 €" */
export const fmtEur = (n: number): string =>
  n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) + "\u00a0€";

/** Format a BTC amount, trimming trailing zeros. e.g. 0.4999 → "0.4999 BTC", 0.5000 → "0.5 BTC" */
export const fmtBTC = (n: number): string =>
  n.toFixed(8).replace(/\.?0+$/, "") + " BTC";
