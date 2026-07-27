import { type CSSProperties, type FC, type ReactNode } from "react";

import {
  BRAND,
  getBrandGold,
  getTypography,
  useBreakpoint,
  usePageTheme,
  useThemeContext,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { formatRewardBTC, getMinerWorkTime } from "../helpers";
import type { TravelPhase } from "../types";

import { Zap } from "@icons";

type Props = {
  displayYear: number;
  arrivedYear: number | null;
  phase: TravelPhase;
  reward: number | null;
  isGenesisEra: boolean;
  isSubsidySymbolic: boolean;
  isExhausted: boolean;
};

export const TimeScreen: FC<Props> = ({
  displayYear,
  arrivedYear,
  phase,
  reward,
  isGenesisEra,
  isSubsidySymbolic,
  isExhausted,
}) => {
  const breakpoint = useBreakpoint();
  const typo = getTypography(breakpoint);
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { theme } = useThemeContext();
  const { colors, moduleTheme } = usePageTheme();
  const world = colors[moduleTheme];
  const gold = getBrandGold(theme);

  const amber = world.text.secondary;
  const localizeDecimal = (s: string) => (fr ? s.replace(".", ",") : s);

  // Thicker than the hairline the callouts use: this is the machine's readout,
  // so its ledger frame reads a touch bolder.
  const stroke = BRAND.figures.ruleThickness + 1;
  const cornerLen = breakpoint === "mobile" ? 12 : 16;

  const screenStyle: CSSProperties = {
    position: "relative",
    padding: breakpoint === "mobile" ? "1.4rem 1.1rem" : "1.75rem 1.4rem",
    background: withOpacity(colors.base.text.primary, theme === "dark" ? 0.05 : 0.035),
    border: `${stroke}px solid ${withOpacity(gold, 0.4)}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.7rem",
    textAlign: "center",
    minHeight: breakpoint === "mobile" ? "10.5rem" : "11.5rem",
  };

  const corners = (): ReactNode => {
    const s = `${stroke}px solid ${gold}`;
    const base: CSSProperties = { position: "absolute", width: cornerLen, height: cornerLen, pointerEvents: "none" };
    return (
      <>
        <span style={{ ...base, top: -stroke, left: -stroke, borderTop: s, borderLeft: s }} />
        <span style={{ ...base, top: -stroke, right: -stroke, borderTop: s, borderRight: s }} />
        <span style={{ ...base, bottom: -stroke, left: -stroke, borderBottom: s, borderLeft: s }} />
        <span style={{ ...base, bottom: -stroke, right: -stroke, borderBottom: s, borderRight: s }} />
      </>
    );
  };

  const group: CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" };
  const eyebrow: CSSProperties = { ...typo.kicker, color: withOpacity(amber, 0.85) };
  const year: CSSProperties = { ...typo.display, color: amber };
  const divider: CSSProperties = { width: "2.5rem", height: 1, background: withOpacity(amber, 0.3) };
  const rewardLabel: CSSProperties = { ...typo.label, fontVariant: "small-caps", color: colors.base.text.secondary };
  const rewardValue: CSSProperties = { ...typo.heading, color: gold };
  const subline: CSSProperties = { ...typo.note, color: colors.base.text.secondary, margin: 0, maxWidth: "20rem" };
  const prompt: CSSProperties = { ...typo.note, color: colors.base.text.secondary, margin: 0, maxWidth: "18rem" };
  const traveling: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    color: amber,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
  };

  return (
    <div style={screenStyle}>
      {corners()}
      <div style={group}>
        <span style={eyebrow}>{t("halvingTimeMachine.yearLabel")}</span>
        <span style={year}>{displayYear}</span>
      </div>

      <div style={divider} />

      {phase === "idle" && <p style={prompt}>{t("halvingTimeMachine.screenIdle")}</p>}

      {phase === "traveling" && (
        <span style={traveling}>
          <Zap size={13} strokeWidth={2.5} />
          {t("halvingTimeMachine.traveling")}
        </span>
      )}

      {phase === "arrived" && (
        <div
          key={arrivedYear ?? "none"}
          className="htm-materialize"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}
        >
          {isExhausted ? (
            <>
              <span style={rewardValue}>0 BTC</span>
              <p style={subline}>{t("halvingTimeMachine.exhausted")}</p>
            </>
          ) : (
            <>
              <span style={rewardLabel}>{t("halvingTimeMachine.rewardLabel")}</span>
              <span style={rewardValue}>
                {localizeDecimal(formatRewardBTC(reward ?? 0))}{" "}
                <span style={{ ...typo.micro, color: withOpacity(gold, 0.85) }}>BTC</span>
              </span>
              <p style={subline}>
                {isSubsidySymbolic ? (
                  t("halvingTimeMachine.workTimeSymbolic")
                ) : isGenesisEra ? (
                  t("halvingTimeMachine.workTimeGenesis")
                ) : (
                  <>
                    {t("halvingTimeMachine.workTimePrefix")}{" "}
                    <strong style={{ color: amber }}>{getMinerWorkTime(reward ?? 0, fr)}</strong>{" "}
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
