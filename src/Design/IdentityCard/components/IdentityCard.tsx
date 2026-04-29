import { type FC, type ReactNode, type CSSProperties } from "react";
import { usePageTheme } from "../../Theme/hooks/usePageTheme";
import { useIdentityCard } from "../hooks";
import type { IdentityCharacteristic } from "../types";

type Props = {
  profilePicture: ReactNode;
  name: string;
  profile: string;
  characteristics: IdentityCharacteristic[];
  isExpandable?: boolean;
};

export const IdentityCard: FC<Props> = ({
  profilePicture,
  name,
  profile,
  characteristics,
  isExpandable = false,
}) => {
  const { colors, moduleTheme } = usePageTheme();
  const {
    isHovered,
    setIsHovered,
    isOpen,
    toggleOpen,
    showContent,
    isExpandButtonHovered,
    setIsExpandButtonHovered,
  } = useIdentityCard(isExpandable);

  const containerStyle: CSSProperties = {
    position: "relative",
    marginTop: "6rem",
    marginBottom: "2rem",
    background: `linear-gradient(190deg, ${colors[moduleTheme].background.primary}, ${colors.base.background.primary})`,
    borderRadius: "1.25rem",
    boxShadow: isHovered ? colors.boxShadow.strong : colors.boxShadow.soft,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "1rem",
    transform: isHovered ? "scale(1.03)" : "scale(1)",
    transition: "transform 0.3s var(--ease-smooth), box-shadow 0.3s var(--ease-smooth)",
    zIndex: isHovered ? 10 : 1,
    cursor: "pointer",
  };

  const contentStyle: CSSProperties = {
    padding: "calc(15% + 2rem) 1.5rem 2rem 1.5rem",
    width: "100%",
    fontSize: "1rem",
    textAlign: "center",
  };

  const animatedWrapperStyle: CSSProperties = {
    display: "grid",
    gridTemplateRows: showContent ? "1fr" : "0fr",
    transition: "grid-template-rows 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
  };

  const minHeightFixStyle: CSSProperties = {
    overflow: "hidden",
    minHeight: 0,
    paddingBottom: showContent ? "2rem" : "0",
    opacity: showContent ? 1 : 0,
    transition: "padding-bottom 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
  };

  const avatarContainerStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "33%",
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
    fontSize: "1.25rem",
    fontWeight: 700,
    letterSpacing: "0.05rem",
    lineHeight: 1.625,
    margin: 0,
    color: colors.base.text.primary,
  };

  const profileStyle: CSSProperties = {
    margin: "0.25rem 0 1.5rem 0",
    fontSize: "0.9rem",
    letterSpacing: "0.1em",
    color: colors[moduleTheme].border.secondary,
    textTransform: "uppercase",
  };

  const sectionLabelStyle: CSSProperties = {
    color: colors[moduleTheme].text.primary,
    fontWeight: 700,
    marginBottom: "1rem",
  };

  const sectionValueStyle: CSSProperties = {
    color: colors[moduleTheme].text.secondary,
    marginBottom: "2rem",
    lineHeight: 1.6,
    fontStyle: "italic",
  };

  const toggleContainerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    margin: "0 auto 1rem auto",
    color: colors.base.text.secondary,
  };

  const toggleIconStyle: CSSProperties = {
    backgroundColor: isExpandButtonHovered
      ? colors[moduleTheme].background.primary
      : "transparent",

    borderColor: isExpandButtonHovered
      ? "transparent"
      : colors.base.border.primary,

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
    transition: "transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1), border-color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
  };

  const toggleTextStyle: CSSProperties = {
    fontSize: "0.75rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.1rem",
  };

  return (
    <div
      className="gradient-border"
      style={{ ...containerStyle, "--border-glow-color": isHovered ? colors[moduleTheme].text.secondary : colors[moduleTheme].border.secondary } as CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            margin: "0 auto 1.5rem auto",
          }}
        />
        {isExpandable && (
          <div
            style={toggleContainerStyle}
            onClick={toggleOpen}
            onMouseEnter={() => setIsExpandButtonHovered(true)}
            onMouseLeave={() => setIsExpandButtonHovered(false)}
          >
            <div style={toggleIconStyle}>+</div>
            <span style={toggleTextStyle}>
              {isOpen ? "Replier" : "Déplier"}
            </span>
          </div>
        )}
      </div>
      <div style={animatedWrapperStyle}>
        <div style={minHeightFixStyle}>
          <div style={{ padding: "0 1.5rem" }}>
            {characteristics.map((characteristic, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <div style={sectionLabelStyle}>{characteristic.label}</div>
                <div style={sectionValueStyle}>{characteristic.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
