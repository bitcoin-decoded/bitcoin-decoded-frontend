import { entropyToMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";

// 128 bits of entropy from the CSPRNG only (never Math.random) → 12 English
// words (CDC §4.1).
export const generateMnemonic = (): string =>
  entropyToMnemonic(crypto.getRandomValues(new Uint8Array(16)), wordlist);
