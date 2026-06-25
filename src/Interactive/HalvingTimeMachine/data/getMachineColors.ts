import type { MachineColors } from "../types";

/**
 * Device colors for the halving time machine's readout screen. The ledger
 * refonte stripped the skeuomorphic chrome (brushed-metal lever, CRT scanlines
 * and glow): what remains is a flat instrument panel — a solid dark screen in
 * dark mode and a transient travel-flux for the "machine working" animation.
 * These render a physical readout, so they live here as a device palette rather
 * than as semantic THEME_COLORS tokens.
 */
export const getMachineColors = (): MachineColors => ({
  // Solid (non-gradient) dark screen — darker than the surrounding card so the
  // panel reads as a lit readout. Light mode builds its panel from theme tokens.
  screenBgDark: "#0a0a0c",
  // Vivid travel-flux used while traveling (light mode); dark mode derives its
  // flux from the amber readout color inline.
  fluxLight:
    "radial-gradient(circle at 50% 45%, rgba(253, 224, 71, 0.85) 0%, rgba(247, 147, 26, 0.6) 42%, rgba(234, 88, 12, 0.35) 62%, transparent 80%)",
});
