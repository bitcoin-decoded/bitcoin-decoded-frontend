import { useState } from "react";

import { useExplorationGate } from "../../../Design";

type Options = {
  requiredExplored?: number;
  onComplete?: () => void;
};

export const useNodeSuperpowers = ({ requiredExplored = 0, onComplete }: Options = {}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // A tile that has been opened once keeps showing its power icon afterwards, so
  // the search hint only stands in for powers the reader has never looked at.
  const [discovered, setDiscovered] = useState<ReadonlySet<number>>(new Set());
  const { exploredCount, markExplored } = useExplorationGate({
    threshold: requiredExplored,
    onComplete,
  });

  // `counts` gates on the powers that actually matter here: the three abilities
  // of a simple node, or the single new one on the mining side. Recalled powers
  // still open, they just do not move the counter.
  const toggle = (index: number, counts: boolean) => {
    if (counts) markExplored(index);
    setDiscovered((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
    setOpenIndex((current) => (current === index ? null : index));
  };

  return { openIndex, toggle, exploredCount, discovered };
};
