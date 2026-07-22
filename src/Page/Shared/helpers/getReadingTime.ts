import type { PageMetadata } from "../types";

const WORDS_PER_MINUTE = 200;

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
