import { type CSSProperties, type FC } from "react";

import { ArrowDown, ArrowRight, Link } from "lucide-react";

import { SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { truncateHash } from "../../helpers";
import { useBlockchainChainVisual } from "../hooks";
import type { BlockData } from "../types";

export const BlockchainChainVisual: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const blocks: BlockData[] = useBlockchainChainVisual();

  if (blocks.length === 0) return null;

  const mono = { fontFamily: "'JetBrains Mono', monospace" } as const;
  const fs = isMobile ? "0.5rem" : "0.55rem";

  const styles = {
    title: {
      ...mono,
      fontSize: isMobile ? "0.68rem" : "0.75rem",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: world.text.secondary,
      textAlign: "center",
      paddingBottom: "0.3rem",
      borderBottom: `1px solid ${withOpacity(world.border.secondary, 0.25)}`,
    } as CSSProperties,
    tag: {
      ...mono,
      fontSize: isMobile ? "0.5rem" : "0.52rem",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: world.text.primary,
      padding: "0.2rem 0.4rem",
      borderRadius: "0.25rem",
      background: withOpacity(world.background.secondary, 0.1),
      alignSelf: "flex-start",
    } as CSSProperties,
    label: {
      ...mono,
      fontSize: fs,
      fontWeight: 600,
      color: colors.base.text.secondary,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
    } as CSSProperties,
    value: {
      ...mono,
      fontSize: fs,
      color: colors.base.text.primary,
      wordBreak: "break-all",
    } as CSSProperties,
    hash: {
      ...mono,
      fontSize: fs,
      color: world.text.primary,
      wordBreak: "break-all",
    } as CSSProperties,
    tx: {
      ...mono,
      fontSize: fs,
      color: colors.base.text.primary,
      padding: "0.25rem 0.4rem",
      borderRadius: "0.3rem",
      background: withOpacity(world.background.secondary, 0.05),
    } as CSSProperties,
    badge: {
      ...mono,
      fontSize: fs,
      fontWeight: 600,
      color: world.text.secondary,
      textAlign: "center",
      padding: "0.3rem 0.6rem",
      borderRadius: "0.5rem",
      background: withOpacity(world.background.secondary, 0.08),
      border: `1px dashed ${withOpacity(world.border.secondary, 0.4)}`,
    } as CSSProperties,
  };

  const dashed: CSSProperties = {
    borderTop: `1px dashed ${withOpacity(world.border.secondary, 0.25)}`,
    margin: "0.15rem 0",
  };

  const Field: FC<{ label: string; value: string; isHash?: boolean }> = ({
    label,
    value,
    isHash,
  }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
      <span style={styles.label}>{label}</span>
      <span style={isHash ? styles.hash : styles.value}>{value}</span>
    </div>
  );

  const BlockCard: FC<{ block: BlockData }> = ({ block }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.35rem",
        flex: 1,
        minWidth: 0,
        width: isMobile ? "100%" : "auto",
      }}
    >
      <SurfaceCard
        gap="0.35rem"
        style={{
          ...mono,
          padding: isMobile ? "0.85rem" : "1rem 1.15rem",
          borderRadius: "0.85rem",
        }}
      >
        <div style={styles.title}>
          {t("chain.block")} #{block.number}
        </div>

        <span style={styles.tag}>{t("chain.header")}</span>
        <Field label={t("chain.prevHash")} value={truncateHash(block.prevHash)} isHash />
        <Field label="Merkle root" value={truncateHash(block.merkleRoot)} isHash />
        <Field label={t("chain.timestamp")} value={block.timestamp} />
        <Field label="Nonce" value={block.nonce.toLocaleString(fr ? "fr-FR" : "en-US")} />

        <div style={dashed} />
        <span style={styles.tag}>{t("chain.body")}</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
          <span style={styles.tx}>{block.tx1}</span>
          <span style={styles.tx}>{block.tx2}</span>
        </div>
      </SurfaceCard>
      <div style={styles.badge}>Double SHA-256 → {truncateHash(block.headerHash)}</div>
    </div>
  );

  const ArrowIcon = isMobile ? ArrowDown : ArrowRight;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        margin: isMobile ? "1.5rem 0 2rem" : "2rem 0 2.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: isMobile ? "0.5rem" : "0.4rem",
        }}
      >
        {blocks.map((block, i) => (
          <div
            key={block.number}
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              gap: isMobile ? "0.5rem" : "0.4rem",
              flex: 1,
              minWidth: 0,
              width: isMobile ? "100%" : "auto",
            }}
          >
            <BlockCard block={block} />
            {i < blocks.length - 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: world.text.secondary,
                  flexShrink: 0,
                }}
              >
                <ArrowIcon size={isMobile ? 18 : 20} strokeWidth={2} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          ...mono,
          display: "flex",
          alignItems: "flex-start",
          gap: "0.5rem",
          fontSize: isMobile ? "0.7rem" : "0.75rem",
          lineHeight: 1.5,
          color: colors.base.text.primary,
          padding: "0.75rem 1rem",
          borderRadius: "0.75rem",
          background: withOpacity(world.background.secondary, 0.06),
          border: `1px solid ${withOpacity(world.border.secondary, 0.2)}`,
          marginTop: "0.5rem",
        }}
      >
        <Link
          size={16}
          color={world.text.secondary}
          strokeWidth={2}
          style={{ flexShrink: 0, marginTop: "0.15rem" }}
        />
        <span>{t("chain.note")}</span>
      </div>
    </div>
  );
};
