import { useState } from "react";

// Visible "data" the user sees. Keys/signatures are language-agnostic hex
// strings so they live here. The human-readable message is i18n-driven and
// looked up at the component level via t("signaturePlayground.message").
export const INITIAL_PRIVATE_KEY = "L4mX9pQ2zV7nK3rT8yH1sF6dJ5aW0cB";
export const PUBLIC_KEY = "02b7a4c1e8f31c9d7a6f4b2c9e1d8a7f3b5c";
export const VALID_SIGNATURE = "3045022100a9f3b1d2e4c6...8a7f3b5c8e7";
export const INVALID_SIGNATURE = "30440220ff19c4ba7d3e...c1f0a912ab";

export type VerifyStatus = "idle" | "accepted" | "rejected";

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
