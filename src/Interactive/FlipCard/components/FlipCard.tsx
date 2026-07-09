import { type CSSProperties, type FC, type KeyboardEvent } from "react";

import { BRAND, getTypography, usePageTheme, withOpacity } from "../../../Design";
import { useFlipCard } from "../hooks";
import type { FlipCardItem } from "../types";

import { RotateCw } from "@icons";

type FlipCardProps = {
  item: FlipCardItem;
  /** 0-based position in the chain, surfaced as a "01"–"06" step marker. */
  index: number;
  /** Fired when the card flips to its back face (lets a grid gate on exploration). */
  onReveal?: () => void;
};

export const FlipCard: FC<FlipCardProps> = ({ item, index, onReveal }) => {
  const typo = getTypography();
  const { colors, moduleTheme } = usePageTheme();
  const { isFlipped, isHovered, flip, hoverHandlers } = useFlipCard(onReveal);
  const world = colors[moduleTheme];

  const lifted = isHovered && !isFlipped;
  const step = String(index + 1).padStart(2, "0");
  const mono = BRAND.fonts.mono;

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

  // Ledger card face: sharp corners, a flat surface, a single hairline border
  // (no gradient fill, no drop shadow, no gradient-border glow).
  const faceStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    borderRadius: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    overflow: "hidden",
    background: colors.base.background.secondary,
    transition: "border-color 0.35s var(--ease-smooth)",
  };

  const frontStyle: CSSProperties = {
    ...faceStyle,
    border: `1px solid ${withOpacity(world.border.secondary, lifted ? 0.6 : 0.32)}`,
  };

  const backStyle: CSSProperties = {
    ...faceStyle,
    transform: "rotateY(180deg)",
    gap: "0.4rem",
    background: withOpacity(world.background.secondary, 0.1),
    border: `1px solid ${withOpacity(world.border.secondary, 0.35)}`,
  };

  const stepStyle: CSSProperties = {
    position: "absolute",
    top: "0.6rem",
    left: "0.7rem",
    fontFamily: mono,
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
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
        {/* Front - emoji + step title */}
        <div style={frontStyle}>
          <span style={stepStyle}>{step}</span>
          <span
            style={{
              fontSize: "2.6rem",
              lineHeight: 1,
              marginBottom: "0.6rem",
              transform: lifted ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.35s var(--ease-smooth)",
            }}
          >
            {item.emoji}
          </span>
          <span
            style={{
              fontFamily: mono,
              fontSize: typo.label.fontSize,
              fontWeight: 500,
              color: lifted ? world.text.secondary : world.text.primary,
              fontVariant: "small-caps",
              letterSpacing: "0.05em",
              textAlign: "center",
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

        {/* Back - the cascade of decisions, centered */}
        <div style={backStyle}>
          <span
            style={{
              fontFamily: mono,
              fontSize: typo.micro.fontSize,
              fontWeight: 500,
              color: world.text.secondary,
              fontVariant: "small-caps",
              letterSpacing: "0.08em",
              textAlign: "center",
            }}
          >
            {item.title}
          </span>
          <div
            style={{
              width: "1.5rem",
              height: "2px",
              background: withOpacity(world.background.secondary, 0.5),
              marginBottom: "0.2rem",
            }}
          />
          {item.questions.map((q, i) => (
            <span
              key={i}
              style={{
                fontSize: typo.micro.fontSize,
                // Primary text — these questions are the card's payload, so
                // they must read clearly in both themes (were too faint at
                // text.secondary).
                color: colors.base.text.primary,
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
