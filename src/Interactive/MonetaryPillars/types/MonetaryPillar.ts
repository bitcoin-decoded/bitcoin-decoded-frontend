import type { FC } from "react";

type PillarKey = "durability" | "portability" | "divisibility" | "fungibility" | "hardness";

type IconProps = { size?: string };

export type MonetaryPillar = {
  key: PillarKey;
  /** Uppercase mono label for the row header (e.g. "DURABILITÉ"). */
  title: string;
  /** Explanation rendered when the row is expanded. */
  description: string;
  /** Icon component (Design custom icon or lucide). Receives a `size` prop. */
  icon: FC<IconProps>;
  /**
   * Marks the pillar as the structural one (the keystone of a sound
   * money). Rendered with an amber accent + a small "STRUCTUREL" tag
   * to set it apart from the other four.
   */
  isKeystone?: boolean;
};
