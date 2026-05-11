import { useState, useCallback } from "react";

export type MiningRewardTx = {
  id: number;
  from: string;
  to: string;
  amount: number; // BTC
  fee: number; // BTC
};

export type MiningRewardBlockHeader = {
  height: number;
  prevHash: string;
  merkleRoot: string;
  timestamp: string;
  nonce: string;
};

const BLOCK_HEADER: MiningRewardBlockHeader = {
  height: 1_050_000,
  prevHash: "00000def…a9c3",
  merkleRoot: "a4e92c11…7d1b",
  timestamp: "2026",
  nonce: "18734",
};

const TRANSACTIONS: readonly MiningRewardTx[] = [
  { id: 1, from: "Marc", to: "Léa", amount: 0.5, fee: 0.00012 },
  { id: 2, from: "Alice", to: "Bob", amount: 1.2, fee: 0.00025 },
  { id: 3, from: "Carlos", to: "Diana", amount: 0.08, fee: 0.00008 },
  { id: 4, from: "Éric", to: "Fatima", amount: 3.0, fee: 0.0004 },
];

// Subvention protocolaire pour l'ère 2024–2028 (après le 4ᵉ halving)
const SUBSIDY_BTC = 3.125;

// Rounding helper - floats can produce 3.12584999... due to IEEE-754
const round = (btc: number, decimals = 8): number =>
  Math.round(btc * 10 ** decimals) / 10 ** decimals;

export const useMiningReward = () => {
  const [rewarded, setRewarded] = useState(false);

  const totalFees = round(TRANSACTIONS.reduce((sum, tx) => sum + tx.fee, 0));
  const totalReward = round(SUBSIDY_BTC + totalFees);
  const minerBalance = rewarded ? totalReward : 0;

  const reward = useCallback(() => setRewarded(true), []);
  const reset = useCallback(() => setRewarded(false), []);

  return {
    blockHeader: BLOCK_HEADER,
    transactions: TRANSACTIONS,
    subsidy: SUBSIDY_BTC,
    totalFees,
    totalReward,
    minerBalance,
    rewarded,
    reward,
    reset,
  };
};
