import { type CSSProperties, type FC } from "react";

import { useBreakpoint, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useNavigationLogic } from "../../../Routing/";

import { NavButton } from "./NavButton";

/**
 * Chapter-level previous / next navigation, ledger register: two sharp
 * hairline-framed buttons (see NavButton) above a thin top rule. No
 * gradient-border, no rounded cards, no circle icons.
 */
export const PageNavigation: FC = () => {
  const { previousPage, nextPage } = useNavigationLogic();
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    gap: isMobile ? "0.75rem" : "1rem",
    marginTop: "3rem",
    paddingTop: "1.5rem",
    borderTop: `1px solid ${withOpacity(colors.base.text.primary, 0.1)}`,
  };

  return (
    <nav style={containerStyle}>
      {previousPage ? (
        <NavButton page={previousPage} type="prev" />
      ) : (
        !isMobile && <div style={{ flex: 1 }} />
      )}
      {nextPage ? (
        <NavButton page={nextPage} type="next" />
      ) : (
        !isMobile && <div style={{ flex: 1 }} />
      )}
    </nav>
  );
};
