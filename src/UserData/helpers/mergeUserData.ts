import type { StoredChapterProgress, UserData } from "../types";

// Non-regressive on both sides, mirroring the server rule, so the first-login
// union of local (guest) and server progress can be shown immediately without
// waiting for the server round-trip. A finished chapter wins; otherwise the one
// that revealed more blocks wins. A badge kept in both keeps its earliest date.
const mergeChapter = (a: StoredChapterProgress, b: StoredChapterProgress): StoredChapterProgress => {
  if (a.finished !== b.finished) return a.finished ? a : b;
  return a.maxRevealed >= b.maxRevealed ? a : b;
};

export const mergeUserData = (a: UserData, b: UserData): UserData => {
  const badges: Record<string, number> = { ...b.badges };
  for (const [id, at] of Object.entries(a.badges)) {
    badges[id] = id in badges ? Math.min(badges[id], at) : at;
  }

  const readingProgress = { ...b.readingProgress };
  for (const [id, progress] of Object.entries(a.readingProgress)) {
    readingProgress[id] = id in readingProgress ? mergeChapter(readingProgress[id], progress) : progress;
  }

  return { badges, readingProgress };
};
