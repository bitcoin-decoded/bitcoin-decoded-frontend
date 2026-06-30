import { type CSSProperties, type FC } from "react";

import { BRAND, Button, RangeLedger, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { TIME_MACHINE_END_YEAR } from "../data";

import { Minus, Plus } from "@icons";

type Props = {
  targetYear: number;
  minYear: number;
  maxYear: number;
  disabled: boolean;
  onChange: (year: number) => void;
};

/**
 * The dial: a single centered "Année de destination - 2135" line, a slider
 * flanked by ±1 steppers (reusing the app Button, like DifficultyAdjustment),
 * and a few quick-jump chips (genesis, today, end of issuance).
 */
export const TimeDial: FC<Props> = ({ targetYear, minYear, maxYear, disabled, onChange }) => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const accent = world.border.secondary;
  const baseBorderSecondary = colors.base.border.secondary;
  const sliderFill = world.background.secondary; // solid Bitcoin orange (#f7931a) in both modes

  const currentYear = new Date().getFullYear();
  // Plain years (genesis · today · end of issuance) - no "Fin" label, which
  // could be misread as "the end of Bitcoin".
  const chips = [
    { year: minYear, label: String(minYear) },
    { year: currentYear, label: String(currentYear) },
    { year: TIME_MACHINE_END_YEAR, label: `≈ ${TIME_MACHINE_END_YEAR}` },
  ];

  const wrapStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.85rem",
    width: "100%",
  };

  const headerLine: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.55rem",
    flexWrap: "wrap",
  };

  const labelStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: BRAND.fontSize.note,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.1em",
    color: withOpacity(colors.base.text.secondary, 0.75),
  };

  const yearValueStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: isMobile ? "1.15rem" : "1.3rem",
    fontWeight: 500,
    color: world.text.primary,
    letterSpacing: "0.02em",
    fontVariantNumeric: "tabular-nums",
  };

  const controlRow: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.85rem",
    width: "100%",
  };

  // Connected segmented control (cf. SeedGenerator's 12/24 toggle), split into
  // three sections: genesis · today · end of issuance. Sharp corners (radius 0).
  const segmentedWrapStyle: CSSProperties = {
    display: "inline-flex",
    border: `1px solid ${withOpacity(baseBorderSecondary, 0.25)}`,
    borderRadius: 0,
    overflow: "hidden",
  };

  const segmentBtnStyle = (active: boolean, first: boolean): CSSProperties => ({
    fontFamily: BRAND.fonts.mono,
    cursor: disabled ? "not-allowed" : "pointer",
    padding: isMobile ? "0.5rem 0.7rem" : "0.55rem 1rem",
    border: "none",
    borderLeft: first ? "none" : `1px solid ${withOpacity(baseBorderSecondary, 0.25)}`,
    fontSize: BRAND.fontSize.note,
    fontWeight: 500,
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    color: active ? colors.base.text.onAccent : withOpacity(colors.base.text.secondary, 0.85),
    background: active ? accent : "transparent",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.25s var(--ease-smooth)",
  });

  const atMin = targetYear <= minYear;
  const atMax = targetYear >= maxYear;

  return (
    <div style={wrapStyle}>
      <div style={headerLine}>
        <span style={labelStyle}>{t("halvingTimeMachine.dialLabel")}</span>
        <span style={yearValueStyle}>{targetYear}</span>
      </div>

      <div style={controlRow}>
        <Button
          variant="primary"
          size="sm"
          ariaLabel="-1"
          onClick={() => onChange(targetYear - 1)}
          disabled={disabled || atMin}
        >
          <Minus size={isMobile ? 12 : 14} strokeWidth={2.5} />
        </Button>

        <div style={{ flex: 1, maxWidth: "18rem" }}>
          <RangeLedger
            value={targetYear}
            onChange={onChange}
            min={minYear}
            max={maxYear}
            step={1}
            disabled={disabled}
            color={sliderFill}
            ariaLabel={t("halvingTimeMachine.dialLabel")}
          />
        </div>

        <Button
          variant="primary"
          size="sm"
          ariaLabel="+1"
          onClick={() => onChange(targetYear + 1)}
          disabled={disabled || atMax}
        >
          <Plus size={isMobile ? 12 : 14} strokeWidth={2.5} />
        </Button>
      </div>

      <div role="tablist" aria-label={t("halvingTimeMachine.dialLabel")} style={segmentedWrapStyle}>
        {chips.map((chip, i) => (
          <button
            key={chip.year}
            type="button"
            role="tab"
            aria-selected={targetYear === chip.year}
            disabled={disabled}
            onClick={() => onChange(chip.year)}
            style={segmentBtnStyle(targetYear === chip.year, i === 0)}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
};
