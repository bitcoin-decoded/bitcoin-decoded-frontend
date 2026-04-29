import { type FC, type ReactNode, type CSSProperties } from "react";
import { usePageTheme, useBreakpoint } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useTranslation } from "../../../I18n";
import { AudioLines } from "lucide-react";

type ChapterPreludeProps = {
  children: ReactNode;
};

export const ChapterPrelude: FC<ChapterPreludeProps> = ({ children }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";

  const accentColor = colors[moduleTheme].border.secondary;

  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: isMobile ? "0.75rem" : "1rem",
    padding: isMobile ? "1rem 1.25rem" : "1.25rem 1.5rem",
    borderRadius: "1rem",
    background: `linear-gradient(135deg, ${colors[moduleTheme].background.primary}, ${colors.base.background.primary} 70%)`,
    borderLeft: `3px solid ${accentColor}`,
    boxShadow: `0 4px 24px ${withOpacity(accentColor, 0.08)}, 0 1px 4px ${withOpacity(accentColor, 0.06)}`,
    marginTop: "1rem",
    marginBottom: isMobile ? "2rem" : "3rem",
  };

  const iconContainerStyle: CSSProperties = {
    color: accentColor,
    flexShrink: 0,
    marginTop: "0.125rem",
  };

  const contentContainerStyle: CSSProperties = {
    flex: "1 1 auto",
  };

  const labelStyle: CSSProperties = {
    display: "block",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 600,
    fontSize: isMobile ? "0.75rem" : "0.8125rem",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: accentColor,
  };

  const separatorStyle: CSSProperties = {
    width: "100%",
    height: "1px",
    background: `linear-gradient(to right, ${withOpacity(accentColor, 0.25)}, transparent)`,
    border: "none",
    margin: isMobile ? "0.5rem 0" : "0.625rem 0",
  };

  const textStyle: CSSProperties = {
    margin: 0,
    color: moduleTheme === "base"
      ? colors.base.text.secondary
      : colors[moduleTheme].text.primary,
    fontStyle: "italic",
    lineHeight: 1.7,
    fontSize: isMobile ? "0.875rem" : "0.9375rem",
    textAlign: "left",
  };

  return (
    <div style={containerStyle}>
      <div style={iconContainerStyle}>
        <AudioLines size={isMobile ? 18 : 20} strokeWidth={2} />
      </div>
      <div style={contentContainerStyle}>
        <span style={labelStyle}>{t("chapterPrelude.label")}</span>
        <hr style={separatorStyle} />
        <p style={textStyle}>{children}</p>
      </div>
    </div>
  );
};
