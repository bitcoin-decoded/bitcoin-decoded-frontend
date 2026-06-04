/** Render a BTC amount with up to 8 decimals, trailing zeros trimmed. */
export const formatBtc = (btc: number): string => btc.toFixed(8).replace(/\.?0+$/, "");
