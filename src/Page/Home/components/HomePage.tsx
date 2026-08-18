import { type CSSProperties, type FC } from "react";

import { useAuth } from "../../../Auth/hooks";
import { Separator, useBreakpoint } from "../../../Design";
import { RevealOnScroll } from "../../Shared";
import { useCurriculumProgress, useHomePage } from "../hooks";

import { HomeCurriculum } from "./HomeCurriculum";
import { HomeDifference } from "./HomeDifference";
import { HomeHero } from "./HomeHero";
import { HomeResume } from "./HomeResume";

export const HomePage: FC = () => {
  const { curriculumSectionId, startJourney, openChapter, openBadges, openAccessInfo, scrollToCurriculum } =
    useHomePage();
  const { cards, moduleCount, totalChapters, totalMinutes, resume } = useCurriculumProgress();
  const { status: authStatus } = useAuth();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";

  // Signed-in visitors see the resume block even at zero progress (the "start" tier
  // greets a freshly created access); guests see it only once they have progress.
  const showResume = resume !== null && (resume.doneCount > 0 || authStatus === "authenticated");

  const sepMargin = isMobile ? "2rem 0" : breakpoint === "tablet" ? "2.5rem 0" : "3.25rem 0";

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "62rem",
    margin: "0 auto",
    padding: `0 ${isMobile ? "0.75rem" : "1.5rem"}`,
  };

  const resumeWrapperStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      <HomeHero onStart={startJourney} onSeeProgram={scrollToCurriculum} />

      {showResume && resume && (
        <>
          <Separator margin={sepMargin} />
          <RevealOnScroll style={resumeWrapperStyle}>
            <HomeResume resume={resume} onOpen={openChapter} onBadges={openBadges} />
          </RevealOnScroll>
        </>
      )}

      <Separator margin={sepMargin} />
      <HomeCurriculum
        sectionId={curriculumSectionId}
        cards={cards}
        moduleCount={moduleCount}
        totalChapters={totalChapters}
        totalMinutes={totalMinutes}
        onOpen={openChapter}
      />

      <Separator margin={sepMargin} />
      <RevealOnScroll>
        <HomeDifference onLearnMore={openAccessInfo} />
      </RevealOnScroll>
    </div>
  );
};
