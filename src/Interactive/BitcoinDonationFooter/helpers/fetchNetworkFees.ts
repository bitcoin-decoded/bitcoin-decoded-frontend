import type { NetworkFees } from "../types";

export const fetchNetworkFees = async (): Promise<NetworkFees> => {
  const res = await fetch("https://mempool.space/api/v1/fees/recommended");
  if (!res.ok) throw new Error("fees unavailable");
  const data = await res.json();
  const half = Number(data?.halfHourFee);
  if (half > 0) return { halfHourFeeSatPerVb: half, fetchedAt: Date.now() };
  throw new Error("fees unavailable");
};
