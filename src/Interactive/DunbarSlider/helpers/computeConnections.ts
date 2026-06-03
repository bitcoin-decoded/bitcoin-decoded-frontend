import type { Connection } from "../types";

/** Deterministic LCG so the sampled web is stable between renders. */
const seededRandom = (seed: number): (() => number) => {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
};

/**
 * Links to draw between dots. Below the cap, every pair is connected; above
 * it, a stable random sample of `maxLines` pairs stands in for the web (the
 * rest is conveyed by the density halo).
 */
export const computeConnections = (dotCount: number, maxLines: number): Connection[] => {
  if (dotCount < 2) return [];

  const totalPairs = (dotCount * (dotCount - 1)) / 2;
  if (totalPairs <= maxLines) {
    const all: Connection[] = [];
    for (let a = 0; a < dotCount; a++) {
      for (let b = a + 1; b < dotCount; b++) all.push({ a, b });
    }
    return all;
  }

  const rand = seededRandom(dotCount * 7919);
  const seen = new Set<string>();
  const sampled: Connection[] = [];
  let guard = 0;
  while (sampled.length < maxLines && guard < maxLines * 40) {
    guard++;
    const a = Math.floor(rand() * dotCount);
    const b = Math.floor(rand() * dotCount);
    if (a === b) continue;
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    const id = `${lo}-${hi}`;
    if (seen.has(id)) continue;
    seen.add(id);
    sampled.push({ a: lo, b: hi });
  }
  return sampled;
};
