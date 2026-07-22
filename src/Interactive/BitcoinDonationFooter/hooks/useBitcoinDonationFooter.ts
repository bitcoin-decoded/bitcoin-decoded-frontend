import { useCallback, useState } from "react";

import type { DonationStep } from "../types";

export const useBitcoinDonationFooter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<DonationStep>("amount");
  const [amountEur, setAmountEur] = useState<number | null>(null);

  const reset = useCallback(() => {
    setStep("amount");
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

  const setAmount = useCallback((eur: number | null) => setAmountEur(eur), []);

  const proceedFromAmount = useCallback(() => setStep("onchain-address"), []);

  const goToNoWallet = useCallback(() => setStep("no-wallet"), []);

  const confirmSent = useCallback(() => setStep("thank-you"), []);

  const back = useCallback(() => setStep("amount"), []);

  return {
    isOpen,
    step,
    amountEur,
    open,
    close,
    reset,
    setAmount,
    proceedFromAmount,
    goToNoWallet,
    confirmSent,
    back,
  };
};
