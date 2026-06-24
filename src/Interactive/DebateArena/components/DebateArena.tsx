import { type CSSProperties, type FC } from "react";

import { BRAND, Caption,
  ExploredCounter,
  useBreakpoint,
  usePageTheme,
  withOpacity, } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useDebateArena } from "../hooks";
import type { DebateItem } from "../types";

type DebateArenaProps = {
  items: DebateItem[];
  /**
   * When > 0, the arena gates: a "n/N explored" counter shows and `onComplete`
   * fires once a side has been opened in that many distinct rows. Default 0 = no gate.
   */
  requiredExplored?: number;
  /** Fired once `requiredExplored` distinct debate rows have been opened. */
  onComplete?: () => void;
};

export const DebateArena: FC<DebateArenaProps> = ({ items, requiredExplored = 0, onComplete }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const world = colors[moduleTheme];
  const gated = requiredExplored > 0;
  const { activeSides, selectSide, isHovered, hoverHandlers, exploredCount } = useDebateArena(
    items.length,
    { requiredExplored, onComplete },
  );

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "2rem" : "2.5rem",
    margin: isMobile ? "2rem 0" : "2.5rem 0",
  };

  const headerRowStyle: CSSProperties = { display: "flex", justifyContent: "flex-end" };

  return (
    <div style={containerStyle}>
      {gated && (
        <div style={headerRowStyle}>
          <ExploredCounter
            explored={Math.min(exploredCount, requiredExplored)}
            total={requiredExplored}
            label={t("debateArena.explored")}
          />
        </div>
      )}
      {items.map((item, i) => {
        const active = activeSides[i];

        const rowStyle: CSSProperties = {
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr auto 1fr",
          gap: isMobile ? "0.75rem" : "0",
          alignItems: "stretch",
        };

        const vsStyle: CSSProperties = {
          display: isMobile ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 1rem",
          fontFamily: BRAND.fonts.mono,
          fontSize: BRAND.fontSize.note,
          fontWeight: 500,
          fontVariant: "small-caps",
          color: colors.base.text.secondary,
          letterSpacing: "0.1em",
        };

        const makeSideStyle = (side: 0 | 1): CSSProperties => {
          const isActive = active === side;
          const hovering = isHovered(i, side);
          const isAustrian = side === 1;
          const sideColor = isAustrian ? world.background.secondary : colors.base.text.secondary;

          return {
            position: "relative",
            padding: isMobile ? "1rem" : "1.25rem",
            borderRadius: 0,
            cursor: "pointer",
            background: isActive
              ? withOpacity(sideColor, isAustrian ? 0.1 : 0.05)
              : colors.base.background.secondary,
            transform: hovering && !isActive ? "translateY(-2px)" : "translateY(0)",
            transition: "all 0.3s var(--ease-smooth)",
            overflow: "hidden",
          };
        };

        const makeBorderColor = (side: 0 | 1): string => {
          const isActive = active === side;
          const hovering = isHovered(i, side);
          const isAustrian = side === 1;

          if (isActive) return isAustrian ? world.border.secondary : colors.base.border.tertiary;
          if (hovering) return isAustrian ? world.text.secondary : colors.base.text.secondary;
          return colors.base.border.secondary;
        };

        const makeLabelStyle = (side: 0 | 1): CSSProperties => {
          const isActive = active === side;
          const hovering = isHovered(i, side);
          const isAustrian = side === 1;

          return {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: BRAND.fonts.mono,
            fontSize: BRAND.fontSize.note,
            fontWeight: 500,
            color:
              isActive || hovering
                ? isAustrian
                  ? world.text.secondary
                  : colors.base.text.primary
                : colors.base.text.secondary,
            fontVariant: "small-caps",
            letterSpacing: "0.05em",
            transition: "color 0.3s var(--ease-smooth)",
          };
        };

        const makeIndicatorStyle = (side: 0 | 1): CSSProperties => {
          const isActive = active === side;
          const hovering = isHovered(i, side);
          const isAustrian = side === 1;
          const dotColor = isAustrian ? world.background.secondary : colors.base.text.secondary;

          return {
            width: "0.5rem",
            height: "0.5rem",
            borderRadius: "50%",
            backgroundColor: isActive || hovering ? dotColor : "transparent",
            border: `1.5px solid ${isActive || hovering ? dotColor : colors.base.border.secondary}`,
            transition: "all 0.3s var(--ease-smooth)",
            flexShrink: 0,
          };
        };

        const makeArgumentStyle = (side: 0 | 1): CSSProperties => {
          const isActive = active === side;

          return {
            maxHeight: isActive ? "10rem" : "0",
            opacity: isActive ? 1 : 0,
            marginTop: isActive ? "0.75rem" : "0",
            overflow: "hidden",
            transition: "all 0.4s var(--ease-smooth)",
            fontSize: BRAND.fontSize.body,
            lineHeight: 1.6,
            color: colors.base.text.secondary,
          };
        };

        return (
          <div key={i}>
            <Caption
              tone="accent"
              style={{
                display: "block",
                textAlign: "center",
                marginBottom: isMobile ? "0.75rem" : "1rem",
              }}
            >
              {item.topic}
            </Caption>
            <div style={rowStyle}>
              <div
                style={{ ...makeSideStyle(0), border: `1px solid ${makeBorderColor(0)}` }}
                onClick={() => selectSide(i, 0)}
                {...hoverHandlers(i, 0)}
                role="button"
                tabIndex={0}
              >
                <div style={makeLabelStyle(0)}>
                  <span style={makeIndicatorStyle(0)} />
                  {item.sides[0].school}
                </div>
                <div style={makeArgumentStyle(0)}>{item.sides[0].argument}</div>
              </div>
              <div style={vsStyle}>VS</div>
              <div
                style={{ ...makeSideStyle(1), border: `1px solid ${makeBorderColor(1)}` }}
                onClick={() => selectSide(i, 1)}
                {...hoverHandlers(i, 1)}
                role="button"
                tabIndex={0}
              >
                <div style={makeLabelStyle(1)}>
                  <span style={makeIndicatorStyle(1)} />
                  {item.sides[1].school}
                </div>
                <div style={makeArgumentStyle(1)}>{item.sides[1].argument}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
