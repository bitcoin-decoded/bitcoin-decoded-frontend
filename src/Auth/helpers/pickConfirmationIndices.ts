// Pick 3 distinct word ranks (0-11) to quiz at confirmation (CDC §7.1 écran 4),
// drawn from the CSPRNG. Rejection sampling above 252 (= 21×12) keeps the choice
// uniform; the result is sorted so the prompts read in the natural order.
export const pickConfirmationIndices = (): number[] => {
  const chosen = new Set<number>();
  const byte = new Uint8Array(1);
  while (chosen.size < 3) {
    crypto.getRandomValues(byte);
    if (byte[0] < 252) chosen.add(byte[0] % 12);
  }
  return [...chosen].sort((a, b) => a - b);
};
