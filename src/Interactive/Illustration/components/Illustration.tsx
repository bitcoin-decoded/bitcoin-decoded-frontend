import { type CSSProperties, type FC, type ReactNode } from "react";

import {
  BRAND,
  getBrandGold,
  getTypography,
  useBreakpoint,
  usePageTheme,
  withOpacity,
} from "../../../Design";
import { FrText } from "../../../I18n";
import { useIllustration } from "../hooks";

type IllustrationProps = {
  src?: string;
  children?: ReactNode;
  alt?: string;
  width?: string;
  caption?: string;
  margin?: string;
};

export const Illustration: FC<IllustrationProps> = ({
  src,
  children,
  alt,
  width = "100%",
  caption,
  margin = "2.5rem auto",
}) => {
  const typo = getTypography();
  const { theme, colors } = usePageTheme();
  const { isHovered, containerHandlers } = useIllustration();
  const isMobile = useBreakpoint() === "mobile";

  const gold = getBrandGold(theme);
  const cornerSize = isMobile ? 10 : 14;
  const bracketInset = 5;

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin,
    width: "100%",
    maxWidth: isMobile ? "min(100%, 22rem)" : width,
  };

  const frameWrapStyle: CSSProperties = {
    position: "relative",
    padding: bracketInset,
    width: isMobile && src ? "fit-content" : "100%",
    maxWidth: "100%",
    cursor: "pointer",
  };

  const frameStyle: CSSProperties = {
    width: "100%",
    height: "auto",
    borderRadius: 0,
    border: `1px solid ${withOpacity(gold, isHovered ? 0.4 : 0.22)}`,
    // Transparent, so the frame takes whatever it is dropped on. The
    // illustrations carry their own alpha, and painting `background.secondary`
    // here put a near-black rectangle inside the tinted wash of a callout. On
    // the reading page the two are the same colour anyway, so nothing changes
    // where it already looked right.
    backgroundColor: "transparent",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "border-color 0.3s var(--ease-smooth)",
  };

  const corners = (): ReactNode => {
    const s = `${BRAND.figures.ruleThickness}px solid ${withOpacity(gold, isHovered ? 0.9 : 0.55)}`;
    const base: CSSProperties = {
      position: "absolute",
      width: cornerSize,
      height: cornerSize,
      transition: "border-color 0.3s var(--ease-smooth)",
      pointerEvents: "none",
    };
    return (
      <>
        <span style={{ ...base, top: 0, left: 0, borderTop: s, borderLeft: s }} />
        <span style={{ ...base, top: 0, right: 0, borderTop: s, borderRight: s }} />
        <span style={{ ...base, bottom: 0, left: 0, borderBottom: s, borderLeft: s }} />
        <span style={{ ...base, bottom: 0, right: 0, borderBottom: s, borderRight: s }} />
      </>
    );
  };

  const contentTransitionStyle: CSSProperties = {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "cover",
    filter:
      theme === "dark"
        ? isHovered
          ? "brightness(1)"
          : "brightness(0.9)"
        : isHovered
          ? "brightness(0.95)"
          : "none",
  };

  const imgStyle: CSSProperties = {
    ...contentTransitionStyle,
    ...(isMobile
      ? {
          width: "auto",
          maxWidth: "100%",
          maxHeight: "min(38vh, 15rem)",
          objectFit: "contain",
        }
      : {}),
  };

  const captionStyle: CSSProperties = {
    marginTop: "0.75rem",
    fontSize: typo.label.fontSize,
    lineHeight: 1.5,
    color: colors.base.text.secondary,
    fontStyle: "italic",
    textAlign: "center",
    maxWidth: isMobile ? "100%" : "85%",
    paddingLeft: isMobile ? "0.25rem" : 0,
    paddingRight: isMobile ? "0.25rem" : 0,
  };

  return (
    <figure style={containerStyle}>
      <div style={frameWrapStyle} {...containerHandlers}>
        {corners()}
        <div style={frameStyle}>
          {src ? (
            <img src={src} alt={alt || "Illustration"} style={imgStyle} />
          ) : (
            <div
              style={{
                ...contentTransitionStyle,
                display: "flex",
                justifyContent: "center",
                padding: "1rem",
              }}
            >
              {children}
            </div>
          )}
        </div>
      </div>

      {caption && (
        <figcaption style={captionStyle}>
          <FrText>{caption}</FrText>
        </figcaption>
      )}
    </figure>
  );
};
