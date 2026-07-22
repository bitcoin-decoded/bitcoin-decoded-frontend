import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { getContrastRatio } from "../../helpers";
import { getBrandGold } from "../helpers";
import type { Theme } from "../types";

import { THEME_COLORS } from "./THEME_COLORS";

const AA_BODY = 4.5;
const THEMES: Theme[] = ["dark", "light"];
const MODULE_RAMPS = ["blue", "amber", "violet"] as const;
const SEMANTIC_ROLES = ["success", "error", "info", "warning"] as const;

describe.each(THEMES)("THEME_COLORS.%s text tokens", (theme) => {
  const ramp = THEME_COLORS[theme];
  const surfaces: [string, string][] = [
    ["bg.primary", ramp.base.background.primary],
    ["bg.secondary (canvas)", ramp.base.background.secondary],
  ];

  const tokens: [string, string][] = [
    ["gold (getBrandGold)", getBrandGold(theme)],
    ["base.text.primary", ramp.base.text.primary],
    ...MODULE_RAMPS.flatMap<[string, string]>((module) => [
      [`${module}.text.primary`, ramp[module].text.primary],
      [`${module}.text.secondary`, ramp[module].text.secondary],
    ]),
    ...SEMANTIC_ROLES.map<[string, string]>((role) => [
      `semantic.${role}.text`,
      ramp.semantic[role].text,
    ]),
  ];

  it("enumerates every token it claims to cover", () => {
    expect(tokens).toHaveLength(12);
  });

  const cases = tokens.flatMap(([name, color]) =>
    surfaces.map<[string, string, string]>(([surfaceName, bg]) => [name, surfaceName, `${color}|${bg}`]),
  );

  it.each(cases)("%s clears WCAG AA on %s", (_name, _surface, pair) => {
    const [color, bg] = pair.split("|");
    expect(getContrastRatio(color, bg) ?? 0).toBeGreaterThanOrEqual(AA_BODY);
  });
});

describe("the pre-paint backgrounds in index.css", () => {
  const css = readFileSync(new URL("../../../index.css", import.meta.url), "utf8");

  const declared = (theme: Theme) => {
    const rule = new RegExp(String.raw`:root\[data-theme="${theme}"\]\s+body\s*\{[^}]*\}`);
    return css
      .match(rule)?.[0]
      .match(/background-color:\s*(#[0-9a-fA-F]{3,8})/)?.[1]
      ?.toLowerCase();
  };

  it.each(THEMES)("%s matches base.background.primary", (theme) => {
    expect(declared(theme)).toBe(THEME_COLORS[theme].base.background.primary.toLowerCase());
  });
});
