import { useState, useCallback } from "react";
import type { Language } from "../../I18n";

type MempoolTransaction = {
  id: number;
  from: string;
  to: string;
  amount: string;
  conflictGroup?: number;
};

type BlockHeader = {
  height: number;
  prevHash: string;
  merkleRoot: string;
  nonce: string;
};

const BLOCK_HEADER: BlockHeader = {
  height: 847,
  prevHash: "00000abc…e4f2",
  merkleRoot: "7f83b165…4c9b",
  nonce: "42817",
};

// Transactions incluses dans le bloc proposé par le mineur
const BLOCK_TX_IDS: readonly number[] = [1, 2, 3, 4];
// Transaction en conflit NON incluse dans le bloc (sera invalidée après minage)
const REJECTED_TX_ID = 5;
// tx #6 est volontairement laissée dans la mempool (non minée)

const getTxPool = (language: Language): MempoolTransaction[] => {
  const fr = language === "fr";
  return [
    { id: 1, from: "Marc", to: fr ? "Léa" : "Lea", amount: "0.5 BTC" },
    { id: 2, from: "Carlos", to: "Diana", amount: "0.12 BTC" },
    { id: 3, from: "Alice", to: "Bob", amount: "1 BTC", conflictGroup: 1 },
    { id: 4, from: fr ? "Éric" : "Eric", to: "Fatima", amount: "0.03 BTC" },
    { id: 5, from: "Alice", to: "Charlie", amount: "1 BTC", conflictGroup: 1 },
    { id: 6, from: "Grace", to: "Hiro", amount: "2.4 BTC" },
  ];
};

export const useMempool = (language: Language) => {
  const [blockAdded, setBlockAdded] = useState(false);
  const transactions = getTxPool(language);
  const addBlock = useCallback(() => setBlockAdded(true), []);
  const reset = useCallback(() => setBlockAdded(false), []);

  return {
    transactions,
    blockHeader: BLOCK_HEADER,
    blockTxIds: BLOCK_TX_IDS,
    rejectedTxId: REJECTED_TX_ID,
    blockAdded,
    addBlock,
    reset,
  };
};

export type { MempoolTransaction };
