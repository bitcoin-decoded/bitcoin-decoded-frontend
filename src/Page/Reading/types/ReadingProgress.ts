export type ReadingProgress = {
  maxRevealed: number;
  current: number;
  done: number[];
  finished: boolean;
  lastVisitedBlock: number | null;
};
