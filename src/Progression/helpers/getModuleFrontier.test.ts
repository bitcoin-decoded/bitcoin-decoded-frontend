import { describe, expect, it } from "vitest";

import type { NavigationItem, RouteName } from "../../Routing";

import { getModuleFrontier } from "./getModuleFrontier";
import { isChapterOutOfSequence } from "./isChapterOutOfSequence";

const chapter = (id: string): NavigationItem => ({ id: id as RouteName, label: id, isPage: true });

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

const ahead = (routeId: string, ...sealed: string[]) =>
  isChapterOutOfSequence(TREE, sealedBy(...sealed), routeId as RouteName);

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
    expect(frontierOf("b-1", "a-1", "a-2", "a-3", "a-quiz")).toMatchObject({ frontierId: "b-1" });
    expect(ahead("b-1")).toBe(false);
  });

  it("returns null for a page outside any module", () => {
    expect(frontierOf("home")).toBeNull();
    expect(frontierOf("unknown-route")).toBeNull();
  });
});

describe("isChapterOutOfSequence", () => {
  it("puts chapter 01 of every module in sequence from the start", () => {
    expect(ahead("a-1")).toBe(false);
    expect(ahead("b-1")).toBe(false);
  });

  it("puts the chapter after the frontier out of sequence", () => {
    expect(ahead("a-2")).toBe(true);
    expect(ahead("a-2", "a-1")).toBe(false);
  });

  it("puts everything past the frontier out of sequence, not just the next one", () => {
    expect(ahead("a-3")).toBe(true);
    expect(ahead("a-quiz")).toBe(true);
  });

  it("places the end-of-module quiz behind the last chapter, with no special case", () => {
    expect(ahead("a-quiz", "a-1", "a-2")).toBe(true);
    expect(ahead("a-quiz", "a-1", "a-2", "a-3")).toBe(false);
  });

  it("never puts a page outside a module out of sequence", () => {
    expect(ahead("home")).toBe(false);
  });

  it("keeps one boundary when the sealed history has a hole", () => {
    expect(ahead("a-2", "a-1", "a-3")).toBe(false);
    expect(ahead("a-3", "a-1", "a-3")).toBe(true);
    expect(ahead("a-quiz", "a-1", "a-3")).toBe(true);
  });
});
