import { useEffect, useState } from "react";

import { sha256 } from "../../helpers";
import { doubleSha256 } from "../../helpers";
import { BLOCKS_SEED } from "../data";
import type { BlockData } from "../types";

export const useBlockchainChainVisual = (): BlockData[] => {
  const [blocks, setBlocks] = useState<BlockData[]>([]);

  useEffect(() => {
    const compute = async () => {
      const result: BlockData[] = [];
      let prevHash = "0000000000000000000000000000000000000000000000000000000000a3f7c1";

      for (const seed of BLOCKS_SEED) {
        const tx1Hash = await sha256(seed.tx1);
        const tx2Hash = await sha256(seed.tx2);
        const merkleRoot = await sha256(tx1Hash + tx2Hash);

        const header = `${prevHash}|${merkleRoot}|${seed.timestamp}|${seed.nonce}`;
        const headerHash = await doubleSha256(header);

        result.push({
          number: seed.number,
          prevHash,
          merkleRoot,
          headerHash,
          tx1: seed.tx1,
          tx2: seed.tx2,
          nonce: seed.nonce,
          timestamp: seed.timestamp,
        });
        prevHash = headerHash;
      }

      setBlocks(result);
    };

    compute();
  }, []);

  return blocks;
};
