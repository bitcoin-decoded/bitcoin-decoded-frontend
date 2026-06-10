import { type CSSProperties, type FC } from "react";

import { Info } from "lucide-react";

import { usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import type { PathFinderCopy } from "../data";
import type { WalletSolution } from "../types";

import { CriteriaRow } from "./CriteriaRow";

type Props = {
  solution: WalletSolution;
  copy: PathFinderCopy;
  accent: string;
};

export const SolutionCard: FC<Props> = ({ solution, copy, accent }) => {
  const { colors } = usePageTheme();
  const { language } = useTranslation();
  const neutral = colors.base.text.secondary;

  const rowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem 0.85rem",
    flexWrap: "wrap",
    padding: "0.5rem 0.7rem",
    borderRadius: "0.6rem",
    border: `1px solid ${withOpacity(neutral, 0.14)}`,
    background: withOpacity(neutral, 0.03),
  };

  const nameStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.82rem",
    fontWeight: 700,
    color: colors.base.text.primary,
  };

  const infoStyle: CSSProperties = {
    color: withOpacity(neutral, 0.7),
    cursor: "help",
    flexShrink: 0,
  };

  return (
    <div style={rowStyle}>
      <span style={nameStyle}>
        {solution.name}
        {solution.sensitiveNote && (
          <span style={infoStyle} title={`${copy.noteLabel} : ${solution.sensitiveNote[language]}`}>
            <Info size={13} strokeWidth={2} />
          </span>
        )}
      </span>
      <CriteriaRow solution={solution} copy={copy} accent={accent} />
    </div>
  );
};
