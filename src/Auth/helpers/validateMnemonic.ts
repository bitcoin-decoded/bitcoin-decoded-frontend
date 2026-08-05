import { validateMnemonic as checkMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";

// Tolerant of extra spaces and casing (CDC §7.3); the BIP39 checksum is verified
// on the normalized form.
export const validateMnemonic = (mnemonic: string): boolean =>
  checkMnemonic(mnemonic.trim().toLowerCase().replace(/\s+/g, " "), wordlist);
