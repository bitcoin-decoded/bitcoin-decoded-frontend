import type { LucideIcon } from "lucide-react";

import type { WalletSolution } from "./WalletSolution";

/**
 * One boolean criterion, shared by the legend and the solution rows so both
 * stay in sync. `isPresent` decides amber (true) vs the red crossed-out cell
 * (false).
 */
export type CriterionDescriptor = {
  key: string;
  Icon: LucideIcon;
  label: string;
  isPresent: (solution: WalletSolution) => boolean;
};
