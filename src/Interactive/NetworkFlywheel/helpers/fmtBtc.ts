export const fmtBtc = (v: number, decimals = 3): string =>
  `${parseFloat(v.toFixed(decimals))} BTC`;
