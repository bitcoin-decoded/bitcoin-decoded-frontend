import { useState } from "react";

import { INITIAL_PRIVATE_KEY, INVALID_SIGNATURE, PUBLIC_KEY, VALID_SIGNATURE } from "../data";
import type { VerifyStatus } from "../types";

export const useSignaturePlayground = () => {
  const [privateKey, setPrivateKey] = useState(INITIAL_PRIVATE_KEY);
  const [signature, setSignature] = useState<string | null>(null);
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>("idle");

  const isOriginalKey = privateKey === INITIAL_PRIVATE_KEY;
  const hasSignature = signature !== null;

  // Editing the key invalidates downstream artifacts
  const updatePrivateKey = (next: string) => {
    setPrivateKey(next);
    setSignature(null);
    setVerifyStatus("idle");
  };

  const sign = () => {
    setSignature(isOriginalKey ? VALID_SIGNATURE : INVALID_SIGNATURE);
    setVerifyStatus("idle");
  };

  const verify = () => {
    if (!hasSignature) return;
    setVerifyStatus(isOriginalKey ? "accepted" : "rejected");
  };

  const reset = () => {
    setPrivateKey(INITIAL_PRIVATE_KEY);
    setSignature(null);
    setVerifyStatus("idle");
  };

  return {
    privateKey,
    publicKey: PUBLIC_KEY,
    signature,
    verifyStatus,
    isOriginalKey,
    hasSignature,
    updatePrivateKey,
    sign,
    verify,
    reset,
  };
};
