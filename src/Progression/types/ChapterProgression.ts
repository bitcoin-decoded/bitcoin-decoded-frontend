import type { RouteName } from "../../Routing";

import type { ResumePoint } from "./ResumePoint";

/**
 * The domain's whole public surface.
 *
 * One predicate, deliberately. "Is it out of sequence?" and "may it be sealed?"
 * are the same question asked by different consumers, so exposing both would
 * be two names for one rule, which is exactly how four surfaces drift into four
 * readings.
 */
export type ChapterProgression = {
  /** The chapter sits past its module's frontier. False outside any module. */
  isOutOfSequence: (id: RouteName) => boolean;
  /** Where to offer to pick the module up. Null outside any module. */
  resumePoint: (id: RouteName) => ResumePoint | null;
};
