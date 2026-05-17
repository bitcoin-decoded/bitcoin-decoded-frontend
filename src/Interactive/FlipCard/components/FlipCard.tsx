import { type CSSProperties, type FC } from "react";

import { usePageTheme, withOpacity } from "../../../Design";
import type { FlipCardItem } from "../types";

type FlipCardProps = {
  item: FlipCardItem;
  isFlipped: boolean;
  isHovered: boolean;
  onFlip: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export const FlipCard: FC<FlipCardProps> = ({
  item,
  isFlipped,
  isHovered,
  onFlip,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { colors, moduleTheme } = usePageTheme();
  const world = colors[moduleTheme];

  const hovered = isHovered && !isFlipped;

  const containerStyle: CSSProperties = {
    perspective: "1000px",
    cursor: "pointer",
    transform: hovered ? "translateY(-4px)" : "translateY(0)",
    transition: "transform 0.3s var(--ease-smooth)",
  };

  const innerStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    aspectRatio: "1",
    transformStyle: "preserve-3d",
    transition: "transform 0.5s var(--ease-smooth)",
    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
  };

  const faceStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    overflow: "hidden",
  };

  const frontStyle: CSSProperties = {
    ...faceStyle,
    background: `linear-gradient(190deg, ${world.background.primary}, ${colors.base.background.primary})`,
    boxShadow: hovered
      ? `0 0 24px ${withOpacity(world.background.secondary, 0.25)}`
      : colors.boxShadow.soft,
    transition: "box-shadow 0.3s var(--ease-smooth)",
  };

  const backStyle: CSSProperties = {
    ...faceStyle,
    transform: "rotateY(180deg)",
    background: `linear-gradient(190deg, ${withOpacity(world.background.secondary, 0.1)}, ${colors.base.background.primary})`,
    boxShadow: `0 0 20px ${withOpacity(world.background.secondary, 0.2)}`,
    justifyContent: "flex-start",
    paddingTop: "1rem",
    gap: "0.25rem",
  };

  return (
    <div
      style={containerStyle}
      onClick={onFlip}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
    >
      <div style={innerStyle}>
        <div
          className="gradient-border"
          style={
            {
              ...frontStyle,
              "--border-glow-color": hovered ? world.text.secondary : world.border.primary,
            } as CSSProperties
          }
        >
          <span
            style={{
              fontSize: "2.5rem",
              lineHeight: 1,
              marginBottom: "0.5rem",
              filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
            }}
          >
            {item.emoji}
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: hovered ? world.text.secondary : world.text.primary,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              transition: "color 0.3s var(--ease-smooth)",
            }}
          >
            {item.title}
          </span>
        </div>
        <div
          className="gradient-border"
          style={{ ...backStyle, "--border-glow-color": world.border.secondary } as CSSProperties}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: world.text.secondary,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "0.25rem",
            }}
          >
            {item.title}
          </span>
          {item.questions.map((q, i) => (
            <span
              key={i}
              style={{
                fontSize: "0.8rem",
                color: colors.base.text.secondary,
                textAlign: "center",
                lineHeight: 1.4,
                padding: "0.2rem 0",
                borderBottom:
                  i < item.questions.length - 1
                    ? `1px solid ${colors.base.border.primary}`
                    : "none",
                width: "100%",
              }}
            >
              {q}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
