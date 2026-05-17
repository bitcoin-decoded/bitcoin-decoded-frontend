import type { TxId } from "../types";

export const shuffleFirstSeen = (): readonly TxId[] => {
  const dist: TxId[] = ["a", "a", "b", "b"];
  for (let i = dist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dist[i], dist[j]] = [dist[j], dist[i]];
  }
  return dist;
};
