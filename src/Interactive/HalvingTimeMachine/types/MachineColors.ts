/**
 * Device-specific colors for the time machine's readout screen — deliberately
 * NOT semantic theme tokens (they render a physical readout, not UI surfaces).
 * After the ledger refonte only the flat dark screen and the travel-flux remain;
 * the brushed-metal lever and CRT scanlines/glow were removed.
 */
export type MachineColors = {
  screenBgDark: string;
  fluxLight: string;
};
