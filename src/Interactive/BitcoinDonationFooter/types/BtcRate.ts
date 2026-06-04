/** A fetched BTC/EUR spot rate, with provenance and timestamp for staleness. */
export type BtcRate = {
  /** Euros per 1 BTC. */
  eurPerBtc: number;
  /** Epoch ms when this rate was fetched. */
  fetchedAt: number;
  /** Which provider answered. */
  source: "mempool" | "kraken";
};
