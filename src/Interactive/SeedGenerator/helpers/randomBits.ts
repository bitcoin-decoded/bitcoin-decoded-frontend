export const randomBits = (n: number): string => {
  let s = "";
  for (let i = 0; i < n; i++) s += Math.random() < 0.5 ? "0" : "1";
  return s;
};
