/** One coin (UTXO) in the graph. `kind` only applies to a transaction's outputs. */
export type UtxoNode = {
  id: string;
  amount: number;
  kind?: "recipient" | "change";
};
