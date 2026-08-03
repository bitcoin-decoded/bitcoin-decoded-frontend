import type { ReadingProgressMap } from "./ReadingProgressMap";

// The full snapshot of everything that belongs to a user. Today it is stitched
// together from localStorage; tomorrow a single `GET /me` returns this exact
// shape. `badges` maps a badge id to the timestamp it was earned at.
export type UserData = {
  badges: Record<string, number>;
  readingProgress: ReadingProgressMap;
};
