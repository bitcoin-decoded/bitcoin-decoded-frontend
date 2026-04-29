import { useState } from "react";

export type UtxoItem = {
  id: number;
  amount: number;
};

export const ALICE_UTXOS: readonly UtxoItem[] = [
  { id: 0, amount: 0.8 },
  { id: 1, amount: 1.0 },
  { id: 2, amount: 0.5 },
  { id: 3, amount: 2.0 },
];

const FIXED_FEE = 0.0001;
const round8 = (n: number) => Math.round(n * 1e8) / 1e8;

export const useUTXOBuilder = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [rawAmount, setRawAmount] = useState("");

  const toggle = (id: number) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const totalInput = round8(
    selectedIds.reduce((sum, id) => {
      const utxo = ALICE_UTXOS.find((u) => u.id === id);
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
    setRawAmount("");
  };

  return {
    utxos: ALICE_UTXOS,
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
