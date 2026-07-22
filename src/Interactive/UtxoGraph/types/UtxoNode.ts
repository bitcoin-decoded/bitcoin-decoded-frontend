export type UtxoNode = {
  id: string;
  amount: number;
  kind?: "recipient" | "change";
};
