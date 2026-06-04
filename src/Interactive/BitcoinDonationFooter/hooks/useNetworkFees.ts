import { useEffect, useState } from "react";

import { fetchNetworkFees } from "../helpers";
import type { NetworkFees } from "../types";

const CACHE_MS = 60_000;

let cachedFees: NetworkFees | null = null;

/** On-chain medium-priority fees, cached 60s. `error` lets the UI hide the fee panel. */
export const useNetworkFees = () => {
  const [fees, setFees] = useState<NetworkFees | null>(cachedFees);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cachedFees && Date.now() - cachedFees.fetchedAt < CACHE_MS) {
      setFees(cachedFees);
      return;
    }
    let alive = true;
    fetchNetworkFees()
      .then((fresh) => {
        cachedFees = fresh;
        if (alive) setFees(fresh);
      })
      .catch(() => {
        if (alive) setError(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { fees, error };
};
