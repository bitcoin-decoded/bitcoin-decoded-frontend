import { doubleSha256, sha256 } from "../../helpers";
import type { BlockData, BlockSeed } from "../types";

export const computeBlock = async (
  seed: BlockSeed,
  prevHash: string,
): Promise<BlockData> => {
  const merkleRoot = await sha256(await sha256(seed.tx));
  const header = `${prevHash}|${merkleRoot}|${seed.timestamp}|${seed.nonce}`;
  const headerHash = await doubleSha256(header);
  return {
    number: seed.number,
    prevHash,
    merkleRoot,
    headerHash,
    tx: seed.tx,
    nonce: seed.nonce,
    timestamp: seed.timestamp,
    isEdited: false,
    originalMerkleRoot: merkleRoot,
    originalHeaderHash: headerHash,
  };
};
