import { type CSSProperties, type FC, useState } from "react";

import { ArrowLeft, HelpCircle, RefreshCw } from "lucide-react";

import { Button, useBreakpoint, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useTranslation } from "../../../I18n";
import { getDonationCopy, PRESET_AMOUNTS } from "../data";
import { eurToSats, formatEur, formatSats } from "../helpers";
import { useBtcRate } from "../hooks";

type Props = {
  amountEur: number | null;
  onAmount: (eur: number | null) => void;
  onProceed: () => void;
  onBack: () => void;
  onNoWallet: () => void;
};

/** Step 1 (spec §4.1 / §5.1): pick an amount, then proceed to the on-chain address. */
export const DonationAmountSelector: FC<Props> = ({
  amountEur,
  onAmount,
  onProceed,
  onBack,
  onNoWallet,
}) => {
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const { language } = useTranslation();
  const copy = getDonationCopy(language);
  const localeTag = language === "fr" ? "fr-FR" : "en-US";

  const { rate, loading, refresh, isStale } = useBtcRate();

  const [customStr, setCustomStr] = useState("");

  const accent = colors.amber.text.secondary;
  const isPresetActive = (preset: number) => amountEur === preset && customStr === "";

  const selectPreset = (preset: number) => {
    setCustomStr("");
    onAmount(preset);
  };

  const onCustomChange = (raw: string) => {
    setCustomStr(raw);
    const parsed = Number(raw.replace(",", "."));
    onAmount(raw !== "" && parsed > 0 ? parsed : null);
  };

  const sats = rate && amountEur ? eurToSats(amountEur, rate.eurPerBtc) : null;
  const canProceed = amountEur !== null && amountEur > 0;

  const titleStyle: CSSProperties = {
    margin: 0,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "1.05rem",
    fontWeight: 700,
    color: colors.base.text.primary,
    textAlign: "center",
  };

  const leadStyle: CSSProperties = {
    margin: 0,
    textAlign: "center",
    fontSize: isMobile ? "0.92rem" : "0.98rem",
    lineHeight: 1.45,
    color: withOpacity(colors.base.text.secondary, 0.95),
  };

  const presetBtn = (active: boolean): CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    gap: "0.1rem",
    alignItems: "center",
    padding: "0.6rem 0.5rem",
    borderRadius: "0.7rem",
    cursor: "pointer",
    background: active ? withOpacity(accent, 0.14) : withOpacity(colors.base.text.secondary, 0.03),
    border: `1px solid ${withOpacity(accent, active ? 0.6 : 0.2)}`,
    transition: "all 0.15s var(--ease-smooth)",
  });

  const inputStyle: CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "0.6rem 0.8rem",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.9rem",
    color: colors.base.text.primary,
    background: withOpacity(colors.base.text.secondary, 0.04),
    border: `1px solid ${withOpacity(accent, customStr !== "" ? 0.6 : 0.22)}`,
    borderRadius: "0.7rem",
    outline: "none",
  };

  const mutedSmall: CSSProperties = {
    fontSize: "0.72rem",
    color: withOpacity(colors.base.text.secondary, 0.85),
  };

  const noWalletLinkStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    alignSelf: "center",
    background: "transparent",
    border: "none",
    padding: "0.3rem 0.6rem",
    color: accent,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.82rem",
    fontWeight: 600,
    letterSpacing: "0.02em",
    textDecoration: "underline",
    textDecorationColor: withOpacity(accent, 0.45),
    textUnderlineOffset: "3px",
    cursor: "pointer",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
      <Button
        variant="ghost"
        size="sm"
        icon={<ArrowLeft size={14} strokeWidth={2.2} />}
        onClick={onBack}
        style={{ alignSelf: "flex-start", paddingLeft: 0 }}
      >
        {copy.amount.back}
      </Button>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        <p style={leadStyle}>{copy.amount.lead}</p>
        <h3 style={titleStyle}>{copy.amount.title}</h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.6rem" }}>
        {PRESET_AMOUNTS.map((preset) => (
          <button
            key={preset}
            type="button"
            style={presetBtn(isPresetActive(preset))}
            onClick={() => selectPreset(preset)}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "1rem",
                fontWeight: 700,
                color: colors.base.text.primary,
              }}
            >
              {preset} €
            </span>
            {copy.amount.presetSubs[preset] && (
              <span style={{ fontSize: "0.68rem", color: colors.base.text.secondary }}>
                {copy.amount.presetSubs[preset]}
              </span>
            )}
          </button>
        ))}
      </div>

      <input
        type="text"
        inputMode="decimal"
        value={customStr}
        placeholder={copy.amount.customPlaceholder}
        onChange={(e) => onCustomChange(e.target.value)}
        aria-label={copy.amount.customPlaceholder}
        style={inputStyle}
      />

      {canProceed && (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.2rem", alignItems: "center" }}
        >
          {rate ? (
            <>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: accent,
                }}
              >
                {copy.amount.satsApprox(formatSats(sats ?? 0, localeTag))}
              </div>
              <div
                style={{
                  ...mutedSmall,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <span>{copy.amount.rateLine(formatEur(rate.eurPerBtc, localeTag, 0))}</span>
                <button
                  type="button"
                  onClick={refresh}
                  aria-label={copy.amount.refreshRate}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    background: "transparent",
                    border: "none",
                    color: accent,
                    cursor: "pointer",
                    fontSize: "0.7rem",
                    padding: 0,
                  }}
                >
                  <RefreshCw
                    size={12}
                    strokeWidth={2.2}
                    className={loading ? "donation-spin" : undefined}
                  />
                </button>
                {isStale && (
                  <span style={{ ...mutedSmall, fontStyle: "italic", opacity: 0.8 }}>
                    {copy.amount.rateOutdated}
                  </span>
                )}
              </div>
            </>
          ) : (
            <div
              style={{ ...mutedSmall, display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            >
              <span>{loading ? "…" : copy.amount.rateUnavailable}</span>
              <button
                type="button"
                onClick={refresh}
                aria-label={copy.amount.refreshRate}
                style={{
                  display: "inline-flex",
                  background: "transparent",
                  border: "none",
                  color: accent,
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <RefreshCw
                  size={12}
                  strokeWidth={2.2}
                  className={loading ? "donation-spin" : undefined}
                />
              </button>
            </div>
          )}
        </div>
      )}

      <p style={{ ...mutedSmall, textAlign: "center", margin: 0, lineHeight: 1.5 }}>
        {copy.amount.disclaimer}
      </p>

      <button
        type="button"
        className="donation-link"
        style={noWalletLinkStyle}
        onClick={onNoWallet}
      >
        <HelpCircle size={14} strokeWidth={2} />
        {copy.gate.noWalletLink}
      </button>

      <Button
        variant="primary"
        color={accent}
        fullWidth
        disabled={!canProceed}
        onClick={onProceed}
        style={{ marginTop: isMobile ? "0.1rem" : "0.25rem" }}
      >
        {copy.amount.showAddress}
      </Button>
    </div>
  );
};
