import { TX_TEMPLATES } from "../data";
import type { BlockSeed } from "../types";

export const buildNextSeed = (lastNumber: number, slot: number): BlockSeed => ({
  number: lastNumber + 1,
  tx: TX_TEMPLATES[slot % TX_TEMPLATES.length],
  nonce: Math.floor(100_000 + Math.random() * 9_900_000),
  timestamp: new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC",
});
