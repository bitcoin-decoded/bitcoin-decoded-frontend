import type { ResumeTier } from "../types";

// Maps a completed-chapter count (0..19) to the encouragement tier whose copy the
// resume block shows.
export const getResumeTier = (done: number): ResumeTier =>
  done <= 0
    ? "start"
    : done <= 4
      ? "early"
      : done <= 9
        ? "mid"
        : done <= 14
          ? "half"
          : done <= 18
            ? "near"
            : "done";
