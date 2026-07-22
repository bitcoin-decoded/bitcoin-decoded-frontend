import type { TranslationKey } from "../../I18n";

import type { BadgeKind } from "./BadgeKind";
import type { BadgeModule } from "./BadgeModule";

import type { IconComponent } from "@icons";

export type Badge = {
  id: string;
  kind: BadgeKind;
  module: BadgeModule;
  icon: IconComponent;
  nameKey: TranslationKey;
};
