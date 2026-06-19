import { type CSSProperties, type FC } from "react";

import { History, Info } from "lucide-react";

import {
  Caption,
  FeedbackPanel,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useHalvingTimeMachine } from "../hooks";

import { TimeDial } from "./TimeDial";
import { TimeScreen } from "./TimeScreen";
import { TravelLever } from "./TravelLever";

/**
 * "Halving time machine": dial a destination year, pull the lever, and - after a
 * brief temporal flux - the screen reveals the block reward in effect that year.
 * Lets readers feel the staircase down to zero, well past 2040.
 */
export const HalvingTimeMachine: FC = () => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];

  const {
    minYear,
    maxYear,
    targetYear,
    displayYear,
    arrivedYear,
    phase,
    reward,
    isGenesisEra,
    isSubsidySymbolic,
    isExhausted,
    setTargetYear,
    travel,
  } = useHalvingTimeMachine();

  const introStyle: CSSProperties = {
    margin: 0,
    fontSize: "0.8rem",
    lineHeight: 1.55,
    color: withOpacity(colors.base.text.secondary, 0.9),
    textAlign: "center",
  };

  const controlsStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.4rem",
  };

  const dialWrapStyle: CSSProperties = {
    width: "100%",
    maxWidth: "26rem",
  };

  return (
    <SurfaceCard gap="1.1rem" margin={isMobile ? "1.5rem 0" : "2rem 0"} style={{ overflow: "hidden" }}>
      <Caption
        tone="accent"
        size="md"
        icon={
          <History
            size={isMobile ? 17 : 18}
            strokeWidth={2}
            style={{ color: world.border.secondary, flexShrink: 0 }}
          />
        }
      >
        {t("halvingTimeMachine.title")}
      </Caption>

      <p style={introStyle}>{t("halvingTimeMachine.intro")}</p>

      <TimeScreen
        displayYear={displayYear}
        arrivedYear={arrivedYear}
        phase={phase}
        reward={reward}
        isGenesisEra={isGenesisEra}
        isSubsidySymbolic={isSubsidySymbolic}
        isExhausted={isExhausted}
      />

      <div style={controlsStyle}>
        <div style={dialWrapStyle}>
          <TimeDial
            targetYear={targetYear}
            minYear={minYear}
            maxYear={maxYear}
            disabled={phase === "traveling"}
            onChange={setTargetYear}
          />
        </div>
        <TravelLever traveling={phase === "traveling"} onPull={travel} />
      </div>

      <FeedbackPanel tone="info" icon={<Info size={11} strokeWidth={2} />}>
        {t("halvingTimeMachine.caption")}
      </FeedbackPanel>
    </SurfaceCard>
  );
};
