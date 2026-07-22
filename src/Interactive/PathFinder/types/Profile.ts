import type { ProfilePlan } from "./ProfilePlan";

export type Profile = {
  name: string;
  verdict: string;
  why: string;
  acquisition: { planA: ProfilePlan; planB?: ProfilePlan };
  detention: { planA: ProfilePlan; planB?: ProfilePlan };
};
