import { useCallback, useEffect, useState } from "react";

import { fetchBtcRate } from "../helpers";
import type { BtcRate } from "../types";

const CACHE_MS = 60_000;
const STALE_MS = 5 * 60_000;

// Module-level cache so the rate is shared across mounts and survives a
// modal close/reopen within the 60s window (spec §8.2).
let cachedRate: BtcRate | null = null;

/**
 * BTC/EUR rate with a 60s cache, a user-forced refresh (no blocking
 * cooldown), and an `isStale` flag once the rate is older than 5 minutes.
 */
export const useBtcRate = () => {
  const [rate, setRate] = useState<BtcRate | null>(cachedRate);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const load = useCallback(async (force: boolean) => {
    if (!force && cachedRate && Date.now() - cachedRate.fetchedAt < CACHE_MS) {
      setRate(cachedRate);
      return;
    }
    setLoading(true);
    setError(false);
    try {
      const fresh = await fetchBtcRate();
      cachedRate = fresh;
      setRate(fresh);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(false);
  }, [load]);

  // Recompute staleness over time without any user action.
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const refresh = useCallback(() => void load(true), [load]);
  const isStale = rate ? now - rate.fetchedAt > STALE_MS : false;

  return { rate, loading, error, refresh, isStale };
};
