import { BLOCKS_SEED, GENESIS_PREV_HASH } from "../data";
import type { BlockData } from "../types";

import { computeBlock } from "./computeBlock";

export const buildInitialChain = async (): Promise<BlockData[]> => {
  const chain: BlockData[] = [];
  let prevHash = GENESIS_PREV_HASH;
  for (const seed of BLOCKS_SEED) {
    const block = await computeBlock(seed, prevHash);
    chain.push(block);
    prevHash = block.headerHash;
  }
  return chain;
};
