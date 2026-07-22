import { type CSSProperties, type FC, useState } from "react";

import { BRAND, getTypography, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useTranslation } from "../../../I18n";
import { getDonationCopy } from "../data";

import { BitcoinMark } from "@icons";

type Props = {
  onClick: () => void;
};

export const DonationFooterButton: FC<Props> = ({ onClick }) => {
  const typo = getTypography();
  const { colors } = usePageTheme();
  const { language } = useTranslation();
  const copy = getDonationCopy(language);
  const [hovered, setHovered] = useState(false);

  const accent = colors.amber.text.secondary;

  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.55rem",
    padding: "0.6rem 1.25rem",
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.heading.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.04em",
    color: accent,
    background: withOpacity(accent, hovered ? 0.2 : 0.12),
    border: `1.5px solid ${withOpacity(accent, hovered ? 1 : 0.7)}`,
    borderRadius: 0,
    cursor: "pointer",
    transition: "all 0.15s var(--ease-smooth)",
  };

  return (
    <button
      type="button"
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <BitcoinMark size={19} />
      {copy.footerCta}
    </button>
  );
};
