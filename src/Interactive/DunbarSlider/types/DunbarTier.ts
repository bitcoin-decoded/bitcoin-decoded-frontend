import type { DunbarTierKey } from "./DunbarTierKey";

import type { IconComponent } from "@icons";

export type DunbarTier = {
  key: DunbarTierKey;
  size: number;
  icon: IconComponent;
  isDunbar?: boolean;
  isOverload?: boolean;
};
