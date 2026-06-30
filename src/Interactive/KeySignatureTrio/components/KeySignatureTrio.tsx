import { type CSSProperties, type FC } from "react";

import { BRAND, Caption,
  ExploredCounter,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  withOpacity, } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getKeySignatureTrio, TRIO_LAYOUT } from "../data";
import { getArrowhead, trimSegment } from "../helpers";
import { useKeySignatureTrio } from "../hooks";

import { TrioNode } from "./TrioNode";

import { Link2, MousePointerClick } from "@icons";

type Props = {
  /** Fired once every node has been explored (gates the tool block). */
  onComplete?: () => void;
};

export const KeySignatureTrio: FC<Props> = ({ onComplete }) => {
  const { t, language } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  const world = colors[moduleTheme];
  const accent = world.text.secondary;
  const accentBorder = world.border.secondary;

  const { elements, connections } = getKeySignatureTrio(language);
  const { selectedId, hasSelection, select, exploredCount } = useKeySignatureTrio({
    requiredExplored: onComplete ? elements.length : 0,
    onComplete,
  });

  const { viewWidth, viewHeight, nodes, clearance } = TRIO_LAYOUT;
  const edgeClearance = isMobile ? clearance.mobile : clearance.desktop;
  const pctX = (x: number) => `${(x / viewWidth) * 100}%`;
  const pctY = (y: number) => `${(y / viewHeight) * 100}%`;

  const selected = elements.find((el) => el.id === selectedId) ?? null;
  const SelectedIcon = selected?.icon ?? null;

  const mono: CSSProperties = { fontFamily: BRAND.fonts.mono };

  // ── styles ──────────────────────────────────────────────────────────────────

  const headerRow: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.6rem 0.85rem",
    flexWrap: "wrap",
  };

  const promptStyle: CSSProperties = {
    fontSize: BRAND.fontSize.body,
    color: colors.base.text.secondary,
    fontStyle: "italic",
    lineHeight: 1.5,
    margin: 0,
    textAlign: "left",
  };

  const diagramWrapper: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  };

  const diagramBox: CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: isMobile ? "19rem" : "29rem",
    aspectRatio: `${viewWidth} / ${viewHeight}`,
    margin: isMobile ? "0.35rem auto 0.5rem" : "0.75rem auto",
    overflow: "visible",
  };

  const svgStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
    pointerEvents: "none",
  };

  const nodeWrapper = (x: number, y: number): CSSProperties => ({
    position: "absolute",
    left: pctX(x),
    top: pctY(y),
    transform: "translate(-50%, -50%)",
  });

  const labelChip = (active: boolean, x: number, y: number): CSSProperties => ({
    ...mono,
    position: "absolute",
    left: pctX(x),
    top: pctY(y),
    transform: "translate(-50%, -50%)",
    fontSize: BRAND.fontSize.note,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.06em",
    padding: "0.12rem 0.42rem",
    borderRadius: 0,
    whiteSpace: "nowrap",
    pointerEvents: "none",
    color: active ? accent : withOpacity(colors.base.text.secondary, 0.7),
    background: colors.base.background.primary,
    border: `1px solid ${withOpacity(accentBorder, active ? 0.6 : 0.22)}`,
    transition: "all 0.35s var(--ease-smooth)",
  });

  const detailPanel: CSSProperties = {
    minHeight: isMobile ? "7.5rem" : "6.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    padding: isMobile ? "0.85rem 0.95rem" : "1rem 1.1rem",
    borderRadius: 0,
    border: `1px solid ${withOpacity(accentBorder, selected ? 0.4 : 0.18)}`,
    background: selected
      ? withOpacity(accent, 0.06)
      : withOpacity(colors.base.text.secondary, 0.03),
    transition: "border-color 0.35s var(--ease-smooth), background 0.35s var(--ease-smooth)",
  };

  const detailHeader: CSSProperties = { display: "flex", alignItems: "center", gap: "0.6rem" };

  // Structural icon badge — a square (radius 0), per the block-vs-coin rule.
  const detailIconBox: CSSProperties = {
    width: "2.1rem",
    height: "2.1rem",
    borderRadius: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: accent,
    background: withOpacity(accent, 0.14),
    border: `1px solid ${withOpacity(accentBorder, 0.4)}`,
  };

  const detailTitle: CSSProperties = {
    ...mono,
    fontSize: BRAND.fontSize.body,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.05em",
    color: accent,
  };

  const roleTag: CSSProperties = {
    ...mono,
    fontSize: BRAND.fontSize.note,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.06em",
    padding: "0.14rem 0.45rem",
    borderRadius: 0,
    color: accent,
    background: withOpacity(accent, 0.12),
    border: `1px solid ${withOpacity(accentBorder, 0.35)}`,
  };

  const detailDesc: CSSProperties = {
    margin: 0,
    fontSize: BRAND.fontSize.body,
    lineHeight: 1.6,
    color: colors.base.text.primary,
  };

  const emptyState: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    height: "100%",
    flex: 1,
    color: withOpacity(colors.base.text.secondary, 0.75),
    fontSize: BRAND.fontSize.body,
    fontStyle: "italic",
    textAlign: "center",
  };

  // ── render ────────────────────────────────────────────────────────────────────

  return (
    <SurfaceCard
      gap={isMobile ? "0.85rem" : "1.1rem"}
      margin={isMobile ? "1.5rem 0" : "2rem 0"}
      style={{ textAlign: "left" }}
    >
      <div style={headerRow}>
        <Caption tone="world" size="md" icon={<Link2 size={isMobile ? 16 : 18} strokeWidth={2} />}>
          {t("keyTrio.sectionTitle")}
        </Caption>
        <ExploredCounter
          explored={exploredCount}
          total={elements.length}
          label={t("keyTrio.explored")}
        />
      </div>

      <p style={promptStyle}>{t("keyTrio.prompt")}</p>

      <div style={diagramWrapper}>
        <div style={diagramBox}>
          <svg
            viewBox={`0 0 ${viewWidth} ${viewHeight}`}
            preserveAspectRatio="none"
            style={svgStyle}
            aria-hidden
          >
            {connections.map((edge) => {
              const active = selectedId === edge.from || selectedId === edge.to;
              const stroke = withOpacity(accent, active ? 0.9 : 0.28);
              const transition =
                "stroke 0.35s var(--ease-smooth), stroke-width 0.35s var(--ease-smooth)";
              const { x1, y1, x2, y2 } = trimSegment(
                nodes[edge.from],
                nodes[edge.to],
                edgeClearance,
              );
              const head = getArrowhead(nodes[edge.from], nodes[edge.to], edgeClearance, 5.5, 26);
              return (
                <g key={`${edge.from}-${edge.to}`}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={stroke}
                    strokeWidth={active ? 1.2 : 0.6}
                    strokeLinecap="round"
                    style={{ transition }}
                  />
                  {/* Arrowhead at the `to` end - shows the direction of the action. */}
                  <polyline
                    points={`${head.left.x},${head.left.y} ${head.tip.x},${head.tip.y} ${head.right.x},${head.right.y}`}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={active ? 1.4 : 1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transition }}
                  />
                </g>
              );
            })}
          </svg>

          {connections.map((edge) => {
            const a = nodes[edge.from];
            const b = nodes[edge.to];
            const active = selectedId === edge.from || selectedId === edge.to;
            return (
              <span
                key={`label-${edge.from}-${edge.to}`}
                style={labelChip(active, (a.x + b.x) / 2, (a.y + b.y) / 2)}
              >
                {edge.label}
              </span>
            );
          })}

          {elements.map((el) => {
            const p = nodes[el.id];
            return (
              <div key={el.id} style={nodeWrapper(p.x, p.y)}>
                <TrioNode
                  element={el}
                  isSelected={selectedId === el.id}
                  isDimmed={hasSelection && selectedId !== el.id}
                  onClick={() => select(el.id)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div style={detailPanel}>
        {selected && SelectedIcon ? (
          <div
            key={selected.id}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              animation: "chainFieldReveal 0.5s var(--ease-smooth) both",
            }}
          >
            <div style={detailHeader}>
              <span style={detailIconBox}>
                <SelectedIcon size={18} strokeWidth={2} />
              </span>
              <span style={detailTitle}>{selected.title}</span>
              <span style={roleTag}>{selected.role}</span>
            </div>
            <p style={detailDesc}>{selected.description}</p>
          </div>
        ) : (
          <div style={emptyState}>
            <MousePointerClick size={16} strokeWidth={2} style={{ flexShrink: 0 }} />
            <span>{t("keyTrio.emptyState")}</span>
          </div>
        )}
      </div>
    </SurfaceCard>
  );
};
