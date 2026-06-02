import { type CSSProperties, type FC } from "react";

import { Minus, Plus } from "lucide-react";

import { Button, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
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
 * The dial: a single centered "Année de destination — 2135" line, a slider
 * flanked by ±1 steppers (reusing the app Button, like DifficultyAdjustment),
 * and a few quick-jump chips (genesis, today, end of issuance).
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
    gap: "0.85rem",
    width: "100%",
  };

  const headerLine: CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    gap: "0.55rem",
    flexWrap: "wrap",
  };

  const labelStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.6rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: withOpacity(colors.base.text.secondary, 0.75),
  };

  const yearValueStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "1.15rem" : "1.3rem",
    fontWeight: 700,
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

  const sliderStyle: CSSProperties = {
    flex: 1,
    maxWidth: "18rem",
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
