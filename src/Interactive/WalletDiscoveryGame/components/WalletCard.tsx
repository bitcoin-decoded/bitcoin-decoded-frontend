import { type CSSProperties, type FC } from "react";

import { BRAND, getTypography, withOpacity } from "../../../Design";
import { fmtBTC, truncateHash } from "../../helpers";
import type { WalletCardData } from "../types";

import { Coins, KeyRound, Lock, MapPin } from "@icons";

type Props = {
  card: WalletCardData;
  index: number;
  selected: boolean;
  highlightAsAnswer?: boolean;
  highlightAsWrong?: boolean;
  onSelect: (id: number) => void;
  addressPrefix: string;
  privateKeyLabel: string;
  publicKeyLabel: string;
  addressLabel: string;
  utxosLabel: string;
  noUtxosLabel: string;
  utxoPrefix: string;
  accentColor: string;
  successColor: string;
  errorColor: string;
  basePrimaryText: string;
  baseTextSecondary: string;
  baseBorderSecondary: string;
  baseBackgroundSecondary: string;
};

export const WalletCard: FC<Props> = ({
  card,
  index,
  selected,
  highlightAsAnswer,
  highlightAsWrong,
  onSelect,
  addressPrefix,
  privateKeyLabel,
  publicKeyLabel,
  addressLabel,
  utxosLabel,
  noUtxosLabel,
  utxoPrefix,
  accentColor,
  successColor,
  errorColor,
  basePrimaryText,
  baseTextSecondary,
  baseBorderSecondary,
  baseBackgroundSecondary,
}) => {
  const typo = getTypography();
  const borderOpacity = highlightAsAnswer || highlightAsWrong || selected ? 0.55 : 0.2;
  const bgTint = highlightAsAnswer
    ? withOpacity(successColor, 0.06)
    : highlightAsWrong
      ? withOpacity(errorColor, 0.06)
      : selected
        ? withOpacity(accentColor, 0.04)
        : withOpacity(baseBackgroundSecondary, 0.02);

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    padding: "0.85rem 0.9rem",
    borderRadius: 0,
    border: `1px solid ${withOpacity(
      highlightAsAnswer
        ? successColor
        : highlightAsWrong
          ? errorColor
          : selected
            ? accentColor
            : baseBorderSecondary,
      borderOpacity,
    )}`,
    background: bgTint,
    cursor: "pointer",
    minWidth: 0,
    boxSizing: "border-box",
    transition: "all 0.25s var(--ease-smooth)",
    textAlign: "left",
    fontFamily: "inherit",
    color: "inherit",
  };

  const headerRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
  };

  const headerLabelStyle: CSSProperties = {
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.06em",
    color: selected || highlightAsAnswer ? accentColor : withOpacity(baseTextSecondary, 0.7),
  };

  const utxoBadgeStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    padding: "0.2rem 0.4rem",
    borderRadius: 0,
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: card.utxos.length > 0 ? accentColor : withOpacity(baseTextSecondary, 0.55),
    background:
      card.utxos.length > 0
        ? withOpacity(accentColor, 0.1)
        : withOpacity(baseBorderSecondary, 0.05),
    border: `1px solid ${withOpacity(
      card.utxos.length > 0 ? accentColor : baseBorderSecondary,
      card.utxos.length > 0 ? 0.3 : 0.15,
    )}`,
    whiteSpace: "nowrap",
  };

  const fieldRowStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.15rem",
    minWidth: 0,
  };

  const fieldLabelStyle = (color: string): CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.06em",
    color,
  });

  const fieldValueStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    color: basePrimaryText,
    wordBreak: "break-all",
  };

  const utxoItemStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.4rem",
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.micro.fontSize,
    padding: "0.3rem 0.45rem",
    borderRadius: 0,
    background: withOpacity(accentColor, 0.06),
    border: `1px solid ${withOpacity(accentColor, 0.18)}`,
    color: basePrimaryText,
  };

  const utxoEmptyStyle: CSSProperties = {
    fontStyle: "italic",
    fontSize: typo.micro.fontSize,
    color: withOpacity(baseTextSecondary, 0.6),
    padding: "0.3rem 0.1rem",
  };

  return (
    <button type="button" onClick={() => onSelect(card.id)} style={containerStyle}>
      <div style={headerRowStyle}>
        <span style={headerLabelStyle}>
          {addressPrefix} #{index + 1}
        </span>
        <span style={utxoBadgeStyle}>
          <Coins size={12} strokeWidth={2.5} />
          {card.utxos.length} UTXO
        </span>
      </div>

      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle(withOpacity(errorColor, 0.85))}>
          <Lock size={12} strokeWidth={2.5} /> {privateKeyLabel}
        </span>
        <span style={fieldValueStyle}>{truncateHash(card.privateKey)}</span>
      </div>

      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle(withOpacity(accentColor, 0.85))}>
          <KeyRound size={12} strokeWidth={2.5} /> {publicKeyLabel}
        </span>
        <span style={fieldValueStyle}>{truncateHash(card.publicKey)}</span>
      </div>

      <div style={fieldRowStyle}>
        <span style={fieldLabelStyle(withOpacity(basePrimaryText, 0.7))}>
          <MapPin size={12} strokeWidth={2.5} /> {addressLabel}
        </span>
        <span style={fieldValueStyle}>{card.address}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", minWidth: 0 }}>
        <span style={fieldLabelStyle(withOpacity(baseTextSecondary, 0.7))}>{utxosLabel}</span>
        {card.utxos.length === 0 ? (
          <span style={utxoEmptyStyle}>{noUtxosLabel}</span>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            {card.utxos.map((u, i) => (
              <div key={u.id} style={utxoItemStyle}>
                <span style={{ opacity: 0.7 }}>
                  {utxoPrefix} #{i + 1}
                </span>
                <span style={{ fontWeight: 500 }}>{fmtBTC(u.amount)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </button>
  );
};
