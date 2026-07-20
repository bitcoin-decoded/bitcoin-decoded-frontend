import { isBrowser } from "./isBrowser";

/** Persists a value, silently doing nothing when storage is unavailable. */
export const writeStored = (key: string, value: string): void => {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage full, disabled or refused. Losing a preference is not worth
    // interrupting a reader over.
  }
};
