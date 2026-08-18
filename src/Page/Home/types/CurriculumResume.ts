import type { TranslationKey } from "../../../I18n";
import type { RouteName } from "../../../Routing";

export type CurriculumResume = {
  moduleIndex: number;
  moduleNameKey: TranslationKey;
  chapterNumberInModule: number;
  chapterLabel: string;
  route: RouteName;
  doneCount: number;
  totalCount: number;
  remainingCount: number;
  remainingMinutes: number;
  allDone: boolean;
};
