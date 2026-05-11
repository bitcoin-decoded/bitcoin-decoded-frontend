import type { PageMetadata } from "../types";

// Standard adult reading pace for general-interest prose. Bitcoin.Decoded
// is technical-but-accessible; this is the same range used by Medium /
// Substack badges and feels honest for the audience.
const WORDS_PER_MINUTE = 200;

// Average engagement time for one interactive (simulator, quiz, chart).
// 0.75 min ≈ 45 s: enough to read the prompt, interact once or twice,
// and absorb the result. Pages with many interactives accumulate that
// cost.
const MINUTES_PER_INTERACTIVE = 0.75;

export type ReadingTimeEstimate = {
  minutes: number;
};

export const getReadingTime = (metadata: PageMetadata): ReadingTimeEstimate => ({
  minutes: Math.max(
    1,
    Math.ceil(metadata.wordCount / WORDS_PER_MINUTE + metadata.interactiveCount * MINUTES_PER_INTERACTIVE),
  ),
});
