import { useState } from "react";

import { useExplorationGate } from "../../../Design";

type Options = {
  requiredExplored?: number;
  onComplete?: () => void;
};

export const useNodeSuperpowers = ({ requiredExplored = 0, onComplete }: Options = {}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { exploredCount, markExplored } = useExplorationGate({
    threshold: requiredExplored,
    onComplete,
  });

  // `counts` gates on the powers that actually matter here: the three abilities
  // of a simple node, or the single new one on the mining side. Recalled powers
  // still open, they just do not move the counter.
  const toggle = (index: number, counts: boolean) => {
    if (counts) markExplored(index);
    setOpenIndex((current) => (current === index ? null : index));
  };

  return { openIndex, toggle, exploredCount };
};
