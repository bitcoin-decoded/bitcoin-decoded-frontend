const NUMERALS: readonly [number, string][] = [
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

/** Small positive integer → Roman numeral (used for the 3 module headers). */
export const toRoman = (n: number): string => {
  let out = "";
  let rest = n;
  for (const [value, symbol] of NUMERALS) {
    while (rest >= value) {
      out += symbol;
      rest -= value;
    }
  }
  return out;
};
