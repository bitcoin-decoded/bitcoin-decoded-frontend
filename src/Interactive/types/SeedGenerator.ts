/** Standard BIP39 mnemonic lengths exposed by the demo. */
export type SeedLength = 12 | 24;

export type SeedData = {
  words: string[];
  /** Binary entropy (128 or 256 bits, depending on length). */
  entropy: string;
  /** Checksum bits (4 or 8). */
  checksum: string;
  /** Full mnemonic bits = entropy + checksum. */
  mnemonic: string;
};
