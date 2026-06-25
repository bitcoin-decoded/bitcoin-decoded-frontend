import { type CSSProperties, type FC } from "react";

import { ArrowRight, BadgeCheck } from "lucide-react";

import { BRAND, Button, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useTranslation } from "../../../I18n";
import { getDonationCopy } from "../data";

type Props = {
  onContinue: () => void;
};

/**
 * Final screen (spec §7). Deliberately sober: a single quiet check, no
 * confetti, no exclamation - the pedagogical pact continues.
 */
export const DonationThankYou: FC<Props> = ({ onContinue }) => {
  const { colors } = usePageTheme();
  const { language } = useTranslation();
  const copy = getDonationCopy(language);

  const accent = colors.amber.text.secondary;

  const titleStyle: CSSProperties = {
    margin: 0,
    fontFamily: BRAND.fonts.mono,
    fontSize: "1.1rem",
    fontWeight: 500,
    color: colors.base.text.primary,
    textAlign: "center",
  };

  const bodyStyle: CSSProperties = {
    margin: 0,
    fontSize: BRAND.fontSize.body,
    lineHeight: 1.65,
    color: colors.base.text.secondary,
    textAlign: "center",
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}
      data-donation-screen="thank-you"
    >
      <span
        style={{
          display: "inline-flex",
          color: accent,
          background: withOpacity(accent, 0.12),
          borderRadius: "50%",
          padding: "0.6rem",
        }}
      >
        <BadgeCheck size={24} strokeWidth={2} />
      </span>
      <h3 style={titleStyle}>{copy.thankYou.title}</h3>
      <p style={bodyStyle}>{copy.thankYou.body1}</p>
      <p style={bodyStyle}>{copy.thankYou.body2}</p>
      <Button
        variant="primary"
        color={accent}
        icon={<ArrowRight size={15} strokeWidth={2.2} />}
        iconPosition="right"
        onClick={onContinue}
      >
        {copy.thankYou.continue}
      </Button>
    </div>
  );
};
