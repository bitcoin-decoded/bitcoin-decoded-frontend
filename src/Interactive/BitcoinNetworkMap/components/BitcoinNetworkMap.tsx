import { type CSSProperties, type FC } from "react";

import { BRAND, getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useLanguageContext } from "../../../I18n";
import { LINKS, NODES } from "../data";

import { Cpu, Monitor } from "@icons";

export const BitcoinNetworkMap: FC = () => {
  const typo = getTypography();
  const { language } = useLanguageContext();
  const fr = language === "fr";
  const { colors, moduleTheme } = usePageTheme();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const world = colors[moduleTheme];

  const containerStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: isMobile ? "20rem" : "28rem",
    aspectRatio: "1",
    margin: "0 auto",
  };

  const svgStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  };

  const nodeSize = isMobile ? 42 : 52;
  const iconSize = isMobile ? 18 : 22;
  const cpuSize = isMobile ? 9 : 11;

  const titleStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.note.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: world.text.secondary,
    textAlign: "center",
    marginTop: "0.5rem",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        margin: isMobile ? "1.5rem 0 2.5rem" : "2rem 0 3rem",
      }}
    >
      <div style={containerStyle}>
        <svg style={svgStyle} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {LINKS.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              stroke={withOpacity(world.background.secondary, 0.2)}
              strokeWidth="0.3"
              strokeDasharray="1.2 0.8"
            />
          ))}
        </svg>
        {NODES.map((node, i) => {
          const nodeStyle: CSSProperties = {
            position: "absolute",
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.25rem",
          };

          const circleStyle: CSSProperties = {
            width: `${nodeSize}px`,
            height: `${nodeSize}px`,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            background: withOpacity(world.background.secondary, 0.12),
            border: `1px solid ${world.border.primary}`,
            color: world.text.secondary,
          };

          const labelNodeStyle: CSSProperties = {
            fontFamily: BRAND.fonts.mono,
            fontSize: typo.micro.fontSize,
            fontWeight: 500,
            color: colors.base.text.secondary,
            letterSpacing: "0.05em",
          };

          return (
            <div key={i} style={nodeStyle}>
              <div style={circleStyle}>
                <Monitor size={iconSize} strokeWidth={1.5} />
                <Cpu
                  size={cpuSize}
                  strokeWidth={2}
                  style={{
                    position: "absolute",
                    bottom: isMobile ? "6px" : "8px",
                    right: isMobile ? "6px" : "8px",
                    color: world.background.secondary,
                  }}
                />
              </div>
              <span style={labelNodeStyle}>
                {fr ? "Nœud" : "Node"} {node.label}
              </span>
            </div>
          );
        })}
      </div>
      <span style={titleStyle}>{fr ? "Réseau Bitcoin" : "Bitcoin Network"}</span>
    </div>
  );
};
