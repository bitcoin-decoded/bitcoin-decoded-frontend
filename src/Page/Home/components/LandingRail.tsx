import { type CSSProperties, type FC, useMemo } from "react";

import { BRAND, useThemeContext, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { RAIL_STEPS } from "../data";
import { getLandingColors } from "../helpers";
import { useScrollSpy } from "../hooks";

type Props = {
  onJump: (id: string) => void;
};

// The staircase made visible: a fixed rail whose active rung follows the descent.
// A scroll aid, not the primary navigation, so it is rendered only where there is
// room for it (desktop, see HomePage) and folds away below that.
export const LandingRail: FC<Props> = ({ onJump }) => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const { ink3, gold, lineStrong } = getLandingColors(theme);

  const stepIds = useMemo(() => RAIL_STEPS.map((step) => step.id), []);
  const activeId = useScrollSpy(stepIds, "top");

  const railStyle: CSSProperties = {
    position: "fixed",
    left: "clamp(0.9rem, 2.5vw, 2rem)",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 30,
    display: "grid",
    alignContent: "center",
  };

  const lineStyle: CSSProperties = {
    position: "absolute",
    left: 6,
    top: "1.4rem",
    bottom: "1.4rem",
    width: 1,
    background: lineStrong,
  };

  const rungStyle = (active: boolean): CSSProperties => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "0.7rem",
    padding: "0.55rem 0",
    border: "none",
    background: "none",
    cursor: "pointer",
    color: active ? gold : ink3,
    transition: "color 0.25s var(--ease-smooth)",
  });

  // Same block motif as the chapter parcoureur (BlockMilestones): an upright gold
  // square when active, a bordered empty square otherwise, the active one scaled
  // with a soft gold halo. Squares, never diamonds — the ledger block is the mark.
  const stepStyle = (active: boolean): CSSProperties => ({
    width: 13,
    height: 13,
    flexShrink: 0,
    border: `1px solid ${active ? gold : ink3}`,
    background: active ? gold : "transparent",
    transform: active ? "scale(1.2)" : "scale(1)",
    boxShadow: active ? `0 0 0 2px ${withOpacity(gold, 0.16)}` : "none",
    transition: "all 0.3s var(--ease-smooth)",
  });

  const labelStyle = (active: boolean): CSSProperties => ({
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.6rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    opacity: active ? 1 : 0,
    transform: active ? "none" : "translateX(-4px)",
    transition: "opacity 0.25s var(--ease-smooth), transform 0.25s var(--ease-smooth)",
  });

  return (
    <div style={railStyle}>
      <span style={lineStyle} aria-hidden="true" />
      {RAIL_STEPS.map((step) => {
        const active = step.id === activeId;
        const label = t(step.labelKey);
        return (
          <button
            key={step.id}
            type="button"
            style={rungStyle(active)}
            onClick={() => onJump(step.id)}
            aria-current={active ? "true" : undefined}
          >
            <span style={stepStyle(active)} aria-hidden="true" />
            <span style={labelStyle(active)}>{label}</span>
          </button>
        );
      })}
    </div>
  );
};
