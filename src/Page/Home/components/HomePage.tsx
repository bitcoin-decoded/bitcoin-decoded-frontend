import { type CSSProperties, type FC } from "react";

import { Separator, useBreakpoint } from "../../../Design";
import { RevealOnScroll } from "../../Shared";
import { useCurriculumProgress, useHomePage } from "../hooks";

import { HomeCurriculum } from "./HomeCurriculum";
import { HomeDifference } from "./HomeDifference";
import { HomeHero } from "./HomeHero";
import { HomeResume } from "./HomeResume";

export const HomePage: FC = () => {
  const { curriculumSectionId, startJourney, openChapter, openAccessInfo, scrollToCurriculum } =
    useHomePage();
  const { cards, moduleCount, totalChapters, totalMinutes, resume } = useCurriculumProgress();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";

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

      {resume && (
        <>
          <Separator margin={sepMargin} />
          <RevealOnScroll style={resumeWrapperStyle}>
            <HomeResume resume={resume} onResume={openChapter} onRestart={startJourney} />
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
