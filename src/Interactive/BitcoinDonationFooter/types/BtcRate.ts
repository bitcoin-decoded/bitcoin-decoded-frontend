export type BtcRate = {
  eurPerBtc: number;
  fetchedAt: number;
  source: "mempool" | "kraken";
};
