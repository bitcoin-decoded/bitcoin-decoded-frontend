import { type CSSProperties, type FC } from "react";

import { useAuth } from "../../../Auth/hooks";
import { useBreakpoint, useThemeContext, withOpacity } from "../../../Design";
import { INSIGHT_STEPS } from "../data";
import { getLandingColors } from "../helpers";
import { useCurriculumProgress, useHomePage, useLandingMode } from "../hooks";

import { FinalPalier } from "./FinalPalier";
import { HeroPalier } from "./HeroPalier";
import { HomeCurriculum } from "./HomeCurriculum";
import { InsightPalier } from "./InsightPalier";
import { LandingRail } from "./LandingRail";

export const HomePage: FC = () => {
  useLandingMode();

  const { sectionId, startJourney, openChapter, openBadges, scrollToId, scrollToProgram } =
    useHomePage();
  const { cards, moduleCount, totalChapters, totalMinutes, resume } = useCurriculumProgress();
  const { status: authStatus } = useAuth();
  const { theme } = useThemeContext();
  const isDesktop = useBreakpoint() === "desktop";

  const { ground, ink, gold, line } = getLandingColors(theme);

  // A returning visitor with progress (or a freshly created access) gets the
  // discreet resume ribbon; a fresh visitor never does, so the hero stays pristine.
  const showResume = resume !== null && (resume.doneCount > 0 || authStatus === "authenticated");
  const heroResume = showResume ? resume : null;

  // The immersive ground: warm halo top-right + a fixed ledger trame, both keyed
  // to the theme so the sas reads in dark and light (spec §7).
  const rootStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    color: ink,
    backgroundColor: ground,
    backgroundImage: `radial-gradient(120% 60% at 78% -10%, ${withOpacity(gold, 0.1)}, transparent 60%), repeating-linear-gradient(${line} 0 1px, transparent 1px 36px)`,
    backgroundAttachment: "fixed",
  };

  return (
    <div style={rootStyle}>
      {isDesktop && <LandingRail onJump={scrollToId} />}

      <HeroPalier
        onLook={() => scrollToId(INSIGHT_STEPS[0].id)}
        resume={heroResume}
        onOpenResume={openChapter}
        onBadges={openBadges}
      />

      {INSIGHT_STEPS.map((step, index) => (
        <InsightPalier
          key={step.id}
          step={step}
          onContinue={() => scrollToId(INSIGHT_STEPS[index + 1]?.id ?? sectionId.final)}
        />
      ))}

      <FinalPalier
        moduleCount={moduleCount}
        totalChapters={totalChapters}
        totalMinutes={totalMinutes}
        onStart={startJourney}
        onSeeProgram={scrollToProgram}
      />

      <HomeCurriculum sectionId={sectionId.programme} cards={cards} onOpen={openChapter} />
    </div>
  );
};
