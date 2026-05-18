import { useState } from "react";

import type { ComparisonPhase } from "../types";

export const useTransactionComparison = () => {
  const [phase, setPhase] = useState<ComparisonPhase>("before");

  const trigger = () => setPhase("after");
  const reset = () => setPhase("before");

  return { phase, trigger, reset };
};
