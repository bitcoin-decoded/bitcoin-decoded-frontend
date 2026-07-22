export const formatEur = (eur: number, locale: string, maximumFractionDigits = 2): string =>
  eur.toLocaleString(locale, { maximumFractionDigits });
