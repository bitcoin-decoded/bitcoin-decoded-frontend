/** Group satoshis with the locale's thousands separator (e.g. "12 345"). */
export const formatSats = (sats: number, locale: string): string => sats.toLocaleString(locale);
