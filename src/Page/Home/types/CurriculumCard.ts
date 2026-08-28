import type { TranslationKey } from "../../../I18n";
import type { RouteName } from "../../../Routing";

import type { ModuleColor } from "./ModuleColor";
import type { ModuleState } from "./ModuleState";

export type CurriculumCard = {
  index: number;
  nameKey: TranslationKey;
  punchlineKey: TranslationKey;
  theme: ModuleColor;
  chapterCount: number;
  minutes: number;
  state: ModuleState;
  startRoute: RouteName;
};
