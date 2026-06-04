import { type FC } from "react";

import { Bitcoin, HelpCircle, type LucideIcon, Zap } from "lucide-react";

import { usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getDonationCopy } from "../data";
import type { DonationGate } from "../types";

import { GateButton } from "./GateButton";

type Props = {
  onSelect: (gate: DonationGate) => void;
};

type GateOption = { key: DonationGate; icon: LucideIcon; label: string; sub: string };

/** The initial three-door screen (spec §3.1). */
export const DonationGateSelector: FC<Props> = ({ onSelect }) => {
  const { colors } = usePageTheme();
  const { language } = useTranslation();
  const copy = getDonationCopy(language);

  const options: GateOption[] = [
    { key: "lightning", icon: Zap, label: copy.gate.lightningLabel, sub: copy.gate.lightningSub },
    { key: "onchain", icon: Bitcoin, label: copy.gate.onchainLabel, sub: copy.gate.onchainSub },
    {
      key: "no-wallet",
      icon: HelpCircle,
      label: copy.gate.noWalletLabel,
      sub: copy.gate.noWalletSub,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
      <div style={{ textAlign: "center", marginBottom: "0.3rem" }}>
        <h3
          style={{
            margin: 0,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "1.05rem",
            fontWeight: 700,
            color: colors.base.text.primary,
          }}
        >
          {copy.gate.title}
        </h3>
        <p
          style={{ margin: "0.35rem 0 0", fontSize: "0.85rem", color: colors.base.text.secondary }}
        >
          {copy.gate.subtitle}
        </p>
      </div>
      {options.map((option) => (
        <GateButton
          key={option.key}
          gateKey={option.key}
          icon={option.icon}
          label={option.label}
          sub={option.sub}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};
