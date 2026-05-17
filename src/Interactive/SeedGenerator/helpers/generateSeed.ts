import { CHECKSUM_BITS_BY_LENGTH, ENTROPY_BITS_BY_LENGTH, SEED_WORD_POOL } from "../data/";
import type { SeedData, SeedLength } from "../types";

import { randomBits } from "./randomBits";

export const generateSeed = (length: SeedLength = 24): SeedData => {
  const words = Array.from(
    { length },
    () => SEED_WORD_POOL[Math.floor(Math.random() * SEED_WORD_POOL.length)],
  );
  const entropy = randomBits(ENTROPY_BITS_BY_LENGTH[length]);
  const checksum = randomBits(CHECKSUM_BITS_BY_LENGTH[length]);
  return { words, entropy, checksum, mnemonic: entropy + checksum };
};
