import type { Branch } from "../types";

export const BRANCHES: readonly Branch[] = [
  {
    id: "a",
    labelKey: "doubleSpend.txA",
    recipientKey: "doubleSpend.recipientA",
    originKey: "doubleSpend.originA",
  },
  {
    id: "b",
    labelKey: "doubleSpend.txB",
    recipientKey: "doubleSpend.recipientB",
    originKey: "doubleSpend.originB",
  },
];
