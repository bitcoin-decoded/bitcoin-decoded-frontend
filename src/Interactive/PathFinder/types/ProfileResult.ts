import type { ProfileKey } from "./ProfileKey";
import type { SectionPlan } from "./SectionPlan";

/** The fully resolved output for a reader: their profile's identity + verdict,
 *  and the two built sections (acquisition, detention). */
export type ProfileResult = {
  key: ProfileKey;
  name: string;
  verdict: string;
  why: string;
  sections: SectionPlan[];
};
