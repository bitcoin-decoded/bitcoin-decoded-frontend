import { type CSSProperties, type FC } from "react";

import type { RouteName } from "../../../Routing";
import { RevealOnScroll } from "../../Shared";
import type { CurriculumResume } from "../types";

import { HomeResume } from "./HomeResume";

type Props = {
  resume: CurriculumResume;
  onOpen: (route: RouteName) => void;
  onBadges: () => void;
};

// The return path for a visitor who already has progress, placed just after the
// hero (spec: "dans le hero ou juste après"). A fresh visitor never sees it, so
// the accroche stays pristine; it is not a full-viewport palier, just a band.
export const ResumePalier: FC<Props> = ({ resume, onOpen, onBadges }) => {
  const sectionStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: "clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 6vw, 3rem)",
    scrollSnapAlign: "start",
  };

  return (
    <section id="resume" style={sectionStyle}>
      <RevealOnScroll style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <HomeResume resume={resume} onOpen={onOpen} onBadges={onBadges} />
      </RevealOnScroll>
    </section>
  );
};
