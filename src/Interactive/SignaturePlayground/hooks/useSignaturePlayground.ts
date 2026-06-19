import { useEffect, useRef, useState } from "react";

import {
  ALTERED_PRIVATE_KEY,
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
 * private key for another one means it no longer derives to that public key,
 * so the signature it produces is rejected - which is the whole lesson.
 */
export const useSignaturePlayground = (onComplete?: () => void) => {
  const [privateKey, setPrivateKey] = useState(INITIAL_PRIVATE_KEY);
  const [isDerived, setIsDerived] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>("idle");

  const isOriginalKey = privateKey === INITIAL_PRIVATE_KEY;
  const hasSignature = signature !== null;

  // Edit-once (cf. BlockchainChainVisual): modifiable only while the key has
  // been derived and is still the original one. After one swap it locks again.
  const canModifyKey = isDerived && isOriginalKey;

  const derive = () => setIsDerived(true);

  // Swaps the private key for the altered one. Invalidates downstream artifacts
  // (signature + verdict) and, since the key is no longer original, re-disables
  // the modify button.
  const modifyKey = () => {
    if (!canModifyKey) return;
    setPrivateKey(ALTERED_PRIVATE_KEY);
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

  // Fires once the reader has gone through the full flow (derive → sign →
  // verify); reaching a verdict means all three buttons were used. One-shot -
  // resetting and replaying never re-fires.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const firedRef = useRef(false);
  useEffect(() => {
    if (!firedRef.current && verifyStatus !== "idle") {
      firedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [verifyStatus]);

  return {
    privateKey,
    publicKey: PUBLIC_KEY,
    signature,
    verifyStatus,
    isDerived,
    isOriginalKey,
    hasSignature,
    canModifyKey,
    derive,
    modifyKey,
    sign,
    verify,
    reset,
  };
};
