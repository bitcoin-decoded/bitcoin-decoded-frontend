import type { PathAnswers, ProfileKey } from "../types";

export const resolveProfile = (answers: PathAnswers): ProfileKey | null => {
  const { capital, custody, privacy } = answers;
  if (!capital || !custody || !privacy) return null;

  if (custody === "unsure") return "indecis";
  if (custody === "simple") return capital === "P1" ? "curieux" : "delegant";

  if (privacy === "discreet") {
    if (capital === "P1") return "discretFrugal";
    if (capital === "P2") return "souverainDiscret";
    return "baleine";
  }
  if (capital === "P1") return "debutant";
  if (capital === "P2") return "investisseur";
  return "baleine";
};
