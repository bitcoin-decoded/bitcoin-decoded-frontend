import { type FC } from "react";
import { ShieldCheck } from "lucide-react";

type Props = {
  size?: string;
};

/**
 * Shield icon representing hardness (dureté).
 */
export const CloverLeafIcon: FC<Props> = ({ size = "1.25rem" }) => (
  <ShieldCheck
    strokeWidth={2}
    style={{ height: size, width: size, minWidth: size }}
  />
);
