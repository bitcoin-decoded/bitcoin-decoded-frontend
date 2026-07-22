export const getHaloOpacity = (relations: number): number => {
  if (relations <= 50) return 0;
  const minLog = Math.log10(51);
  const maxLog = Math.log10(49995000);
  const t = (Math.log10(relations) - minLog) / (maxLog - minLog);
  const clamped = Math.min(1, Math.max(0, t));
  return 0.12 + clamped * 0.73;
};
