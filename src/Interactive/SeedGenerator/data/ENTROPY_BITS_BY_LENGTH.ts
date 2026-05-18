import type { SeedLength } from "../types";

export const ENTROPY_BITS_BY_LENGTH: Record<SeedLength, number> = {
  12: 128,
  24: 256,
};
