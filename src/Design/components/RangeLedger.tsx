import { type CSSProperties, type FC } from "react";

import { useBreakpoint } from "../Responsive";
import { BRAND, getBrandGold, getTypography, usePageTheme, useThemeContext } from "../Theme";

export type RangeLedgerTick = {
  value: number;
  label?: string;
};

type Props = {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  ticks?: RangeLedgerTick[];
  label?: string;
  valueDisplay?: string;
  color?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

export const RangeLedger: FC<Props> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  ticks,
  label,
  valueDisplay,
  color,
  disabled = false,
  ariaLabel,
}) => {
  const typo = getTypography();
  const { colors } = usePageTheme();
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";

  const accent = color ?? getBrandGold(theme);
  const trackColor = colors.base.text.secondary;
  const trackIdle = `${trackColor}55`;

  const range = max - min;
  const percent = range > 0 ? ((value - min) / range) * 100 : 0;

  const wrapperStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    opacity: disabled ? 0.5 : 1,
  };

  const headerRowStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.micro.fontSize,
    letterSpacing: "0.05em",
  };

  const labelStyle: CSSProperties = {
    color: colors.base.text.secondary,
    fontVariant: "small-caps",
  };

  const valueStyle: CSSProperties = {
    color: colors.base.text.primary,
    fontWeight: 500,
  };

  const trackHeight = 14;
  const thumbSize = isMobile ? 13 : BRAND.figures.coinSize;

  const visualLayerStyle: CSSProperties = {
    position: "relative",
    height: trackHeight,
  };

  const trackLineStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 1,
    background: trackIdle,
    transform: "translateY(-50%)",
  };

  const trailStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: 0,
    width: `${percent}%`,
    height: 1.5,
    background: accent,
    transform: "translateY(-50%)",
  };

  const thumbStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: `${percent}%`,
    transform: "translate(-50%, -50%)",
    width: thumbSize,
    height: thumbSize,
    borderRadius: "50%",
    background: accent,
    boxShadow: `0 0 0 3px ${accent}22`,
    pointerEvents: "none",
  };

  const inputStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: trackHeight,
    margin: 0,
    padding: 0,
    background: "transparent",
    opacity: 0,
    cursor: disabled ? "not-allowed" : "pointer",
    appearance: "none",
    WebkitAppearance: "none",
  };

  return (
    <div style={wrapperStyle}>
      {(label || valueDisplay) && (
        <div style={headerRowStyle}>
          {label && <span style={labelStyle}>{label}</span>}
          {valueDisplay && <span style={valueStyle}>{valueDisplay}</span>}
        </div>
      )}

      <div style={visualLayerStyle}>
        <div style={trackLineStyle} aria-hidden="true" />
        <div style={trailStyle} aria-hidden="true" />
        {ticks?.map((tick) => {
          const tickPercent = range > 0 ? ((tick.value - min) / range) * 100 : 0;
          const tickIsReached = tick.value <= value;
          return (
            <div
              key={tick.value}
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "50%",
                left: `${tickPercent}%`,
                transform: "translate(-50%, -50%)",
                width: 1,
                height: 6,
                background: tickIsReached ? accent : trackIdle,
              }}
            />
          );
        })}
        <div style={thumbStyle} aria-hidden="true" />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          aria-label={ariaLabel ?? label}
          onChange={(event) => onChange(Number(event.target.value))}
          style={inputStyle}
        />
      </div>

      {ticks && ticks.some((tick) => tick.label) && (
        <div
          style={{
            position: "relative",
            height: "1rem",
            fontFamily: BRAND.fonts.mono,
            fontSize: typo.micro.fontSize,
            color: colors.base.text.secondary,
            letterSpacing: "0.04em",
          }}
        >
          {ticks.map((tick) => {
            if (!tick.label) return null;
            const tickPercent = range > 0 ? ((tick.value - min) / range) * 100 : 0;
            const tickIsCurrent = tick.value === value;
            return (
              <span
                key={tick.value}
                style={{
                  position: "absolute",
                  left: `${tickPercent}%`,
                  transform: "translateX(-50%)",
                  whiteSpace: "nowrap",
                  fontVariant: "small-caps",
                  color: tickIsCurrent ? colors.base.text.primary : colors.base.text.secondary,
                  fontWeight: tickIsCurrent ? 500 : 400,
                }}
              >
                {tick.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
