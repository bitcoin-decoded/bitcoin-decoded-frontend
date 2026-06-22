import { type CSSProperties, type FC } from "react";

import { useBreakpoint } from "../Responsive";
import { BRAND, getBrandGold, usePageTheme, useThemeContext } from "../Theme";

export type RangeLedgerTick = {
  /** Value at this tick position. */
  value: number;
  /** Optional label below the tick (e.g. "village", "tribu"). */
  label?: string;
};

type Props = {
  /** Current value. */
  value: number;
  /** Setter called with each change. */
  onChange: (value: number) => void;
  /** Minimum range value. */
  min: number;
  /** Maximum range value. */
  max: number;
  /** Step size. @default 1 */
  step?: number;
  /**
   * Optional labelled ticks. Their positions are computed from the value
   * within `[min, max]`. The endpoints (`min` and `max`) are rendered
   * automatically as bookends — don't list them here unless you want a
   * label below them.
   */
  ticks?: RangeLedgerTick[];
  /** Top-left label (e.g. "taux réserve", "taille du groupe"). */
  label?: string;
  /** Right-aligned value/unit (e.g. "10 %", "150 personnes"). */
  valueDisplay?: string;
  /** Override the thumb + trail color. Defaults to brand gold. */
  color?: string;
  /** Disabled state. */
  disabled?: boolean;
  /** Optional aria-label for the underlying input. */
  ariaLabel?: string;
};

/**
 * The ledger-system slider — replaces the Material-style sliders that ship
 * with default range inputs and the existing `.app-slider` styling. A
 * hairline navy/cream track with regularly-marked ticks, a gold circle
 * (cercle-coin) thumb, and a gold trail filling from `min` to the current
 * value. Per the block-vs-coin dichotomy (rule 9), the thumb is a CIRCLE
 * because it represents a value being manipulated — squares are reserved
 * to structural markers (block-header rules, drop-block, wordmark).
 *
 * Built on a native `<input type="range">` for accessibility (keyboard,
 * touch, screen reader) with a visual overlay rendered as CSS variables
 * inline. The native input is invisible but still drives the value.
 */
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
    fontSize: "0.75rem",
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

  // The visual layer — a relative-positioned container holding the track
  // line, ticks, trail, and thumb. The native input sits on top with
  // opacity 0 to handle interaction.
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

  // The native input — visually hidden but fully functional.
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
            fontSize: "0.625rem",
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
