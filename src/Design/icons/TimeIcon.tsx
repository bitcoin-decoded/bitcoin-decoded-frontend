import { type FC } from "react";
import { Hourglass } from "lucide-react";

type Props = {
  size?: string;
};

/**
 * Hourglass icon representing durability.
 */
export const TimeIcon: FC<Props> = ({ size = "1.25rem" }) => (
  <Hourglass
    strokeWidth={2}
    style={{ height: size, width: size, minWidth: size }}
  />
);
