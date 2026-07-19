// Sequential progression, stated once.
//
// `getModuleFrontier` and `isChapterOutOfSequence` stay internal on purpose:
// several surfaces gate on this rule, and every extra export is a place where a
// second reading of it could grow.
export { OutOfSequenceNotice } from "./components";
export { useChapterProgression, useResumeOffer } from "./hooks";
export type { ChapterProgression, ResumePoint } from "./types";
