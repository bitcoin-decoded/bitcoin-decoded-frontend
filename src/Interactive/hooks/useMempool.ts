import { useCallback, useState } from "react";

import type { Language } from "../../I18n";
import { BLOCK_HEADER, BLOCK_TX_IDS, REJECTED_TX_ID } from "../data";
import { getTxPool } from "../helpers";
import type { MempoolTransaction } from "../types";

export const useMempool = (language: Language) => {
  const [blockAdded, setBlockAdded] = useState(false);
  const transactions = getTxPool(language);
  const addBlock = useCallback(() => setBlockAdded(true), []);
  const reset = useCallback(() => setBlockAdded(false), []);

  return {
    transactions,
    blockHeader: BLOCK_HEADER,
    blockTxIds: BLOCK_TX_IDS,
    rejectedTxId: REJECTED_TX_ID,
    blockAdded,
    addBlock,
    reset,
  };
};

export type { MempoolTransaction };
