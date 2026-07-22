export const buildBip21Uri = (address: string, btc: number): string =>
  `bitcoin:${address}?amount=${btc.toFixed(8)}`;
