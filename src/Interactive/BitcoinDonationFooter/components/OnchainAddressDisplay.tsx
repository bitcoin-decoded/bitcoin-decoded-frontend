import { type CSSProperties, type FC } from "react";

import { AlertTriangle, ArrowLeft } from "lucide-react";

import { BRAND, Button, FeedbackPanel, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useTranslation } from "../../../I18n";
import { DONATION_CONFIG, getDonationCopy } from "../data";
import {
  buildBip21Uri,
  estimateOnchainFeeSats,
  eurToBtc,
  formatBtc,
  formatEur,
  formatSats,
  isDonationConfigured,
  satsToEur,
} from "../helpers";
import { useBtcRate, useNetworkFees } from "../hooks";

import { CopyButton } from "./CopyButton";
import { DonationQrCode } from "./DonationQrCode";

type Props = {
  amountEur: number | null;
  onBack: () => void;
  onSent: () => void;
};

/** Step 2, on-chain (spec §5.2). */
export const OnchainAddressDisplay: FC<Props> = ({ amountEur, onBack, onSent }) => {
  const { colors } = usePageTheme();
  const { language } = useTranslation();
  const copy = getDonationCopy(language);
  const localeTag = language === "fr" ? "fr-FR" : "en-US";

  const { rate } = useBtcRate();
  const { fees } = useNetworkFees();

  const address = DONATION_CONFIG.onchainAddress;
  const configured = isDonationConfigured(address);

  const btc = rate && amountEur ? eurToBtc(amountEur, rate.eurPerBtc) : null;
  const bip21 = btc !== null ? buildBip21Uri(address, btc) : `bitcoin:${address}`;
  const feeSats = fees ? estimateOnchainFeeSats(fees.halfHourFeeSatPerVb) : null;
  const feeEur = feeSats !== null && rate ? satsToEur(feeSats, rate.eurPerBtc) : null;
  // Informative nudge when fees eat a big chunk of a small donation (spec §2.4).
  const highFees = feeEur !== null && amountEur !== null && feeEur > 0.33 * amountEur;

  const titleStyle: CSSProperties = {
    margin: 0,
    fontFamily: BRAND.fonts.mono,
    fontSize: "1.05rem",
    fontWeight: 700,
    color: colors.base.text.primary,
    textAlign: "center",
  };
  const metaStyle: CSSProperties = { fontSize: "0.78rem", color: colors.base.text.secondary };
  const mutedSmall: CSSProperties = {
    fontSize: "0.72rem",
    color: withOpacity(colors.base.text.secondary, 0.85),
    textAlign: "center",
  };

  const backButton = (
    <Button
      variant="ghost"
      size="sm"
      icon={<ArrowLeft size={14} strokeWidth={2.2} />}
      onClick={onBack}
      style={{ alignSelf: "flex-start", paddingLeft: 0 }}
    >
      {copy.amount.back}
    </Button>
  );

  if (!configured) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {backButton}
        <h3 style={titleStyle}>{copy.onchain.title}</h3>
        <FeedbackPanel tone="info">{copy.notConfigured}</FeedbackPanel>
      </div>
    );
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "0.85rem", alignItems: "center" }}
      data-donation-screen="onchain"
    >
      <div style={{ width: "100%" }}>{backButton}</div>
      <h3 style={titleStyle}>{copy.onchain.title}</h3>

      <DonationQrCode value={bip21} ariaLabel={copy.onchain.qrAria} size={196} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          width: "100%",
          padding: "0.5rem 0.6rem",
          borderRadius: "0.6rem",
          background: withOpacity(colors.base.text.secondary, 0.05),
          border: `1px solid ${withOpacity(colors.base.border.secondary, 0.3)}`,
        }}
      >
        <span
          style={{
            fontFamily: BRAND.fonts.mono,
            fontSize: "0.72rem",
            color: colors.base.text.primary,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            minWidth: 0,
            flex: 1,
          }}
          title={address}
        >
          {address}
        </span>
        <CopyButton value={address} copyLabel={copy.copy} copiedLabel={copy.copied} />
      </div>

      {amountEur !== null && (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.1rem", alignItems: "center" }}
        >
          <span style={metaStyle}>{copy.onchain.suggested(formatEur(amountEur, localeTag))}</span>
          {btc !== null && <span style={metaStyle}>{copy.onchain.approxBtc(formatBtc(btc))}</span>}
        </div>
      )}

      {feeSats !== null && feeEur !== null ? (
        <>
          <FeedbackPanel tone="warning" icon={<AlertTriangle size={14} strokeWidth={2.2} />}>
            {copy.onchain.feeWarning(formatSats(feeSats, localeTag), formatEur(feeEur, localeTag))}
          </FeedbackPanel>
          {highFees && (
            <p style={{ ...mutedSmall, color: colors.semantic.warning.text, fontStyle: "italic" }}>
              {copy.onchain.highFeesWarning}
            </p>
          )}
        </>
      ) : (
        <p style={mutedSmall}>{copy.onchain.feesUnavailable}</p>
      )}

      <p style={{ ...mutedSmall, lineHeight: 1.55, margin: 0 }}>{copy.onchain.reassurance}</p>

      <Button variant="secondary" fullWidth onClick={onSent}>
        {copy.onchain.sent}
      </Button>
    </div>
  );
};
