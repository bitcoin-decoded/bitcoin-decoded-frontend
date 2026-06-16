import { useCallback, useEffect, useRef, useState } from "react";

import { doubleSha256 } from "../../helpers";
import { BLOCK_HEADER, DIFFICULTY_PREFIX, HEADER_FIELDS } from "../data";
import type { MiningAttempt } from "../types";

export const useMiningSimulator = (onComplete?: () => void) => {
  const [attempts, setAttempts] = useState<MiningAttempt[]>([]);
  const [nextNonce, setNextNonce] = useState(0);
  const [found, setFound] = useState(false);

  // Fires once the reader has tried at least one nonce (the action this block
  // is built around). One-shot — resetting and retrying never re-fires.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const firedRef = useRef(false);
  useEffect(() => {
    if (!firedRef.current && attempts.length > 0) {
      firedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [attempts.length]);

  const tryNonce = useCallback(async () => {
    if (found) return;
    const nonce = nextNonce;
    const hash = await doubleSha256(`${BLOCK_HEADER}|nonce:${nonce}`);
    const valid = hash.startsWith(DIFFICULTY_PREFIX);

    setAttempts((prev) => [...prev, { nonce, hash, valid }]);
    setNextNonce(nonce + 1);
    if (valid) setFound(true);
  }, [nextNonce, found]);

  const reset = useCallback(() => {
    setAttempts([]);
    setNextNonce(0);
    setFound(false);
  }, []);

  return {
    attempts,
    found,
    difficultyPrefix: DIFFICULTY_PREFIX,
    headerFields: HEADER_FIELDS,
    currentNonce: nextNonce,
    tryNonce,
    reset,
  };
};
