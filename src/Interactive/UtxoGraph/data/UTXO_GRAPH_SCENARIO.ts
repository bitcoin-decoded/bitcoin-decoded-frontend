import type { UtxoNode } from "../types";

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
