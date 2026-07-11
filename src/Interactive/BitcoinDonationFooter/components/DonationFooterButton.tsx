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
    gap: "0.5rem",
    padding: "0.55rem 1.1rem",
    fontFamily: BRAND.fonts.mono,
    // A donation CTA is a primary message, not chrome — size it up (16px). Mono
    // small-caps shrinks the visual x-height, so it needs the larger step.
    fontSize: typo.heading.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.03em",
    color: accent,
    background: hovered ? withOpacity(accent, 0.1) : "transparent",
    border: `1px solid ${withOpacity(accent, hovered ? 0.7 : 0.4)}`,
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
      <Bitcoin size={15} strokeWidth={2} style={{ color: BRAND.orange }} />
      {copy.footerCta}
    </button>
  );
};
