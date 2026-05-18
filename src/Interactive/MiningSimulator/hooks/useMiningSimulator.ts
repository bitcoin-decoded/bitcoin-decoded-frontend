import { useCallback, useState } from "react";

import { doubleSha256 } from "../../helpers";
import { BLOCK_HEADER, DIFFICULTY_PREFIX, HEADER_FIELDS } from "../data";
import type { MiningAttempt } from "../types";

export const useMiningSimulator = () => {
  const [attempts, setAttempts] = useState<MiningAttempt[]>([]);
  const [nextNonce, setNextNonce] = useState(0);
  const [found, setFound] = useState(false);

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
