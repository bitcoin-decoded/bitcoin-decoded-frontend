type StoredProgress = {
  maxRevealed: number;
  current: number;
  done: number[];
  finished: boolean;
  lastVisitedBlock?: number | null;
};

export const readLastVisitedBlock = (stored: StoredProgress): number | null => {
  if (stored.lastVisitedBlock !== undefined) return stored.lastVisitedBlock;

  const hasStarted = stored.maxRevealed > 0 || stored.done.length > 0 || stored.finished;
  return hasStarted ? stored.current : null;
};
