import type { ProgressItem, StoredChapterProgress, UserData } from "../types";

// A chapter's status is derived from its reading state so the server can apply
// its non-regressive rule (a finished chapter never drops back to in_progress).
const chapterStatus = (p: StoredChapterProgress): string => {
  if (p.finished) return "completed";
  if (p.maxRevealed > 0 || p.current > 0) return "in_progress";
  return "not_started";
};

// The app's snapshot decomposed into the backend's normalized rows. A badge
// carries its earned timestamp in `data.at`; a chapter carries its full reading
// state in `data`, which is what the block reader reads back.
export const toProgressItems = (data: UserData): ProgressItem[] => [
  ...Object.entries(data.badges).map(([itemId, at]) => ({
    itemId,
    itemType: "badge",
    status: "earned",
    score: null,
    data: { at },
  })),
  ...Object.entries(data.readingProgress).map(([itemId, progress]) => ({
    itemId,
    itemType: "chapter",
    status: chapterStatus(progress),
    score: null,
    data: progress,
  })),
];
