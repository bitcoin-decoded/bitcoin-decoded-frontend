import { type FC, type CSSProperties, useRef, useEffect } from "react";
import { usePageTheme } from "../../Design/Theme";
import { useBreakpoint } from "../../Design";
import { withOpacity } from "../../Design/helpers";
import { useTranslation } from "../../I18n";
import { useMiningSimulator } from "../hooks";
import { truncateHash } from "../helpers";
import { Pickaxe, RotateCcw, CircleCheck, CircleX } from "lucide-react";

export const MiningSimulator: FC = () => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const { attempts, found, difficultyPrefix, headerFields, currentNonce, tryNonce, reset } = useMiningSimulator();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [attempts.length]);

  const mono = { fontFamily: "'JetBrains Mono', monospace" } as const;

  const container: CSSProperties = {
    ...mono, display: "flex", flexDirection: "column", gap: "1rem",
    padding: isMobile ? "1.25rem" : "1.5rem", borderRadius: "1rem",
    background: `linear-gradient(190deg, ${world.background.primary}, ${colors.base.background.primary})`,
    width: "100%", margin: isMobile ? "1.5rem 0" : "2rem 0",
  };

  const titleStyle: CSSProperties = {
    ...mono, fontSize: isMobile ? "0.72rem" : "0.8rem", fontWeight: 700,
    textTransform: "uppercase", letterSpacing: "0.05em", color: world.text.secondary,
    display: "flex", alignItems: "center", gap: "0.5rem",
  };

  const targetBox: CSSProperties = {
    ...mono, fontSize: isMobile ? "0.7rem" : "0.75rem", color: colors.base.text.primary,
    padding: "0.6rem 0.85rem", borderRadius: "0.5rem",
    background: withOpacity(world.background.secondary, 0.06),
    border: `1px solid ${withOpacity(world.border.secondary, 0.2)}`,
    display: "flex", alignItems: "center", gap: "0.5rem",
  };

  const targetPrefix: CSSProperties = {
    ...mono, fontWeight: 700, fontSize: isMobile ? "0.85rem" : "0.95rem",
    color: world.text.secondary, letterSpacing: "0.1em",
  };

  const headerBox: CSSProperties = {
    ...mono, fontSize: isMobile ? "0.65rem" : "0.7rem", color: colors.base.text.secondary,
    padding: "0.75rem 1rem", borderRadius: "0.5rem",
    background: withOpacity(world.background.secondary, 0.04),
    border: `1px solid ${withOpacity(world.border.secondary, 0.15)}`,
    display: "flex", flexDirection: "column", gap: "0.25rem",
  };

  const headerLabel: CSSProperties = {
    ...mono, fontSize: isMobile ? "0.6rem" : "0.65rem", fontWeight: 600,
    textTransform: "uppercase", letterSpacing: "0.04em",
    color: world.text.secondary, marginBottom: "0.25rem",
  };

  const fieldName: CSSProperties = {
    color: colors.base.text.secondary, opacity: 0.6,
    minWidth: isMobile ? "5rem" : "6.5rem", display: "inline-block",
  };

  const fieldValue: CSSProperties = { color: colors.base.text.primary };
  const nonceVal: CSSProperties = { color: world.text.secondary, fontWeight: 700 };

  const logBox: CSSProperties = {
    display: "flex", flexDirection: "column", gap: "0.2rem",
    maxHeight: "14rem", overflowY: "auto", padding: "0.5rem",
    borderRadius: "0.5rem", background: colors.base.background.secondary,
  };

  const logHeader: CSSProperties = {
    ...mono, fontSize: isMobile ? "0.55rem" : "0.6rem", fontWeight: 600,
    textTransform: "uppercase", letterSpacing: "0.04em",
    color: colors.base.text.secondary, opacity: 0.5,
    display: "flex", alignItems: "center", gap: "0.5rem",
    padding: "0.2rem 0.5rem", borderBottom: `1px solid ${withOpacity(world.border.secondary, 0.1)}`,
    marginBottom: "0.15rem",
  };

  const row = (valid: boolean): CSSProperties => ({
    ...mono, fontSize: isMobile ? "0.6rem" : "0.65rem", display: "flex",
    alignItems: "center", gap: "0.5rem", padding: "0.3rem 0.5rem",
    borderRadius: "0.35rem",
    background: valid ? withOpacity(colors.semantic.success.text, 0.08) : "transparent",
    color: valid ? colors.semantic.success.text : colors.base.text.secondary,
  });

  const btnBase: CSSProperties = {
    ...mono, fontSize: isMobile ? "0.72rem" : "0.78rem", fontWeight: 600,
    padding: isMobile ? "0.6rem 1.25rem" : "0.7rem 1.5rem", borderRadius: "0.75rem",
    letterSpacing: "0.04em", cursor: "pointer", display: "flex",
    alignItems: "center", gap: "0.5rem", justifyContent: "center",
    transition: "all 0.3s var(--ease-smooth)",
  };

  const primaryBtn: CSSProperties = {
    ...btnBase, border: `1.5px solid ${world.border.secondary}`,
    background: `linear-gradient(135deg, ${withOpacity(world.background.secondary, 0.15)}, transparent)`,
    color: world.text.primary, opacity: found ? 0.4 : 1,
  };

  const secondaryBtn: CSSProperties = {
    ...btnBase, border: `1.5px solid ${colors.base.border.secondary}`,
    background: "transparent", color: colors.base.text.secondary,
  };

  const feedbackStyle = (success: boolean): CSSProperties => ({
    ...mono, fontSize: isMobile ? "0.7rem" : "0.75rem", lineHeight: 1.5,
    display: "flex", alignItems: "flex-start", gap: "0.5rem",
    padding: "0.75rem 1rem", borderRadius: "0.75rem",
    color: colors.base.text.primary,
    background: withOpacity(success ? colors.semantic.success.text : colors.semantic.info.text, 0.06),
    border: `1px solid ${withOpacity(success ? colors.semantic.success.text : colors.semantic.info.text, 0.15)}`,
  });

  return (
    <div className="gradient-border" style={{ ...container, "--border-glow-color": found ? colors.semantic.success.border : world.border.secondary } as CSSProperties}>
      <div style={titleStyle}>
        <Pickaxe size={isMobile ? 16 : 18} strokeWidth={2} />
        {t("mining.title")}
      </div>

      <div style={targetBox}>
        <span>{t("mining.target")}</span>
        <span style={targetPrefix}>{difficultyPrefix}…</span>
      </div>

      <div style={headerBox}>
        <span style={headerLabel}>{t("mining.headerLabel")}</span>
        <div><span style={fieldName}>prevHash</span> <span style={fieldValue}>{headerFields.prevHash}</span></div>
        <div><span style={fieldName}>merkleRoot</span> <span style={fieldValue}>{headerFields.merkleRoot}</span></div>
        <div><span style={fieldName}>timestamp</span> <span style={fieldValue}>{headerFields.timestamp}</span></div>
        <div><span style={fieldName}>{t("mining.nonce")}</span> <span style={nonceVal}>{currentNonce}</span></div>
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
              {a.valid
                ? <CircleCheck size={14} strokeWidth={2} />
                : <CircleX size={14} strokeWidth={2} style={{ opacity: 0.3 }} />}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <button style={primaryBtn} onClick={!found ? tryNonce : undefined} disabled={found}>
          <Pickaxe size={isMobile ? 12 : 14} strokeWidth={2} />
          {t("mining.button")}
        </button>
        {attempts.length > 0 && (
          <button style={secondaryBtn} onClick={reset}>
            <RotateCcw size={isMobile ? 12 : 14} strokeWidth={2} />
            {t("mining.reset")}
          </button>
        )}
      </div>

      {attempts.length > 0 && (
        <div style={feedbackStyle(found)}>
          {found
            ? <CircleCheck size={18} strokeWidth={2} color={colors.semantic.success.text} style={{ flexShrink: 0, marginTop: "0.1rem" }} />
            : <CircleX size={18} strokeWidth={2} color={colors.semantic.info.text} style={{ flexShrink: 0, marginTop: "0.1rem" }} />}
          <span>{found ? t("mining.found") : t("mining.notFound")}</span>
        </div>
      )}
    </div>
  );
};
