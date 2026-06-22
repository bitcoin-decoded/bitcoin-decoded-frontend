import { type FC } from "react";

import { BRAND, getBrandGold, useThemeContext } from "../../../Design";

type Props = {
  /** Play the drop-in animation (only the freshly revealed link). */
  revealing: boolean;
};

/**
 * The hairline connector between two consecutive blocks — a single vertical
 * gold filet (1px). Distinct from the gold rule + carré signature that opens
 * each block, so the chain reads as a thread linking blocks rather than as
 * a repetition of block markers.
 *
 * The thin column matches the visual register of the ledger system: no
 * bauble, no icon, just a line that says "this block follows that one".
 */
export const BlockChainLink: FC<Props> = ({ revealing }) => {
  const { theme } = useThemeContext();
  const gold = getBrandGold(theme);

  return (
    <div
      className={revealing ? "reading-chain-link revealing" : "reading-chain-link"}
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "0",
        userSelect: "none",
      }}
      aria-hidden="true"
    >
      <span
        style={{
          display: "block",
          width: BRAND.figures.ruleThickness,
          height: 26,
          background: gold,
          opacity: 0.65,
        }}
      />
    </div>
  );
};
