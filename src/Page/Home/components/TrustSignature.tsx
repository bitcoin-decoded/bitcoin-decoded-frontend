import { type CSSProperties, type FC } from "react";

import { BRAND, useThemeContext } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { TRUST_ITEM_KEYS } from "../data";
import { getLandingColors } from "../helpers";

// The sobriety signature, anchored at the foot of the hero. Text stays at full
// ink (AA on both grounds) since the point is that it reads at a glance; only the
// separating rule is a hairline.
export const TrustSignature: FC = () => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const { ink, gold, lineStrong } = getLandingColors(theme);

  const listStyle: CSSProperties = {
    listStyle: "none",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.55rem 1.4rem",
    margin: 0,
    padding: "1rem 0 0",
    borderTop: `1px solid ${lineStrong}`,
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.75rem",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: ink,
  };

  const itemStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.55rem",
  };

  const dotStyle: CSSProperties = {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: gold,
    flexShrink: 0,
  };

  return (
    <ul style={listStyle}>
      {TRUST_ITEM_KEYS.map((key) => (
        <li key={key} style={itemStyle}>
          <span style={dotStyle} aria-hidden="true" />
          {t(key)}
        </li>
      ))}
    </ul>
  );
};
