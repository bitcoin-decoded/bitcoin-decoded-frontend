// The active-confirmation check (CDC §7.1 écran 4): the words typed at the quizzed
// ranks must match the mnemonic, case- and whitespace-insensitive. Returns a plain
// boolean so the screen never reveals which rank was wrong.
export const confirmationMatches = (
  mnemonic: string,
  indices: number[],
  answers: string[],
): boolean => {
  const words = mnemonic.split(" ");
  return indices.every((index, i) => (answers[i] ?? "").trim().toLowerCase() === words[index]);
};
