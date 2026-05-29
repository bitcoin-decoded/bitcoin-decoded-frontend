import type { FC } from "react";

import { usePageTheme } from "../../Theme/hooks/usePageTheme";

type Props = {
  score: number;
  /** Smaller stars + tighter gap, for dense gallery cards. */
  compact?: boolean;
};

export const StarRating: FC<Props> = ({ score, compact = false }) => {
  const { colors } = usePageTheme();
  const filled = colors.amber.text.secondary;
  const empty = colors.base.border.tertiary;

  return (
    <div
      style={{
        display: "flex",
        gap: compact ? "0.1rem" : "0.25rem",
      }}
    >
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          style={{
            color: i < score ? filled : empty,
            fontSize: compact ? "0.8rem" : "1rem",
            transition: "color 0.3s var(--ease-smooth)",
          }}
        >
          {i < score ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};
