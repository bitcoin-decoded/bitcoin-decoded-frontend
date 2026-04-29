import type { Language } from "../../../I18n";
import { READING_TIME_FLAVORS } from "../data";
import type { ReadingTimeFlavorBucket } from "../types";

const BUCKETS: readonly ReadingTimeFlavorBucket[] = [1, 2, 3, 5, 9, 10];

export const pickReadingTimeBucket = (minutes: number): ReadingTimeFlavorBucket => {
  for (const bucket of BUCKETS) {
    if (minutes <= bucket) return bucket;
  }
  return 10;
};

// Invariant: READING_TIME_FLAVORS.fr[bucket].length === READING_TIME_FLAVORS.en[bucket].length
// (phrases at the same index are translations of each other)
export const getReadingTimePoolSize = (minutes: number): number => {
  const bucket = pickReadingTimeBucket(minutes);
  return READING_TIME_FLAVORS.fr[bucket].length;
};

export const getReadingTimeFlavorAt = (
  minutes: number,
  language: Language,
  index: number,
): string => {
  const bucket = pickReadingTimeBucket(minutes);
  const pool = READING_TIME_FLAVORS[language][bucket];
  const safeIndex = ((index % pool.length) + pool.length) % pool.length;
  return pool[safeIndex];
};
