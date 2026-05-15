export const fmtBtc = (v: number, decimals = 3): string =>
  // Évite l'affichage d'IEEE-754 (0.7 → "0.6999999...") tout en gardant
  // un nombre de décimales utile pour les revenus mineurs (3.205, 4.625).
  `${parseFloat(v.toFixed(decimals))} BTC`;
