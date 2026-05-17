import { useCallback, useState } from "react";

import { BLOCK_HEADER, TRANSACTIONS } from "../data";

// Subvention protocolaire pour l'ère 2024–2028 (après le 4ᵉ halving)
const SUBSIDY_BTC = 3.125;

// Rounding helper - floats can produce 3.12584999... due to IEEE-754
const round = (btc: number, decimals = 8): number =>
  Math.round(btc * 10 ** decimals) / 10 ** decimals;

export const useMiningRewardBlock = () => {
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
