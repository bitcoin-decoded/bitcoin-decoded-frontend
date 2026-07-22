export const eurToSats = (eur: number, eurPerBtc: number): number =>
  Math.round((eur / eurPerBtc) * 1e8);
