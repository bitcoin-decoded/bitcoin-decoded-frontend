import { type CSSProperties, type FC, Fragment, type JSX } from "react";

import { useTranslation } from "../../../I18n";
import { type NavigationItem } from "../../../Routing";
import { withOpacity } from "../../helpers";
import { useBreakpoint } from "../../Responsive";
import { BRAND, getTypography, type ThemeColors } from "../../Theme";

import { DoodleLock } from "@doodle";
import { Check } from "@icons";
import { ChevronRight } from "@icons";

type Props = {
  item: NavigationItem;
  level?: number;
  /** Position among siblings — drives the module (Roman) / chapter (Arabic) number. */
  index: number;
  /** The parent module's accent hex; modules pass it down to their chapters. */
  moduleColor: string;
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

// The trailing marks, kept together because they are read together: the quiz
// pill names the kind of chapter, the check says it is finished, and a passed
// quiz shows both.
const CHECK_SIZE = 15;
const MARK_WEIGHT = "bold" as const;
// The pair belongs to one row, so it travels as one block.
const MARK_GAP = "0.2rem";

export const NavItem: FC<Props> = ({
  item,
  level = 0,
  index,
  moduleColor,
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

  // Module header, in the module colour, wrapping rather than truncating: the
  // sidebar is narrow and the titles are long.
  //
  // Source Serif 4 rather than the mono, because it carries a real 600. Single
  // weight tracked mono had no stroke to give, which left the three titles
  // thinner than the chapter labels they govern. Uppercase stays, this being
  // the part-label register, but the tracking comes well down: a serif needs
  // far less of it than mono to stay open.
  const moduleLabelStyle: CSSProperties = {
    fontFamily: BRAND.fonts.body,
    fontSize: typo.kicker.fontSize,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    lineHeight: 1.35,
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
  // colour. Arabic, single digit: the three modules are 1 · 2 · 3.
  //
  // The four gold corner brackets that used to frame it are gone. In a slot
  // barely thirty pixels wide the row already carries a coloured numeral, a
  // coloured title and a chevron; a hairline frame on top of that read as a
  // scratch rather than as structure, and it competed with the very figure it
  // was meant to hold. Gold still marks structure where it has the room to be
  // read as such: the chapter rail and the block shell.
  //
  // The figure takes the weight the brackets were carrying instead: a step up
  // in size, and 500 rather than 400, which Literata has for real.
  const moduleNumeralFrameStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.85rem",
    flexShrink: 0,
  };
  const moduleNumeralStyle: CSSProperties = {
    fontFamily: BRAND.fonts.display,
    fontSize: typo.heading.fontSize,
    fontWeight: 500,
    lineHeight: 1,
    color: moduleColor,
    fontVariantNumeric: "lining-nums",
  };

  // A framed word rather than a glyph. The circled question mark sat optically
  // higher than the padlock next to it and came from a different family, so the
  // two never lined up. This is the device the chapter rail uses to mark the
  // chapter being read, outlined and in the module's colour rather than filled
  // in gold, since here it names a kind of chapter rather than your position.
  const quizPillStyle: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: moduleColor,
    border: `1px solid ${withOpacity(moduleColor, 0.5)}`,
    padding: "0.02rem 0.32rem",
    lineHeight: 1.35,
    flexShrink: 0,
  };

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

        {/* The mark alone says "quiz"; the word beside it was redundant. Both
            are Phosphor, which carries real weights: the freehand check could
            not have been made heavier at all, being a filled shape with no
            stroke to thicken. A passed quiz shows both, so they sit in one
            block rather than being placed separately and drifting apart. */}
        {isChapter && (isChallenge || isComplete) && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: MARK_GAP,
              marginLeft: "auto",
              flexShrink: 0,
            }}
          >
            {isChallenge && <span style={quizPillStyle}>{t("moduleProgress.quiz")}</span>}
            {isComplete && (
              // The module colour, not gold: gold is the structure of the
              // ledger, while finishing a chapter belongs to its module.
              <Check size={CHECK_SIZE} weight={MARK_WEIGHT} style={{ color: moduleColor }} />
            )}
          </span>
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
