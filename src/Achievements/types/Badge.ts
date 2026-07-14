import type { ComponentType } from "react";

import type { TranslationKey } from "../../I18n";

import type { BadgeKind } from "./BadgeKind";
import type { BadgeModule } from "./BadgeModule";

export type Badge = {
  id: string;
  kind: BadgeKind;
  module: BadgeModule;
  /** Accepts both Phosphor icons (@icons) and doodle glyphs (@doodle). */
  icon: ComponentType<{ size?: number; strokeWidth?: number | string }>;
  nameKey: TranslationKey;
};
