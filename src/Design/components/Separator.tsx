import { type CSSProperties, type FC } from "react";

import { getBrandGold, usePageTheme, useThemeContext } from "../Theme";

type Props = {
  /** Vertical margin around the separator. @default "1.5rem 0" */
  margin?: string;
};

/**
 * In-component section separator — three small FILLED squares (solid block
 * figures) in the module color, close together and centered. Filled (not
 * hollow) so they read as ledger blocks rather than an "step 1 of 3" progress
 * dot row. Deliberately NOT a horizontal rule: a line would read as a block
 * top/bottom delimiter and confuse the chapter's chain structure. Gold on
 * neutral pages.
 */
export const Separator: FC<Props> = ({ margin = "1.5rem 0" }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();

  const accent = moduleTheme === "base" ? getBrandGold(theme) : colors[moduleTheme].text.secondary;

  const rowStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    margin,
  };

  const squareStyle: CSSProperties = {
    width: 5,
    height: 5,
    background: accent,
    opacity: 0.65,
  };

  return (
    <div style={rowStyle} role="separator" aria-hidden="true">
      <span style={squareStyle} />
      <span style={squareStyle} />
      <span style={squareStyle} />
    </div>
  );
};
