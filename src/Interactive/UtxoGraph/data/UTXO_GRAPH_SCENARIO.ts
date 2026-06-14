import type { UtxoNode } from "../types";

/**
 * A single transaction, language-neutral. The two inputs are consumed and two
 * new outputs (recipient + change) are recreated — 0.8 + 1 → 1.3 + 0.4999
 * (the remaining 0.0001 is the implicit miner fee, mirroring FIXED_FEE).
 */
export const UTXO_GRAPH_SCENARIO: { inputs: UtxoNode[]; outputs: UtxoNode[] } = {
  inputs: [
    { id: "in-1", amount: 0.8 },
    { id: "in-2", amount: 1.0 },
  ],
  outputs: [
    { id: "out-1", amount: 1.3, kind: "recipient" },
    { id: "out-2", amount: 0.4999, kind: "change" },
  ],
};
