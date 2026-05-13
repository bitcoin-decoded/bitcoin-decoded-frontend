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

  // Padding-top accounts for the Header height (3.5rem) so the first
  // nav item never sits under the Header. The sidebar wrapper in
  // MainLayout spans the full viewport (top: 0, height: 100vh) and
  // slides up by 3.5rem when the Header auto-hides, so the modules
  // never end up with a vacant strip above them.
  //
  // The "NAVIGATION" label + separator that used to sit at the top
  // are gone — they were decorative chrome that ate ~3rem of vertical
  // space for no functional value. Notion / Linear / Stripe go
  // straight to the items; the <nav> element with aria-label preserves
  // screen-reader semantics.
  const navStyle: CSSProperties = {
    padding: "calc(3.5rem + 0.75rem) 0 1.5rem",
    display: "flex",
    flexDirection: "column",
    borderRight: `1px solid ${colors.base.border.primary}`,
    height: "100%",
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
