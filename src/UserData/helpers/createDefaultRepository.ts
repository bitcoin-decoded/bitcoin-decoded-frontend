import { createVault } from "../../Auth";
import { readStored, writeStored } from "../../Platform";
import { PROGRESS_MIGRATED_KEY } from "../data";
import type { UserRepository } from "../types";

import { createApiRepository } from "./createApiRepository";
import { createCompositeRepository } from "./createCompositeRepository";
import { createLocalRepository } from "./createLocalRepository";

// The repository the provider uses by default: local for a guest, the account
// API once this device has one. Wiring the account flags to storage is the only
// place storage is touched; the composite itself stays storage-agnostic. The
// device vault (IndexedDB) is the single source of truth for "has an account":
// its presence, not a separate flag, is what turns the API on.
export const createDefaultRepository = (): UserRepository =>
  createCompositeRepository(createLocalRepository(), createApiRepository(), {
    hasAccount: () => createVault().exists(),
    migrated: () => readStored(PROGRESS_MIGRATED_KEY) === "1",
    setMigrated: () => writeStored(PROGRESS_MIGRATED_KEY, "1"),
  });
