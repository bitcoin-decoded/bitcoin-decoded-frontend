import { type CSSProperties, type FC } from "react";

import { ArrowLeft, ExternalLink, Loader } from "lucide-react";

import { Button, FeedbackPanel, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useTranslation } from "../../../I18n";
import { DONATION_CONFIG, getDonationCopy } from "../data";
import { eurToSats, formatEur, formatSats, isDonationConfigured } from "../helpers";
import { useBtcRate, useCountdown, useLightningInvoice } from "../hooks";

import { CopyButton } from "./CopyButton";
import { DonationQrCode } from "./DonationQrCode";

type Props = {
  amountEur: number | null;
  onBack: () => void;
  onPaid: () => void;
};

/** Step 2, Lightning (spec §4.2 / §4.3). */
export const LightningInvoiceDisplay: FC<Props> = ({ amountEur, onBack, onPaid }) => {
  const { colors } = usePageTheme();
  const { language } = useTranslation();
  const copy = getDonationCopy(language);
  const localeTag = language === "fr" ? "fr-FR" : "en-US";

  const { rate } = useBtcRate();
  const lnAddress = DONATION_CONFIG.lightningAddress;
  const configured = isDonationConfigured(lnAddress);

  const amountSats = rate && amountEur ? eurToSats(amountEur, rate.eurPerBtc) : 0;
  const { invoice, loading, error } = useLightningInvoice(
    lnAddress,
    amountSats,
    configured && amountSats > 0,
  );
  const { mmss } = useCountdown(invoice?.expiresAt ?? null);

  const accent = colors.amber.text.secondary;

  const titleStyle: CSSProperties = {
    margin: 0,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "1.05rem",
    fontWeight: 700,
    color: colors.base.text.primary,
    textAlign: "center",
  };

  const monoTruncate: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.72rem",
    color: colors.base.text.primary,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0,
    flex: 1,
  };

  const metaStyle: CSSProperties = { fontSize: "0.78rem", color: colors.base.text.secondary };

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
        <h3 style={titleStyle}>{copy.lightning.title}</h3>
        <FeedbackPanel tone="info">{copy.notConfigured}</FeedbackPanel>
      </div>
    );
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "0.85rem", alignItems: "center" }}
      data-donation-screen="lightning"
    >
      <div style={{ width: "100%" }}>{backButton}</div>
      <h3 style={titleStyle}>{copy.lightning.title}</h3>

      {loading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.6rem",
            padding: "1rem 0",
            color: colors.base.text.secondary,
          }}
        >
          <Loader size={22} strokeWidth={2} className="donation-spin" />
          <span style={metaStyle}>{copy.lightning.generating}</span>
        </div>
      )}

      {!loading && invoice && (
        <>
          <DonationQrCode value={invoice.bolt11} ariaLabel={copy.lightning.qrAria} size={196} />
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
            <span style={monoTruncate} title={invoice.bolt11}>
              {invoice.bolt11}
            </span>
            <CopyButton value={invoice.bolt11} copyLabel={copy.copy} copiedLabel={copy.copied} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.15rem",
              alignItems: "center",
            }}
          >
            <span style={metaStyle}>
              {copy.lightning.amountMeta(
                formatEur(amountEur ?? 0, localeTag),
                formatSats(invoice.amountSats, localeTag),
              )}
            </span>
            {mmss && <span style={metaStyle}>{copy.lightning.expiresIn(mmss)}</span>}
          </div>
          <Button
            variant="primary"
            color={accent}
            fullWidth
            icon={<ExternalLink size={15} strokeWidth={2.2} />}
            onClick={() => {
              window.location.href = `lightning:${invoice.bolt11}`;
            }}
          >
            {copy.lightning.openWallet}
          </Button>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: colors.base.text.secondary,
            }}
          >
            <Loader size={14} strokeWidth={2} className="donation-spin" />
            <span style={metaStyle}>{copy.lightning.waiting}</span>
          </div>
        </>
      )}

      {!loading && !invoice && (
        <>
          {error && <FeedbackPanel tone="info">{copy.lightning.error}</FeedbackPanel>}
          <DonationQrCode value={lnAddress} ariaLabel={copy.lightning.qrAria} size={196} />
          <span style={{ ...metaStyle, textAlign: "center" }}>{copy.lightning.fallbackMsg}</span>
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
            <span style={monoTruncate} title={lnAddress}>
              {lnAddress}
            </span>
            <CopyButton value={lnAddress} copyLabel={copy.copy} copiedLabel={copy.copied} />
          </div>
        </>
      )}

      <Button variant="secondary" fullWidth onClick={onPaid}>
        {copy.lightning.paid}
      </Button>
    </div>
  );
};
