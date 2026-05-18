import { BITCOIN_REFS } from "../data";

export const getCurrentBlockSubsidyBTC = (year: number = new Date().getFullYear()): number => {
  const sorted = [...BITCOIN_REFS.HALVING_SCHEDULE].sort((a, b) => b.year - a.year);
  return sorted.find((h) => h.year <= year)?.reward ?? sorted[sorted.length - 1].reward;
};
