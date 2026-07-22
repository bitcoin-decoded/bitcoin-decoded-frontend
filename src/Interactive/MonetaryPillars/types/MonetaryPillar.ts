import type { IconComponent } from "@icons";

type PillarKey = "durability" | "portability" | "divisibility" | "fungibility" | "hardness";

export type MonetaryPillar = {
  key: PillarKey;
  title: string;
  description: string;
  icon: IconComponent;
  isKeystone?: boolean;
};
