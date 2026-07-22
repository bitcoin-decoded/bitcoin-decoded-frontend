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
  index: number;
  moduleColor: string;
  isDirectlyActive: boolean;
  isExpanded: boolean;
  isInteracting: boolean;
  isComplete?: boolean;
  isOutOfSequence?: boolean;
  colors: ThemeColors;
  onItemClick: (item: NavigationItem) => void;
  onInteractionStart: (id: string) => void;
  onInteractionEnd: () => void;
  renderItem: (item: NavigationItem, level: number, index: number, moduleColor: string) => JSX.Element;
};

const CHECK_SIZE = 15;
const MARK_WEIGHT = "bold" as const;
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

  const chapterLabelStyle: CSSProperties = {
    ...typo.note,
    minWidth: 0,
    color: isDirectlyActive ? colors.base.text.primary : colors.base.text.secondary,
  };

  const numberStyle = (color: string): CSSProperties => ({
    ...typo.micro,
    color,
    flexShrink: 0,
    minWidth: "1.35rem",
  });

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
