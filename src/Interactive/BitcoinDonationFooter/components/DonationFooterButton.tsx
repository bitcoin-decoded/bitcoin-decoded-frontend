import { type CSSProperties, type FC, useState } from "react";

import { BRAND, getTypography, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useTranslation } from "../../../I18n";
import { getDonationCopy } from "../data";

import { Bitcoin } from "@icons";

type Props = {
  onClick: () => void;
};

/** Discreet chrome button (spec §12.1) that opens the donation modal. */
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
    // A donation CTA is a primary message, not chrome. Cutive Mono is
    // single-weight (no real bold), so presence comes from a persistent filled
    // amber cell + a firm border + size, not from font-weight.
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
      <Bitcoin size={17} strokeWidth={2.2} style={{ color: BRAND.orange }} />
      {copy.footerCta}
    </button>
  );
};
