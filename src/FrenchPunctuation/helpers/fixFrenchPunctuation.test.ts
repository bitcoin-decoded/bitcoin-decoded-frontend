import { describe, expect,it } from "vitest";

import { fixFrenchPunctuation } from "./fixFrenchPunctuation";

const THIN = String.fromCharCode(0x202f);
const NBSP = String.fromCharCode(0xa0);

describe("fixFrenchPunctuation", () => {
  it("inserts thin NBSP before ! ? : ;", () => {
    expect(fixFrenchPunctuation("Allons !")).toBe(`Allons${THIN}!`);
    expect(fixFrenchPunctuation("Quoi ?")).toBe(`Quoi${THIN}?`);
    expect(fixFrenchPunctuation("Voici :")).toBe(`Voici${THIN}:`);
    expect(fixFrenchPunctuation("Donc ;")).toBe(`Donc${THIN};`);
  });

  it("inserts thin NBSP before closing French guillemet", () => {
    expect(fixFrenchPunctuation("Texte »")).toBe(`Texte${THIN}»`);
  });

  it("inserts thin NBSP after opening French guillemet", () => {
    expect(fixFrenchPunctuation("« hello")).toBe(`«${THIN}hello`);
    expect(fixFrenchPunctuation("«hello")).toBe(`«${THIN}hello`);
  });

  it("works without existing spaces", () => {
    expect(fixFrenchPunctuation("Allons!")).toBe(`Allons${THIN}!`);
    expect(fixFrenchPunctuation("Voici:")).toBe(`Voici${THIN}:`);
  });

  it("glues € to the preceding number with NBSP", () => {
    expect(fixFrenchPunctuation("200 €")).toBe(`200${NBSP}€`);
    expect(fixFrenchPunctuation("200€")).toBe(`200${NBSP}€`);
  });

  it("turns thousands separators into NBSP", () => {
    expect(fixFrenchPunctuation("1 000 000 €")).toBe(
      `1${NBSP}000${NBSP}000${NBSP}€`,
    );
    expect(fixFrenchPunctuation("200 000 €")).toBe(`200${NBSP}000${NBSP}€`);
  });

  it("does not split four-digit years", () => {
    expect(fixFrenchPunctuation("en 2026, oui")).toBe("en 2026, oui");
  });

  it("leaves URLs untouched", () => {
    expect(
      fixFrenchPunctuation("Voir https://example.com pour : la suite"),
    ).toBe(`Voir https://example.com pour${THIN}: la suite`);
    expect(fixFrenchPunctuation("http://x.io:8080/a?b=1")).toBe(
      "http://x.io:8080/a?b=1",
    );
  });

  it("does not touch time or ratio colons (not followed by space/end)", () => {
    expect(fixFrenchPunctuation("12:30")).toBe("12:30");
    expect(fixFrenchPunctuation("rapport 16:9")).toBe("rapport 16:9");
  });

  it("does not touch Windows paths", () => {
    expect(fixFrenchPunctuation("C:\\Users\\loic")).toBe("C:\\Users\\loic");
  });

  it("handles a mixed sentence end-to-end", () => {
    const input = "Bonjour : ce « test » coûte 1 000 € ! Voir https://x.io ?";
    const expected =
      `Bonjour${THIN}: ce «${THIN}test${THIN}» coûte 1${NBSP}000${NBSP}€${THIN}! ` +
      `Voir https://x.io${THIN}?`;
    expect(fixFrenchPunctuation(input)).toBe(expected);
  });

  it("is idempotent", () => {
    const input = "Bonjour : ce « hello » coûte 1 000 € !";
    const once = fixFrenchPunctuation(input);
    const twice = fixFrenchPunctuation(once);
    expect(twice).toBe(once);
  });

  it("returns empty input unchanged", () => {
    expect(fixFrenchPunctuation("")).toBe("");
  });
});
