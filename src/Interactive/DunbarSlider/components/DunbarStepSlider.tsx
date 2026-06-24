import { type CSSProperties, type FC } from "react";

import { BRAND, RangeLedger, useBreakpoint, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";

type Props = {
  /** Group size at each step (chip labels). */
  sizes: number[];
  activeIndex: number;
  onChange: (index: number) => void;
  /** Dominant tier accent (slider trail + active chip) — the green→red Dunbar scale. */
  color: string;
  ariaLabel: string;
  /** Intl locale tag for number grouping. */
  localeTag: string;
};

/**
 * Discrete 5-step control: the ledger `RangeLedger` primitive (coin thumb,
 * hairline track) snapping to integer steps, plus a connected segmented row of
 * quick-jump chips for direct selection. The dominant `color` is the tier's
 * Dunbar-scale shade, so the slider trail tracks the calm→overload gradient.
 */
export const DunbarStepSlider: FC<Props> = ({
  sizes,
  activeIndex,
  onChange,
  color,
  ariaLabel,
  localeTag,
}) => {
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  const lastIndex = sizes.length - 1;

  const wrapStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
    width: "100%",
  };

  const segmentedWrapStyle: CSSProperties = {
    display: "flex",
    alignSelf: "center",
    border: `1px solid ${withOpacity(colors.base.border.secondary, 0.25)}`,
    overflow: "hidden",
    maxWidth: "100%",
  };

  const segmentBtnStyle = (active: boolean, first: boolean): CSSProperties => ({
    fontFamily: BRAND.fonts.mono,
    cursor: "pointer",
    padding: isMobile ? "0.45rem 0.6rem" : "0.5rem 0.95rem",
    border: "none",
    borderLeft: first ? "none" : `1px solid ${withOpacity(colors.base.border.secondary, 0.25)}`,
    fontSize: isMobile ? "0.62rem" : "0.7rem",
    fontWeight: 500,
    letterSpacing: "0.03em",
    whiteSpace: "nowrap",
    color: active ? colors.base.text.onAccent : withOpacity(colors.base.text.secondary, 0.85),
    background: active ? color : "transparent",
    transition: "all 0.3s var(--ease-smooth)",
  });

  return (
    <div style={wrapStyle}>
      <RangeLedger
        value={activeIndex}
        onChange={onChange}
        min={0}
        max={lastIndex}
        step={1}
        color={color}
        ariaLabel={ariaLabel}
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
