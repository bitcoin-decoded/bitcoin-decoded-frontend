import { isBrowser, readStored } from "../../Platform";
import { USER_DATA_STORAGE_KEY } from "../data";

// Whether this device holds guest progress worth migrating (CDC §8): the
// consolidated key exists and carries at least one badge or one chapter. The app
// root passes this to the auth flow so the account-creation success screen can
// show the "progress linked" notice (§14.6) only when it is true — Auth never
// imports UserData, keeping the two domains free of a cycle.
export const hasLocalProgress = (): boolean => {
  if (!isBrowser) return false;
  const raw = readStored(USER_DATA_STORAGE_KEY);
  if (!raw) return false;
  try {
    const data = JSON.parse(raw) as { badges?: object; readingProgress?: object };
    return (
      Object.keys(data.badges ?? {}).length > 0 ||
      Object.keys(data.readingProgress ?? {}).length > 0
    );
  } catch {
    return false;
  }
};
