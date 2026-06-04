import type { BtcRate } from "../types";

/**
 * BTC/EUR spot rate. Primary source mempool.space (bitcoiner-native,
 * CORS-friendly, no key); falls back to Kraken. Throws only if both fail,
 * leaving the caller to degrade to a sats-only display (spec §10).
 */
export const fetchBtcRate = async (): Promise<BtcRate> => {
  try {
    const res = await fetch("https://mempool.space/api/v1/prices");
    if (res.ok) {
      const data = await res.json();
      const eur = Number(data?.EUR);
      if (eur > 0) return { eurPerBtc: eur, fetchedAt: Date.now(), source: "mempool" };
    }
  } catch {
    // fall through to Kraken
  }

  const res = await fetch("https://api.kraken.com/0/public/Ticker?pair=XBTEUR");
  if (!res.ok) throw new Error("rate unavailable");
  const data = await res.json();
  const result = data?.result;
  const pairKey = result ? Object.keys(result)[0] : undefined;
  const eur = pairKey ? Number(result[pairKey]?.c?.[0]) : NaN;
  if (eur > 0) return { eurPerBtc: eur, fetchedAt: Date.now(), source: "kraken" };
  throw new Error("rate unavailable");
};
