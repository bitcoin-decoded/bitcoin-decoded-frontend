/**
 * Rough virtual size of a typical donation transaction (1 input, 2 outputs,
 * native segwit) used to turn a sat/vByte fee rate into a EUR fee estimate.
 * It's deliberately an estimate — the donor's wallet computes the real fee.
 */
export const TYPICAL_TX_VBYTES = 140;
