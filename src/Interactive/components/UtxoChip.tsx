import { type CSSProperties, type FC, type ReactNode } from "react";

import { getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../Design";

type Props = {
  icon: ReactNode;
  amount: string;
  sublabel: ReactNode;
  accent: string;
  struck?: boolean;
  badge?: ReactNode;
  style?: CSSProperties;
};

// One UTXO, drawn once: an icon in the accent, the amount, and who now holds
// the spending right. Consumed inputs strike through; the tone is set by the
// caller so the same chip serves inputs, outputs, change and fees. No box
// behind the icon — the mark carries the colour on its own.
export const UtxoChip: FC<Props> = ({ icon, amount, sublabel, accent, struck, badge, style }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { colors } = usePageTheme();

  const container: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "0.5rem" : "0.6rem",
    padding: isMobile ? "0.5rem 0.6rem" : "0.55rem 0.7rem",
    background: withOpacity(accent, 0.06),
    border: `1px solid ${withOpacity(accent, 0.3)}`,
    transition: "background 0.4s var(--ease-smooth), border-color 0.4s var(--ease-smooth)",
    ...style,
  };

  const body: CSSProperties = {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.1rem",
  };

  // The amount stays in the readable ink; the accent lives in the icon, border
  // and wash, so a low-contrast semantic tint (success green, error rose on
  // light paper) never lands on the number itself.
  const amountStyle: CSSProperties = {
    ...typo.figure,
    color: struck ? colors.base.text.secondary : colors.base.text.primary,
    textDecoration: struck ? "line-through" : "none",
    wordBreak: "break-word",
  };

  const sublabelStyle: CSSProperties = {
    ...typo.micro,
    color: colors.base.text.secondary,
  };

  return (
    <div style={container}>
      <span style={{ display: "flex", flexShrink: 0, color: accent }}>{icon}</span>
      <div style={body}>
        <span style={amountStyle}>{amount}</span>
        <span style={sublabelStyle}>{sublabel}</span>
      </div>
      {badge}
    </div>
  );
};
