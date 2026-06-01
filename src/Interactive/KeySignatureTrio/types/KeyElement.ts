import type { FC } from "react";

import type { KeyElementId } from "./KeyElementId";

type IconProps = { size?: number | string; strokeWidth?: number };

/** One clickable node of the trio: an icon, its title, a one-word role and the explanation. */
export type KeyElement = {
  id: KeyElementId;
  /** Lucide icon component for the node. */
  icon: FC<IconProps>;
  /** Display name, e.g. "Clé privée". */
  title: string;
  /** One-word role surfaced as a tag, e.g. "Le secret". */
  role: string;
  /** Full explanation revealed once the node is selected. */
  description: string;
};
