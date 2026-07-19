// Sequential progression, stated once.
//
// Only the hooks cross the domain boundary. `getModuleFrontier` and
// `isChapterLocked` stay internal on purpose: four surfaces gate on this rule,
// and every extra export is a place where a fifth reading could grow.
export { useChapterLock, useLockedRouteGuard } from "./hooks";
export type { ChapterLock } from "./types";
