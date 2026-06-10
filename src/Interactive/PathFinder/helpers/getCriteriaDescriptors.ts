import { ArrowUpFromLine, GitBranch, Key, Tag, Users, WifiOff } from "lucide-react";

import type { PathFinderCopy } from "../data";
import type { CriterionDescriptor } from "../types";

/**
 * The boolean criteria, in display order. Single source shared by the legend
 * and the per-solution rows so the icons + labels + order never drift apart.
 * Each `isPresent` returns the positive trait → amber when true, red cross when
 * false.
 */
export const getCriteriaDescriptors = (
  criteria: PathFinderCopy["criteria"],
): CriterionDescriptor[] => [
  {
    key: "nonCustodial",
    Icon: Key,
    label: criteria.nonCustodial,
    isPresent: (s) => !s.custodial,
  },
  {
    key: "openSource",
    Icon: GitBranch,
    label: criteria.openSource,
    isPresent: (s) => s.openSource,
  },
  { key: "cold", Icon: WifiOff, label: criteria.cold, isPresent: (s) => s.connexion === "cold" },
  { key: "multisig", Icon: Users, label: criteria.multisig, isPresent: (s) => s.multisig },
  {
    key: "withdrawal",
    Icon: ArrowUpFromLine,
    label: criteria.withdrawal,
    isPresent: (s) => s.externalWithdrawal,
  },
  { key: "free", Icon: Tag, label: criteria.free, isPresent: (s) => s.free },
];
