import type { RouteName } from "../../Routing";

import type { ResumePoint } from "./ResumePoint";

export type ChapterProgression = {
  isOutOfSequence: (id: RouteName) => boolean;
  resumePoint: (id: RouteName) => ResumePoint | null;
};
