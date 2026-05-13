import { useState } from "react";

import { BITCOIN_REFERENCE_VALUES } from "../data";

export type UtxoItem = {
  id: number;
  amount: number;
};

export const NICOLAS_UTXOS: readonly UtxoItem[] = [
  { id: 0, amount: 0.8 },
  { id: 1, amount: 1.0 },
  { id: 2, amount: 0.5 },
  { id: 3, amount: 2.0 },
];

const round8 = (n: number) => Math.round(n * 1e8) / 1e8;
const round5 = (n: number) => Math.round(n * 1e5) / 1e5;

// [PÉDAGOGIQUE] Frais arrondis à 5 décimales (~3 000 sats) pour que
// le calcul "input − montant − frais = change" reste simple à suivre
// à l'œil. Ordre de grandeur cohérent avec le référentiel partagé
// (`AVERAGE_TX_FEE_BTC` ≈ 2 667 sats, dérivé de la médiane mempool.space).
// Auto-suit le référentiel : si AVERAGE_TX_FEE_BTC évolue, FIXED_FEE
// arrondit à la nouvelle valeur dans la même classe d'ordres de grandeur.
const FIXED_FEE = round5(BITCOIN_REFERENCE_VALUES.AVERAGE_TX_FEE_BTC);

export const useUTXOBuilder = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [rawAmount, setRawAmount] = useState("");

  const toggle = (id: number) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

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
    setRawAmount("");
  };

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
