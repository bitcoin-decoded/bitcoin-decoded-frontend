import { useCallback, useState } from "react";

import type { SideState } from "../types";

export const useTrustComparisonDemo = () => {
  const [fiat, setFiat] = useState<SideState>({ createMoney: "idle", censorTx: "idle" });
  const [bitcoin, setBitcoin] = useState<SideState>({ createMoney: "idle", censorTx: "idle" });

  const fiatCreateMoney = useCallback(() => setFiat((s) => ({ ...s, createMoney: "success" })), []);
  const fiatCensorTx = useCallback(() => setFiat((s) => ({ ...s, censorTx: "success" })), []);

  const bitcoinCreateMoney = useCallback(
    () => setBitcoin((s) => ({ ...s, createMoney: "failure" })),
    [],
  );
  const bitcoinCensorTx = useCallback(() => setBitcoin((s) => ({ ...s, censorTx: "failure" })), []);

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
  };
};
