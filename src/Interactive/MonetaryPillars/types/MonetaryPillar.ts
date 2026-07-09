import type { IconType } from "@icons";

type PillarKey = "durability" | "portability" | "divisibility" | "fungibility" | "hardness";

export type MonetaryPillar = {
  key: PillarKey;
  /** Uppercase mono label for the row header (e.g. "DURABILITÉ"). */
  title: string;
  /** Explanation rendered when the row is expanded. */
  description: string;
  /** Phosphor icon component; PillarRow renders it with a `size` prop. */
  icon: IconType;
  /**
   * Marks the pillar as the structural one (the keystone of a sound
   * money). Rendered with an amber accent + a small "STRUCTUREL" tag
   * to set it apart from the other four.
   */
  isKeystone?: boolean;
};
