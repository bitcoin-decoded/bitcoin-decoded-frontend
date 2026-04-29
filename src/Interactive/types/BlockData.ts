export type BlockData = {
  number: number;
  prevHash: string;
  merkleRoot: string;
  headerHash: string;
  tx1: string;
  tx2: string;
  nonce: number;
  timestamp: string;
};

export type BlockSeed = {
  number: number;
  tx1: string;
  tx2: string;
  nonce: number;
  timestamp: string;
};

export type BlockField = {
  icon: React.FC<{ size: number; strokeWidth: number }>;
  labelFr: string;
  labelEn: string;
  valueFr: string;
  valueEn: string;
};
