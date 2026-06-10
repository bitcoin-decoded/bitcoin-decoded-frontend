import type { PathAnswers, ProfileKey } from "../types";

/**
 * Maps the answers to one of the eight study profiles. Per the study, frequency
 * (Q2) is never a selection axis — only capital (Q1), sovereignty (Q3) and
 * privacy (Q4) decide. "Je ne sais pas" resolves to the Undecided.
 */
export const resolveProfile = (answers: PathAnswers): ProfileKey | null => {
  const { capital, custody, privacy } = answers;
  if (!capital || !custody || !privacy) return null;

  if (custody === "unsure") return "indecis";
  if (custody === "simple") return capital === "P1" ? "curieux" : "delegant";

  // custody === "sovereign" — privacy then capital decide.
  if (privacy === "discreet") {
    if (capital === "P1") return "discretFrugal";
    if (capital === "P2") return "souverainDiscret";
    return "baleine";
  }
  if (capital === "P1") return "debutant";
  if (capital === "P2") return "investisseur";
  return "baleine";
};
