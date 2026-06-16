import { useEffect, useRef, useState } from "react";

import { FIXED_FEE, NICOLAS_UTXOS } from "../data";
import { round8 } from "../helpers";

export const useUTXOTransactionBuilder = (lockedAmount?: string, onComplete?: () => void) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [rawAmount, setRawAmount] = useState(lockedAmount ?? "");

  const toggle = (id: number) =>
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const totalInput = round8(
    selectedIds.reduce((sum, id) => {
      const utxo = NICOLAS_UTXOS.find((u) => u.id === id);
      return sum + (utxo?.amount ?? 0);
    }, 0),
  );

  const parsedAmount = parseFloat(rawAmount) || 0;
  const fees = parsedAmount > 0 ? FIXED_FEE : 0;
  const change = round8(totalInput - parsedAmount - fees);

  const hasAmount = parsedAmount > 0;
  const hasSelection = selectedIds.length > 0;
  const isInsufficient = hasAmount && hasSelection && change < 0;
  const isValid = hasAmount && hasSelection && change >= 0;

  const reset = () => {
    setSelectedIds([]);
    setRawAmount(lockedAmount ?? "");
  };

  // Fires once the reader has built a valid transaction (the success state this
  // block is built around). One-shot — resetting never re-fires.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const firedRef = useRef(false);
  useEffect(() => {
    if (!firedRef.current && isValid) {
      firedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [isValid]);

  return {
    utxos: NICOLAS_UTXOS,
    selectedIds,
    toggle,
    totalInput,
    rawAmount,
    setRawAmount,
    parsedAmount,
    fees,
    change,
    hasAmount,
    hasSelection,
    isInsufficient,
    isValid,
    reset,
  };
};
