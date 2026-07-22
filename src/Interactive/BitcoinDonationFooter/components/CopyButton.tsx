import { type CSSProperties, type FC, useState } from "react";

import { BRAND, getTypography, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useClipboard } from "../hooks";

import { Check, Copy } from "@icons";

type Props = {
  value: string;
  copyLabel: string;
  copiedLabel: string;
};

export const CopyButton: FC<Props> = ({ value, copyLabel, copiedLabel }) => {
  const typo = getTypography();
  const { colors } = usePageTheme();
  const { copied, copy } = useClipboard();
  const [hovered, setHovered] = useState(false);

  const accent = colors.amber.text.secondary;
  const success = colors.semantic.success.text;
  const tone = copied ? success : accent;

  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    padding: "0.35rem 0.6rem",
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.03em",
    color: tone,
    background: hovered && !copied ? withOpacity(accent, 0.08) : "transparent",
    border: `1px solid ${withOpacity(tone, 0.4)}`,
    borderRadius: 0,
    cursor: "pointer",
    flexShrink: 0,
    transition: "color 0.15s, border-color 0.15s, background 0.15s",
  };

  return (
    <button
      type="button"
      style={style}
      onClick={() => void copy(value)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={copied ? copiedLabel : copyLabel}
    >
      {copied ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} strokeWidth={2.2} />}
      <span>{copied ? copiedLabel : copyLabel}</span>
      <span
        aria-live="polite"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
        }}
      >
        {copied ? copiedLabel : ""}
      </span>
    </button>
  );
};
