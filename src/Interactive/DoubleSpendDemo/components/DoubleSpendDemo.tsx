import { type CSSProperties, type FC } from "react";

import {
  Button,
  FeedbackPanel,
  getTypography,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { BRANCHES, CITIES } from "../data";
import { useDoubleSpendDemo } from "../hooks";
import type { Branch, TxId } from "../types";

import {
  DoodleCoinPurse,
  DoodleEyeNetwork,
  DoodleFaceMale,
  DoodleNodeLaptop,
  DoodleSmileyGrumpy,
} from "@doodle";
import { ArrowDown, ArrowDownLeft, ArrowDownRight } from "@icons";

const EASE = "0.4s var(--ease-smooth)";

type Props = {
  scrollTargetId?: string;
  onComplete?: () => void;
};

export const DoubleSpendDemo: FC<Props> = ({ scrollTargetId, onComplete }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const world = colors[moduleTheme];

  const { phase, nodeFirstSeen, reveal, reset } = useDoubleSpendDemo(onComplete);
  const propagated = phase === "propagated";

  const textPrimary = colors.base.text.primary;
  const textSecondary = colors.base.text.secondary;

  // One cool hue, one warm, carry the only thing colour needs to say here:
  // which of the two transactions a node happened to see first. Info-blue pairs
  // with the module's own amber (warning-orange fell below AA on the light
  // paper); neither is success / error, since neither transaction is the good
  // one.
  const accents: Record<TxId, string> = {
    a: colors.semantic.info.text,
    b: world.text.secondary,
  };

  const introStyle: CSSProperties = {
    ...typo.note,
    color: textSecondary,
    textAlign: "left",
    margin: 0,
  };

  const iconTint = withOpacity(textPrimary, 0.75);

  const partyCard = (accent: string, tint: number): CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.4rem",
    padding: isMobile ? "0.7rem 0.5rem" : "0.85rem 1rem",
    background: withOpacity(accent, tint),
    border: `1px solid ${withOpacity(accent, tint + 0.16)}`,
    width: "100%",
    boxSizing: "border-box",
    transition: `background ${EASE}, border-color ${EASE}`,
  });

  const partyLabel: CSSProperties = {
    ...typo.label,
    fontVariant: "small-caps",
    color: textPrimary,
    textAlign: "center",
  };

  const forkRow: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    placeItems: "center",
    columnGap: isMobile ? "0.75rem" : "2rem",
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
    gap: "0.5rem",
  };

  const txTitleStyle = (accent: string): CSSProperties => ({
    ...typo.micro,
    fontVariant: "small-caps",
    color: accent,
    textAlign: "center",
  });

  const txOriginStyle: CSSProperties = {
    ...typo.note,
    color: textSecondary,
    textAlign: "center",
  };

  const txAmountStyle = (accent: string): CSSProperties => ({
    ...typo.figure,
    color: accent,
    textAlign: "center",
  });

  const firstSeenLabel: CSSProperties = {
    ...typo.label,
    fontVariant: "small-caps",
    color: world.text.secondary,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
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
    gap: "0.4rem",
    padding: isMobile ? "0.65rem 0.4rem" : "0.75rem 0.5rem",
    background: withOpacity(accent, 0.05),
    border: `1px solid ${withOpacity(accent, 0.28)}`,
    transition: `background ${EASE}, border-color ${EASE}`,
  });

  const nodeCity: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    color: textPrimary,
  };

  const nodeRecipient = (accent: string): CSSProperties => ({
    ...typo.micro,
    color: accent,
    textAlign: "center",
  });

  const ctaRow: CSSProperties = {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "center",
    flexWrap: "wrap",
  };

  const iconSize = isMobile ? 26 : 30;

  const continueForward = () => {
    if (!scrollTargetId) return;
    document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderBranch = (branch: Branch) => {
    const accent = accents[branch.id];
    return (
      <div key={branch.id} style={branchColumn}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.1rem" }}>
          <span style={txTitleStyle(accent)}>{t(branch.labelKey)}</span>
          <span style={txOriginStyle}>
            {t("doubleSpend.signedFrom")} {t(branch.originKey)}
          </span>
          <span style={txAmountStyle(accent)}>{t("doubleSpend.amount")}</span>
        </div>
        <ArrowDown size={18} strokeWidth={1.75} color={withOpacity(accent, 0.7)} />
        <div style={partyCard(accent, 0.07)}>
          <DoodleCoinPurse size={iconSize} style={{ color: accent }} />
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
      <div key={city} className="page-enter" style={{ ...nodeCard(accent), animationDelay: `${i * 0.09}s` }}>
        <DoodleNodeLaptop size={isMobile ? 24 : 28} style={{ color: accent }} />
        <span style={nodeCity}>{city}</span>
        <span style={nodeRecipient(accent)}>{t(branch.recipientKey)}</span>
      </div>
    );
  };

  return (
    <SurfaceCard margin={isMobile ? "1.5rem 0" : "2rem 0"} gap="1.25rem">
      <p style={introStyle}>{t("doubleSpend.pinch")}</p>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ ...partyCard(textPrimary, 0.05), width: isMobile ? "60%" : "42%" }}>
          <DoodleFaceMale size={iconSize} style={{ color: iconTint }} />
          <span style={partyLabel}>{t("doubleSpend.sender")}</span>
        </div>
      </div>

      <div style={forkRow}>
        <ArrowDownLeft size={22} strokeWidth={1.75} color={withOpacity(accents.a, 0.7)} />
        <ArrowDownRight size={22} strokeWidth={1.75} color={withOpacity(accents.b, 0.7)} />
      </div>

      <div style={branchesGrid}>{BRANCHES.map(renderBranch)}</div>

      {!propagated && (
        <div style={ctaRow}>
          <Button variant="primary" onClick={reveal}>
            {t("doubleSpend.revealAction")}
          </Button>
        </div>
      )}

      {propagated && (
        <>
          <span style={firstSeenLabel}>
            <DoodleEyeNetwork size={isMobile ? 22 : 26} style={{ color: world.text.secondary, flexShrink: 0 }} />
            {t("doubleSpend.firstSeenLabel")}
          </span>
          <div style={nodesGrid}>{CITIES.map(renderNode)}</div>

          <FeedbackPanel
            tone="error"
            title={t("doubleSpend.verdictTitle")}
            icon={<DoodleSmileyGrumpy size={isMobile ? 22 : 26} />}
          >
            {t("doubleSpend.verdictBody")}
          </FeedbackPanel>

          <div style={ctaRow}>
            <Button variant="secondary" onClick={reset}>
              {t("doubleSpend.reset")}
            </Button>
            <Button variant="primary" onClick={continueForward}>
              {t("doubleSpend.continue")}
            </Button>
          </div>
        </>
      )}
    </SurfaceCard>
  );
};
