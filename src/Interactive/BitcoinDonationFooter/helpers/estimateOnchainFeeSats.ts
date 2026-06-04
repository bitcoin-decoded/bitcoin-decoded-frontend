import { TYPICAL_TX_VBYTES } from "../data";

/** Estimated on-chain fee (sats) for a typical tx at the given sat/vByte rate. */
export const estimateOnchainFeeSats = (satPerVb: number): number =>
  Math.round(satPerVb * TYPICAL_TX_VBYTES);
