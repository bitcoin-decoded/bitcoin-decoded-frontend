import type { ProfileKey } from "./ProfileKey";
import type { SectionPlan } from "./SectionPlan";

export type ProfileResult = {
  key: ProfileKey;
  name: string;
  verdict: string;
  why: string;
  sections: SectionPlan[];
};
