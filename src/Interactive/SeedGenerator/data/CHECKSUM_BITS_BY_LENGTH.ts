import type { SeedLength } from "../types";

export const CHECKSUM_BITS_BY_LENGTH: Record<SeedLength, number> = {
  12: 4,
  24: 8,
};
