import { TYPICAL_TX_VBYTES } from "../data";

export const estimateOnchainFeeSats = (satPerVb: number): number =>
  Math.round(satPerVb * TYPICAL_TX_VBYTES);
