import { type CSSProperties, type FC } from "react";

import { ExploredCounter, useBreakpoint, useExplorationGate } from "../../../Design";
import { useTranslation } from "../../../I18n";
import type { FlipCardItem } from "../types";

import { FlipCard } from "./FlipCard";

type FlipCardGridProps = {
  items: FlipCardItem[];
  requiredExplored?: number;
  onComplete?: () => void;
};

export const FlipCardGrid: FC<FlipCardGridProps> = ({
  items,
  requiredExplored = 0,
  onComplete,
}) => {
  const breakpoint = useBreakpoint();
  const { t } = useTranslation();
  const columns = breakpoint === "mobile" ? 2 : 3;
  const gated = requiredExplored > 0;
  const { exploredCount, markExplored } = useExplorationGate({
    threshold: requiredExplored,
    onComplete,
  });

  const headerRowStyle: CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    maxWidth: "40rem",
    margin: "1.5rem auto 0",
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: breakpoint === "mobile" ? "0.75rem" : "1.25rem",
    margin: "1.5rem auto",
    maxWidth: "40rem",
  };

  return (
    <>
      {gated && (
        <div style={headerRowStyle}>
          <ExploredCounter
            explored={Math.min(exploredCount, requiredExplored)}
            total={requiredExplored}
            label={t("flipCard.explored")}
          />
        </div>
      )}
      <div style={gridStyle}>
        {items.map((item, index) => (
          <FlipCard
            key={item.title}
            item={item}
            index={index}
            onReveal={gated ? () => markExplored(index) : undefined}
          />
        ))}
      </div>
    </>
  );
};
