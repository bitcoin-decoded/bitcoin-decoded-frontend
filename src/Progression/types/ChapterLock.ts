import type { RouteName } from "../../Routing";

/**
 * The domain's whole public surface. Every gated surface — navbar, chapter
 * rail, next button, route guard — answers its question through these, so the
 * rule is stated once and cannot drift into four slightly different readings.
 */
export type ChapterLock = {
  /** The chapter may not be opened. False for pages outside any module. */
  isLocked: (id: RouteName) => boolean;
  /**
   * The deepest chapter of that module the reader may open — where a locked
   * link redirects. Null for pages outside any module.
   */
  nextAvailableChapter: (id: RouteName) => RouteName | null;
};
