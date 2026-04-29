import { useCallback, useState } from "react";

import { generateWalletSession } from "../helpers";
import type { WalletGameStage, WalletGameVerdict } from "../types";

const sanitizeAmount = (raw: string): string => {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  const firstDot = cleaned.indexOf(".");
  if (firstDot === -1) return cleaned;
  return cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, "");
};

// 2-decimal amounts → tolerate 1 cent for parsing rounding ("0.30" vs 0.3000000004)
const AMOUNT_TOLERANCE = 0.005;

export const useWalletDiscoveryGame = () => {
  const [session, setSession] = useState(generateWalletSession);
  const [stage, setStage] = useState<WalletGameStage>("idle");
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [amountInput, setAmountInput] = useState("");
  const [verdict, setVerdict] = useState<WalletGameVerdict>(null);

  // Once the correct answer is found, the UI is frozen until the user
  // explicitly restarts. Prevents accidentally undoing the success state.
  const isLocked = verdict === "correct";

  const reveal = useCallback(() => setStage("revealed"), []);

  const selectCard = useCallback(
    (id: number) => {
      if (isLocked) return;
      setSelectedCardId(id);
      // Picking again resets any previous verdict so the user can re-validate
      setVerdict(null);
      setStage((prev) => (prev === "validated" ? "revealed" : prev));
    },
    [isLocked],
  );

  const updateAmount = useCallback(
    (next: string) => {
      if (isLocked) return;
      setAmountInput(sanitizeAmount(next));
      setVerdict(null);
      setStage((prev) => (prev === "validated" ? "revealed" : prev));
    },
    [isLocked],
  );

  const validate = useCallback(() => {
    if (isLocked) return;
    if (selectedCardId === null || amountInput.trim() === "") return;
    const userAmount = parseFloat(amountInput);
    if (Number.isNaN(userAmount)) return;

    const correctCard = selectedCardId === session.fundedCardId;
    const correctAmount = Math.abs(userAmount - session.totalAmount) < AMOUNT_TOLERANCE;
    setVerdict(correctCard && correctAmount ? "correct" : "incorrect");
    setStage("validated");
  }, [isLocked, selectedCardId, amountInput, session]);

  const restart = useCallback(() => {
    setSession(generateWalletSession());
    setStage("idle");
    setSelectedCardId(null);
    setAmountInput("");
    setVerdict(null);
  }, []);

  return {
    stage,
    cards: session.cards,
    fundedCardId: session.fundedCardId,
    totalAmount: session.totalAmount,
    selectedCardId,
    amountInput,
    verdict,
    isLocked,
    reveal,
    selectCard,
    updateAmount,
    validate,
    restart,
  };
};
