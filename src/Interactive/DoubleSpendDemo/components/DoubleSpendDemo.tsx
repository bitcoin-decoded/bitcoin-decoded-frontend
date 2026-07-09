import { type CSSProperties, type FC, type ReactNode } from "react";

import { Badge, BRAND, Button, Caption, FeedbackPanel, getTypography, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { BRANCHES, CITIES } from "../data";
import { useDoubleSpendDemo } from "../hooks";
import type { Branch, TxId } from "../types";

import {
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  Coins,
  Eye,
  Monitor,
  RotateCcw,
  User,
  Wallet,
} from "@icons";

type Props = {
  scrollTargetId?: string;
  /** Fired once the reader propagates the double-spend (gates the tool block). */
  onComplete?: () => void;
};

export const DoubleSpendDemo: FC<Props> = ({ scrollTargetId, onComplete }) => {
  const typo = getTypography();
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];

  const { phase, nodeFirstSeen, reveal, reset } = useDoubleSpendDemo(onComplete);
  const propagated = phase === "propagated";

  const accents: Record<TxId, string> = {
    a: colors.semantic.info.text, // cyan
    b: colors.violet.text.secondary, // violet
  };

  const mono: CSSProperties = { fontFamily: BRAND.fonts.mono };

  // ── styles ────────────────────────────────────────────────────────────
  const nicolasRow: CSSProperties = {
    display: "flex",
    justifyContent: "center",
  };

  const forkRow: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    placeItems: "center",
    columnGap: isMobile ? "0.75rem" : "2rem",
    marginTop: "-0.25rem",
  };

  const branchesGrid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: isMobile ? "0.75rem" : "2rem",
  };

  const branchColumn: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.4rem",
  };

  const partyCard = (accent: string): CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.25rem",
    padding: isMobile ? "0.6rem 0.5rem" : "0.75rem 1rem",
    borderRadius: 0,
    background: withOpacity(accent, 0.06),
    border: `1px solid ${withOpacity(accent, 0.25)}`,
    width: "100%",
  });

  const partyLabel: CSSProperties = {
    ...mono,
    fontSize: typo.note.fontSize,
    fontWeight: 500,
    color: colors.base.text.primary,
  };

  const txBlock = (accent: string): CSSProperties => ({
    ...mono,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.15rem",
    fontSize: typo.micro.fontSize,
    lineHeight: 1.35,
    color: accent,
    textAlign: "center",
  });

  const txTitle: CSSProperties = {
    fontWeight: 500,
    letterSpacing: "0.04em",
    fontVariant: "small-caps",
    fontSize: typo.micro.fontSize,
  };

  const txOrigin: CSSProperties = {
    color: colors.base.text.secondary,
    fontSize: typo.micro.fontSize,
    letterSpacing: "0.04em",
    fontVariant: "small-caps",
    opacity: 0.85,
  };

  const pinchNotice: CSSProperties = {
    ...mono,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    fontSize: typo.micro.fontSize,
    color: colors.base.text.secondary,
    padding: "0.5rem 0.75rem",
    borderRadius: 0,
    background: withOpacity(world.background.secondary, 0.06),
    border: `1px dashed ${withOpacity(world.border.secondary, 0.3)}`,
    textAlign: "center",
  };

  const nodesGrid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
    gap: "0.6rem",
  };

  const nodeCard = (accent: string): CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.35rem",
    padding: "0.65rem 0.4rem",
    borderRadius: 0,
    background: withOpacity(accent, 0.04),
    border: `1px solid ${withOpacity(accent, 0.22)}`,
    transition: "all 0.4s var(--ease-smooth)",
  });

  const ctaRow: CSSProperties = {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "center",
    flexWrap: "wrap",
  };

  const continueForward = () => {
    if (!scrollTargetId) return;
    document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ── render helpers ────────────────────────────────────────────────────
  const renderBranch = (branch: Branch) => {
    const accent = accents[branch.id];
    return (
      <div key={branch.id} style={branchColumn}>
        <div style={txBlock(accent)}>
          <span style={txTitle}>{t(branch.labelKey)}</span>
          <span style={txOrigin}>
            {t("doubleSpend.signedFrom")} {t(branch.originKey)}
          </span>
          <span>{t("doubleSpend.amount")}</span>
        </div>
        <ArrowDown size={16} strokeWidth={2} color={accent} />
        <div style={partyCard(accent)}>
          <Wallet size={isMobile ? 18 : 22} strokeWidth={1.5} color={accent} />
          <span style={partyLabel}>{t(branch.recipientKey)}</span>
        </div>
      </div>
    );
  };

  const renderNode = (city: string, i: number) => {
    const txId = nodeFirstSeen[i];
    const accent = accents[txId];
    const branch = BRANCHES.find((b) => b.id === txId)!;
    return (
      <div key={city} style={nodeCard(accent)}>
        <Monitor size={isMobile ? 18 : 20} strokeWidth={1.5} color={accent} />
        <span
          style={{
            ...mono,
            fontSize: typo.micro.fontSize,
            fontWeight: 500,
            color: colors.base.text.primary,
          }}
        >
          {city}
        </span>
        <Badge
          tone="neutral"
          size="xs"
          style={{
            background: withOpacity(accent, 0.12),
            color: accent,
            border: `1px solid ${withOpacity(accent, 0.3)}`,
          }}
        >
          → {t(branch.recipientKey)}
        </Badge>
      </div>
    );
  };

  // ── render ────────────────────────────────────────────────────────────
  const captionIcon: ReactNode = <Coins size={isMobile ? 16 : 18} strokeWidth={2} />;

  return (
    <SurfaceCard
      glowColor={propagated ? colors.semantic.error.border : world.border.secondary}
      margin={isMobile ? "1.5rem 0" : "2rem 0"}
    >
      <Caption tone="world" size="md" icon={captionIcon}>
        {t("doubleSpend.title")}
      </Caption>

      {/* Single Nicolas at the top - one person, two broadcasts below. */}
      <div style={nicolasRow}>
        <div
          style={{ ...partyCard(colors.base.border.secondary), width: isMobile ? "60%" : "40%" }}
        >
          <User size={isMobile ? 18 : 22} strokeWidth={1.5} color={colors.base.text.secondary} />
          <span style={partyLabel}>{t("doubleSpend.sender")}</span>
        </div>
      </div>

      {/* Fork: two diagonal arrows showing the broadcast splits. */}
      <div style={forkRow}>
        <ArrowDownLeft size={20} strokeWidth={2} color={accents.a} />
        <ArrowDownRight size={20} strokeWidth={2} color={accents.b} />
      </div>

      <div style={branchesGrid}>{BRANCHES.map(renderBranch)}</div>

      <div style={pinchNotice}>
        <Coins size={12} strokeWidth={2} />
        {t("doubleSpend.pinch")}
      </div>

      {!propagated && (
        <div style={ctaRow}>
          <Button variant="primary" icon={<Eye size={14} strokeWidth={2} />} onClick={reveal}>
            {t("doubleSpend.revealAction")}
          </Button>
        </div>
      )}

      {propagated && (
        <>
          <Caption tone="muted" size="sm">
            {t("doubleSpend.firstSeenLabel")}
          </Caption>
          <div style={nodesGrid}>{CITIES.map(renderNode)}</div>

          <FeedbackPanel tone="error" title={t("doubleSpend.verdictTitle")}>
            {t("doubleSpend.verdictBody")}
          </FeedbackPanel>

          <div style={ctaRow}>
            <Button
              variant="secondary"
              icon={<RotateCcw size={14} strokeWidth={2} />}
              onClick={reset}
            >
              {t("doubleSpend.reset")}
            </Button>
            <Button
              variant="primary"
              icon={<ArrowDown size={14} strokeWidth={2} />}
              onClick={continueForward}
            >
              {t("doubleSpend.continue")}
            </Button>
          </div>
        </>
      )}
    </SurfaceCard>
  );
};
