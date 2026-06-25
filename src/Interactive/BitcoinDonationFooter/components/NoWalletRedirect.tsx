import { type CSSProperties, type FC } from "react";

import { BookOpen } from "lucide-react";

import { BRAND, Button, Reference, usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { DONATION_CONFIG, getDonationCopy } from "../data";

type Props = {
  onClose: () => void;
};

/** Porte C (spec §6): no instructions, just redirect to the wallet chapter. */
export const NoWalletRedirect: FC<Props> = ({ onClose }) => {
  const { colors } = usePageTheme();
  const { language } = useTranslation();
  const copy = getDonationCopy(language);

  const titleStyle: CSSProperties = {
    margin: 0,
    fontFamily: BRAND.fonts.mono,
    fontSize: "1.05rem",
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
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
      <h3 style={titleStyle}>{copy.noWallet.title}</h3>
      <p style={bodyStyle}>{copy.noWallet.body1}</p>
      <p style={bodyStyle}>{copy.noWallet.body2}</p>

      <div style={{ fontSize: BRAND.fontSize.body, marginTop: "0.25rem" }}>
        <Reference to={DONATION_CONFIG.walletChapterRoute}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <BookOpen size={15} strokeWidth={2} />
            {copy.noWallet.readChapter}
          </span>
        </Reference>
      </div>

      <Button variant="secondary" size="sm" onClick={onClose}>
        {copy.noWallet.later}
      </Button>
    </div>
  );
};
