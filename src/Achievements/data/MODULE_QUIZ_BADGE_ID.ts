import type { BadgeModule } from "../types";

/** Module-quiz badge id per module (awarded on first synthesis-quiz pass). */
export const MODULE_QUIZ_BADGE_ID: Record<BadgeModule, string> = {
  banking: "module-banking-quiz",
  moneyLaws: "module-money-laws-quiz",
  bitcoin: "module-bitcoin-quiz",
};
