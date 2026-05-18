import { useState } from "react";

import { ORIGINAL_VALUES, TAMPERED_VALUES } from "../data";
import type { SigField } from "../types";

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
