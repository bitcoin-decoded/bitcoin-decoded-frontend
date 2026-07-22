import { useCallback, useEffect, useState } from "react";

import { fetchBtcRate } from "../helpers";
import type { BtcRate } from "../types";

const CACHE_MS = 60_000;
const STALE_MS = 5 * 60_000;

let cachedRate: BtcRate | null = null;

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

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const refresh = useCallback(() => void load(true), [load]);
  const isStale = rate ? now - rate.fetchedAt > STALE_MS : false;

  return { rate, loading, error, refresh, isStale };
};
