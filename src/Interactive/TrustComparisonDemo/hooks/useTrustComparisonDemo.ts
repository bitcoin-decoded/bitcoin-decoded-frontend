import { useCallback, useState } from "react";

import { useExplorationGate } from "../../../Design";
import type { SideState } from "../types";

type Options = {
  requiredExplored?: number;
  onComplete?: () => void;
};

const IDLE: SideState = { createMoney: "idle", censorTx: "idle" };

const FIAT_CREATE = 0;
const FIAT_CENSOR = 1;
const BITCOIN_CREATE = 2;
const BITCOIN_CENSOR = 3;

export const useTrustComparisonDemo = ({ requiredExplored = 0, onComplete }: Options = {}) => {
  const [fiat, setFiat] = useState<SideState>(IDLE);
  const [bitcoin, setBitcoin] = useState<SideState>(IDLE);
  const { exploredCount, markExplored } = useExplorationGate({
    threshold: requiredExplored,
    onComplete,
  });

  const fiatCreateMoney = useCallback(() => {
    setFiat((s) => ({ ...s, createMoney: "success" }));
    markExplored(FIAT_CREATE);
  }, [markExplored]);
  const fiatCensorTx = useCallback(() => {
    setFiat((s) => ({ ...s, censorTx: "success" }));
    markExplored(FIAT_CENSOR);
  }, [markExplored]);

  const bitcoinCreateMoney = useCallback(() => {
    setBitcoin((s) => ({ ...s, createMoney: "failure" }));
    markExplored(BITCOIN_CREATE);
  }, [markExplored]);
  const bitcoinCensorTx = useCallback(() => {
    setBitcoin((s) => ({ ...s, censorTx: "failure" }));
    markExplored(BITCOIN_CENSOR);
  }, [markExplored]);

  // Only the buttons go back to idle. What has been explored stays explored, so
  // a reader who resets does not lose a gate they had already opened.
  const reset = useCallback(() => {
    setFiat(IDLE);
    setBitcoin(IDLE);
  }, []);

  const fiatTrustBroken = fiat.createMoney === "success" || fiat.censorTx === "success";
  const bitcoinAttempted = bitcoin.createMoney === "failure" || bitcoin.censorTx === "failure";
  const hasActed = fiatTrustBroken || bitcoinAttempted;

  return {
    fiat,
    bitcoin,
    fiatCreateMoney,
    fiatCensorTx,
    bitcoinCreateMoney,
    bitcoinCensorTx,
    fiatTrustBroken,
    bitcoinAttempted,
    hasActed,
    reset,
    exploredCount,
  };
};
