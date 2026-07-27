import { type CSSProperties, type FC } from "react";

import {
  Caption,
  Disclosure,
  getTypography,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  useThemeContext,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useHalvingTimeMachine } from "../hooks";

import { TimeDial } from "./TimeDial";
import { TimeScreen } from "./TimeScreen";
import { TravelLever } from "./TravelLever";

import { DoodleWristWatch } from "@doodle";

export const HalvingTimeMachine: FC = () => {
  const typo = getTypography();
  const { t } = useTranslation();
  const { colors } = usePageTheme();
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";

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
    ...typo.note,
    margin: 0,
    color: colors.base.text.secondary,
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
    <SurfaceCard
      gap="1.1rem"
      margin={isMobile ? "1.5rem 0" : "2rem 0"}
      style={{
        overflow: "hidden",
        background: withOpacity(colors.base.text.primary, theme === "dark" ? 0.05 : 0.035),
        border: `1px solid ${colors.base.border.tertiary}`,
      }}
    >
      <Caption tone="accent" size="md" icon={<DoodleWristWatch size={isMobile ? 22 : 26} />}>
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

      <Disclosure title={t("halvingTimeMachine.captionTitle")}>
        {t("halvingTimeMachine.caption")}
      </Disclosure>
    </SurfaceCard>
  );
};
