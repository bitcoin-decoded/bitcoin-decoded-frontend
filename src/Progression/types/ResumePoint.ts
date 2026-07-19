import type { RouteName } from "../../Routing";

/** Where the reader should pick the module up, and how to word the offer. */
export type ResumePoint = {
  route: RouteName;
  /** 1-based position inside the module, for the label. */
  chapterNumber: number;
  /** False when nothing in this module has been sealed yet. */
  hasProgress: boolean;
};
