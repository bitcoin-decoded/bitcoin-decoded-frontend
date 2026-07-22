import { useCallback, useState } from "react";

import { useExplorationGate } from "../../../Design";
import type { SideState } from "../types";

type Options = {
  requiredExplored?: number;
  onComplete?: () => void;
};

const FIAT_CREATE = 0;
const FIAT_CENSOR = 1;
const BITCOIN_CREATE = 2;
const BITCOIN_CENSOR = 3;

export const useTrustComparisonDemo = ({ requiredExplored = 0, onComplete }: Options = {}) => {
  const [fiat, setFiat] = useState<SideState>({ createMoney: "idle", censorTx: "idle" });
  const [bitcoin, setBitcoin] = useState<SideState>({ createMoney: "idle", censorTx: "idle" });
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

  const fiatTrustBroken = fiat.createMoney === "success" || fiat.censorTx === "success";
  const bitcoinAttempted = bitcoin.createMoney === "failure" || bitcoin.censorTx === "failure";

  return {
    fiat,
    bitcoin,
    fiatCreateMoney,
    fiatCensorTx,
    bitcoinCreateMoney,
    bitcoinCensorTx,
    fiatTrustBroken,
    bitcoinAttempted,
    exploredCount,
  };
};
