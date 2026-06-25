import { type CSSProperties, type FC } from "react";

import { Zap } from "lucide-react";

import { BRAND, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getMachineColors } from "../data";
import { formatRewardBTC, getMinerWorkTime } from "../helpers";
import type { TravelPhase } from "../types";

type Props = {
  displayYear: number;
  arrivedYear: number | null;
  phase: TravelPhase;
  reward: number | null;
  isGenesisEra: boolean;
  isSubsidySymbolic: boolean;
  isExhausted: boolean;
};

/**
 * The retro CRT display: a glowing year, and - once you've travelled - the block
 * reward for that era. Everything is centered vertically and horizontally.
 * While traveling, a flux flash sweeps over a shaking, year-scrambling screen.
 */
export const TimeScreen: FC<Props> = ({
  displayYear,
  arrivedYear,
  phase,
  reward,
  isGenesisEra,
  isSubsidySymbolic,
  isExhausted,
}) => {
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { theme, colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const isLight = theme === "light";
  const machine = getMachineColors();

  // The "screen" adapts to the theme: a deep glowing CRT in dark mode, a light
  // panel in light mode - never a black box on a white page. Text + accents use
  // theme tokens, readable on whichever background.
  const glow = world.text.secondary; // amber readout + accents
  const screenInk = world.text.primary; // reward value - warm/amber, readable in both modes (never plain black)
  const screenInkMuted = withOpacity(colors.base.text.secondary, 0.85); // labels / subline / prompt
  // Flat instrument panel — a faint amber tint in light mode, a solid dark
  // screen in dark mode. No gradient, no glow, no scanlines (the CRT chrome was
  // a gimmick the ledger refonte removes); the amber mono figures carry it.
  const screenBg = isLight ? withOpacity(glow, 0.08) : machine.screenBgDark;
  const localizeDecimal = (s: string) => (fr ? s.replace(".", ",") : s);

  const screenStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    borderRadius: 0,
    padding: isMobile ? "1.25rem 1rem" : "1.6rem 1.25rem",
    background: screenBg,
    border: `1px solid ${withOpacity(glow, 0.4)}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: isMobile ? "0.7rem" : "0.85rem",
    textAlign: "center",
    minHeight: isMobile ? "10.5rem" : "11.5rem",
  };

  const groupStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.15rem",
  };

  const eyebrowStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: BRAND.fontSize.note,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.25em",
    color: withOpacity(glow, 0.65),
  };

  const yearStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: isMobile ? "1.7rem" : "2rem",
    fontWeight: 500,
    lineHeight: 1,
    color: glow,
    fontVariantNumeric: "tabular-nums",
  };

  const dividerStyle: CSSProperties = {
    width: "2.5rem",
    height: "1px",
    background: withOpacity(glow, 0.25),
  };

  const rewardLabelStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: BRAND.fontSize.note,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.12em",
    color: withOpacity(glow, 0.8),
  };

  const rewardValueStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: isMobile ? "1.4rem" : "1.7rem",
    fontWeight: 500,
    lineHeight: 1.1,
    color: screenInk,
  };

  const sublineStyle: CSSProperties = {
    margin: 0,
    marginTop: "0.5rem",
    fontFamily: BRAND.fonts.mono,
    fontSize: BRAND.fontSize.note,
    lineHeight: 1.5,
    color: screenInkMuted,
  };

  const promptStyle: CSSProperties = {
    margin: 0,
    fontSize: BRAND.fontSize.note,
    fontStyle: "italic",
    color: screenInkMuted,
    maxWidth: "18rem",
    lineHeight: 1.5,
  };

  return (
    <div className={phase === "traveling" ? "htm-screen--traveling" : undefined} style={screenStyle}>
      {phase === "traveling" && (
        <div
          className="htm-flux"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            // On the dark CRT, a soft amber glow with "screen" blend pops. On the
            // light panel, "screen" washes out - so use vivid yellow→orange with
            // normal blend so the time-flux is clearly visible in both modes.
            background: isLight
              ? machine.fluxLight
              : `radial-gradient(circle at 50% 45%, ${withOpacity(glow, 0.55)}, transparent 70%)`,
            mixBlendMode: isLight ? "normal" : "screen",
          }}
        />
      )}

      <div style={groupStyle}>
        <span style={eyebrowStyle}>{t("halvingTimeMachine.yearLabel")}</span>
        <span style={yearStyle}>{displayYear}</span>
      </div>

      <div style={dividerStyle} />

      {phase === "idle" && <p style={promptStyle}>{t("halvingTimeMachine.screenIdle")}</p>}

      {phase === "traveling" && (
        <span
          style={{
            ...rewardLabelStyle,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <Zap size={13} strokeWidth={2.5} />
          {t("halvingTimeMachine.traveling")}
        </span>
      )}

      {phase === "arrived" && (
        <div
          key={arrivedYear ?? "none"}
          className="htm-materialize"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" }}
        >
          {isExhausted ? (
            <>
              <span style={rewardValueStyle}>0 BTC</span>
              <p style={{ ...sublineStyle, maxWidth: "20rem" }}>
                {t("halvingTimeMachine.exhausted")}
              </p>
            </>
          ) : (
            <>
              <span style={rewardLabelStyle}>{t("halvingTimeMachine.rewardLabel")}</span>
              <span style={rewardValueStyle}>
                {localizeDecimal(formatRewardBTC(reward ?? 0))}{" "}
                <span style={{ fontSize: "0.78em", color: withOpacity(glow, 0.85) }}>BTC</span>
              </span>
              <p style={sublineStyle}>
                {isSubsidySymbolic ? (
                  t("halvingTimeMachine.workTimeSymbolic")
                ) : isGenesisEra ? (
                  t("halvingTimeMachine.workTimeGenesis")
                ) : (
                  <>
                    {t("halvingTimeMachine.workTimePrefix")}{" "}
                    <strong style={{ color: glow }}>{getMinerWorkTime(reward ?? 0, fr)}</strong>{" "}
                    {t("halvingTimeMachine.workTimeSuffix")}
                  </>
                )}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
