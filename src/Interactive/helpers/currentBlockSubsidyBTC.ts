import { HALVING_SCHEDULE } from "../data";

export const currentBlockSubsidyBTC = (year: number = new Date().getFullYear()): number => {
  const sorted = [...HALVING_SCHEDULE].sort((a, b) => b.year - a.year);
  return sorted.find((h) => h.year <= year)?.reward ?? sorted[sorted.length - 1].reward;
};
