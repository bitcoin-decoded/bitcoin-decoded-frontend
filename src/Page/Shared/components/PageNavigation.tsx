import { type CSSProperties, type FC } from "react";

import { useBreakpoint, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useNavigationLogic } from "../../../Routing/";

import { NavButton } from "./NavButton";

export const PageNavigation: FC = () => {
  const { previousPage, nextPage } = useNavigationLogic();
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  const containerStyle: CSSProperties = {
    display: "flex",
    // One left, one right, at every width: the pair reads as back and forward
    // on its own, which a stacked column never did.
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    gap: isMobile ? "0.5rem" : "1rem",
    marginTop: "3rem",
    paddingTop: "1.5rem",
    borderTop: `1px solid ${withOpacity(colors.base.text.primary, 0.1)}`,
  };

  return (
    <nav style={containerStyle}>
      {previousPage ? (
        <NavButton page={previousPage} type="prev" />
      ) : (
        <div style={{ flex: "1 1 0" }} />
      )}
      {nextPage ? (
        <NavButton page={nextPage} type="next" />
      ) : (
        <div style={{ flex: "1 1 0" }} />
      )}
    </nav>
  );
};
