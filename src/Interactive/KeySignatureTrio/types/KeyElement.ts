import type { FC } from "react";

import type { KeyElementId } from "./KeyElementId";

type IconProps = { size?: number };

export type KeyElement = {
  id: KeyElementId;
  icon: FC<IconProps>;
  title: string;
  role: string;
  description: string;
};
