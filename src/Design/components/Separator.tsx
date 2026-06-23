import { type CSSProperties, type FC } from "react";

import { getBrandGold, usePageTheme, useThemeContext } from "../Theme";

type Props = {
  /** Vertical margin around the separator. @default "1.5rem 0" */
  margin?: string;
};

/**
 * In-component section separator — three small hollow squares (the block
 * figure, drawn empty) in the module color, close together and centered.
 * Deliberately NOT a horizontal rule: a line would read as a block top/bottom
 * delimiter and confuse the chapter's chain structure. The three little blocks
 * stay on-theme (the ledger's unit, repeated) while clearly signaling "this is
 * a pause within a component, not a new block". Gold on neutral pages.
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
    width: 6,
    height: 6,
    border: `1px solid ${accent}`,
    opacity: 0.7,
  };

  return (
    <div style={rowStyle} role="separator" aria-hidden="true">
      <span style={squareStyle} />
      <span style={squareStyle} />
      <span style={squareStyle} />
    </div>
  );
};
