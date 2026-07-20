import { isBrowser } from "./isBrowser";

/**
 * A persisted value, or null when there is none to read.
 *
 * Null covers three different situations on purpose, because every caller
 * treats them the same: no browser (the build), nothing stored yet, and storage
 * refused (private mode, quota, a disabled setting). Callers fall back to their
 * default and carry on.
 */
export const readStored = (key: string): string | null => {
  if (!isBrowser) return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
