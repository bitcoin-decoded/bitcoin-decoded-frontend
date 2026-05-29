import { type CSSProperties, type FC, type KeyboardEvent } from "react";

import { RotateCw } from "lucide-react";

import { usePageTheme, withOpacity } from "../../../Design";
import { useFlipCard } from "../hooks";
import type { FlipCardItem } from "../types";

type FlipCardProps = {
  item: FlipCardItem;
  /** 0-based position in the chain, surfaced as a "01"–"06" step marker. */
  index: number;
};

export const FlipCard: FC<FlipCardProps> = ({ item, index }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { isFlipped, isHovered, flip, hoverHandlers } = useFlipCard();
  const world = colors[moduleTheme];

  const lifted = isHovered && !isFlipped;
  const step = String(index + 1).padStart(2, "0");
  const mono = "'JetBrains Mono', monospace";

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flip();
    }
  };

  const containerStyle: CSSProperties = {
    perspective: "1200px",
    cursor: "pointer",
    transform: lifted ? "translateY(-6px)" : "translateY(0)",
    transition: "transform 0.35s var(--ease-smooth)",
  };

  const innerStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    aspectRatio: "1",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s var(--ease-smooth)",
    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
    willChange: "transform",
  };

  const faceStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
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
    boxShadow: lifted
      ? `0 10px 30px ${withOpacity(world.background.secondary, 0.25)}`
      : colors.boxShadow.soft,
    transition: "box-shadow 0.35s var(--ease-smooth)",
  };

  const backStyle: CSSProperties = {
    ...faceStyle,
    transform: "rotateY(180deg)",
    gap: "0.4rem",
    background: `linear-gradient(190deg, ${withOpacity(world.background.secondary, 0.12)}, ${colors.base.background.primary})`,
    boxShadow: colors.boxShadow.soft,
  };

  const stepStyle: CSSProperties = {
    position: "absolute",
    top: "0.6rem",
    left: "0.7rem",
    fontFamily: mono,
    fontSize: "0.62rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    color: withOpacity(world.text.secondary, 0.6),
  };

  return (
    <div
      style={containerStyle}
      onClick={flip}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      {...hoverHandlers}
    >
      <div style={innerStyle}>
        {/* Front — emoji + step title */}
        <div
          className="gradient-border"
          style={
            {
              ...frontStyle,
              "--border-glow-color": lifted ? world.text.secondary : world.border.primary,
            } as CSSProperties
          }
        >
          <span style={stepStyle}>{step}</span>
          <span
            style={{
              fontSize: "2.6rem",
              lineHeight: 1,
              marginBottom: "0.6rem",
              filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
              transform: lifted ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.35s var(--ease-smooth)",
            }}
          >
            {item.emoji}
          </span>
          <span
            style={{
              fontFamily: mono,
              fontSize: "0.82rem",
              fontWeight: 600,
              color: lifted ? world.text.secondary : world.text.primary,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              transition: "color 0.3s var(--ease-smooth)",
            }}
          >
            {item.title}
          </span>
          <RotateCw
            size={14}
            style={{
              position: "absolute",
              bottom: "0.6rem",
              right: "0.7rem",
              color: withOpacity(world.text.secondary, lifted ? 0.85 : 0.4),
              transition: "color 0.3s var(--ease-smooth)",
            }}
          />
        </div>

        {/* Back — the cascade of decisions, centered */}
        <div
          className="gradient-border"
          style={{ ...backStyle, "--border-glow-color": world.border.secondary } as CSSProperties}
        >
          <span
            style={{
              fontFamily: mono,
              fontSize: "0.66rem",
              fontWeight: 700,
              color: world.text.secondary,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {item.title}
          </span>
          <div
            style={{
              width: "1.5rem",
              height: "2px",
              borderRadius: "2px",
              background: withOpacity(world.background.secondary, 0.5),
              marginBottom: "0.2rem",
            }}
          />
          {item.questions.map((q, i) => (
            <span
              key={i}
              style={{
                fontSize: "0.74rem",
                color: colors.base.text.secondary,
                textAlign: "center",
                lineHeight: 1.35,
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
