import { describe, expect, it } from "vitest";

import { getContrastRatio } from "../../helpers";
import { getBrandGold } from "../helpers";
import type { Theme } from "../types";

import { THEME_COLORS } from "./THEME_COLORS";

const AA_BODY = 4.5;
const THEMES: Theme[] = ["dark", "light"];
const MODULE_RAMPS = ["blue", "amber", "violet"] as const;
const SEMANTIC_ROLES = ["success", "error", "info", "warning"] as const;

/**
 * The app was built dark-first, which let every light-mode accent sit at a
 * mid-tone that only ever passed on black. This pins the fix: every opaque
 * text token, in both modes, must clear WCAG AA against the surface it is
 * actually painted on.
 *
 * `base.text.secondary` is excluded on purpose: it carries an alpha channel
 * and is composited by the browser, so it has no standalone ratio.
 */
describe.each(THEMES)("THEME_COLORS.%s text tokens", (theme) => {
  const ramp = THEME_COLORS[theme];
  const background = ramp.base.background.primary;

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

  it.each(tokens)("%s clears WCAG AA on the page background", (_name, color) => {
    expect(getContrastRatio(color, background) ?? 0).toBeGreaterThanOrEqual(AA_BODY);
  });
});
