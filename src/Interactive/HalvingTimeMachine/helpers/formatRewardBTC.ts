/**
 * Formats a block subsidy (BTC) for display: whole numbers as-is, fractions
 * with trailing zeros stripped down to satoshi precision, and "0" once the
 * subsidy is fully exhausted. Decimal separator is always a dot - callers
 * localize it if needed.
 */
export const formatRewardBTC = (btc: number): string => {
  if (btc <= 0) return "0";
  if (btc >= 1) return `${btc}`;
  return btc.toFixed(8).replace(/\.?0+$/, "");
};
