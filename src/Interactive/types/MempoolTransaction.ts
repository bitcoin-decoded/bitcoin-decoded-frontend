export type MempoolTransaction = {
  id: number;
  from: string;
  to: string;
  amount: string;
  conflictGroup?: number;
};
