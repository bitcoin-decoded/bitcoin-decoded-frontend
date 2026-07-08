import { type CSSProperties, type FC, type ReactNode } from "react";

import { getBrandGold, getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useIllustration } from "../hooks";

type IllustrationProps = {
  src?: string;
  children?: ReactNode;
  alt?: string;
  width?: string;
  caption?: string;
  /**
   * Override the vertical margin around the figure. The default
   * `2.5rem auto` suits standalone in-page illustrations; pass a smaller
   * value when embedding inside another card (e.g. inside an expandable
   * definition body).
   */
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

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin,
    width: "100%",
    // On narrow screens the per-page `width` (e.g. "35%") would be tiny, so we
    // widen — but cap at ~22rem so the figure stays a figure and never balloons
    // to a full-bleed image on tablets / large phones.
    maxWidth: isMobile ? "min(100%, 22rem)" : width,
  };

  // Ledger frame: sharp corners, a single gold hairline (structure), no drop
  // shadow and no gradient-border glow. The frame brightens on hover instead.
  const frameStyle: CSSProperties = {
    width: "100%",
    height: "auto",
    borderRadius: 0,
    border: `1px solid ${withOpacity(gold, isHovered ? 0.55 : 0.3)}`,
    backgroundColor: colors.base.background.secondary,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "border-color 0.3s var(--ease-smooth)",
    cursor: "pointer",
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

  const captionStyle: CSSProperties = {
    marginTop: "0.75rem",
    fontSize: typo.label.fontSize,
    lineHeight: 1.5,
    color: colors.base.text.secondary,
    fontStyle: "italic",
    textAlign: "center",
    // Caption follows the figure width on mobile (no narrower than the
    // image - visual mismatch). Slight inset on desktop to keep the eye
    // anchored on the image.
    maxWidth: isMobile ? "100%" : "85%",
    paddingLeft: isMobile ? "0.25rem" : 0,
    paddingRight: isMobile ? "0.25rem" : 0,
  };

  return (
    <figure style={containerStyle}>
      <div style={frameStyle} {...containerHandlers}>
        {src ? (
          <img src={src} alt={alt || "Illustration"} style={contentTransitionStyle} />
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

      {caption && <figcaption style={captionStyle}>{caption}</figcaption>}
    </figure>
  );
};
