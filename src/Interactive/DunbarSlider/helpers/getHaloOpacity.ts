/**
 * Opacity of the density halo. Below ~50 relationships the lines carry the
 * message (no halo). Above it, the count (= n(n-1)/2, i.e. ~n²) is mapped
 * through log10 so the glow stays visible across the huge 10 → 50M range
 * while still growing monotonically with n².
 */
export const getHaloOpacity = (relations: number): number => {
  if (relations <= 50) return 0;
  const minLog = Math.log10(51);
  const maxLog = Math.log10(49995000); // relations at the largest tier (n = 10 000)
  const t = (Math.log10(relations) - minLog) / (maxLog - minLog);
  const clamped = Math.min(1, Math.max(0, t));
  return 0.12 + clamped * 0.73; // 0.12 → 0.85
};
