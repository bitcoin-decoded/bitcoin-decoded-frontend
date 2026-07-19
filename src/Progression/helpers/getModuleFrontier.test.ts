import { describe, expect, it } from "vitest";

import type { NavigationItem, RouteName } from "../../Routing";

import { getModuleFrontier } from "./getModuleFrontier";
import { isChapterLocked } from "./isChapterLocked";

const chapter = (id: string): NavigationItem => ({ id: id as RouteName, label: id, isPage: true });

/** Two modules, so the "no lock between modules" rule has something to prove. */
const TREE: NavigationItem[] = [
  {
    label: "Module A",
    isPage: false,
    children: [chapter("a-1"), chapter("a-2"), chapter("a-3"), chapter("a-quiz")],
  },
  {
    label: "Module B",
    isPage: false,
    children: [chapter("b-1"), chapter("b-2")],
  },
  { id: "home" as RouteName, label: "Home", isPage: true },
];

const sealedBy =
  (...ids: string[]) =>
  (id: RouteName) =>
    ids.includes(id);

const frontierOf = (routeId: string, ...sealed: string[]) =>
  getModuleFrontier(TREE, sealedBy(...sealed), routeId as RouteName);

const locked = (routeId: string, ...sealed: string[]) =>
  isChapterLocked(TREE, sealedBy(...sealed), routeId as RouteName);

describe("getModuleFrontier", () => {
  it("puts an untouched module's frontier on its first chapter", () => {
    expect(frontierOf("a-1")).toMatchObject({ frontierIndex: 0, frontierId: "a-1" });
  });

  it("moves the frontier one chapter per seal", () => {
    expect(frontierOf("a-1", "a-1")).toMatchObject({ frontierIndex: 1, frontierId: "a-2" });
    expect(frontierOf("a-1", "a-1", "a-2")).toMatchObject({ frontierIndex: 2, frontierId: "a-3" });
  });

  it("stops at the last chapter once the whole module is sealed", () => {
    expect(frontierOf("a-1", "a-1", "a-2", "a-3", "a-quiz")).toMatchObject({
      frontierIndex: 3,
      frontierId: "a-quiz",
    });
  });

  it("reads each module independently", () => {
    // Module A fully sealed must not open module B past its first chapter...
    expect(frontierOf("b-1", "a-1", "a-2", "a-3", "a-quiz")).toMatchObject({ frontierId: "b-1" });
    // ...and an untouched module A must not close module B either.
    expect(locked("b-1")).toBe(false);
  });

  it("returns null for a page outside any module", () => {
    expect(frontierOf("home")).toBeNull();
    expect(frontierOf("unknown-route")).toBeNull();
  });
});

describe("isChapterLocked", () => {
  it("opens chapter 01 of every module from the start", () => {
    expect(locked("a-1")).toBe(false);
    expect(locked("b-1")).toBe(false);
  });

  it("closes the chapter after the frontier", () => {
    expect(locked("a-2")).toBe(true);
    expect(locked("a-2", "a-1")).toBe(false);
  });

  it("closes everything past the frontier, not just the next one", () => {
    expect(locked("a-3")).toBe(true);
    expect(locked("a-quiz")).toBe(true);
  });

  it("gates the end-of-module quiz behind the last chapter, with no special case", () => {
    expect(locked("a-quiz", "a-1", "a-2")).toBe(true);
    expect(locked("a-quiz", "a-1", "a-2", "a-3")).toBe(false);
  });

  it("never gates a page outside a module", () => {
    expect(locked("home")).toBe(false);
  });

  it("keeps one boundary when the sealed history has a hole", () => {
    // Sealed 1 and 3 but not 2 — the per-chapter reading ("is my predecessor
    // sealed?") would open a-quiz while a-3 stays shut. The frontier does not.
    expect(locked("a-2", "a-1", "a-3")).toBe(false);
    expect(locked("a-3", "a-1", "a-3")).toBe(true);
    expect(locked("a-quiz", "a-1", "a-3")).toBe(true);
  });
});
