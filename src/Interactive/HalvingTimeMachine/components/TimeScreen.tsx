import { type CSSProperties, type FC } from "react";

import { Zap } from "lucide-react";

import { useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { formatRewardBTC } from "../helpers";
import type { TravelPhase } from "../types";

type Props = {
  displayYear: number;
  arrivedYear: number | null;
  phase: TravelPhase;
  reward: number | null;
  halvings: number | null;
  ratioVsGenesis: number | null;
  isExhausted: boolean;
};

/**
 * The retro CRT display: a glowing year, and — once you've travelled — the block
 * reward for that era. Everything is centered vertically and horizontally.
 * While traveling, a flux flash sweeps over a shaking, year-scrambling screen.
 */
export const TimeScreen: FC<Props> = ({
  displayYear,
  arrivedYear,
  phase,
  reward,
  halvings,
  ratioVsGenesis,
  isExhausted,
}) => {
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];

  const glow = world.text.secondary;
  const localizeDecimal = (s: string) => (fr ? s.replace(".", ",") : s);

  const screenStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    borderRadius: "0.85rem",
    padding: isMobile ? "1.25rem 1rem" : "1.6rem 1.25rem",
    background: "linear-gradient(180deg, #0c0b09, #08080a)",
    border: `1px solid ${withOpacity(glow, 0.4)}`,
    boxShadow: `inset 0 0 30px ${withOpacity(glow, 0.12)}, 0 0 0 1px ${withOpacity(glow, 0.05)}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: isMobile ? "0.7rem" : "0.85rem",
    textAlign: "center",
    minHeight: isMobile ? "10.5rem" : "11.5rem",
  };

  const scanlineStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    backgroundImage: `repeating-linear-gradient(0deg, ${withOpacity(
      "#000000",
      0.25,
    )} 0px, ${withOpacity("#000000", 0.25)} 1px, transparent 1px, transparent 3px)`,
    opacity: 0.5,
  };

  const groupStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.15rem",
  };

  const eyebrowStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.52rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    color: withOpacity(glow, 0.65),
  };

  const yearStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "1.7rem" : "2rem",
    fontWeight: 700,
    lineHeight: 1,
    color: glow,
    textShadow: `0 0 12px ${withOpacity(glow, 0.6)}, 0 0 2px ${withOpacity(glow, 0.9)}`,
    fontVariantNumeric: "tabular-nums",
  };

  const dividerStyle: CSSProperties = {
    width: "2.5rem",
    height: "1px",
    background: withOpacity(glow, 0.25),
  };

  const rewardLabelStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.58rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: withOpacity(glow, 0.8),
  };

  const rewardValueStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "1.4rem" : "1.7rem",
    fontWeight: 700,
    lineHeight: 1.1,
    color: colors.base.text.primary,
    textShadow: `0 0 10px ${withOpacity(glow, 0.3)}`,
  };

  const sublineStyle: CSSProperties = {
    margin: 0,
    marginTop: "0.5rem",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.6rem",
    lineHeight: 1.5,
    color: withOpacity(colors.base.text.secondary, 0.85),
  };

  const promptStyle: CSSProperties = {
    margin: 0,
    fontSize: "0.7rem",
    fontStyle: "italic",
    color: withOpacity(colors.base.text.secondary, 0.7),
    maxWidth: "18rem",
    lineHeight: 1.5,
  };

  const ratioText =
    ratioVsGenesis && ratioVsGenesis > 1
      ? ` · ${ratioVsGenesis.toLocaleString(fr ? "fr-FR" : "en-US")}${t("halvingTimeMachine.ratioSuffix")}`
      : "";

  return (
    <div className={phase === "traveling" ? "htm-screen--traveling" : undefined} style={screenStyle}>
      <div style={scanlineStyle} />

      {phase === "traveling" && (
        <div
          className="htm-flux"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(circle at 50% 45%, ${withOpacity(glow, 0.55)}, transparent 70%)`,
            mixBlendMode: "screen",
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
                {halvings} {t("halvingTimeMachine.halvingsLabel")}
                {ratioText}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
