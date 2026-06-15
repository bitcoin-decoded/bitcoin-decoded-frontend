import { type FC } from "react";

import { usePageTheme, withOpacity } from "../../../Design";

type Props = {
  /** Play the drop-in animation (only the freshly revealed link). */
  revealing: boolean;
};

/**
 * Connector drawn between two consecutive blocks: a single chain link (two short
 * segments framing a capsule ring) so the chapter reads as a chain whose blocks
 * are appended one by one.
 */
export const BlockChainLink: FC<Props> = ({ revealing }) => {
  const { colors, moduleTheme } = usePageTheme();
  const accent = colors[moduleTheme].background.secondary;

  return (
    <div
      className={revealing ? "reading-chain-link revealing" : "reading-chain-link"}
      style={{ display: "flex", justifyContent: "center", padding: "0.1rem 0", userSelect: "none" }}
      aria-hidden="true"
    >
      <svg width="16" height="34" viewBox="0 0 16 34" fill="none">
        <line x1="8" y1="0" x2="8" y2="10" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <rect
          x="4.5"
          y="10"
          width="7"
          height="14"
          rx="3.5"
          stroke={accent}
          strokeWidth="2"
          fill={withOpacity(accent, 0.12)}
        />
        <line x1="8" y1="24" x2="8" y2="34" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </svg>
    </div>
  );
};
