export type ProgressItem = {
  itemId: string;
  itemType: string;
  status: string;
  score: number | null;
  data: unknown;
};

// A total order on status: rank first, then the label itself as a deterministic
// tiebreak. Unknown labels rank 0. This makes the merge below independent of the
// order writes arrive in, which is the invariant two out-of-sync devices need.
const STATUS_RANK: Record<string, number> = {
  not_started: 0,
  in_progress: 1,
  done: 2,
  finished: 2,
  completed: 2,
  earned: 2,
  passed: 2,
};
const rankOf = (status: string): number => STATUS_RANK[status] ?? 0;

const maxScore = (a: number | null, b: number | null): number | null => {
  if (a === null) return b;
  if (b === null) return a;
  return Math.max(a, b);
};

// Non-regressive merge (CDC 6): a status never moves down and the score keeps its
// maximum. The row that wins the status also carries its data; ties keep the row
// already stored. Because the ordering is total and the base wins exact ties, the
// result is the same whatever order concurrent writes are applied in.
export const mergeProgress = (existing: ProgressItem | null, incoming: ProgressItem): ProgressItem => {
  if (!existing) return incoming;
  const rankExisting = rankOf(existing.status);
  const rankIncoming = rankOf(incoming.status);
  const incomingWins =
    rankIncoming > rankExisting || (rankIncoming === rankExisting && incoming.status > existing.status);
  return {
    itemId: existing.itemId,
    itemType: incomingWins ? incoming.itemType : existing.itemType,
    status: incomingWins ? incoming.status : existing.status,
    score: maxScore(existing.score, incoming.score),
    data: incomingWins ? incoming.data : existing.data,
  };
};
