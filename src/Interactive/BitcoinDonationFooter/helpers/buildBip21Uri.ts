/** BIP21 payment URI: `bitcoin:{address}?amount={btc}` (amount in BTC). */
export const buildBip21Uri = (address: string, btc: number): string =>
  `bitcoin:${address}?amount=${btc.toFixed(8)}`;
