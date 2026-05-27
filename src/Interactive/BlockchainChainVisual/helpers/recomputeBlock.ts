import { doubleSha256, sha256 } from "../../helpers";
import type { BlockData } from "../types";

export const recomputeBlock = async (block: BlockData, tx: string): Promise<BlockData> => {
  const merkleRoot = await sha256(await sha256(tx));
  const header = `${block.prevHash}|${merkleRoot}|${block.timestamp}|${block.nonce}`;
  const headerHash = await doubleSha256(header);
  return { ...block, tx, merkleRoot, headerHash, isEdited: true };
};
