import { useEffect, useRef, useState } from "react";

import {
  ALTERED_PRIVATE_KEY,
  INITIAL_PRIVATE_KEY,
  INVALID_SIGNATURE,
  PUBLIC_KEY,
  VALID_SIGNATURE,
} from "../data";
import type { VerifyStatus } from "../types";

export const useSignaturePlayground = (onComplete?: () => void) => {
  const [privateKey, setPrivateKey] = useState(INITIAL_PRIVATE_KEY);
  const [isDerived, setIsDerived] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>("idle");

  const isOriginalKey = privateKey === INITIAL_PRIVATE_KEY;
  const hasSignature = signature !== null;

  const canModifyKey = isDerived && isOriginalKey;

  const derive = () => setIsDerived(true);

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
