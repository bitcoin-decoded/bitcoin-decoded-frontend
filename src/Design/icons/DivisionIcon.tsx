import { type FC } from "react";

import { Scissors } from "@icons";

type Props = {
  size?: string;
};

/**
 * Scissors icon representing divisibility.
 */
export const DivisionIcon: FC<Props> = ({ size = "1.25rem" }) => (
  <Scissors
    strokeWidth={2}
    style={{ height: size, width: size, minWidth: size }}
  />
);
