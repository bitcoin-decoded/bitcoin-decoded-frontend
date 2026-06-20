import { type CSSProperties, type FC, type KeyboardEvent, type ReactNode } from "react";

import { useTranslation } from "../../../I18n";
import { useBreakpoint } from "../../Responsive";
import { usePageTheme } from "../../Theme/hooks/usePageTheme";
import { useIdentityCard } from "../hooks";
import type { IdentityCharacteristic } from "../types";

type Props = {
  profilePicture: ReactNode;
  name: string;
  profile: string;
  characteristics: IdentityCharacteristic[];
  isExpandable?: boolean;
  /**
   * Tighter type ramp + spacing, for dense multi-column grids (e.g. the
   * monetary history gallery). Default `false` keeps the original roomy
   * card used in the 2-up character layouts.
   */
  compact?: boolean;
  /**
   * Grow to fill the height of a stretched flex parent, so side-by-side cards
   * share a uniform height. Opt-in: default `false` leaves layout untouched.
   */
  fillHeight?: boolean;
  /**
   * Fired when an expandable card opens. Lets a gallery track which cards a
   * reader has explored (e.g. to gate a block). No-op for non-expandable cards.
   */
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
  const isMobile = useBreakpoint() === "mobile";
  const {
    isHovered,
    setIsHovered,
    isOpen,
    toggleOpen,
    showContent,
    isExpandButtonHovered,
    setIsExpandButtonHovered,
  } = useIdentityCard(isExpandable, onExpand);

  // Force the compact ramp on mobile regardless of the prop: the roomy ramp
  // (33% avatar, 6rem top margin) stretches a single-column card to nearly
  // the full viewport height. Desktop opt-in remains driven by `compact`.
  const effectiveCompact = compact || isMobile;

  // Single source for the two size tiers. `compact` drives the gallery look;
  // the default keeps the original roomy card untouched.
  //
  // The compact avatar is clamped (not a raw 33%) so it can't balloon on a
  // wide single-column card. The top margin and content padding are derived
  // from the same value, so the protruding halves always clear the content
  // above and below whatever the card width.
  const compactAvatarSize = "min(33%, 8.5rem)";
  const ramp = effectiveCompact
    ? {
        avatarSize: compactAvatarSize,
        avatarMarginTop: `calc(${compactAvatarSize} / 2 + 0.2rem)`,
        marginBottom: "0.75rem",
        contentPadTop: `calc(${compactAvatarSize} / 2 + 0.9rem)`,
        contentPadX: "1.1rem",
        contentPadBottom: "0.9rem",
        baseFont: "0.85rem",
        nameFont: "1rem",
        profileFont: "0.7rem",
        dividerMargin: "0 auto 0.85rem auto",
        sectionGap: "1rem",
        radius: "1rem",
      }
    : {
        avatarSize: "33%",
        avatarMarginTop: "4rem",
        marginBottom: "1rem",
        contentPadTop: "calc(15% + 1.25rem)",
        contentPadX: "1.5rem",
        contentPadBottom: "1.25rem",
        baseFont: "1rem",
        nameFont: "1.25rem",
        profileFont: "0.9rem",
        dividerMargin: "0 auto 1rem auto",
        sectionGap: "1.25rem",
        radius: "1.25rem",
      };

  const containerStyle: CSSProperties = {
    position: "relative",
    ...(fillHeight ? { flex: 1 } : {}),
    marginTop: ramp.avatarMarginTop,
    marginBottom: ramp.marginBottom,
    background: `linear-gradient(190deg, ${colors[moduleTheme].background.primary}, ${colors.base.background.primary})`,
    borderRadius: ramp.radius,
    boxShadow: isHovered ? colors.boxShadow.strong : colors.boxShadow.soft,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: ramp.baseFont,
    transform: isHovered ? "scale(1.03)" : "scale(1)",
    transition: "transform 0.3s var(--ease-smooth), box-shadow 0.3s var(--ease-smooth)",
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

  const avatarContainerStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: ramp.avatarSize,
    aspectRatio: "1 / 1",
    borderRadius: "50%",
    backgroundColor: colors.base.background.secondary,
    border: `2px solid ${colors[moduleTheme].border.primary}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  };

  const nameStyle: CSSProperties = {
    fontSize: ramp.nameFont,
    fontWeight: 700,
    letterSpacing: "0.05rem",
    lineHeight: 1.4,
    margin: 0,
    color: colors.base.text.primary,
  };

  const profileStyle: CSSProperties = {
    margin: effectiveCompact ? "0.2rem 0 0.8rem 0" : "0.25rem 0 1rem 0",
    fontSize: ramp.profileFont,
    letterSpacing: "0.1em",
    color: colors[moduleTheme].border.secondary,
    textTransform: "uppercase",
    // In compact grids, reserve two profile lines so cards whose profile
    // wraps and those that don't share the exact same collapsed height -
    // a uniform baseline that, unlike `align-items: stretch`, never resizes
    // neighbours when a card expands.
    ...(effectiveCompact ? { lineHeight: 1.4, minHeight: "2.8em" } : {}),
  };

  const sectionLabelStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    color: colors[moduleTheme].text.primary,
    fontWeight: 700,
    marginBottom: effectiveCompact ? "0.6rem" : "1rem",
  };

  const sectionValueStyle: CSSProperties = {
    color: colors[moduleTheme].text.secondary,
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
    backgroundColor: isExpandButtonHovered ? colors[moduleTheme].background.primary : "transparent",
    borderColor: isExpandButtonHovered ? "transparent" : colors.base.border.primary,
    color: isExpandButtonHovered ? "#FFF" : colors.base.text.secondary,
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "50%",
    width: "2rem",
    height: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    transform: isOpen ? "rotate(135deg)" : "rotate(0deg)",
    transition: "transform 0.3s var(--ease-smooth), border-color 0.3s var(--ease-smooth)",
  };

  const toggleTextStyle: CSSProperties = {
    fontSize: "0.75rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.1rem",
  };

  // Each section cascades in (fade + rise) when the card opens, staggered by
  // index for a premium unfold. Last section carries no bottom gap.
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
      className="gradient-border"
      style={
        {
          ...containerStyle,
          "--border-glow-color": isHovered
            ? colors[moduleTheme].text.secondary
            : colors[moduleTheme].border.secondary,
        } as CSSProperties
      }
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
        <div style={nameStyle}>{name}</div>
        <div style={profileStyle}>{profile}</div>
        <div
          style={{
            width: "50%",
            height: "0.0625rem",
            backgroundColor: colors.base.border.primary,
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
                  {characteristic.label}
                </div>
                <div style={sectionValueStyle}>{characteristic.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
