import { useCallback, useEffect, useRef, useState } from "react";

import { AMOUNT_TOLERANCE } from "../data";
import { generateWalletSession, sanitizeAmount } from "../helpers";
import type { WalletGameStage, WalletGameVerdict } from "../types";

export const useWalletDiscoveryGame = (onComplete?: () => void) => {
  const [session, setSession] = useState(generateWalletSession);
  const [stage, setStage] = useState<WalletGameStage>("idle");
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [amountInput, setAmountInput] = useState("");
  const [verdict, setVerdict] = useState<WalletGameVerdict>(null);
  const isLocked = verdict === "correct";

  // Fires once the reader has solved the challenge (the action this block is
  // built around). One-shot.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const firedRef = useRef(false);
  useEffect(() => {
    if (!firedRef.current && verdict === "correct") {
      firedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [verdict]);

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
