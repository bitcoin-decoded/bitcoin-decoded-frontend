type IdentityCardRamp = {
  avatarSize: string;
  avatarMarginTop: string;
  marginBottom: string;
  contentPadTop: string;
  contentPadX: string;
  contentPadBottom: string;
  baseFont: string;
  nameFont: string;
  profileFont: string;
  dividerMargin: string;
  sectionGap: string;
};

/** Size/spacing scale for the identity card, in its compact vs full register. */
export const getIdentityCardRamp = (compact: boolean): IdentityCardRamp => {
  if (compact) {
    const avatarSize = "min(33%, 8.5rem)";
    return {
      avatarSize,
      avatarMarginTop: `calc(${avatarSize} / 2 + 0.2rem)`,
      marginBottom: "0.75rem",
      contentPadTop: `calc(${avatarSize} / 2 + 0.9rem)`,
      contentPadX: "1.1rem",
      contentPadBottom: "0.9rem",
      baseFont: "0.875rem",
      nameFont: "1rem",
      // 13px floor: this label is Cutive Mono, which dissolves below it.
      profileFont: "0.8125rem",
      dividerMargin: "0 auto 0.85rem auto",
      sectionGap: "1rem",
    };
  }
  return {
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
  };
};
