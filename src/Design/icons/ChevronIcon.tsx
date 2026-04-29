import { type CSSProperties, type FC } from "react";

import { ChevronRight } from "lucide-react";

type ChevronIconProps = {
  isExpanded: boolean;
};

/**
 * An icon that rotates based on its expansion state.
 */
export const ChevronIcon: FC<ChevronIconProps> = ({ isExpanded }) => {
  const style: CSSProperties = {
    transition: "transform 0.2s ease-in-out",
    transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
  };

  return <ChevronRight size={16} style={style} strokeWidth={2} />;
};
