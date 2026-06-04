/** Convert satoshis to EUR at the given BTC/EUR rate (used for fee display). */
export const satsToEur = (sats: number, eurPerBtc: number): number => (sats / 1e8) * eurPerBtc;
