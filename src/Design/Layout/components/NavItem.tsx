import { type CSSProperties, type FC, Fragment, type JSX } from "react";

import { useTranslation } from "../../../I18n";
import { type NavigationItem } from "../../../Routing";
import { withOpacity } from "../../helpers";
import { useBreakpoint } from "../../Responsive";
import { BRAND, getTypography, type ThemeColors } from "../../Theme";

import { DoodleCheck, DoodleLock, DoodleStamp } from "@doodle";
import { ChevronRight } from "@icons";

type Props = {
  item: NavigationItem;
  level?: number;
  /** Position among siblings — drives the module (Roman) / chapter (Arabic) number. */
  index: number;
  /** The parent module's accent hex; modules pass it down to their chapters. */
  moduleColor: string;
  /** Structural gold, for the chapter-complete check mark. */
  gold: string;
  isDirectlyActive: boolean;
  isExpanded: boolean;
  isInteracting: boolean;
  /** Chapter is finished (its badge is earned). Drives the completion check. */
  isComplete?: boolean;
  /**
   * Chapter sits past its module's frontier. Reading it is never refused, but
   * the in-app path to it is not offered. The rule is computed once in
   * `Progression` and injected by the shell; Design only renders the verdict.
   */
  isOutOfSequence?: boolean;
  colors: ThemeColors;
  onItemClick: (item: NavigationItem) => void;
  onInteractionStart: (id: string) => void;
  onInteractionEnd: () => void;
  renderItem: (item: NavigationItem, level: number, index: number, moduleColor: string) => JSX.Element;
};

