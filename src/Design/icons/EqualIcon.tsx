import { type FC } from "react";

import { Equal } from "@icons";

type Props = {
  size?: string;
};

/**
 * Equal icon representing fungibility.
 */
export const EqualIcon: FC<Props> = ({ size = "1.25rem" }) => (
  <Equal
    strokeWidth={2}
    style={{ height: size, width: size, minWidth: size }}
  />
);
