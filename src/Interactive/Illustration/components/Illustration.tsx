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

type IllustrationProps = {
  src?: string;
  children?: ReactNode;
  alt?: string;
  width?: string;
  caption?: string;
  margin?: string;
};

// Width is the primary bound (the `width` prop on desktop/tablet, the full column
// on mobile); max-height is only an overflow guard so a very tall portrait never
// exceeds the viewport. The image keeps `width/height: auto`, so both bounds scale
// it as one unit, aspect preserved, and the fit-content frame hugs it on both axes.
const MAX_HEIGHT = "min(90vh, 48rem)";

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
  const isMobile = useBreakpoint() === "mobile";

  const gold = getBrandGold(theme);
  const cornerSize = isMobile ? 10 : 14;
  const bracketInset = 5;

  // maxWidth sits on the figure so it sizes correctly as a flex item when pages
  // lay two illustrations side by side (PAGE_STYLES.illustrationsWrapper); the
  // frame then hugs the image within that width.
  const figureStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin,
    width: "100%",
    maxWidth: isMobile ? "100%" : width,
  };

  const frameWrapStyle: CSSProperties = {
    position: "relative",
    padding: bracketInset,
    width: "fit-content",
    maxWidth: "100%",
  };

  const frameStyle: CSSProperties = {
    borderRadius: 0,
    border: `1px solid ${withOpacity(gold, 0.22)}`,
    // Transparent, so the frame takes whatever it is dropped on. The illustrations
    // carry their own alpha, and painting a surface colour here put a near-black
    // rectangle inside the tinted wash of a callout.
    backgroundColor: "transparent",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const mediaStyle: CSSProperties = {
    display: "block",
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    maxHeight: MAX_HEIGHT,
  };

  const corners = (): ReactNode => {
    const s = `${BRAND.figures.ruleThickness}px solid ${withOpacity(gold, 0.55)}`;
    const base: CSSProperties = {
      position: "absolute",
      width: cornerSize,
      height: cornerSize,
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

  const captionStyle: CSSProperties = {
    marginTop: "0.75rem",
    fontSize: typo.label.fontSize,
    lineHeight: 1.5,
    color: colors.base.text.secondary,
    fontStyle: "italic",
    textAlign: "center",
    maxWidth: "85%",
  };

  return (
    <figure style={figureStyle}>
      <div style={frameWrapStyle}>
        {corners()}
        <div style={frameStyle}>
          {src ? (
            <img src={src} alt={alt || "Illustration"} style={mediaStyle} />
          ) : (
            <div style={{ ...mediaStyle, padding: "1rem" }}>{children}</div>
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
