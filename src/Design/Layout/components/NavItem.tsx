import { type FC, type CSSProperties, type JSX, Fragment } from "react";
import { BadgeCheck } from "lucide-react";
import { ChevronIcon } from "../../icons";
import { type NavigationItem } from "../../../Routing";

type Props = {
  item: NavigationItem;
  level?: number;
  isDirectlyActive: boolean;
  isExpanded: boolean;
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
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
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
    color: isDirectlyActive
      ? colors.base.text.primary
      : colors.base.text.secondary,
    outline: "none",
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

  const submenuStyle: CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    overflow: "hidden",
    maxHeight: isExpanded ? "500px" : "0",
    visibility: isExpanded ? "visible" : "hidden",
    transition: `max-height 0.3s ease-in-out, visibility 0s linear ${
      isExpanded ? "0s" : "0.3s"
    }`,
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
      >
        <span style={activeIndicatorStyle} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
          }}
        >
          {item.icon && level === 0 && (
            <span style={{ opacity: 0.7 }}>{item.icon}</span>
          )}
          <span>{item.label}</span>
        </div>
        {item.children && (
          <div
            style={{
              width: "1rem",
              height: "1rem",
              color: "#f7931a",
              opacity: 0.7,
              flexShrink: 0,
            }}
          >
            <ChevronIcon isExpanded={isExpanded} />
          </div>
        )}
        {!item.children && item.kind === "challenge" && (
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f7931a",
              opacity: isDirectlyActive || isInteracting ? 1 : 0.6,
              flexShrink: 0,
              transition: "opacity 0.15s",
            }}
          >
            <BadgeCheck size={13} strokeWidth={1.8} />
          </span>
        )}
      </button>
      {item.children && (
        <ul style={submenuStyle}>
          {item.children.map((subItem) => (
            <li key={subItem.id || subItem.label}>
              {renderItem(subItem, level + 1)}
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};
