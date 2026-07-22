export type BlockData = {
  number: number;
  prevHash: string;
  merkleRoot: string;
  headerHash: string;
  tx: string;
  nonce: number;
  timestamp: string;
  isEdited: boolean;
  originalMerkleRoot: string;
  originalHeaderHash: string;
};
