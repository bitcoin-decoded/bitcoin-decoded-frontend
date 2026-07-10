import { type CSSProperties, type FC, Fragment, type JSX } from "react";

import { type NavigationItem } from "../../../Routing";
import { Badge } from "../../components";
import { withOpacity } from "../../helpers";
import { useBreakpoint } from "../../Responsive";
import { getTypography, type ThemeColors } from "../../Theme";
import { toRoman } from "../helpers";

import { Check, ChevronRight, ClipboardCheck } from "@icons";

type Props = {
  item: NavigationItem;
  level?: number;
  /** Position among siblings — drives the module (Roman) / chapter (Arabic) number. */
  index: number;
  /** The parent module's accent hex; modules pass it down to their chapters. */
  moduleColor: string;
  /** Structural gold, for the Roman module numerals. */
  gold: string;
  isDirectlyActive: boolean;
  isExpanded: boolean;
  isActiveAncestor: boolean;
  isInteracting: boolean;
  /** Chapter is finished (its badge is earned). Drives the completion check. */
  isComplete?: boolean;
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
  isActiveAncestor,
  isInteracting,
  isComplete = false,
  colors,
  onItemClick,
  onInteractionStart,
  onInteractionEnd,
  renderItem,
}) => {
  const typo = getTypography(useBreakpoint());
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
    cursor: "pointer",
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
    outline: "none",
  };

  // Module header: Roman numeral (gold) + uppercase mono label in the module
  // color. Wraps onto a second line rather than truncating (the sidebar is
  // narrow and the module titles are long).
  const moduleLabelStyle: CSSProperties = {
    ...typo.kicker,
    color: isActiveAncestor || isExpanded ? moduleColor : withOpacity(moduleColor, 0.75),
    flex: 1,
    minWidth: 0,
  };

  // Chapter row: readable serif label, lit brighter when active.
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
    opacity: isExpanded ? 1 : 0.5,
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
    padding: "0 0 0.4rem",
    margin: 0,
    overflow: "hidden",
    minHeight: 0,
  };

  return (
    <Fragment key={itemId}>
      <button
        style={buttonStyle}
        onClick={() => onItemClick(item)}
        onMouseEnter={() => onInteractionStart(itemId)}
        onMouseLeave={onInteractionEnd}
        onFocus={() => onInteractionStart(itemId)}
        onBlur={onInteractionEnd}
        aria-expanded={item.children ? isExpanded : undefined}
      >
        {isChapter && <span style={activeBarStyle} />}

        {isModule && <span style={numberStyle(gold)}>{toRoman(index + 1)}</span>}
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

        {isChallenge && (
          <Badge
            size="sm"
            color={moduleColor}
            icon={<ClipboardCheck size={13} strokeWidth={2} />}
            style={{ flexShrink: 0, marginLeft: "auto" }}
          >
            Quiz
          </Badge>
        )}
        {isChapter && !isChallenge && isComplete && (
          <Check size={14} strokeWidth={2.5} color={gold} style={{ marginLeft: "auto", flexShrink: 0 }} />
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
        <div style={submenuWrapperStyle} aria-hidden={!isExpanded}>
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
