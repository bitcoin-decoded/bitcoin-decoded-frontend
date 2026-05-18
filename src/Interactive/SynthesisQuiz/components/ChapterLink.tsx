import type { CSSProperties, FC } from "react";

import { usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useRouterContext } from "../../../Routing";
import type { ChapterReference } from "../types";

export const ChapterLink: FC<{ ref_: ChapterReference }> = ({ ref_ }) => {
  const { t } = useTranslation();
  const { setCurrentPage } = useRouterContext();
  const { colors, moduleTheme } = usePageTheme();
  const world = colors[moduleTheme];

  const chapterLinkStyle: CSSProperties = {
    background: "none",
    border: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer",
    color: world.text.secondary,
    textDecoration: "underline",
    textDecorationColor: withOpacity(world.text.secondary, 0.4),
    textUnderlineOffset: "3px",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: 500,
    transition: "color 0.2s var(--ease-smooth)",
  };

  return (
    <button
      type="button"
      style={chapterLinkStyle}
      onClick={() => setCurrentPage(ref_.routeId)}
      onMouseEnter={(e) => (e.currentTarget.style.color = colors.base.text.primary)}
      onMouseLeave={(e) => (e.currentTarget.style.color = world.text.secondary)}
    >
      {t(ref_.labelKey)}
    </button>
  );
};
