import { type CSSProperties,type FC } from "react";

import { Lightbulb } from "@icons";

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
