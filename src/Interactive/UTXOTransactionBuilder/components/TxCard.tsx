import type { FC, ReactNode } from "react";

import { withOpacity } from "../../../Design";
import type { CardTone } from "../types";

type TxCardProps = {
  icon: ReactNode;
  title: string;
  desc: string;
  amount: string;
  tone: CardTone;
  toneColors: Record<CardTone, { color: string; border: string; bg: string }>;
  amountFontSize: string;
  amountOpacity?: number;
  baseTextSecondary: string;
};

export const TxCard: FC<TxCardProps> = ({
  icon,
  title,
  desc,
  amount,
  tone,
  toneColors,
  amountFontSize,
  amountOpacity,
  baseTextSecondary,
}) => {
  const { color, border, bg } = toneColors[tone];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        padding: "0.55rem 0.7rem",
        borderRadius: "0.6rem",
        border: `1px solid ${border}`,
        background: bg,
        width: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        transition: "all 0.35s var(--ease-smooth)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "1.6rem",
          height: "1.6rem",
          borderRadius: "0.4rem",
          background: withOpacity(color, 0.12),
          color,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "0.1rem",
          minWidth: 0,
        }}
      >
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 700,
            color,
            overflowWrap: "anywhere",
            lineHeight: 1.3,
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: "0.56rem",
            color: withOpacity(baseTextSecondary, 0.6),
            overflowWrap: "anywhere",
            lineHeight: 1.3,
          }}
        >
          {desc}
        </span>
      </div>
      <span
        style={{
          fontWeight: 700,
          fontSize: amountFontSize,
          color,
          opacity: amountOpacity,
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        {amount}
      </span>
    </div>
  );
};
