import { useState, useCallback } from "react";

type GeneralDecision = "attack" | "retreat" | null;

type GeneralState = {
  id: number;
  decision: GeneralDecision;
  corrupted: boolean;
};

const GENERALS_COUNT = 4;
const CORRUPTED_INDEX = 2;

const createGenerals = (): GeneralState[] =>
  Array.from({ length: GENERALS_COUNT }, (_, i) => ({
    id: i,
    decision: null,
    corrupted: i === CORRUPTED_INDEX,
  }));

export const useByzantineGenerals = () => {
  const [generals, setGenerals] = useState<GeneralState[]>(createGenerals);
  const [revealed, setRevealed] = useState(false);

  const chooseDecision = useCallback((decision: "attack" | "retreat") => {
    setGenerals((prev) =>
      prev.map((g) => ({
        ...g,
        decision: g.corrupted
          ? (decision === "attack" ? "retreat" : "attack")
          : decision,
      })),
    );
    setRevealed(true);
  }, []);

  const reset = useCallback(() => {
    setGenerals(createGenerals());
    setRevealed(false);
  }, []);

  return { generals, revealed, chooseDecision, reset };
};
