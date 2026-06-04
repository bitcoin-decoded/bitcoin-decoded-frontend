import { useCallback, useState } from "react";

import type { DonationGate, DonationStep } from "../types";

/**
 * The donation journey state machine: which screen we're on, the chosen gate,
 * and the chosen EUR amount, plus the transitions between screens. Shared by
 * both the footer-modal and inline display modes.
 */
export const useBitcoinDonationFooter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<DonationStep>("gate");
  const [gate, setGate] = useState<DonationGate | null>(null);
  const [amountEur, setAmountEur] = useState<number | null>(null);

  const reset = useCallback(() => {
    setStep("gate");
    setGate(null);
    setAmountEur(null);
  }, []);

  const open = useCallback(() => {
    reset();
    setIsOpen(true);
  }, [reset]);

  const close = useCallback(() => {
    setIsOpen(false);
    reset();
  }, [reset]);

  const selectGate = useCallback((next: DonationGate) => {
    setGate(next);
    setStep(next === "no-wallet" ? "no-wallet" : "amount");
  }, []);

  const setAmount = useCallback((eur: number | null) => setAmountEur(eur), []);

  const proceedFromAmount = useCallback(() => {
    setStep(gate === "onchain" ? "onchain-address" : "lightning-invoice");
  }, [gate]);

  const switchToLightning = useCallback(() => {
    setGate("lightning");
    setStep("amount");
  }, []);

  const confirmPaid = useCallback(() => setStep("thank-you"), []);

  const back = useCallback(() => {
    setStep((current) => {
      switch (current) {
        case "amount":
        case "no-wallet":
          return "gate";
        case "lightning-invoice":
        case "onchain-address":
          return "amount";
        default:
          return current;
      }
    });
  }, []);

  return {
    isOpen,
    step,
    gate,
    amountEur,
    open,
    close,
    reset,
    selectGate,
    setAmount,
    proceedFromAmount,
    switchToLightning,
    confirmPaid,
    back,
  };
};
