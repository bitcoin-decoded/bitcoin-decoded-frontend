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
  const { theme, colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const accent = world.border.secondary;
  const baseBorderSecondary = colors.base.border.secondary;
  const isLight = theme === "light";
  const sliderFill = world.background.secondary; // solid Bitcoin orange (#f7931a) in both modes

  const currentYear = new Date().getFullYear();
  // Plain years (genesis · today · end of issuance) — no "Fin" label, which
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

  const sliderPct = ((targetYear - minYear) / (maxYear - minYear)) * 100;
  const sliderTrackRest = isLight ? "#cbd5e1" : "rgba(242, 242, 242, 0.18)";
  const sliderStyle = {
    flex: 1,
    maxWidth: "18rem",
    "--htm-track": `linear-gradient(to right, ${sliderFill} ${sliderPct}%, ${sliderTrackRest} ${sliderPct}%)`,
    "--htm-thumb": sliderFill,
  } as CSSProperties;

  // Connected segmented control (cf. SeedGenerator's 12/24 toggle), split into
  // three sections: genesis · today · end of issuance.
  const segmentedWrapStyle: CSSProperties = {
    display: "inline-flex",
    border: `1px solid ${withOpacity(baseBorderSecondary, 0.25)}`,
    borderRadius: "0.75rem",
    overflow: "hidden",
  };

  const segmentBtnStyle = (active: boolean, first: boolean): CSSProperties => ({
    fontFamily: "'JetBrains Mono', monospace",
    cursor: disabled ? "not-allowed" : "pointer",
    padding: isMobile ? "0.5rem 0.7rem" : "0.55rem 1rem",
    border: "none",
    borderLeft: first ? "none" : `1px solid ${withOpacity(baseBorderSecondary, 0.25)}`,
    fontSize: isMobile ? "0.62rem" : "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    color: active ? "#fff" : withOpacity(colors.base.text.secondary, 0.85),
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

        <input
          type="range"
          className="htm-slider"
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
