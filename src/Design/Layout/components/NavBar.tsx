import { type FC, type CSSProperties, type JSX } from "react";
import { useThemeContext } from "../../Theme/hooks/useThemeContext";
import { THEME_COLORS } from "../../Theme/data";
import {
  useRouterContext,
  type NavigationItem,
} from "../../../Routing";
import { useTranslation } from "../../../I18n";
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
  // Slide the nav content up by 3.5rem when the Header auto-hides so
  // the modules visually follow the chrome instead of leaving a vacant
  // strip at the top. The sticky wrapper around us stays at 100vh, so
  // sliding the content shifts the modules without exposing a gap at
  // the bottom of the sidebar.
  const isHeaderHidden = useHeaderHidden();

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
  // borderRight lives on the WRAPPER in MainLayout, not here — because
  // this element translates by -3.5rem when the Header hides, and a
  // border drawn here would translate with it, leaving the bottom
  // 3.5rem of the sidebar column without a separator. The wrapper
  // stays at full 100vh and owns the divider instead.
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
