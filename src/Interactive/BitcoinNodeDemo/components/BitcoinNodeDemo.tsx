import { type CSSProperties, type FC } from "react";

import { Cpu, Monitor } from "lucide-react";

import { Button, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useLanguageContext } from "../../../I18n";
import { useBitcoinNodeDemo } from "../hooks";

const TRANSITION = "all 0.8s var(--ease-smooth)";

export const BitcoinNodeDemo: FC = () => {
  const { language } = useLanguageContext();
  const fr = language === "fr";
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const { isLaunched, handleLaunch, handleReset } = useBitcoinNodeDemo();

  const iconSize = isMobile ? 22 : 28;

  // Compact card padding/alignment - distinct from default SurfaceCard's
  // simulator padding. Pass via style override.
  const cardStyleOverride: CSSProperties = {
    alignItems: "center",
    padding: isMobile ? "1.25rem 1rem" : "1.5rem 2rem",
    transition: TRANSITION,
  };

  // Paired cards (Computer / Bitcoin software) share a fixed width so the
  // two never end up different sizes whatever the label length.
  const pairCardStyle: CSSProperties = {
    ...cardStyleOverride,
    width: isMobile ? "100%" : "11rem",
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
    // Reserve two lines so a one-word label ("Ordinateur") and a two-word
    // one ("Logiciel Bitcoin") occupy the exact same height.
    minHeight: "2.2em",
    lineHeight: 1.2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        width: "100%",
        margin: isMobile ? "1.5rem 0" : "2rem 0",
      }}
    >
      <style>{`@keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.5); opacity: 0; } }`}</style>

      <div
        style={{
          display: "flex",
          alignItems: isMobile ? "center" : "flex-end",
          justifyContent: "center",
          gap: isLaunched ? "0" : isMobile ? "1.5rem" : "3rem",
          flexDirection: isMobile ? "column" : "row",
          transition: TRANSITION,
        }}
      >
        {!isLaunched ? (
          <>
            <SurfaceCard
              gap="0.75rem"
              glowColor={colors.base.border.secondary}
              style={pairCardStyle}
            >
              <div style={iconCircle(false)}>
                <Monitor size={iconSize} strokeWidth={1.5} />
              </div>
              <span style={label}>{fr ? "Ordinateur" : "Computer"}</span>
            </SurfaceCard>
            <SurfaceCard
              gap="0.75rem"
              glowColor={colors.base.border.secondary}
              style={pairCardStyle}
            >
              <div style={iconCircle(false)}>
                <Cpu size={iconSize} strokeWidth={1.5} />
              </div>
              <span style={label}>{fr ? "Logiciel Bitcoin" : "Bitcoin Software"}</span>
            </SurfaceCard>
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <SurfaceCard gap="0.75rem" style={cardStyleOverride}>
              <div style={{ position: "relative" }}>
                <div style={iconCircle(true)}>
                  <Monitor size={iconSize} strokeWidth={1.5} />
                  <Cpu
                    size={isMobile ? 12 : 14}
                    strokeWidth={2}
                    style={{
                      position: "absolute",
                      bottom: isMobile ? "6px" : "8px",
                      right: isMobile ? "6px" : "8px",
                      color: world.background.secondary,
                    }}
                  />
                </div>
                <div style={pulseRing} />
              </div>
              <span style={{ ...label, color: world.text.primary }}>
                {fr ? "Ordinateur + Bitcoin" : "Computer + Bitcoin"}
              </span>
            </SurfaceCard>
            <span
              style={{
                ...label,
                fontWeight: 700,
                color: world.text.secondary,
                marginTop: "0.5rem",
              }}
            >
              {fr ? "Nœud du réseau" : "Network node"}
            </span>
          </div>
        )}
      </div>

      <Button
        variant={isLaunched ? "secondary" : "primary"}
        onClick={isLaunched ? handleReset : handleLaunch}
      >
        {isLaunched
          ? fr
            ? "↺ Réinitialiser"
            : "↺ Reset"
          : fr
            ? "▶ Démarrer le nœud"
            : "▶ Run the node"}
      </Button>
    </div>
  );
};
