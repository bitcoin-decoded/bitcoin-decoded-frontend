import { type CSSProperties, type FC } from "react";

import { BRAND, getTypography, RangeLedger, useBreakpoint, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";

type Props = {
  sizes: number[];
  activeIndex: number;
  onChange: (index: number) => void;
  color: string;
  ariaLabel: string;
  localeTag: string;
};

export const DunbarStepSlider: FC<Props> = ({
  sizes,
  activeIndex,
  onChange,
  color,
  ariaLabel,
  localeTag,
}) => {
  const typo = getTypography();
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  const lastIndex = sizes.length - 1;

  const segmentBorder = withOpacity(colors.base.text.secondary, 0.32);

  const wrapStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
    width: "100%",
  };

  const segmentedWrapStyle: CSSProperties = {
    display: "flex",
    alignSelf: "center",
    border: `1px solid ${segmentBorder}`,
    overflow: "hidden",
    maxWidth: "100%",
  };

  const segmentBtnStyle = (active: boolean, first: boolean): CSSProperties => ({
    fontFamily: BRAND.fonts.mono,
    cursor: "pointer",
    padding: isMobile ? "0.45rem 0.6rem" : "0.5rem 0.95rem",
    border: "none",
    borderLeft: first ? "none" : `1px solid ${segmentBorder}`,
    fontSize: typo.micro.fontSize,
    fontWeight: 400,
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
