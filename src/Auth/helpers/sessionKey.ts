import type { KeyPair } from "../types/index.js";

// The unlocked private key for the session's lifetime: a module closure, never a
// global, never storage, gone on tab close (CDC §5.2), cleared on logout. The
// three accessors share this one private variable, so they must live together.
let current: KeyPair | null = null;

export const setSessionKey = (keyPair: KeyPair): void => {
  current = keyPair;
};
export const getSessionKey = (): KeyPair | null => current;
export const clearSessionKey = (): void => {
  current = null;
};
