import type { ChapterState } from "../types";

type ChapterFacts = {
  badgeEarned: boolean;
  lastVisitedBlock: number | null;
};

export const getChapterState = ({ badgeEarned, lastVisitedBlock }: ChapterFacts): ChapterState => {
  if (badgeEarned) return "completed";
  return lastVisitedBlock === null ? "unvisited" : "inProgress";
};
