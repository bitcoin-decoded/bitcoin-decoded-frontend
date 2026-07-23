import { type CSSProperties, type FC } from "react";

import { getTypography, useBreakpoint, usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { truncateHash } from "../../helpers";

type Props = {
  originalHash: string;
  newHash: string;
  accent: string;
};

export const HashComparison: FC<Props> = ({ originalHash, newHash, accent }) => {
  const breakpoint = useBreakpoint();
  const typo = getTypography(breakpoint);
  const { t } = useTranslation();
  const { colors } = usePageTheme();

  const wrapper: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
    marginTop: "0.1rem",
  };

  const row: CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    gap: "0.45rem",
    flexWrap: "wrap",
  };

  const labelBase: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    color: colors.base.text.secondary,
  };

  const valueBase: CSSProperties = {
    ...typo.figure,
    wordBreak: "break-word",
  };

  return (
    <div style={wrapper}>
      <div style={row}>
        <span style={labelBase}>{t("chain.originalHash")}</span>
        <span style={{ ...valueBase, color: accent, opacity: 0.55 }}>
          {truncateHash(originalHash)}
        </span>
      </div>
      <div style={row}>
        <span style={{ ...labelBase, color: accent }}>{t("chain.newHash")}</span>
        <span style={{ ...valueBase, color: accent }}>{truncateHash(newHash)}</span>
      </div>
    </div>
  );
};
