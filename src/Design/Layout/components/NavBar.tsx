import { type CSSProperties, type FC, type JSX } from "react";

import { useTranslation } from "../../../I18n";
import { type NavigationItem, useRouterContext } from "../../../Routing";
import { getBrandGold, getModuleThemeColor } from "../../Theme";
import { THEME_COLORS } from "../../Theme/data";
import { useThemeContext } from "../../Theme/hooks/useThemeContext";
import { useHeaderHidden, useNavBar } from "../hooks";

import { NavItem } from "./NavItem";

type Props = {
  /** Injected from App (which has badge access) so Design stays free of Achievements. */
  isChapterComplete?: (id: string) => boolean;
  /** Injected by the shell — Design never reads the progression rule itself. */
  isChapterOutOfSequence?: (id: string) => boolean;
};

export const NavBar: FC<Props> = ({ isChapterComplete, isChapterOutOfSequence }) => {
  const { theme } = useThemeContext();
  const colors = THEME_COLORS[theme];
  const { t } = useTranslation();
  const { currentPage } = useRouterContext();
  const {
    navigationTree,
    openModule,
    handleMenuClick,
    interactionId,
    setInteractionId,
  } = useNavBar();

  const isHeaderHidden = useHeaderHidden();
  const gold = getBrandGold(theme);

  // A module's accent is its theme color (blue/violet/amber), read off its first
  // chapter's route; standalone entries fall back to the structural gold.
  const moduleColorFor = (item: NavigationItem): string => {
    const firstChildId = item.children?.find((child) => child.id)?.id;
    const name = firstChildId ? getModuleThemeColor(firstChildId) : "base";
    return name === "base" ? gold : colors[name].text.secondary;
  };

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
    // Reserve the scrollbar gutter permanently. Otherwise, expanding a module
    // adds its chapters, the list overflows, a scrollbar appears and steals
    // ~6px of width — enough to reflow the tracked mono module title from 2 to
    // 3 lines. A stable gutter keeps the usable width constant open or closed.
    scrollbarGutter: "stable",
  };

  const listStyle: CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.125rem",
  };

  const renderNavItem = (
    item: NavigationItem,
    level = 0,
    index = 0,
    moduleColor = gold,
  ): JSX.Element => (
    <NavItem
      item={item}
      level={level}
      index={index}
      moduleColor={moduleColor}
      gold={gold}
      isComplete={item.id ? (isChapterComplete?.(item.id) ?? false) : false}
      isOutOfSequence={item.id ? (isChapterOutOfSequence?.(item.id) ?? false) : false}
      isDirectlyActive={currentPage === item.id}
      isExpanded={openModule === item.label}
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
          {navigationTree.map((mainItem, i) => (
            <li key={mainItem.label}>{renderNavItem(mainItem, 0, i, moduleColorFor(mainItem))}</li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
