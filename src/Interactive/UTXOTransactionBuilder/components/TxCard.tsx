import type { CSSProperties, FC, ReactNode } from "react";

import { getTypography, useBreakpoint, usePageTheme } from "../../../Design";
import type { CardTone } from "../types";

type Props = {
  icon: ReactNode;
  title: string;
  desc?: string;
  amount: string;
  tone: CardTone;
  toneColors: Record<CardTone, { color: string; border: string; bg: string }>;
  amountMuted?: boolean;
};

export const TxCard: FC<Props> = ({ icon, title, desc, amount, tone, toneColors, amountMuted }) => {
  const typo = getTypography(useBreakpoint());
  const { colors } = usePageTheme();
  const { color, border, bg } = toneColors[tone];

  const shell: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    padding: "0.55rem 0.7rem",
    border: `1px solid ${border}`,
    background: bg,
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    transition: "border-color 0.35s var(--ease-smooth), background 0.35s var(--ease-smooth)",
  };

  return (
    <div style={shell}>
      <span style={{ display: "inline-flex", flexShrink: 0, color }}>{icon}</span>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.1rem", minWidth: 0 }}>
        <span style={{ ...typo.figure, color, overflowWrap: "anywhere", lineHeight: 1.3 }}>{title}</span>
        {desc && (
          <span style={{ ...typo.micro, color: colors.base.text.secondary, overflowWrap: "anywhere", lineHeight: 1.3 }}>
            {desc}
          </span>
        )}
      </div>
      <span
        style={{
          ...typo.figure,
          color: amountMuted ? colors.base.text.secondary : colors.base.text.primary,
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        {amount}
      </span>
    </div>
  );
};
