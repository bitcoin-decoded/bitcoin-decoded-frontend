import { useCallback, useEffect, useRef, useState } from "react";

import { BLOCK_HEADER, TRANSACTIONS } from "../data";

// Subvention protocolaire pour l'ère 2024–2028 (après le 4ᵉ halving)
const SUBSIDY_BTC = 3.125;

// Rounding helper - floats can produce 3.12584999... due to IEEE-754
const round = (btc: number, decimals = 8): number =>
  Math.round(btc * 10 ** decimals) / 10 ** decimals;

export const useMiningRewardBlock = (onComplete?: () => void) => {
  const [rewarded, setRewarded] = useState(false);

  const totalFees = round(TRANSACTIONS.reduce((sum, tx) => sum + tx.fee, 0));
  const totalReward = round(SUBSIDY_BTC + totalFees);
  const minerBalance = rewarded ? totalReward : 0;

  const reward = useCallback(() => setRewarded(true), []);
  const reset = useCallback(() => setRewarded(false), []);

  // Fires once the reader has rewarded the miner (the action this block is
  // built around). One-shot - resetting never re-fires.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const firedRef = useRef(false);
  useEffect(() => {
    if (!firedRef.current && rewarded) {
      firedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [rewarded]);

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
