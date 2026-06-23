import { type CSSProperties, type FC } from "react";

import { BRAND, useBreakpoint, usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { truncateHash } from "../../helpers";

type Props = {
  originalHash: string;
  newHash: string;
  /** Zone color (e.g. violet for hashes, blue for merkle root). Original is dimmed via opacity, new stays full strength + bold. */
  accent: string;
};

export const HashComparison: FC<Props> = ({ originalHash, newHash, accent }) => {
  const { t } = useTranslation();
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  const mono = { fontFamily: BRAND.fonts.mono } as const;

  const wrapper: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
    marginTop: "0.1rem",
  };

  const row: CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    gap: "0.4rem",
    flexWrap: "wrap",
  };

  const labelBase: CSSProperties = {
    ...mono,
    fontSize: isMobile ? "0.5rem" : "0.55rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: colors.base.text.secondary,
  };

  const valueBase: CSSProperties = {
    ...mono,
    fontSize: isMobile ? "0.6rem" : "0.65rem",
    wordBreak: "break-all",
  };

  return (
    <div style={wrapper}>
      <div style={row}>
        <span style={labelBase}>{t("chain.originalHash")}</span>
        <span style={{ ...valueBase, color: accent, opacity: 0.55, fontWeight: 500 }}>
          {truncateHash(originalHash)}
        </span>
      </div>
      <div style={row}>
        <span style={{ ...labelBase, color: accent }}>{t("chain.newHash")}</span>
        <span style={{ ...valueBase, color: accent, fontWeight: 700 }}>
          {truncateHash(newHash)}
        </span>
      </div>
    </div>
  );
};
