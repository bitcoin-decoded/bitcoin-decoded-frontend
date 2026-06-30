import type { TranslationKey } from "../../I18n";

import type { BadgeKind } from "./BadgeKind";
import type { BadgeModule } from "./BadgeModule";

import type { IconType } from "@icons";

export type Badge = {
  /**
   * Stable id. For chapter badges it equals the chapter's ROUTE_NAME value, so
   * the reading engine can award by `chapterId` directly. For module badges it
   * is a dedicated key (e.g. "module-banking-quiz").
   */
  id: string;
  kind: BadgeKind;
  module: BadgeModule;
  /** Topic icon (chapter) or trophy (module). */
  icon: IconType;
  /** Reuses the chapter's nav title (chapter badges) or a dedicated key (module). */
  nameKey: TranslationKey;
};
