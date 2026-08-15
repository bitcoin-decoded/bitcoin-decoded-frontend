import { type CSSProperties, type FC } from "react";

import { BRAND, useBreakpoint, usePageTheme, withOpacity } from "../../Design";

type Props = { words: string[] };

// The 12 words shown read-only in a numbered grid (CDC §14.3). Shared by the
// creation display (AuthSeedStep) and the reveal display (AuthRevealSeed) so both
// read identically. Dumb.
export const SeedWordsGrid: FC<Props> = ({ words }) => {
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr",
    gap: "0.5rem",
    padding: "0.85rem",
    border: `1px solid ${colors.base.border.secondary}`,
    background: withOpacity(colors.base.background.primary, 0.5),
  };

  const cellStyle: CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    gap: "0.5rem",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.9rem",
  };

  return (
    <div style={gridStyle}>
      {words.map((word, index) => (
        <div key={index} style={cellStyle}>
          <span style={{ color: colors.base.text.secondary, minWidth: "1.25rem", textAlign: "right" }}>
            {index + 1}
          </span>
          <span style={{ color: colors.base.text.primary }}>{word}</span>
        </div>
      ))}
    </div>
  );
};
