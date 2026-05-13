import { type CSSProperties, type FC, type ReactNode } from "react";
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
} from "lucide-react";

import {
  Badge,
  Button,
  Caption,
  FeedbackPanel,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
} from "../../Design";
import { withOpacity } from "../../Design/helpers";
import { useLanguageContext } from "../../I18n";
import { useDoubleSpend, type TxId } from "../hooks";

type Branch = {
  id: TxId;
  labelFr: string;
  labelEn: string;
  recipientFr: string;
  recipientEn: string;
  originFr: string;
  originEn: string;
};

// Two parallel branches, each rooted at the same "Nicolas" (one person,
// two broadcast points) and ending on a different recipient.
const BRANCHES: readonly Branch[] = [
  {
    id: "a",
    labelFr: "Transaction A",
    labelEn: "Transaction A",
    recipientFr: "Christine L.",
    recipientEn: "Christine L.",
    originFr: "Paris",
    originEn: "Paris",
  },
  {
    id: "b",
    labelFr: "Transaction B",
    labelEn: "Transaction B",
    recipientFr: "Mme Michu",
    recipientEn: "Mrs. Smith",
    originFr: "Tokyo",
    originEn: "Tokyo",
  },
];

// Cities for the four network nodes — positions stay fixed across
// re-runs; only the first-seen TX assignment (driven by the hook) is
// shuffled.
const CITIES: readonly string[] = ["Tokyo", "Berlin", "Lagos", "São Paulo"];

export const DoubleSpendDemo: FC = () => {
  const { language } = useLanguageContext();
  const fr = language === "fr";
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];

  const { phase, nodeFirstSeen, reveal, reset } = useDoubleSpend();
  const propagated = phase === "propagated";

  // Two distinct, non-amber accents so each branch (and the node
  // badges that pick it up) reads as a separate identity against the
  // Bitcoin world.
  const accents: Record<TxId, string> = {
    a: colors.semantic.info.text,    // cyan
    b: colors.violet.text.secondary, // violet
  };

  const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

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
    borderRadius: "0.75rem",
    background: withOpacity(accent, 0.06),
    border: `1px solid ${withOpacity(accent, 0.25)}`,
    width: "100%",
  });

  const partyLabel: CSSProperties = {
    ...mono,
    fontSize: isMobile ? "0.7rem" : "0.78rem",
    fontWeight: 600,
    color: colors.base.text.primary,
  };

  const txBlock = (accent: string): CSSProperties => ({
    ...mono,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.15rem",
    fontSize: "0.62rem",
    lineHeight: 1.35,
    color: accent,
    textAlign: "center",
  });

  const txTitle: CSSProperties = {
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fontSize: "0.6rem",
  };

  const txOrigin: CSSProperties = {
    color: colors.base.text.secondary,
    fontSize: "0.55rem",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    opacity: 0.85,
  };

  const pinchNotice: CSSProperties = {
    ...mono,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    fontSize: "0.7rem",
    color: colors.base.text.secondary,
    padding: "0.5rem 0.75rem",
    borderRadius: "0.5rem",
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
    borderRadius: "0.6rem",
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

  // The "Comment décider ?" button is a rhetorical pacing affordance —
  // it nudges the reader forward toward the next concept (proof of
  // work) by scrolling the next slab of the chapter into view.
  const continueForward = () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  // ── render helpers ────────────────────────────────────────────────────
  const renderBranch = (branch: Branch) => {
    const accent = accents[branch.id];
    const label = fr ? branch.labelFr : branch.labelEn;
    const recipient = fr ? branch.recipientFr : branch.recipientEn;
    const origin = fr ? branch.originFr : branch.originEn;
    return (
      <div key={branch.id} style={branchColumn}>
        <div style={txBlock(accent)}>
          <span style={txTitle}>{label}</span>
          <span style={txOrigin}>
            {fr ? "signée depuis" : "signed from"} {origin}
          </span>
          <span>0.1 BTC</span>
        </div>
        <ArrowDown size={16} strokeWidth={2} color={accent} />
        <div style={partyCard(accent)}>
          <Wallet size={isMobile ? 18 : 22} strokeWidth={1.5} color={accent} />
          <span style={partyLabel}>{recipient}</span>
        </div>
      </div>
    );
  };

  const renderNode = (city: string, i: number) => {
    const txId = nodeFirstSeen[i];
    const accent = accents[txId];
    const branch = BRANCHES.find((b) => b.id === txId)!;
    const recipient = fr ? branch.recipientFr : branch.recipientEn;
    return (
      <div key={city} style={nodeCard(accent)}>
        <Monitor size={isMobile ? 18 : 20} strokeWidth={1.5} color={accent} />
        <span style={{ ...mono, fontSize: "0.6rem", fontWeight: 600, color: colors.base.text.primary }}>
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
          → {recipient}
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
        {fr ? "La double dépense" : "Double-spending"}
      </Caption>

      {/* Single Nicolas at the top — one person, two broadcasts below. */}
      <div style={nicolasRow}>
        <div style={{ ...partyCard(colors.base.border.secondary), width: isMobile ? "60%" : "40%" }}>
          <User size={isMobile ? 18 : 22} strokeWidth={1.5} color={colors.base.text.secondary} />
          <span style={partyLabel}>Nicolas</span>
        </div>
      </div>

      {/* Fork: two diagonal arrows showing the broadcast splits. */}
      <div style={forkRow}>
        <ArrowDownLeft size={20} strokeWidth={2} color={accents.a} />
        <ArrowDownRight size={20} strokeWidth={2} color={accents.b} />
      </div>

      <div style={branchesGrid}>
        {BRANCHES.map(renderBranch)}
      </div>

      <div style={pinchNotice}>
        <Coins size={12} strokeWidth={2} />
        {fr
          ? "Même bitcoin, deux destinataires. Nicolas tente de le dépenser deux fois, depuis deux endroits du globe."
          : "Same bitcoin, two recipients. Nicolas tries to spend it twice, from two different points on the globe."}
      </div>

      {!propagated && (
        <div style={ctaRow}>
          <Button
            variant="primary"
            icon={<Eye size={14} strokeWidth={2} />}
            onClick={reveal}
          >
            {fr ? "Que voient les nœuds ?" : "What do the nodes see?"}
          </Button>
        </div>
      )}

      {propagated && (
        <>
          <Caption tone="muted" size="sm">
            {fr
              ? "Ce que chaque nœud a vu en premier"
              : "What each node saw first"}
          </Caption>
          <div style={nodesGrid}>
            {CITIES.map(renderNode)}
          </div>

          <FeedbackPanel
            tone="error"
            title={fr ? "Le réseau n'est pas d'accord" : "The network disagrees"}
          >
            {fr
              ? "Christine pense être payée. Mme Michu aussi. Personne ne peut trancher sans autorité centrale."
              : "Christine thinks she's been paid. So does Mrs. Smith. Nobody can decide without a central authority."}
          </FeedbackPanel>

          <div style={ctaRow}>
            <Button
              variant="secondary"
              icon={<RotateCcw size={14} strokeWidth={2} />}
              onClick={reset}
            >
              {fr ? "Recommencer" : "Try again"}
            </Button>
            <Button
              variant="primary"
              icon={<ArrowDown size={14} strokeWidth={2} />}
              onClick={continueForward}
            >
              {fr ? "Comment décider ?" : "How do we decide?"}
            </Button>
          </div>
        </>
      )}
    </SurfaceCard>
  );
};
