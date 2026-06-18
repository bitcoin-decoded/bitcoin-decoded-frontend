import { type CSSProperties, type FC } from "react";

import {
  Banknote,
  Building2,
  ChevronDown,
  Handshake,
  HardDrive,
  Hourglass,
  Landmark,
  type LucideIcon,
  Smartphone,
  TrendingUp,
} from "lucide-react";

import { Caption, SurfaceCard, useDisclosure, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import type { PathFinderCopy } from "../data";
import type { SectionPlan, SubCategoryId, WalletSection } from "../types";

import { SubCategoryRow } from "./SubCategoryRow";

const ICON_BY_SECTION: Record<WalletSection, LucideIcon> = {
  acquisition: TrendingUp,
  detention: Hourglass,
};

const ICON_BY_SUB: Record<SubCategoryId, LucideIcon> = {
  exchange: Building2,
  p2p: Handshake,
  atm: Banknote,
  custodial: Landmark,
  hot: Smartphone,
  cold: HardDrive,
};

type Props = {
  plan: SectionPlan;
  copy: PathFinderCopy;
  accent: string;
};

export const SectionCard: FC<Props> = ({ plan, copy, accent }) => {
  const { colors } = usePageTheme();
  const { t } = useTranslation();
  const { isOpen, toggle } = useDisclosure(false);
  const SectionIcon = ICON_BY_SECTION[plan.section];

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    width: "100%",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    padding: 0,
  };

  const stepBadgeStyle: CSSProperties = {
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    padding: "0.32rem 0.65rem",
    borderRadius: "999px",
    background: withOpacity(accent, 0.14),
    border: `1px solid ${withOpacity(accent, 0.45)}`,
    color: accent,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.64rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    whiteSpace: "nowrap",
  };

  const chevronStyle: CSSProperties = {
    marginLeft: "auto",
    flexShrink: 0,
    color: withOpacity(colors.base.text.secondary, 0.7),
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.3s var(--ease-smooth)",
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateRows: isOpen ? "1fr" : "0fr",
    transition: "grid-template-rows 0.35s var(--ease-smooth)",
  };

  const bodyWrapStyle: CSSProperties = { overflow: "hidden", minHeight: 0 };

  const listStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
    paddingTop: "1rem",
  };

  return (
    <SurfaceCard glowColor={accent} size="lg" gap="0">
      <button type="button" style={headerStyle} onClick={toggle} aria-expanded={isOpen}>
        <span style={stepBadgeStyle}>
          {t("pathFinder.step")} {plan.step}
        </span>
        <Caption
          size="md"
          color={accent}
          icon={<SectionIcon size={18} strokeWidth={2} />}
          style={{ letterSpacing: "0.05em" }}
        >
          {plan.label}
        </Caption>
        <ChevronDown size={20} strokeWidth={2.2} style={chevronStyle} />
      </button>

      <div style={gridStyle}>
        <div style={bodyWrapStyle}>
          <div style={listStyle}>
            {plan.subCategories.map((item) => (
              <SubCategoryRow
                key={item.id}
                item={item}
                icon={ICON_BY_SUB[item.id]}
                copy={copy}
                accent={accent}
              />
            ))}
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
};
