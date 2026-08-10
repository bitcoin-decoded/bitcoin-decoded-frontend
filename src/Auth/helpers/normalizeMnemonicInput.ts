// Tolerate the ways a reader pastes a phrase (CDC §7.3): trim the ends, collapse
// runs of whitespace to single spaces, lowercase. The BIP39 wordlist is lowercase
// English, so this never changes a valid phrase, only cleans a sloppy paste.
export const normalizeMnemonicInput = (raw: string): string =>
  raw.trim().replace(/\s+/g, " ").toLowerCase();
