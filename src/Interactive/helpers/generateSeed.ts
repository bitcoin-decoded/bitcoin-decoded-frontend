import { SEED_WORD_POOL } from "../data/SEED_WORD_POOL";
import type { SeedData, SeedLength } from "../types";

const ENTROPY_BITS_BY_LENGTH: Record<SeedLength, number> = {
  12: 128,
  24: 256,
};

const CHECKSUM_BITS_BY_LENGTH: Record<SeedLength, number> = {
  12: 4,
  24: 8,
};

const randomBits = (n: number): string => {
  let s = "";
  for (let i = 0; i < n; i++) s += Math.random() < 0.5 ? "0" : "1";
  return s;
};

/**
 * Build a fictional BIP39-shaped seed: random words from the pool plus
 * random binary entropy/checksum. Lengths follow the BIP39 standard
 * (12 words = 128+4 bits, 24 words = 256+8 bits).
 */
export const generateSeed = (length: SeedLength = 24): SeedData => {
  const words = Array.from(
    { length },
    () => SEED_WORD_POOL[Math.floor(Math.random() * SEED_WORD_POOL.length)],
  );
  const entropy = randomBits(ENTROPY_BITS_BY_LENGTH[length]);
  const checksum = randomBits(CHECKSUM_BITS_BY_LENGTH[length]);
  return { words, entropy, checksum, mnemonic: entropy + checksum };
};
