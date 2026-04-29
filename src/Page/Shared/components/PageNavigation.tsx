import { type FC, type CSSProperties } from "react";
import { usePageTheme, useBreakpoint } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useRouterContext, useNavigationLogic } from "../../../Routing/";
import { type RouteName } from "../../../Routing/";
import { useTranslation } from "../../../I18n";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const PageNavigation: FC = () => {
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const { t } = useTranslation();
  const { previousPage, nextPage } = useNavigationLogic();
  const { setCurrentPage } = useRouterContext();
  const world = colors[moduleTheme];

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    gap: isMobile ? "0.75rem" : "1rem",
    marginTop: "3rem",
    paddingTop: "1.5rem",
    borderTop: `1px solid ${colors.base.border.primary}`,
  };

  const btnStyle = (align: "left" | "right"): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    flexDirection: align === "left" ? "row" : "row-reverse",
    flex: 1,
    padding: isMobile ? "0.85rem 1rem" : "1rem 1.25rem",
    borderRadius: "1rem",
    border: `1.5px solid ${colors.base.border.secondary}`,
    background: `linear-gradient(190deg, ${withOpacity(world.background.secondary, 0.04)}, ${colors.base.background.primary})`,
    cursor: "pointer",
    transition: "all 0.3s var(--ease-smooth)",
    textAlign: align,
  });

  const iconCircle: CSSProperties = {
    width: isMobile ? "2rem" : "2.25rem",
    height: isMobile ? "2rem" : "2.25rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: withOpacity(world.background.secondary, 0.08),
    border: `1px solid ${withOpacity(world.border.secondary, 0.25)}`,
    color: world.text.secondary,
    transition: "all 0.3s var(--ease-smooth)",
  };

  const labelStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "0.6rem" : "0.65rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: colors.base.text.secondary,
  };

  const titleStyle: CSSProperties = {
    fontSize: isMobile ? "0.8rem" : "0.85rem",
    fontWeight: 500,
    color: colors.base.text.primary,
    lineHeight: 1.3,
  };

  const renderButton = (
    page: { id: RouteName; label: string } | null,
    type: "prev" | "next"
  ) => {
    if (!page) return isMobile ? null : <div style={{ flex: 1 }} />;
    const align = type === "prev" ? "left" : "right";
    const Icon = type === "prev" ? ChevronLeft : ChevronRight;

    return (
      <button
        className="gradient-border"
        style={{ ...btnStyle(align), "--border-glow-color": colors.base.border.secondary } as CSSProperties}
        onClick={() => setCurrentPage(page.id)}
        onMouseEnter={(e) => {
          (e.currentTarget.style as CSSStyleDeclaration).setProperty("--border-glow-color", world.border.secondary);
          e.currentTarget.style.background = `linear-gradient(190deg, ${withOpacity(world.background.secondary, 0.08)}, ${colors.base.background.primary})`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget.style as CSSStyleDeclaration).setProperty("--border-glow-color", colors.base.border.secondary);
          e.currentTarget.style.background = `linear-gradient(190deg, ${withOpacity(world.background.secondary, 0.04)}, ${colors.base.background.primary})`;
        }}
      >
        <div style={iconCircle}>
          <Icon size={isMobile ? 14 : 16} strokeWidth={2} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", flex: 1 }}>
          <span style={labelStyle}>
            {type === "prev" ? t("nav.previous") : t("nav.next")}
          </span>
          <span style={titleStyle}>{page.label}</span>
        </div>
      </button>
    );
  };

  return (
    <nav style={containerStyle}>
      {renderButton(previousPage, "prev")}
      {renderButton(nextPage, "next")}
    </nav>
  );
};
