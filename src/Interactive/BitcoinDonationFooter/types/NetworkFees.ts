/** On-chain fee snapshot (we surface the medium-priority tier only). */
export type NetworkFees = {
  /** mempool.space "halfHourFee" in sat / vByte. */
  halfHourFeeSatPerVb: number;
  /** Epoch ms when fetched. */
  fetchedAt: number;
};
