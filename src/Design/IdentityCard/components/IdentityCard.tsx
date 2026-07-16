import { type CSSProperties, type FC, type KeyboardEvent, type ReactNode } from "react";

import { FrText, useTranslation } from "../../../I18n";
import { withOpacity } from "../../helpers";
import { useBreakpoint } from "../../Responsive";
import { BRAND, getBrandGold, getTypography, usePageTheme, useThemeContext } from "../../Theme";
import { getIdentityCardRamp } from "../helpers";
import { useIdentityCard } from "../hooks";
import type { IdentityCharacteristic } from "../types";

type Props = {
  profilePicture: ReactNode;
  name: string;
  profile: string;
  characteristics: IdentityCharacteristic[];
  isExpandable?: boolean;
  compact?: boolean;
  fillHeight?: boolean;
  onExpand?: () => void;
};

export const IdentityCard: FC<Props> = ({
  profilePicture,
  name,
  profile,
  characteristics,
  isExpandable = false,
  compact = false,
  fillHeight = false,
  onExpand,
}) => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const {
    isHovered,
    setIsHovered,
    isOpen,
    toggleOpen,
    showContent,
    isExpandButtonHovered,
    setIsExpandButtonHovered,
  } = useIdentityCard(isExpandable, onExpand);

  const effectiveCompact = compact || isMobile;
  const ramp = getIdentityCardRamp(effectiveCompact);
  const gold = getBrandGold(theme);

  // A ledger registry entry: flat surface, square, gold hairline that warms on
  // hover. No gradient / drop shadow / glow border — those were the old look.
  const containerStyle: CSSProperties = {
    position: "relative",
    ...(fillHeight ? { flex: 1 } : {}),
    marginTop: ramp.avatarMarginTop,
    marginBottom: ramp.marginBottom,
    background: colors.base.background.secondary,
    border: `1px solid ${withOpacity(gold, isHovered ? 0.6 : 0.3)}`,
    borderRadius: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: ramp.baseFont,
    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
    transition: "transform 0.3s var(--ease-smooth), border-color 0.3s var(--ease-smooth)",
    zIndex: isHovered ? 10 : 1,
    cursor: "pointer",
  };

  const contentStyle: CSSProperties = {
    padding: `${ramp.contentPadTop} ${ramp.contentPadX} ${ramp.contentPadBottom}`,
    width: "100%",
    fontSize: ramp.baseFont,
    textAlign: "center",
  };

  const animatedWrapperStyle: CSSProperties = {
    display: "grid",
    gridTemplateRows: showContent ? "1fr" : "0fr",
    transition: "grid-template-rows 0.4s var(--ease-smooth)",
  };

  const minHeightFixStyle: CSSProperties = {
    overflow: "hidden",
    minHeight: 0,
    paddingBottom: showContent ? ramp.contentPadBottom : "0",
    transition: "padding-bottom 0.4s var(--ease-smooth)",
  };

  // The portrait is a stamped block straddling the card's top edge. The art is
  // fully transparent, and the block overhangs onto the page, so it needs an
  // opaque backing or a seam shows through the character — but that backing
  // must follow the theme: a fixed cream one burns a white square into dark
  // mode. Matching the card surface keeps the overlap seamless in both.
  const avatarContainerStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: ramp.avatarSize,
    aspectRatio: "1 / 1",
    borderRadius: 0,
    backgroundColor: colors.base.background.secondary,
    border: `1px solid ${withOpacity(gold, 0.55)}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  };

  const nameStyle: CSSProperties = {
    fontFamily: BRAND.fonts.display,
    fontSize: ramp.nameFont,
    fontWeight: 500,
    letterSpacing: "0.01em",
    lineHeight: 1.4,
    margin: 0,
    color: colors.base.text.primary,
  };

  // Was `border.secondary` — a 50%-alpha module tint that dissolved in dark
  // mode. The module's text accent is the readable register in both themes.
  const profileStyle: CSSProperties = {
    margin: effectiveCompact ? "0.2rem 0 0.8rem 0" : "0.25rem 0 1rem 0",
    fontFamily: BRAND.fonts.mono,
    fontSize: ramp.profileFont,
    fontVariant: "small-caps",
    letterSpacing: "0.1em",
    color: colors[moduleTheme].text.secondary,
    ...(effectiveCompact ? { lineHeight: 1.4, minHeight: "2.8em" } : {}),
  };

  const sectionLabelStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    color: colors[moduleTheme].text.secondary,
    fontWeight: 600,
    marginBottom: effectiveCompact ? "0.6rem" : "1rem",
  };

  const sectionValueStyle: CSSProperties = {
    color: colors.base.text.secondary,
    lineHeight: 1.6,
    fontStyle: "italic",
  };

  const toggleContainerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    margin: "0 auto",
    color: colors.base.text.secondary,
  };

  const toggleIconStyle: CSSProperties = {
    backgroundColor: isExpandButtonHovered ? withOpacity(gold, 0.14) : "transparent",
    borderColor: withOpacity(gold, isExpandButtonHovered ? 0.7 : 0.35),
    color: isExpandButtonHovered ? colors.base.text.primary : colors.base.text.secondary,
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: 0,
    width: "2rem",
    height: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: BRAND.fonts.mono,
    fontSize: "1.1rem",
    lineHeight: 1,
    transform: isOpen ? "rotate(135deg)" : "rotate(0deg)",
    transition:
      "transform 0.3s var(--ease-smooth), border-color 0.3s var(--ease-smooth), background-color 0.3s var(--ease-smooth)",
  };

  const toggleTextStyle: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    letterSpacing: "0.1em",
  };

  const sectionStyle = (index: number): CSSProperties => ({
    textAlign: "center",
    marginBottom: index === characteristics.length - 1 ? 0 : ramp.sectionGap,
    opacity: showContent ? 1 : 0,
    transform: showContent ? "translateY(0)" : "translateY(10px)",
    transition: "opacity 0.5s var(--ease-smooth), transform 0.5s var(--ease-smooth)",
    transitionDelay: showContent ? `${0.1 + index * 0.1}s` : "0s",
  });

  const onCardKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleOpen();
    }
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={isExpandable ? toggleOpen : undefined}
      onKeyDown={isExpandable ? onCardKeyDown : undefined}
      role={isExpandable ? "button" : undefined}
      tabIndex={isExpandable ? 0 : undefined}
      aria-expanded={isExpandable ? isOpen : undefined}
    >
      <div style={avatarContainerStyle}>{profilePicture}</div>
      <div style={contentStyle}>
        {/* This card takes its copy through props, which `FrText` cannot reach
         *  from the page (it only walks children) — so it applies it here. */}
        <div style={nameStyle}>
          <FrText>{name}</FrText>
        </div>
        <div style={profileStyle}>
          <FrText>{profile}</FrText>
        </div>
        <div
          style={{
            width: "50%",
            height: "0.0625rem",
            backgroundColor: withOpacity(gold, 0.3),
            margin: ramp.dividerMargin,
          }}
        />
        {isExpandable && (
          <div
            style={toggleContainerStyle}
            onMouseEnter={() => setIsExpandButtonHovered(true)}
            onMouseLeave={() => setIsExpandButtonHovered(false)}
          >
            <div style={toggleIconStyle}>+</div>
            <span style={toggleTextStyle}>
              {isOpen ? t("identityCard.collapse") : t("identityCard.expand")}
            </span>
          </div>
        )}
      </div>
      <div style={animatedWrapperStyle}>
        <div style={minHeightFixStyle}>
          <div style={{ padding: `0 ${ramp.contentPadX}` }}>
            {characteristics.map((characteristic, index) => (
              <div key={index} style={sectionStyle(index)}>
                <div style={sectionLabelStyle}>
                  {characteristic.icon}
                  <FrText>{characteristic.label}</FrText>
                </div>
                <div style={sectionValueStyle}>
                  <FrText>{characteristic.value}</FrText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
