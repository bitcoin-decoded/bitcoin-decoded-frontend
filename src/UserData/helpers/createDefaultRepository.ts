import { isBrowser, readStored, writeStored } from "../../Platform";
import { HAS_ACCOUNT_KEY, PROGRESS_MIGRATED_KEY } from "../data";
import type { UserRepository } from "../types";

import { createApiRepository } from "./createApiRepository";
import { createCompositeRepository } from "./createCompositeRepository";
import { createLocalRepository } from "./createLocalRepository";

// The repository the provider uses by default: local for a guest, the account
// API once this device has one. Wiring the account flags to localStorage is the
// only place storage is touched; the composite itself stays storage-agnostic.
export const createDefaultRepository = (): UserRepository =>
  createCompositeRepository(createLocalRepository(), createApiRepository(), {
    hasAccount: () => isBrowser && readStored(HAS_ACCOUNT_KEY) === "1",
    migrated: () => readStored(PROGRESS_MIGRATED_KEY) === "1",
    setMigrated: () => writeStored(PROGRESS_MIGRATED_KEY, "1"),
  });
