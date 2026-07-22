import { useCallback, useEffect, useRef, useState } from "react";

import type { Language } from "../../../I18n";
import { BLOCK_HEADER, BLOCK_TX_IDS, REJECTED_TX_ID } from "../data";
import { getTxPool } from "../helpers";

export const useMempoolVisual = (language: Language, onComplete?: () => void) => {
  const [blockAdded, setBlockAdded] = useState(false);
  const transactions = getTxPool(language);
  const addBlock = useCallback(() => setBlockAdded(true), []);
  const reset = useCallback(() => setBlockAdded(false), []);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const firedRef = useRef(false);
  useEffect(() => {
    if (!firedRef.current && blockAdded) {
      firedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [blockAdded]);

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
