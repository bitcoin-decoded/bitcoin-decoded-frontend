export type BlockData = {
  number: number;
  prevHash: string;
  merkleRoot: string;
  headerHash: string;
  tx: string;
  nonce: number;
  timestamp: string;
  isEdited: boolean;
  /** Original Merkle root computed from the seed tx, never updated after edit. */
  originalMerkleRoot: string;
  /** Original block hash computed from the seed header, never updated after edit. */
  originalHeaderHash: string;
};
