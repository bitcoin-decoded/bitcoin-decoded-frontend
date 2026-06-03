import { type CSSProperties, type FC, useMemo } from "react";

import { usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { computeConnections, computeDotPositions, getHaloOpacity } from "../helpers";

type Props = {
  /** Real group size (drives dot count, capped for display). */
  size: number;
  /** Pairwise relationship count (drives the density halo). */
  relations: number;
  /** Dominant tier accent. */
  color: string;
};

const VIEWBOX = 200;
const CENTER = VIEWBOX / 2;
const FRAME_RADIUS = 92;
const DOT_RADIUS = 76;
const MAX_DOTS = 80;
const MAX_LINES = 50;

/**
 * The visual frame: a bounded circle holding up to MAX_DOTS human dots laid
 * out in a stable phyllotaxis spiral, a capped web of links between them, and
 * a density halo that intensifies (with n²) once the web exceeds the cap.
 */
export const DunbarVisual: FC<Props> = ({ size, relations, color }) => {
  const { colors } = usePageTheme();

  const dotCount = Math.min(size, MAX_DOTS);
  const dots = useMemo(() => computeDotPositions(dotCount, DOT_RADIUS, CENTER, CENTER), [dotCount]);
  const connections = useMemo(() => computeConnections(dotCount, MAX_LINES), [dotCount]);
  const haloOpacity = getHaloOpacity(relations);

  const frameStroke = withOpacity(colors.base.text.secondary, 0.22);
  const lineOpacity = connections.length > 30 ? 0.16 : 0.4;
  const dotR = dotCount > 40 ? 1.9 : dotCount > 16 ? 2.5 : 3.4;

  const wrapStyle: CSSProperties = {
    width: "100%",
    maxWidth: "20rem",
    margin: "0 auto",
    aspectRatio: "1 / 1",
  };

  const transition = "fill 0.5s var(--ease-smooth), stroke 0.5s var(--ease-smooth)";

  return (
    <div style={wrapStyle}>
      <svg
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        width="100%"
        height="100%"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="dunbar-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity={0.85} />
            <stop offset="55%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </radialGradient>
        </defs>

        <circle
          cx={CENTER}
          cy={CENTER}
          r={FRAME_RADIUS}
          fill="none"
          stroke={frameStroke}
          strokeWidth={1}
          style={{ transition }}
        />

        {haloOpacity > 0 && (
          <circle
            cx={CENTER}
            cy={CENTER}
            r={DOT_RADIUS + 8}
            fill="url(#dunbar-halo)"
            opacity={haloOpacity}
            style={{ transition: "opacity 0.5s var(--ease-smooth)" }}
          />
        )}

        <g stroke={color} strokeOpacity={lineOpacity} strokeWidth={0.5} style={{ transition }}>
          {connections.map(({ a, b }) => (
            <line key={`${a}-${b}`} x1={dots[a].x} y1={dots[a].y} x2={dots[b].x} y2={dots[b].y} />
          ))}
        </g>

        <g fill={color} style={{ transition }}>
          {dots.map((dot, i) => (
            <circle key={i} cx={dot.x} cy={dot.y} r={dotR} />
          ))}
        </g>
      </svg>
    </div>
  );
};
