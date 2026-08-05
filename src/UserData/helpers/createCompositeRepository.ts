import type { AccountFlags, UserData, UserRepository } from "../types";

import { mergeUserData } from "./mergeUserData";
import { SessionExpiredError } from "./SessionExpiredError";

const isEmpty = (data: UserData): boolean =>
  Object.keys(data.badges).length === 0 && Object.keys(data.readingProgress).length === 0;

// Guest -> local, connected -> API, decided per load. No account on this device
// means no network call at all. On the first authenticated load, this device's
// local (guest) progress is folded into the account: the union is returned right
// away and pushed to the server, whose own non-regressive merge makes the push
// idempotent. An expired session degrades to local rather than failing; a real
// network error is left to surface on the init error screen.
export const createCompositeRepository = (
  local: UserRepository,
  api: UserRepository,
  flags: AccountFlags,
): UserRepository => {
  let authenticated = false;

  return {
    load: async (signal) => {
      if (!flags.hasAccount()) {
        authenticated = false;
        return local.load(signal);
      }
      try {
        const server = await api.load(signal);
        authenticated = true;

        if (!flags.migrated()) {
          const localData = await local.load(signal);
          flags.setMigrated();
          if (!isEmpty(localData)) {
            const union = mergeUserData(localData, server);
            api.save(union);
            return union;
          }
        }
        return server;
      } catch (err) {
        if (err instanceof SessionExpiredError) {
          authenticated = false;
          return local.load(signal);
        }
        throw err;
      }
    },
    // Local always keeps a warm copy, so a later session expiry falls back to
    // fresh data rather than the pre-migration snapshot.
    save: (data) => {
      local.save(data);
      if (authenticated) api.save(data);
    },
  };
};
