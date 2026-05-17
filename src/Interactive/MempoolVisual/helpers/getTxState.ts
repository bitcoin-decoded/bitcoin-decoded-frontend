import type { MempoolTransaction, TxState } from "../types";

export const getTxState = (
  tx: MempoolTransaction,
  isResolution: boolean,
  blockAdded: boolean,
  rejectedTxId: number,
): TxState => {
  if (!isResolution || !blockAdded) return tx.conflictGroup ? "conflict" : "normal";
  if (tx.id === rejectedTxId) return "rejected";
  return "normal";
};
