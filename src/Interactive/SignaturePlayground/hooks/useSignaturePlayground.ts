import { useState } from "react";

import {
  ALT_PRIVATE_KEYS,
  INITIAL_PRIVATE_KEY,
  INVALID_SIGNATURE,
  PUBLIC_KEY,
  VALID_SIGNATURE,
} from "../data";
import type { VerifyStatus } from "../types";

/**
 * Guided three-step flow that builds the key/signature pyramid:
 *   1. derive()  → reveals the public key; the "modify key" button unlocks
 *   2. sign()    → produces the signature for the message
 *   3. verify()  → the network checks the (message, signature, public key) triple
 *
 * The public key is a fixed constant (Nicolas's on-record key). Swapping the
 * private key for any other one means it no longer derives to that public key,
 * so the signature it produces is rejected — which is the whole lesson.
 */
export const useSignaturePlayground = () => {
  const [privateKey, setPrivateKey] = useState(INITIAL_PRIVATE_KEY);
  const [altIndex, setAltIndex] = useState(0);
  const [isDerived, setIsDerived] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>("idle");

  const isOriginalKey = privateKey === INITIAL_PRIVATE_KEY;
  const hasSignature = signature !== null;

  const derive = () => setIsDerived(true);

  // Swaps the private key for the next "wrong" key in the pool. Cycling keeps
  // every click visibly changing the key while staying non-original, so the
  // match stays broken (red) until reset. Invalidates downstream artifacts.
  const modifyKey = () => {
    setPrivateKey(ALT_PRIVATE_KEYS[altIndex % ALT_PRIVATE_KEYS.length]);
    setAltIndex((i) => i + 1);
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
    setAltIndex(0);
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
    modifyKey,
    sign,
    verify,
    reset,
  };
};
