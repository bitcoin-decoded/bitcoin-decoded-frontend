import { type CSSProperties, type FC } from "react";

import { Button, getTypography, RangeLedger, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
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

export const TimeDial: FC<Props> = ({ targetYear, minYear, maxYear, disabled, onChange }) => {
  const typo = getTypography();
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const accent = world.border.secondary;
  const baseBorderSecondary = colors.base.border.secondary;
  const sliderFill = world.background.secondary;

  const currentYear = new Date().getFullYear();
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
    ...typo.micro,
    fontVariant: "small-caps",
    color: colors.base.text.secondary,
  };

  const yearValueStyle: CSSProperties = {
    ...typo.figure,
    color: world.text.secondary,
    fontVariantNumeric: "tabular-nums",
  };

  const controlRow: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.85rem",
    width: "100%",
  };

  const segmentedWrapStyle: CSSProperties = {
    display: "inline-flex",
    border: `1px solid ${withOpacity(baseBorderSecondary, 0.25)}`,
    borderRadius: 0,
    overflow: "hidden",
  };

  // Only the active chip carries an inline background; the idle chips leave it
  // to CSS so `.htm-year-chip:hover` can tint them without an `!important`
  // fight. The hover colour rides in on a custom property so it stays theme-aware.
  const segmentBtnStyle = (active: boolean, first: boolean): CSSProperties => ({
    ...typo.micro,
    cursor: disabled ? "not-allowed" : "pointer",
    padding: isMobile ? "0.5rem 0.7rem" : "0.55rem 1rem",
    border: "none",
    borderLeft: first ? "none" : `1px solid ${withOpacity(baseBorderSecondary, 0.25)}`,
    whiteSpace: "nowrap",
    color: active ? colors.base.text.onAccent : colors.base.text.secondary,
    background: active ? accent : undefined,
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.25s var(--ease-smooth)",
    ["--chip-hover" as string]: withOpacity(accent, 0.14),
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
            className="htm-year-chip"
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
