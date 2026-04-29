import { type FC, type CSSProperties } from "react";
import { usePageTheme } from "../../Design/Theme";
import { useBreakpoint } from "../../Design";
import { withOpacity } from "../../Design/helpers";
import { useLanguageContext } from "../../I18n";
import { useBitcoinNodeDemo } from "../hooks";
import { Monitor, Cpu } from "lucide-react";

const TRANSITION = "all 0.8s var(--ease-smooth)";

export const BitcoinNodeDemo: FC = () => {
  const { language } = useLanguageContext();
  const fr = language === "fr";
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const { isLaunched, handleLaunch, handleReset } = useBitcoinNodeDemo();

  const iconSize = isMobile ? 22 : 28;

  const cardStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.75rem",
    padding: isMobile ? "1.25rem 1rem" : "1.5rem 2rem",
    borderRadius: "1rem",
    background: `linear-gradient(190deg, ${world.background.primary}, ${colors.base.background.primary})`,
    transition: TRANSITION,
  };

  const iconCircle = (active: boolean): CSSProperties => ({
    width: isMobile ? "3.5rem" : "4.5rem",
    height: isMobile ? "3.5rem" : "4.5rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    background: active
      ? `linear-gradient(135deg, ${withOpacity(world.background.secondary, 0.2)}, ${withOpacity(world.background.secondary, 0.05)})`
      : colors.base.background.tertiary,
    border: `1.5px solid ${active ? world.border.secondary : colors.base.border.secondary}`,
    color: active ? world.text.secondary : colors.base.text.secondary,
    transition: TRANSITION,
  });

  const label: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "0.65rem" : "0.7rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: colors.base.text.secondary,
    textAlign: "center",
  };

  const pulseRing: CSSProperties = {
    position: "absolute",
    inset: "-8px",
    borderRadius: "50%",
    border: `2px solid ${withOpacity(world.background.secondary, 0.3)}`,
    animation: isLaunched ? "pulse-ring 2s ease-out infinite" : "none",
    opacity: isLaunched ? 1 : 0,
    transition: "opacity 0.3s",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", width: "100%", margin: isMobile ? "1.5rem 0" : "2rem 0" }}>
      <style>{`@keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.5); opacity: 0; } }`}</style>

      <div style={{ display: "flex", alignItems: isMobile ? "center" : "flex-end", justifyContent: "center", gap: isLaunched ? "0" : isMobile ? "1.5rem" : "3rem", flexDirection: isMobile ? "column" : "row", transition: TRANSITION }}>
        {!isLaunched ? (
          <>
            <div className="gradient-border" style={{ ...cardStyle, "--border-glow-color": colors.base.border.secondary } as CSSProperties}>
              <div style={iconCircle(false)}>
                <Monitor size={iconSize} strokeWidth={1.5} />
              </div>
              <span style={label}>{fr ? "Ordinateur" : "Computer"}</span>
            </div>
            <div className="gradient-border" style={{ ...cardStyle, "--border-glow-color": colors.base.border.secondary } as CSSProperties}>
              <div style={iconCircle(false)}>
                <Cpu size={iconSize} strokeWidth={1.5} />
              </div>
              <span style={label}>{fr ? "Logiciel Bitcoin" : "Bitcoin Software"}</span>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="gradient-border" style={{ ...cardStyle, "--border-glow-color": world.border.secondary } as CSSProperties}>
              <div style={{ position: "relative" }}>
                <div style={iconCircle(true)}>
                  <Monitor size={iconSize} strokeWidth={1.5} />
                  <Cpu size={isMobile ? 12 : 14} strokeWidth={2} style={{ position: "absolute", bottom: isMobile ? "6px" : "8px", right: isMobile ? "6px" : "8px", color: world.background.secondary }} />
                </div>
                <div style={pulseRing} />
              </div>
              <span style={{ ...label, color: world.text.primary }}>{fr ? "Ordinateur + Bitcoin" : "Computer + Bitcoin"}</span>
            </div>
            <span style={{ ...label, fontWeight: 700, color: world.text.secondary, marginTop: "0.5rem" }}>{fr ? "Nœud du réseau" : "Network node"}</span>
          </div>
        )}
      </div>

      <button
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: isMobile ? "0.75rem" : "0.8rem",
          fontWeight: 600,
          padding: isMobile ? "0.6rem 1.25rem" : "0.75rem 1.5rem",
          borderRadius: "0.75rem",
          border: `1.5px solid ${world.border.secondary}`,
          background: isLaunched ? "transparent" : `linear-gradient(135deg, ${withOpacity(world.background.secondary, 0.15)}, transparent)`,
          color: isLaunched ? colors.base.text.secondary : world.text.primary,
          cursor: "pointer",
          letterSpacing: "0.05em",
          transition: "all 0.3s var(--ease-smooth)",
          outlineColor: world.border.secondary,
        }}
        onClick={isLaunched ? handleReset : handleLaunch}
      >
        {isLaunched ? (fr ? "↺ Réinitialiser" : "↺ Reset") : (fr ? "▶ Lancer Bitcoin" : "▶ Launch Bitcoin")}
      </button>
    </div>
  );
};
