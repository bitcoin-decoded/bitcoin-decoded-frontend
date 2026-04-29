import { type FC } from "react";
import { Feather } from "lucide-react";

type Props = {
  size?: string;
};

/**
 * Feather icon representing portability.
 */
export const FeatherIcon: FC<Props> = ({ size = "1.25rem" }) => (
  <Feather
    strokeWidth={2}
    style={{ height: size, width: size, minWidth: size }}
  />
);
