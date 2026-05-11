import { type FC, type CSSProperties, type JSX, Fragment } from "react";
import { ClipboardCheck } from "lucide-react";
import { ChevronIcon } from "../../icons";
import { Badge } from "../../components";
import { type NavigationItem } from "../../../Routing";

type Props = {
  item: NavigationItem;
  level?: number;
  isDirectlyActive: boolean;
  /** Module is expanded (only meaningful at level 0). */
  isExpanded: boolean;
  /**
   * Module contains the current page but isn't the page itself.
   * Used to keep the parent module subtly highlighted when it's
   * been collapsed by another module opening (so the user keeps a
   * sense of "where am I").
   */
  isActiveAncestor: boolean;
  isInteracting: boolean;
  colors: Record<string, any>;
  onItemClick: (item: NavigationItem) => void;
  onInteractionStart: (id: string) => void;
  onInteractionEnd: () => void;
  renderItem: (item: NavigationItem, level: number) => JSX.Element;
};

export const NavItem: FC<Props> = ({
  item,
  level = 0,
  isDirectlyActive,
  isExpanded,
  isActiveAncestor,
  isInteracting,
  colors,
  onItemClick,
  onInteractionStart,
  onInteractionEnd,
  renderItem,
}) => {
  const itemId = item.id || item.label;

  const buttonStyle: CSSProperties = {
    width: "100%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "0.6rem",
    paddingBottom: "0.6rem",
    paddingLeft: `${1.25 + level * 0.75}rem`,
    paddingRight: "1rem",
    textAlign: "left",
    fontSize: "0.8125rem",
    fontWeight: level === 0 ? 600 : 400,
    letterSpacing: "0.02em",
    cursor: "pointer",
    border: "none",
    borderRadius: 0,
    transition: "background-color 0.15s, color 0.15s",
    backgroundColor:
      isDirectlyActive || isInteracting
        ? colors.base.background.hover
        : "transparent",
    color:
      isDirectlyActive || isActiveAncestor
        ? colors.base.text.primary
        : colors.base.text.secondary,
    outline: "none",
    WebkitTapHighlightColor: "transparent",
  };

  const activeIndicatorStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    top: "20%",
    bottom: "20%",
    width: "2px",
    backgroundColor: "#f7931a",
    borderRadius: "0 1px 1px 0",
    opacity: isDirectlyActive ? 1 : 0,
    transition: "opacity 0.2s",
  };

  // grid-template-rows: 0fr ↔ 1fr animates the natural height of the
  // child without needing a max-height cap. The inner <ul> has
  // overflow: hidden so the rows clip cleanly during the transition.
  const submenuWrapperStyle: CSSProperties = {
    display: "grid",
    gridTemplateRows: isExpanded ? "1fr" : "0fr",
    transition: "grid-template-rows 0.3s var(--ease-smooth)",
  };

  const submenuListStyle: CSSProperties = {
    listStyle: "none",
    padding: 0,
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
        <span style={activeIndicatorStyle} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            minWidth: 0,
            flex: 1,
          }}
        >
          {item.icon && level === 0 && (
            <span style={{ opacity: 0.7, flexShrink: 0 }}>{item.icon}</span>
          )}
          <span style={{ minWidth: 0 }}>{item.label}</span>
          {item.kind === "challenge" && (
            <Badge
              size="sm"
              color="#f7931a"
              icon={<ClipboardCheck size={13} strokeWidth={2} />}
              style={{ flexShrink: 0 }}
            >
              Quiz
            </Badge>
          )}
        </div>
        {item.children && (
          <div
            style={{
              width: "1rem",
              height: "1rem",
              color: "#f7931a",
              opacity: isExpanded ? 1 : 0.55,
              flexShrink: 0,
              transition: "opacity 0.2s",
            }}
          >
            <ChevronIcon isExpanded={isExpanded} />
          </div>
        )}
      </button>
      {item.children && (
        <div style={submenuWrapperStyle} aria-hidden={!isExpanded}>
          <ul style={submenuListStyle}>
            {item.children.map((subItem) => (
              <li key={subItem.id || subItem.label}>
                {renderItem(subItem, level + 1)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
};
