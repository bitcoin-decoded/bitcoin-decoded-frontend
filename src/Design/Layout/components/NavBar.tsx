import { type CSSProperties, type FC, type JSX } from "react";

import { useTranslation } from "../../../I18n";
import { type NavigationItem, useRouterContext } from "../../../Routing";
import { THEME_COLORS } from "../../Theme/data";
import { useThemeContext } from "../../Theme/hooks/useThemeContext";
import { useHeaderHidden, useNavBar } from "../hooks";

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

  const isHeaderHidden = useHeaderHidden();

  const navStyle: CSSProperties = {
    padding: "calc(3.5rem + 0.75rem) 0 1.5rem",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    transform: isHeaderHidden ? "translateY(-3.5rem)" : "translateY(0)",
    transition: "transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
    willChange: "transform",
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
      isActiveAncestor={level === 0 && activePath.includes(item.label) && currentPage !== item.id}
      isInteracting={interactionId === (item.id || item.label)}
      colors={colors}
      onItemClick={handleMenuClick}
      onInteractionStart={setInteractionId}
      onInteractionEnd={() => setInteractionId(null)}
      renderItem={renderNavItem}
    />
  );

  return (
    <nav style={navStyle} aria-label={t("nav.title")}>
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
