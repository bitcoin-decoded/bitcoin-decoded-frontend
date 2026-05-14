import { type CSSProperties, type FC, useEffect, useRef } from "react";

import { CircleCheck, CircleX, Pickaxe, RotateCcw } from "lucide-react";

import {
  Button,
  Caption,
  FeedbackPanel,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  withOpacity,
} from "../../Design";
import { useTranslation } from "../../I18n";
import { truncateHash } from "../helpers";
import { useMiningSimulator } from "../hooks";

export const MiningSimulator: FC = () => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const { attempts, found, difficultyPrefix, headerFields, currentNonce, tryNonce, reset } =
    useMiningSimulator();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [attempts.length]);

  const mono = { fontFamily: "'JetBrains Mono', monospace" } as const;

  const targetBox: CSSProperties = {
    ...mono,
    fontSize: isMobile ? "0.7rem" : "0.75rem",
    color: colors.base.text.primary,
    padding: "0.6rem 0.85rem",
    borderRadius: "0.5rem",
    background: withOpacity(world.background.secondary, 0.06),
    border: `1px solid ${withOpacity(world.border.secondary, 0.2)}`,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const targetPrefix: CSSProperties = {
    ...mono,
    fontWeight: 700,
    fontSize: isMobile ? "0.85rem" : "0.95rem",
    color: world.text.secondary,
    letterSpacing: "0.1em",
  };

  const headerBox: CSSProperties = {
    ...mono,
    fontSize: isMobile ? "0.65rem" : "0.7rem",
    color: colors.base.text.secondary,
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    background: withOpacity(world.background.secondary, 0.04),
    border: `1px solid ${withOpacity(world.border.secondary, 0.15)}`,
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  };

  const fieldName: CSSProperties = {
    color: colors.base.text.secondary,
    opacity: 0.6,
    minWidth: isMobile ? "5rem" : "6.5rem",
    display: "inline-block",
  };

  const fieldValue: CSSProperties = { color: colors.base.text.primary };
  const nonceVal: CSSProperties = { color: world.text.secondary, fontWeight: 700 };

  const logBox: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
    maxHeight: "14rem",
    overflowY: "auto",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    background: colors.base.background.secondary,
  };

  const logHeader: CSSProperties = {
    ...mono,
    fontSize: isMobile ? "0.55rem" : "0.6rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    color: colors.base.text.secondary,
    opacity: 0.5,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.2rem 0.5rem",
    borderBottom: `1px solid ${withOpacity(world.border.secondary, 0.1)}`,
    marginBottom: "0.15rem",
  };

  const row = (valid: boolean): CSSProperties => ({
    ...mono,
    fontSize: isMobile ? "0.6rem" : "0.65rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.3rem 0.5rem",
    borderRadius: "0.35rem",
    background: valid ? withOpacity(colors.semantic.success.text, 0.08) : "transparent",
    color: valid ? colors.semantic.success.text : colors.base.text.secondary,
  });

  return (
    <SurfaceCard
      glowColor={found ? colors.semantic.success.border : world.border.secondary}
      margin={isMobile ? "1.5rem 0" : "2rem 0"}
      style={mono}
    >
      <Caption tone="world" size="md" icon={<Pickaxe size={isMobile ? 16 : 18} strokeWidth={2} />}>
        {t("mining.title")}
      </Caption>

      <div style={targetBox}>
        <span>{t("mining.target")}</span>
        <span style={targetPrefix}>{difficultyPrefix}…</span>
      </div>

      <div style={headerBox}>
        <Caption tone="world" size="xs" style={{ marginBottom: "0.25rem" }}>
          {t("mining.headerLabel")}
        </Caption>
        <div>
          <span style={fieldName}>prevHash</span>{" "}
          <span style={fieldValue}>{headerFields.prevHash}</span>
        </div>
        <div>
          <span style={fieldName}>merkleRoot</span>{" "}
          <span style={fieldValue}>{headerFields.merkleRoot}</span>
        </div>
        <div>
          <span style={fieldName}>timestamp</span>{" "}
          <span style={fieldValue}>{headerFields.timestamp}</span>
        </div>
        <div>
          <span style={fieldName}>{t("mining.nonce")}</span>{" "}
          <span style={nonceVal}>{currentNonce}</span>
        </div>
      </div>

      {attempts.length > 0 && (
        <div ref={scrollRef} style={logBox}>
          <div style={logHeader}>
            <span style={{ minWidth: isMobile ? "4.5rem" : "5.5rem" }}>{t("mining.nonce")}</span>
            <span style={{ flex: 1 }}>hash</span>
            <span style={{ width: "1rem" }} />
          </div>
          {attempts.map((a) => (
            <div key={a.nonce} style={row(a.valid)}>
              <span style={{ minWidth: isMobile ? "4.5rem" : "5.5rem" }}>{a.nonce}</span>
              <span style={{ flex: 1 }}>{truncateHash(a.hash)}</span>
              {a.valid ? (
                <CircleCheck size={14} strokeWidth={2} />
              ) : (
                <CircleX size={14} strokeWidth={2} style={{ opacity: 0.3 }} />
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <Button
          variant="primary"
          icon={<Pickaxe size={isMobile ? 12 : 14} strokeWidth={2} />}
          onClick={!found ? tryNonce : undefined}
          disabled={found}
        >
          {t("mining.button")}
        </Button>
        {attempts.length > 0 && (
          <Button
            variant="secondary"
            icon={<RotateCcw size={isMobile ? 12 : 14} strokeWidth={2} />}
            onClick={reset}
          >
            {t("mining.reset")}
          </Button>
        )}
      </div>

      {attempts.length > 0 && (
        <FeedbackPanel
          tone={found ? "success" : "info"}
          icon={
            found ? (
              <CircleCheck size={18} strokeWidth={2} />
            ) : (
              <CircleX size={18} strokeWidth={2} />
            )
          }
        >
          {found ? t("mining.found") : t("mining.notFound")}
        </FeedbackPanel>
      )}
    </SurfaceCard>
  );
};
