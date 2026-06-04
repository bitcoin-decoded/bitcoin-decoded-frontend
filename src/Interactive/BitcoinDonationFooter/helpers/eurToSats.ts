/** Convert an EUR amount to satoshis at the given BTC/EUR rate. */
export const eurToSats = (eur: number, eurPerBtc: number): number =>
  Math.round((eur / eurPerBtc) * 1e8);
