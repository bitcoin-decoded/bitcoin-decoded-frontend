import type { ProfilePlan } from "./ProfilePlan";

/**
 * One reader archetype: its verdict, a short "why", and — per step — a plan A
 * and an optional plan B. Plan B is absent when the study deliberately leaves
 * no alternative (e.g. no custodial fallback for the Serious Investor).
 */
export type Profile = {
  name: string;
  verdict: string;
  why: string;
  acquisition: { planA: ProfilePlan; planB?: ProfilePlan };
  detention: { planA: ProfilePlan; planB?: ProfilePlan };
};
