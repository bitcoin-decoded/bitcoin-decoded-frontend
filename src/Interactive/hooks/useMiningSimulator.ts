import { useState, useCallback } from "react";
import { doubleSha256 } from "../helpers";

const DIFFICULTY_PREFIX = "0000";

const HEADER_FIELDS = {
  prevHash: "00000abc…e4f2",
  merkleRoot: "7f83b165…4c9b",
  timestamp: "2024-01-15T14:32:07Z",
} as const;

const BLOCK_HEADER = `prevHash:${HEADER_FIELDS.prevHash}|merkle:${HEADER_FIELDS.merkleRoot}|timestamp:${HEADER_FIELDS.timestamp}`;

type MiningAttempt = {
  nonce: number;
  hash: string;
  valid: boolean;
};

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

  return { attempts, found, difficultyPrefix: DIFFICULTY_PREFIX, headerFields: HEADER_FIELDS, currentNonce: nextNonce, tryNonce, reset };
};
