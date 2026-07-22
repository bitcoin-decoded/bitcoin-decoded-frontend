export const formatBtc = (btc: number): string => btc.toFixed(8).replace(/\.?0+$/, "");
