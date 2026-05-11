import { type FC, type CSSProperties, type JSX } from "react";
import { useThemeContext } from "../../Theme/hooks/useThemeContext";
import { THEME_COLORS } from "../../Theme/data";
import {
  useRouterContext,
  type NavigationItem,
} from "../../../Routing";
import { useTranslation } from "../../../I18n";
import { useNavBar } from "../hooks";
import { NavItem } from "./NavItem";

export const NavBar: FC = () => {
  const { theme } = useThemeContext();
  const colors = THEME_COLORS[theme];
  const { t } = useTranslation();
  const { currentPage } = useRouterContext();
  const {
    navigationTree,
    openModule,
    handleMenuClick,
    activePath,
    interactionId,
    setInteractionId,
  } = useNavBar();

  const navStyle: CSSProperties = {
    padding: "1.5rem 0",
    display: "flex",
    flexDirection: "column",
    borderRight: `1px solid ${colors.base.border.primary}`,
    height: "100%",
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "0 1.25rem",
    marginBottom: "1.5rem",
    flexShrink: 0,
  };

  const headerLabelStyle: CSSProperties = {
    fontSize: "0.8125rem",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 600,
    color: colors.base.text.primary,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  };

  const separatorStyle: CSSProperties = {
    height: "1px",
    width: "100%",
    margin: 0,
    border: "none",
    outline: "none",
    background: colors.base.border.primary,
  };

  const listContainerStyle: CSSProperties = {
    overflowY: "auto",
    flex: "1 1 auto",
  };

  const listStyle: CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.125rem",
  };

  const renderNavItem = (item: NavigationItem, level = 0): JSX.Element => (
    <NavItem
      item={item}
      level={level}
      isDirectlyActive={currentPage === item.id}
      isExpanded={openModule === item.label}
      isActiveAncestor={
        level === 0 && activePath.includes(item.label) && currentPage !== item.id
      }
      isInteracting={interactionId === (item.id || item.label)}
      colors={colors}
      onItemClick={handleMenuClick}
      onInteractionStart={setInteractionId}
      onInteractionEnd={() => setInteractionId(null)}
      renderItem={renderNavItem}
    />
  );

  return (
    <nav style={navStyle}>
      <div style={headerStyle}>
        <span style={headerLabelStyle}>{t("nav.title")}</span>
        <hr style={separatorStyle} />
      </div>
      <div style={listContainerStyle}>
        <ul style={listStyle}>
          {navigationTree.map((mainItem) => (
            <li key={mainItem.label}>{renderNavItem(mainItem)}</li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
