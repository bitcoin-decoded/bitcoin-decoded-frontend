import { type CSSProperties, type FC } from "react";

import { Minus, Plus } from "lucide-react";

import { useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { TIME_MACHINE_END_YEAR } from "../data";

type Props = {
  targetYear: number;
  minYear: number;
  maxYear: number;
  disabled: boolean;
  onChange: (year: number) => void;
};

/**
 * The dial: a big destination-year readout flanked by ±1 steppers, a range
 * slider for long jumps across the whole timeline, and a few quick-jump chips
 * (genesis, today, end of issuance).
 */
export const TimeDial: FC<Props> = ({ targetYear, minYear, maxYear, disabled, onChange }) => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const accent = world.border.secondary;

  const currentYear = new Date().getFullYear();
  const chips = [
    { year: minYear, label: t("halvingTimeMachine.chipGenesis") },
    { year: currentYear, label: t("halvingTimeMachine.chipToday") },
    { year: TIME_MACHINE_END_YEAR, label: t("halvingTimeMachine.chipEnd") },
  ];

  const wrapStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.7rem",
    width: "100%",
  };

  const labelStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.58rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: withOpacity(colors.base.text.secondary, 0.7),
  };

  const readoutRow: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.9rem",
  };

  const stepButton = (isDisabled: boolean): CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.1rem",
    height: "2.1rem",
    borderRadius: "50%",
    border: `1.5px solid ${withOpacity(accent, isDisabled ? 0.2 : 0.55)}`,
    background: withOpacity(accent, isDisabled ? 0.02 : 0.08),
    color: isDisabled ? withOpacity(colors.base.text.secondary, 0.4) : accent,
    cursor: isDisabled ? "not-allowed" : "pointer",
    flexShrink: 0,
    transition: "all 0.2s var(--ease-smooth)",
  });

  const yearWindowStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "1.6rem" : "1.9rem",
    fontWeight: 700,
    color: colors.base.text.primary,
    minWidth: isMobile ? "4.2rem" : "5rem",
    textAlign: "center",
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.02em",
  };

  const sliderStyle: CSSProperties = {
    width: "100%",
    accentColor: accent,
    cursor: disabled ? "not-allowed" : "pointer",
  };

  const chipsRow: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "0.4rem",
  };

  const chipStyle = (active: boolean): CSSProperties => ({
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.58rem",
    fontWeight: 700,
    padding: "0.3rem 0.6rem",
    borderRadius: "999px",
    border: `1px solid ${withOpacity(accent, active ? 0.7 : 0.3)}`,
    background: active ? withOpacity(accent, 0.16) : "transparent",
    color: active ? accent : withOpacity(colors.base.text.secondary, 0.85),
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s var(--ease-smooth)",
  });

  const atMin = targetYear <= minYear;
  const atMax = targetYear >= maxYear;

  return (
    <div style={wrapStyle}>
      <span style={labelStyle}>{t("halvingTimeMachine.dialLabel")}</span>

      <div style={readoutRow}>
        <button
          type="button"
          aria-label="-1"
          disabled={disabled || atMin}
          onClick={() => onChange(targetYear - 1)}
          style={stepButton(disabled || atMin)}
        >
          <Minus size={15} strokeWidth={2.5} />
        </button>

        <span style={yearWindowStyle}>{targetYear}</span>

        <button
          type="button"
          aria-label="+1"
          disabled={disabled || atMax}
          onClick={() => onChange(targetYear + 1)}
          style={stepButton(disabled || atMax)}
        >
          <Plus size={15} strokeWidth={2.5} />
        </button>
      </div>

      <input
        type="range"
        min={minYear}
        max={maxYear}
        step={1}
        value={targetYear}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={t("halvingTimeMachine.dialLabel")}
        style={sliderStyle}
      />

      <div style={chipsRow}>
        {chips.map((chip) => (
          <button
            key={chip.year}
            type="button"
            disabled={disabled}
            onClick={() => onChange(chip.year)}
            style={chipStyle(targetYear === chip.year)}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
};
