import { useState } from "react";

export type SigField = "message" | "pubkey" | "signature";

export const ORIGINAL_VALUES: Record<SigField, string> = {
  message: "a3f9c2b1d84e5f6a7b8c9d0e1f2a3b4c",
  pubkey: "02a7f3e1c4b5d6e7f8a9b0c1d2e3f4a5",
  signature: "3044a1b2c3d4e5f60718293a4b5c6d7e",
};

const TAMPERED_VALUES: Record<SigField, string> = {
  message: "a3f9c2b1d84e5f6a7b8c9d0e1f2a3ffff",
  pubkey: "02a7f3e1c4b5d6e7f8a9b0c1d2e3ffff",
  signature: "3044a1b2c3d4e5f60718293a4b5cffff",
};

export const useSignatureVerifier = () => {
  const [tampered, setTampered] = useState<Set<SigField>>(new Set());
  const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle");

  const toggle = (field: SigField) => {
    setTampered((prev) => {
      const next = new Set(prev);
      if (next.has(field)) next.delete(field);
      else next.add(field);
      return next;
    });
    setStatus("idle");
  };

  const verify = () => setStatus(tampered.size === 0 ? "valid" : "invalid");

  const reset = () => {
    setTampered(new Set());
    setStatus("idle");
  };

  const getValue = (field: SigField) =>
    tampered.has(field) ? TAMPERED_VALUES[field] : ORIGINAL_VALUES[field];

  return { tampered, status, toggle, verify, reset, getValue };
};
