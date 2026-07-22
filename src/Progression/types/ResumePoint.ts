import type { RouteName } from "../../Routing";

export type ResumePoint = {
  route: RouteName;
  chapterNumber: number;
  hasProgress: boolean;
};
