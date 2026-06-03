import { type CSSProperties, type FC } from "react";

import { useBreakpoint, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";

type Props = {
  /** Group size at each step (chip labels). */
  sizes: number[];
  activeIndex: number;
  onChange: (index: number) => void;
  /** Dominant tier accent (fill + active chip). */
  color: string;
  ariaLabel: string;
  /** Intl locale tag for number grouping. */
  localeTag: string;
};

/**
 * Discrete 5-step control: a styled range input (snaps to integer steps, so a
 * click jumps rather than slides) plus a connected segmented row of quick-jump
 * chips. Reuses the generic `.app-slider` track and the segmented pattern.
 */
export const DunbarStepSlider: FC<Props> = ({
  sizes,
  activeIndex,
  onChange,
  color,
  ariaLabel,
  localeTag,
}) => {
  const { theme, colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const isLight = theme === "light";

  const lastIndex = sizes.length - 1;
  const pct = lastIndex > 0 ? (activeIndex / lastIndex) * 100 : 0;
  const trackRest = isLight
    ? colors.base.border.secondary
    : withOpacity(colors.base.text.primary, 0.18);

  const wrapStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
    width: "100%",
  };

  const sliderStyle = {
    width: "100%",
    "--slider-track": `linear-gradient(to right, ${color} ${pct}%, ${trackRest} ${pct}%)`,
    "--slider-thumb": color,
  } as CSSProperties;

  const segmentedWrapStyle: CSSProperties = {
    display: "flex",
    alignSelf: "center",
    border: `1px solid ${withOpacity(colors.base.border.secondary, 0.25)}`,
    borderRadius: "0.75rem",
    overflow: "hidden",
    maxWidth: "100%",
  };

  const segmentBtnStyle = (active: boolean, first: boolean): CSSProperties => ({
    fontFamily: "'JetBrains Mono', monospace",
    cursor: "pointer",
    padding: isMobile ? "0.45rem 0.6rem" : "0.5rem 0.95rem",
    border: "none",
    borderLeft: first ? "none" : `1px solid ${withOpacity(colors.base.border.secondary, 0.25)}`,
    fontSize: isMobile ? "0.62rem" : "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.03em",
    whiteSpace: "nowrap",
    color: active ? colors.base.text.onAccent : withOpacity(colors.base.text.secondary, 0.85),
    background: active ? color : "transparent",
    transition: "all 0.3s var(--ease-smooth)",
  });

  return (
    <div style={wrapStyle}>
      <input
        type="range"
        className="app-slider"
        min={0}
        max={lastIndex}
        step={1}
        value={activeIndex}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={ariaLabel}
        style={sliderStyle}
      />

      <div role="tablist" aria-label={ariaLabel} style={segmentedWrapStyle}>
        {sizes.map((size, i) => (
          <button
            key={size}
            type="button"
            role="tab"
            aria-selected={activeIndex === i}
            onClick={() => onChange(i)}
            style={segmentBtnStyle(activeIndex === i, i === 0)}
          >
            {size.toLocaleString(localeTag)}
          </button>
        ))}
      </div>
    </div>
  );
};
