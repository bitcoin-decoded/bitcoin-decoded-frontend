/** Convert an EUR amount to BTC at the given BTC/EUR rate. */
export const eurToBtc = (eur: number, eurPerBtc: number): number => eur / eurPerBtc;