export const NavItem: FC<Props> = ({
  item,
  level = 0,
  index,
  moduleColor,
  gold,
  isDirectlyActive,
  isExpanded,
  isInteracting,
  isComplete = false,
  isOutOfSequence = false,
  colors,
  onItemClick,
  onInteractionStart,
  onInteractionEnd,
  renderItem,
}) => {
  const typo = getTypography(useBreakpoint());
  const { t } = useTranslation();
  const itemId = item.id || item.label;

  const isModule = level === 0 && !!item.children;
  const isChapter = level === 1;
  const isChallenge = item.kind === "challenge";

  const buttonStyle: CSSProperties = {
    width: "100%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    paddingTop: isModule ? "0.8rem" : "0.5rem",
    paddingBottom: isModule ? "0.8rem" : "0.5rem",
    paddingLeft: isChapter ? "1.5rem" : "1.25rem",
    paddingRight: "1rem",
    textAlign: "left",
    cursor: isOutOfSequence ? "not-allowed" : "pointer",
    // The state is carried by the dimming and the dead click; the padlock is a
    // redundant cue on top, not the thing doing the work.
    opacity: isOutOfSequence ? 0.45 : 1,
    border: "none",
    borderRadius: 0,
    background:
      isChapter && (isDirectlyActive || isInteracting)
        ? withOpacity(moduleColor, isDirectlyActive ? 0.1 : 0.05)
        : !isChapter && isInteracting
          ? colors.base.background.hover
          : "transparent",
    transition: "background-color 0.15s, color 0.15s",
    WebkitTapHighlightColor: "transparent",
  };

  // Module header: Arabic numeral + uppercase mono label, both in the module
  // color. Wraps onto a second line rather than truncating (the sidebar is
  // narrow and the module titles are long). Never dimmed: tracked 13px mono has
  // no contrast to give away, and the chevron already carries the open state.
  const moduleLabelStyle: CSSProperties = {
    ...typo.kicker,
    color: moduleColor,
    flex: 1,
    minWidth: 0,
  };

  // Chapter row: readable serif label, lit brighter when active.
  const chapterLabelStyle: CSSProperties = {
    ...typo.note,
    minWidth: 0,
    color: isDirectlyActive ? colors.base.text.primary : colors.base.text.secondary,
  };

  // Chapter number: quiet mono figure, in the ledger register.
  const numberStyle = (color: string): CSSProperties => ({
    ...typo.micro,
    color,
    flexShrink: 0,
    minWidth: "1.35rem",
  });

  // Module numeral: an editorial display-serif figure in the module's own
  // colour, framed by the four right-angle corner brackets of the Callout (gold
  // = structure). Arabic, single digit: the three modules are 1 · 2 · 3.
  const numeralCornerStroke = `1px solid ${gold}`;
  const moduleNumeralFrameStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.85rem",
    height: "1.85rem",
    flexShrink: 0,
  };
  const moduleNumeralStyle: CSSProperties = {
    fontFamily: BRAND.fonts.display,
    fontSize: "1.2rem",
    fontWeight: 400,
    lineHeight: 1,
    color: moduleColor,
    fontVariantNumeric: "lining-nums",
  };
  const numeralCorner = (edges: CSSProperties): CSSProperties => ({
    position: "absolute",
    width: 6,
    height: 6,
    ...edges,
  });

  const activeBarStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    top: "18%",
    bottom: "18%",
    width: "2px",
    background: moduleColor,
    opacity: isDirectlyActive ? 1 : 0,
    transition: "opacity 0.2s",
  };

  const chevronStyle: CSSProperties = {
    width: "1rem",
    height: "1rem",
    marginLeft: "auto",
    color: moduleColor,
    opacity: isExpanded ? 1 : 0.7,
    flexShrink: 0,
    transition: "opacity 0.2s",
  };

  const submenuWrapperStyle: CSSProperties = {
    display: "grid",
    gridTemplateRows: isExpanded ? "1fr" : "0fr",
    transition: "grid-template-rows 0.3s var(--ease-smooth)",
  };

  const submenuListStyle: CSSProperties = {
    listStyle: "none",
    // Bottom breathing room only while expanded. When collapsed the padding
    // must be 0, otherwise it leaks ~6px through the `grid 0fr` collapse and
    // leaves a hoverable dead band between modules.
    padding: isExpanded ? "0 0 0.4rem" : 0,
    margin: 0,
    overflow: "hidden",
    minHeight: 0,
  };

  return (
    <Fragment key={itemId}>
      <button
        style={buttonStyle}
        onClick={() => !isOutOfSequence && onItemClick(item)}
        aria-disabled={isOutOfSequence || undefined}
        aria-label={isOutOfSequence ? `${item.label}, ${t("nav.locked")}` : undefined}
        onMouseEnter={() => onInteractionStart(itemId)}
        onMouseLeave={onInteractionEnd}
        onFocus={() => onInteractionStart(itemId)}
        onBlur={onInteractionEnd}
        aria-expanded={item.children ? isExpanded : undefined}
      >
        {isChapter && <span style={activeBarStyle} />}

        {isModule && (
          <span style={moduleNumeralFrameStyle}>
            <span style={numeralCorner({ top: 0, left: 0, borderTop: numeralCornerStroke, borderLeft: numeralCornerStroke })} />
            <span style={numeralCorner({ top: 0, right: 0, borderTop: numeralCornerStroke, borderRight: numeralCornerStroke })} />
            <span style={numeralCorner({ bottom: 0, left: 0, borderBottom: numeralCornerStroke, borderLeft: numeralCornerStroke })} />
            <span style={numeralCorner({ bottom: 0, right: 0, borderBottom: numeralCornerStroke, borderRight: numeralCornerStroke })} />
            <span style={moduleNumeralStyle}>{index + 1}</span>
          </span>
        )}
        {isChapter && !isChallenge && (
          <span style={numberStyle(isDirectlyActive ? moduleColor : colors.base.text.secondary)}>
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        {isModule && item.icon && <span style={{ display: "flex", flexShrink: 0 }}>{item.icon}</span>}
        {!isModule && !isChapter && item.icon && (
          <span style={{ display: "flex", flexShrink: 0 }}>{item.icon}</span>
        )}

        <span style={isModule ? moduleLabelStyle : chapterLabelStyle}>{item.label}</span>

        {/* The stamp alone says "quiz" — the word beside it was redundant. */}
        {isChallenge && (
          <DoodleStamp
            size={22}
            style={{ flexShrink: 0, marginLeft: "auto", color: moduleColor }}
          />
        )}
        {isChapter && !isChallenge && isComplete && (
          <DoodleCheck size={18} style={{ marginLeft: "auto", flexShrink: 0, color: gold }} />
        )}
        {isChapter && isOutOfSequence && (
          <DoodleLock
            size={18}
            aria-hidden
            style={{
              marginLeft: isChallenge ? "0.4rem" : "auto",
              flexShrink: 0,
              color: colors.base.text.secondary,
            }}
          />
        )}
        {item.children && (
          <div style={chevronStyle}>
            <ChevronRight
              size={16}
              strokeWidth={2}
              style={{
                transition: "transform 0.2s ease-in-out",
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </div>
        )}
      </button>
      {item.children && (
        // `inert` while collapsed: the chapters are visually hidden (grid 0fr)
        // but stay in the DOM, so without this the keyboard tab order and the
        // focus ring would land on invisible sub-chapters of a folded module.
        <div style={submenuWrapperStyle} aria-hidden={!isExpanded} inert={!isExpanded}>
          <ul style={submenuListStyle}>
            {item.children.map((subItem, subIndex) => (
              <li key={subItem.id || subItem.label}>
                {renderItem(subItem, level + 1, subIndex, moduleColor)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
};
