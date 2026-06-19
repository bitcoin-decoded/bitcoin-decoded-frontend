/**
 * Device-specific colors for the time machine - the deep CRT screen and the
 * brushed-metal lever - which are deliberately NOT semantic theme tokens (they
 * render a physical object, not UI surfaces). Theme-aware where the object's
 * finish changes (lever: light silver vs dark gunmetal), fixed otherwise.
 */
export type MachineColors = {
  screenBgDark: string;
  scanline: string;
  fluxLight: string;
  leverBase: string;
  leverBaseBorder: string;
  leverBaseShadow: string;
  leverShaft: string;
  leverShaftShadow: string;
  leverKnob: string;
  leverKnobBorder: string;
  leverKnobShadow: string;
};
