import type { CSSProperties, FC, ReactNode } from "react";

import { StarRating } from "./";

type Props = {
  icon: ReactNode;
  label: string;
  score: number;
  compact?: boolean;
};

export const RatingRow: FC<Props> = ({ icon, label, score, compact = false }) => {
  const iconWrapperStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    transform: compact ? "scale(0.8)" : "none",
    transformOrigin: "center",
  };

  const labelStyle: CSSProperties = {
    fontSize: compact ? "0.68rem" : "0.9rem",
    letterSpacing: compact ? "0.06em" : "0.1rem",
    textTransform: "uppercase",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: compact ? "0.4rem" : "0.5rem" }}>
        <div style={iconWrapperStyle}>{icon}</div>
        <span style={labelStyle}>{label}</span>
      </div>
      <StarRating score={score} compact={compact} />
    </div>
  );
};
