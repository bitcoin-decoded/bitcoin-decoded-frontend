import illustrationValue from "../../../Design/img/homepage_illustration1.webp";
import illustrationControl from "../../../Design/img/homepage_illustration2.webp";
import illustrationNetwork from "../../../Design/img/homepage_illustration3.webp";
import type { InsightStep } from "../types";

export const INSIGHT_STEPS: InsightStep[] = [
  {
    id: "value",
    index: 1,
    image: illustrationValue,
    eyebrowKey: "home.step1.eyebrow",
    headingKey: "home.step1.heading",
    altKey: "home.step1.alt",
    captionKey: "home.step1.caption",
    basculeLeadKey: "home.step1.basculeLead",
    basculeEmphasisKey: "home.step1.basculeEmphasis",
    basculeTailKey: "home.step1.basculeTail",
  },
  {
    id: "control",
    index: 2,
    image: illustrationControl,
    eyebrowKey: "home.step2.eyebrow",
    headingKey: "home.step2.heading",
    altKey: "home.step2.alt",
    captionKey: "home.step2.caption",
    basculeLeadKey: "home.step2.basculeLead",
    basculeEmphasisKey: "home.step2.basculeEmphasis",
    basculeTailKey: "home.step2.basculeTail",
  },
  {
    id: "network",
    index: 3,
    image: illustrationNetwork,
    eyebrowKey: "home.step3.eyebrow",
    headingKey: "home.step3.heading",
    altKey: "home.step3.alt",
    captionKey: "home.step3.caption",
    basculeLeadKey: "home.step3.basculeLead",
    basculeEmphasisKey: "home.step3.basculeEmphasis",
    basculeTailKey: "home.step3.basculeTail",
  },
];
