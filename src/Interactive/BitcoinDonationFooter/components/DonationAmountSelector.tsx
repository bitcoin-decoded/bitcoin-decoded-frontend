import { type CSSProperties, type FC, useState } from "react";

import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

import { Button, FeedbackPanel, useBreakpoint, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useTranslation } from "../../../I18n";
import { getDonationCopy, PRESET_AMOUNTS } from "../data";
import { estimateOnchainFeeSats, eurToSats, formatEur, formatSats, satsToEur } from "../helpers";
import { useBtcRate, useNetworkFees } from "../hooks";
import type { DonationGate } from "../types";

type Props = {
  gate: DonationGate;
  amountEur: number | null;
  onAmount: (eur: number | null) => void;
  onProceed: () => void;
  onBack: () => void;
  onSwitchToLightning: () => void;
};

/** Step 1 (spec §4.1 / §5.1), shared by the Lightning and on-chain gates. */
export const DonationAmountSelector: FC<Props> = ({
  gate,
  amountEur,
  onAmount,
  onProceed,
  onBack,
  onSwitchToLightning,
}) => {
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const { language } = useTranslation();
  const copy = getDonationCopy(language);
  const localeTag = language === "fr" ? "fr-FR" : "en-US";

  const { rate, loading, error, refresh, isStale } = useBtcRate();
  const { fees } = useNetworkFees();

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
  const feeSats = fees ? estimateOnchainFeeSats(fees.halfHourFeeSatPerVb) : null;
  const feeEur = feeSats !== null && rate ? satsToEur(feeSats, rate.eurPerBtc) : null;
  const belowThreshold =
    gate === "onchain" && amountEur !== null && feeEur !== null && amountEur < 3 * feeEur;

  const canProceed = amountEur !== null && amountEur > 0;
  const proceedLabel = gate === "lightning" ? copy.amount.generateInvoice : copy.amount.showAddress;

  const titleStyle: CSSProperties = {
    margin: 0,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "1.05rem",
    fontWeight: 700,
    color: colors.base.text.primary,
    textAlign: "center",
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

      <h3 style={titleStyle}>{copy.amount.title}</h3>

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
          {error && !rate && null}
        </div>
      )}

      <p style={{ ...mutedSmall, textAlign: "center", margin: 0, lineHeight: 1.5 }}>
        {copy.amount.disclaimer}
      </p>

      {belowThreshold && (
        <FeedbackPanel tone="warning" icon={<AlertTriangle size={14} strokeWidth={2.2} />}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              alignItems: "flex-start",
            }}
          >
            <span>{copy.onchain.thresholdWarning}</span>
            <Button variant="secondary" size="sm" onClick={onSwitchToLightning}>
              {copy.onchain.switchToLightning}
            </Button>
          </div>
        </FeedbackPanel>
      )}

      <Button
        variant="primary"
        color={accent}
        fullWidth
        disabled={!canProceed}
        onClick={onProceed}
        style={{ marginTop: isMobile ? "0.1rem" : "0.25rem" }}
      >
        {proceedLabel}
      </Button>
    </div>
  );
};
