import type { MachineColors } from "../types";

/**
 * Device colors for the halving time machine — the deep CRT screen and the
 * brushed-metal lever. These render a physical object, so they live here as a
 * theme-aware device palette rather than as semantic THEME_COLORS tokens.
 * The light-mode screen *panel* is built from theme tokens in TimeScreen; only
 * the always-dark CRT, the scanlines and the vivid travel-flux belong here.
 */
export const getMachineColors = (isLight: boolean): MachineColors => ({
  screenBgDark: "linear-gradient(180deg, #0c0b09, #08080a)",
  scanline: "#000000",
  fluxLight:
    "radial-gradient(circle at 50% 45%, rgba(253, 224, 71, 0.85) 0%, rgba(247, 147, 26, 0.6) 42%, rgba(234, 88, 12, 0.35) 62%, transparent 80%)",
  leverBase: isLight
    ? "linear-gradient(180deg, #d9dce1, #a8aeb8)"
    : "linear-gradient(180deg, #54545a, #232327)",
  leverBaseBorder: isLight ? "#9097a1" : "#15151a",
  leverBaseShadow: isLight
    ? "inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 4px rgba(0,0,0,0.18)"
    : "inset 0 1px 0 rgba(255,255,255,0.18), 0 2px 4px rgba(0,0,0,0.4)",
  leverShaft: "linear-gradient(90deg, #6f6f75 0%, #e6e6ea 45%, #b9b9bf 60%, #6f6f75 100%)",
  leverShaftShadow: "0 1px 2px rgba(0,0,0,0.45)",
  leverKnob: "radial-gradient(circle at 35% 30%, #fcd34d 0%, #f59e0b 55%, #b45309 100%)",
  leverKnobBorder: "#7c2d12",
  leverKnobShadow: "inset 0 1px 2px rgba(255,255,255,0.5), 0 2px 5px rgba(0,0,0,0.45)",
});
