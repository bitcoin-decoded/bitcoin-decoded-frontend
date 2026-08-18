import type { RouteName } from "../../../Routing";

export type CurriculumResume = {
  doneCount: number;
  totalCount: number;
  resumeRoute: RouteName; // first unfinished chapter — the "resume"/"start" target
  startRoute: RouteName; // first chapter overall — the "start over" target
};
