import { type CSSProperties, type FC } from "react";

import { useBreakpoint } from "../../../Design";
import type { FlipCardItem } from "../../FlipCard";
import { FlipCard, useFlipCard } from "../../FlipCard";

type FlipCardGridProps = {
  items: FlipCardItem[];
};

export const FlipCardGrid: FC<FlipCardGridProps> = ({ items }) => {
  const breakpoint = useBreakpoint();
  const { flippedSet, toggleFlip, hoveredIndex, hoverHandlers } = useFlipCard();

  const columns = breakpoint === "mobile" ? 2 : breakpoint === "tablet" ? 3 : 3;

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: breakpoint === "mobile" ? "0.75rem" : "1.25rem",
    margin: "1.5rem 0",
    maxWidth: "40rem",
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <div style={gridStyle}>
      {items.map((item, index) => (
        <FlipCard
          key={item.title}
          item={item}
          isFlipped={flippedSet.has(index)}
          isHovered={hoveredIndex === index}
          onFlip={() => toggleFlip(index)}
          {...hoverHandlers(index)}
        />
      ))}
    </div>
  );
};
