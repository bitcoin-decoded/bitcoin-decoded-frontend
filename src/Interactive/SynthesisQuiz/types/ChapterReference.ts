import type { TranslationKey } from "../../../I18n";
import type { RouteName } from "../../../Routing";

export type ChapterReference = {
  routeId: RouteName;
  labelKey: TranslationKey;
};
