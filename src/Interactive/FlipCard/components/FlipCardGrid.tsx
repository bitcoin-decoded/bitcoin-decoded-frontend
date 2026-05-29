import { type CSSProperties, type FC } from "react";

import { useBreakpoint } from "../../../Design";
import type { FlipCardItem } from "../types";

import { FlipCard } from "./FlipCard";

type FlipCardGridProps = {
  items: FlipCardItem[];
};

export const FlipCardGrid: FC<FlipCardGridProps> = ({ items }) => {
  const breakpoint = useBreakpoint();
  const columns = breakpoint === "mobile" ? 2 : 3;

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: breakpoint === "mobile" ? "0.75rem" : "1.25rem",
    margin: "1.5rem auto",
    maxWidth: "40rem",
  };

  return (
    <div style={gridStyle}>
      {items.map((item, index) => (
        <FlipCard key={item.title} item={item} index={index} />
      ))}
    </div>
  );
};
