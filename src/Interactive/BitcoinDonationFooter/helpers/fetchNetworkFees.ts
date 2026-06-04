import type { NetworkFees } from "../types";

/**
 * On-chain recommended fees from mempool.space. We surface only the
 * medium-priority "halfHourFee" tier (spec §9.2); the donor's wallet picks
 * the actual fee. Throws on failure so the caller can hide the fee panel.
 */
export const fetchNetworkFees = async (): Promise<NetworkFees> => {
  const res = await fetch("https://mempool.space/api/v1/fees/recommended");
  if (!res.ok) throw new Error("fees unavailable");
  const data = await res.json();
  const half = Number(data?.halfHourFee);
  if (half > 0) return { halfHourFeeSatPerVb: half, fetchedAt: Date.now() };
  throw new Error("fees unavailable");
};
