import { type FC, type CSSProperties } from "react";
import { Lightbulb } from "lucide-react";

type LightbulbIconProps = {
  style?: CSSProperties;
};

/**
 * Light bulb icon used for chapter preludes.
 */
export const LightbulbIcon: FC<LightbulbIconProps> = ({ style }) => (
  <Lightbulb
    size={24}
    strokeWidth={2}
    style={{ width: "1.25rem", height: "1.25rem", ...style }}
  />
);
