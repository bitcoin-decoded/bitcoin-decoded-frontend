import { type CSSProperties, type FC } from "react";

import { Caption, ExploredCounter, getBrandGold, getTypography, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { FrText, useTranslation } from "../../../I18n";
import { getKeySignatureTrio, TRIO_LAYOUT } from "../data";
import { getArrowhead, trimSegment } from "../helpers";
import { useKeySignatureTrio } from "../hooks";
import type { KeyElementId } from "../types";

import { TrioNode } from "./TrioNode";

import { DoodleCursorHighlight, DoodleThreeBoxes } from "@doodle";

type Props = {
  onComplete?: () => void;
};

export const KeySignatureTrio: FC<Props> = ({ onComplete }) => {
  const typo = getTypography();
  const { t, language } = useTranslation();
  const { colors, moduleTheme, theme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  const world = colors[moduleTheme];
  const accent = world.text.secondary;
  const gold = getBrandGold(theme);
  const elementAccent = (id: KeyElementId): string => (id === "privateKey" ? gold : accent);

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
  const selectedAccent = selected ? elementAccent(selected.id) : accent;

  const softWash = withOpacity(colors.base.text.primary, theme === "dark" ? 0.05 : 0.035);

  const headerRow: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.6rem 0.85rem",
    flexWrap: "wrap",
  };

  const promptStyle: CSSProperties = {
    ...typo.note,
    color: colors.base.text.secondary,
    fontStyle: "italic",
    margin: 0,
    textAlign: "left",
  };

  const detailPanel: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    padding: isMobile ? "0.8rem 0.9rem" : "0.85rem 1rem",
    border: `1px solid ${withOpacity(selectedAccent, selected ? 0.4 : 0.18)}`,
    background: selected ? withOpacity(selectedAccent, 0.06) : softWash,
    transition: "border-color 0.35s var(--ease-smooth), background 0.35s var(--ease-smooth)",
  };

  const detailHeader: CSSProperties = { display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" };

  const detailIconBox: CSSProperties = {
    width: "2.1rem",
    height: "2.1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: selectedAccent,
    background: withOpacity(selectedAccent, 0.14),
    border: `1px solid ${withOpacity(selectedAccent, 0.4)}`,
  };

  const detailTitle: CSSProperties = {
    ...typo.label,
    fontVariant: "small-caps",
    color: selectedAccent,
  };

  const roleTag: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    letterSpacing: "0.06em",
    padding: "0.14rem 0.45rem",
    color: selectedAccent,
    background: withOpacity(selectedAccent, 0.12),
    border: `1px solid ${withOpacity(selectedAccent, 0.35)}`,
  };

  const detailDesc: CSSProperties = {
    ...typo.note,
    lineHeight: 1.6,
    margin: 0,
    color: colors.base.text.primary,
  };

  const emptyState: CSSProperties = {
    ...typo.note,
    display: "flex",
    alignItems: "center",
    gap: "0.55rem",
    color: withOpacity(colors.base.text.secondary, 0.85),
    fontStyle: "italic",
  };

  const diagramWrapper: CSSProperties = { display: "flex", justifyContent: "center", width: "100%" };

  const diagramBox: CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: isMobile ? "20rem" : "30rem",
    aspectRatio: `${viewWidth} / ${viewHeight}`,
    padding: isMobile ? "0.6rem" : "0.9rem",
    background: softWash,
    border: `1px solid ${colors.base.border.tertiary}`,
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
    ...typo.micro,
    position: "absolute",
    left: pctX(x),
    top: pctY(y),
    transform: "translate(-50%, -50%)",
    fontVariant: "small-caps",
    letterSpacing: "0.06em",
    padding: "0.12rem 0.42rem",
    whiteSpace: "nowrap",
    pointerEvents: "none",
    color: active ? accent : withOpacity(colors.base.text.secondary, 0.75),
    background: colors.base.background.secondary,
    border: `1px solid ${withOpacity(accent, active ? 0.6 : 0.22)}`,
    transition: "all 0.35s var(--ease-smooth)",
  });

  return (
    <FrText>
      <SurfaceCard
        gap={isMobile ? "0.85rem" : "1.1rem"}
        margin={isMobile ? "1.5rem 0" : "2rem 0"}
        style={{ textAlign: "left" }}
      >
        <div style={headerRow}>
          <Caption tone="world" size="md" icon={<DoodleThreeBoxes size={isMobile ? 20 : 24} />}>
            {t("keyTrio.sectionTitle")}
          </Caption>
          <ExploredCounter
            explored={exploredCount}
            total={elements.length}
            label={t("keyTrio.explored")}
          />
        </div>

        <p style={promptStyle}>{t("keyTrio.prompt")}</p>

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
                  <SelectedIcon size={20} />
                </span>
                <span style={detailTitle}>{selected.title}</span>
                <span style={roleTag}>{selected.role}</span>
              </div>
              <p style={detailDesc}>{selected.description}</p>
            </div>
          ) : (
            <div style={emptyState}>
              <DoodleCursorHighlight size={20} style={{ flexShrink: 0, color: accent }} />
              <span>{t("keyTrio.emptyState")}</span>
            </div>
          )}
        </div>

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
                    accent={elementAccent(el.id)}
                    isSelected={selectedId === el.id}
                    isDimmed={hasSelection && selectedId !== el.id}
                    onClick={() => select(el.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </SurfaceCard>
    </FrText>
  );
};
