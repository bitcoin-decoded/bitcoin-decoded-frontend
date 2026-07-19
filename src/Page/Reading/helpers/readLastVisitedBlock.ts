type StoredProgress = {
  maxRevealed: number;
  current: number;
  done: number[];
  finished: boolean;
  /** Absent on records written before the field existed. */
  lastVisitedBlock?: number | null;
};

/**
 * `lastVisitedBlock` for a stored record, migrating the ones written before the
 * field existed.
 *
 * Those older records cannot be read from `current` alone: a chapter merely
 * opened and a chapter started then walked back to block 01 both sit at
 * `current: 0` — the very ambiguity this field removes. But real progress
 * always leaves a mark elsewhere, because only `advance` raises `maxRevealed`
 * and only manipulating a tool block fills `done`. So either of those, or a
 * sealed pass, proves the reader started; `current` is then trustworthy as the
 * block they were on.
 */
export const readLastVisitedBlock = (stored: StoredProgress): number | null => {
  if (stored.lastVisitedBlock !== undefined) return stored.lastVisitedBlock;

  const hasStarted = stored.maxRevealed > 0 || stored.done.length > 0 || stored.finished;
  return hasStarted ? stored.current : null;
};
