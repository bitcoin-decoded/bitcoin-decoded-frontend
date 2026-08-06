import { describe, expect, it, vi } from "vitest";

import type { AccountFlags, UserData, UserRepository } from "../types";

import { createCompositeRepository } from "./createCompositeRepository";
import { SessionExpiredError } from "./SessionExpiredError";

const empty: UserData = { badges: {}, readingProgress: {} };
const signal = new AbortController().signal;

const repo = (loadImpl: () => Promise<UserData>): UserRepository => ({
  load: vi.fn(loadImpl),
  save: vi.fn(),
});

const flags = (over: Partial<AccountFlags> = {}): AccountFlags => ({
  hasAccount: async () => false,
  migrated: () => false,
  setMigrated: vi.fn(),
  ...over,
});

describe("createCompositeRepository", () => {
  it("uses local and never calls the API for a guest", async () => {
    const local = repo(async () => ({ badges: { g: 1 }, readingProgress: {} }));
    const api = repo(async () => empty);
    const composite = createCompositeRepository(local, api, flags({ hasAccount: async () => false }));

    const data = await composite.load(signal);
    expect(data.badges).toEqual({ g: 1 });
    expect(api.load).not.toHaveBeenCalled();

    composite.save(empty);
    expect(local.save).toHaveBeenCalledOnce();
    expect(api.save).not.toHaveBeenCalled();
  });

  it("folds local progress into the account on the first authenticated load", async () => {
    const local = repo(async () => ({ badges: { local: 1 }, readingProgress: {} }));
    const api = repo(async () => ({ badges: { server: 2 }, readingProgress: {} }));
    const setMigrated = vi.fn();
    const composite = createCompositeRepository(
      local,
      api,
      flags({ hasAccount: async () => true, migrated: () => false, setMigrated }),
    );

    const data = await composite.load(signal);
    expect(data.badges).toEqual({ local: 1, server: 2 });
    expect(api.save).toHaveBeenCalledOnce();
    expect(setMigrated).toHaveBeenCalledOnce();
  });

  it("returns server data untouched once migration has run", async () => {
    const local = repo(async () => ({ badges: { local: 1 }, readingProgress: {} }));
    const api = repo(async () => ({ badges: { server: 2 }, readingProgress: {} }));
    const composite = createCompositeRepository(
      local,
      api,
      flags({ hasAccount: async () => true, migrated: () => true }),
    );

    const data = await composite.load(signal);
    expect(data.badges).toEqual({ server: 2 });
    expect(api.save).not.toHaveBeenCalled();
  });

  it("falls back to local when the session has expired", async () => {
    const local = repo(async () => ({ badges: { g: 1 }, readingProgress: {} }));
    const api = repo(async () => {
      throw new SessionExpiredError();
    });
    const composite = createCompositeRepository(local, api, flags({ hasAccount: async () => true }));

    const data = await composite.load(signal);
    expect(data.badges).toEqual({ g: 1 });

    composite.save(empty);
    expect(api.save).not.toHaveBeenCalled();
  });

  it("writes through to both stores once authenticated", async () => {
    const local = repo(async () => empty);
    const api = repo(async () => empty);
    const composite = createCompositeRepository(
      local,
      api,
      flags({ hasAccount: async () => true, migrated: () => true }),
    );

    await composite.load(signal);
    composite.save(empty);
    expect(local.save).toHaveBeenCalledOnce();
    expect(api.save).toHaveBeenCalledOnce();
  });
});
