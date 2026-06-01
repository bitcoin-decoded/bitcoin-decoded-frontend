import { useState } from "react";

import { INITIAL_PRIVATE_KEY, INVALID_SIGNATURE, PUBLIC_KEY, VALID_SIGNATURE } from "../data";
import type { VerifyStatus } from "../types";

/**
 * Guided three-step flow that builds the key/signature pyramid:
 *   1. derive()  → reveals the public key; the private key becomes editable
 *   2. sign()    → produces the signature for the message
 *   3. verify()  → the network checks the (message, signature, public key) triple
 *
 * The public key is a fixed constant (Nicolas's on-record key). Editing the
 * private key to anything else means it no longer derives to that public key,
 * so the signature it produces is rejected — which is the whole lesson.
 */
export const useSignaturePlayground = () => {
  const [privateKey, setPrivateKey] = useState(INITIAL_PRIVATE_KEY);
  const [isDerived, setIsDerived] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>("idle");

  const isOriginalKey = privateKey === INITIAL_PRIVATE_KEY;
  const hasSignature = signature !== null;

  const derive = () => setIsDerived(true);

  // Editing the key invalidates downstream artifacts (signature + verdict).
  const updatePrivateKey = (next: string) => {
    setPrivateKey(next);
    setSignature(null);
    setVerifyStatus("idle");
  };

  const sign = () => {
    if (!isDerived) return;
    setSignature(isOriginalKey ? VALID_SIGNATURE : INVALID_SIGNATURE);
    setVerifyStatus("idle");
  };

  const verify = () => {
    if (!hasSignature) return;
    setVerifyStatus(isOriginalKey ? "accepted" : "rejected");
  };

  const reset = () => {
    setPrivateKey(INITIAL_PRIVATE_KEY);
    setIsDerived(false);
    setSignature(null);
    setVerifyStatus("idle");
  };

  return {
    privateKey,
    publicKey: PUBLIC_KEY,
    signature,
    verifyStatus,
    isDerived,
    isOriginalKey,
    hasSignature,
    derive,
    updatePrivateKey,
    sign,
    verify,
    reset,
  };
};
