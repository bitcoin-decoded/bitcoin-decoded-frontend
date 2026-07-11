import { type CSSProperties, type FC } from "react";

import { useBreakpoint } from "../Responsive";
import { getBrandGold, getTypography, usePageTheme, useThemeContext } from "../Theme";

type Props = {
  /** Accent segment, e.g. "Chapitre 03" — carries the structural gold. */
  marker: string;
  /** Context segment, e.g. the module name — sits in quiet ink. */
  label: string;
  /** Override the marker accent (defaults to the brand gold). */
  accent?: string;
};

/**
 * A numbered section eyebrow — "CHAPITRE 03 · LA RÉVOLUTION BITCOIN" — set in
 * the mono `kicker` register (uppercase, wide tracking). The marker takes the
 * structural gold; the label wears the module's own identity colour (it *is*
 * the module name), which also gives it real presence — neutral ink at this
 * size only just clears AA and reads timid, especially in light mode.
 */
export const SectionLabel: FC<Props> = ({ marker, label, accent }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const typo = getTypography(useBreakpoint());

  const labelColor =
    moduleTheme === "base" ? colors.base.text.secondary : colors[moduleTheme].text.secondary;

  const wrapperStyle: CSSProperties = {
    ...typo.kicker,
    display: "block",
    textAlign: "center",
  };

  return (
    <span style={wrapperStyle}>
      <span style={{ color: accent ?? getBrandGold(theme) }}>{marker}</span>
      <span style={{ color: labelColor }}>{` · ${label}`}</span>
    </span>
  );
};
