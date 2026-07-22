export const formatRewardBTC = (btc: number): string => {
  if (btc <= 0) return "0";
  if (btc >= 1) return `${btc}`;
  return btc.toFixed(8).replace(/\.?0+$/, "");
};
