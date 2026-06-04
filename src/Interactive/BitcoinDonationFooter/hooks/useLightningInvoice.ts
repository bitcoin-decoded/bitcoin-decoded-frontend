import { useCallback, useEffect, useState } from "react";

import { resolveLightningInvoice } from "../helpers";
import type { LightningInvoice } from "../types";

/**
 * Resolves a BOLT11 invoice for `amountSats` from the Lightning Address when
 * `enabled`. On failure, `error` is set and the caller shows the static
 * Lightning-Address fallback (spec §4.3). `retry` re-attempts.
 */
export const useLightningInvoice = (
  lightningAddress: string,
  amountSats: number,
  enabled: boolean,
) => {
  const [invoice, setInvoice] = useState<LightningInvoice | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!enabled || amountSats <= 0) return;
    let alive = true;
    setLoading(true);
    setError(false);
    setInvoice(null);
    resolveLightningInvoice(lightningAddress, amountSats)
      .then((inv) => {
        if (alive) setInvoice(inv);
      })
      .catch(() => {
        if (alive) setError(true);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [lightningAddress, amountSats, enabled, attempt]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  return { invoice, loading, error, retry };
};
