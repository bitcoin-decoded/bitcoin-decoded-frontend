import { type CSSProperties, type FC } from "react";

import type { RouteName } from "../../../Routing";
import { RevealOnScroll } from "../../Shared";
import type { CurriculumResume } from "../types";

import { HomeResume } from "./HomeResume";

type Props = {
  resume: CurriculumResume;
  onOpen: (route: RouteName) => void;
  onBadges: () => void;
  onDismiss: () => void;
};

// The return path for a visitor with progress: its own section above the hero
// (it used to crowd the accroche) with comfortable breathing room, and a dismiss
// control so it can be cleared once seen. A fresh visitor never renders it.
export const ResumeSection: FC<Props> = ({ resume, onOpen, onBadges, onDismiss }) => {
  const sectionStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: "clamp(2rem, 5vh, 3.25rem) clamp(1.25rem, 6vw, 3rem) clamp(1rem, 2.5vh, 1.75rem)",
  };

  return (
    <section id="resume" style={sectionStyle}>
      <RevealOnScroll style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <HomeResume resume={resume} onOpen={onOpen} onBadges={onBadges} onDismiss={onDismiss} />
      </RevealOnScroll>
    </section>
  );
};
