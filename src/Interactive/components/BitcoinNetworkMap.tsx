import { type FC, type CSSProperties } from "react";
import { usePageTheme } from "../../Design/Theme";
import { useBreakpoint } from "../../Design";
import { withOpacity } from "../../Design/helpers";
import { useLanguageContext } from "../../I18n";
import { Monitor, Cpu } from "lucide-react";

type NodePosition = { x: number; y: number; label: string };

const NODES: NodePosition[] = [
  { x: 50, y: 12, label: "A" },
  { x: 18, y: 35, label: "B" },
  { x: 82, y: 30, label: "C" },
  { x: 30, y: 65, label: "D" },
  { x: 70, y: 68, label: "E" },
  { x: 50, y: 90, label: "F" },
];

const LINKS: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [1, 4], [0, 4], [2, 3],
];

export const BitcoinNetworkMap: FC = () => {
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
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "0.8rem" : "0.875rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: world.text.secondary,
    textAlign: "center",
    marginTop: "0.5rem",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", margin: isMobile ? "1.5rem 0 2.5rem" : "2rem 0 3rem" }}>
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
          background: `linear-gradient(135deg, ${withOpacity(world.background.secondary, 0.12)}, ${colors.base.background.primary})`,
          border: `1.5px solid ${world.border.primary}`,
          color: world.text.secondary,
        };

        const labelNodeStyle: CSSProperties = {
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: isMobile ? "0.5rem" : "0.55rem",
          fontWeight: 600,
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
            <span style={labelNodeStyle}>{fr ? "Nœud" : "Node"} {node.label}</span>
          </div>
        );
        })}
      </div>
      <span style={titleStyle}>{fr ? "Réseau Bitcoin" : "Bitcoin Network"}</span>
    </div>
  );
};
