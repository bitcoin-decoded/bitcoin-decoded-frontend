import { useState } from "react";

export type ComparisonPhase = "before" | "after";

export const useTransactionComparison = () => {
  const [phase, setPhase] = useState<ComparisonPhase>("before");

  const trigger = () => setPhase("after");
  const reset = () => setPhase("before");

  return { phase, trigger, reset };
};
