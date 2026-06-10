import { type CSSProperties, type FC } from "react";

import { usePageTheme, withOpacity } from "../../../Design";
import type { PathFinderCopy } from "../data";
import { getCriteriaDescriptors } from "../helpers";
import type { WalletSolution } from "../types";

type Props = {
  solution: WalletSolution;
  copy: PathFinderCopy;
  accent: string;
};

export const CriteriaRow: FC<Props> = ({ solution, copy, accent }) => {
  const { colors } = usePageTheme();
  const neutral = colors.base.text.secondary;
  const red = colors.semantic.error.text;
  const descriptors = getCriteriaDescriptors(copy.criteria);

  const rowStyle: CSSProperties = { display: "flex", gap: "0.3rem", flexShrink: 0 };

  const chipStyle = (present: boolean): CSSProperties => ({
    position: "relative",
    width: "1.55rem",
    height: "1.55rem",
    borderRadius: "0.45rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: present ? accent : withOpacity(neutral, 0.7),
    background: present ? withOpacity(accent, 0.12) : withOpacity(red, 0.05),
    border: `1px solid ${present ? withOpacity(accent, 0.32) : withOpacity(red, 0.3)}`,
  });

  const crossBar = (rotate: number): CSSProperties => ({
    position: "absolute",
    width: "1.15rem",
    height: "1.25px",
    borderRadius: "2px",
    background: red,
    transform: `rotate(${rotate}deg)`,
  });

  return (
    <div style={rowStyle}>
      {descriptors.map(({ key, Icon, label, isPresent }) => {
        const present = isPresent(solution);
        const title = `${label} : ${present ? copy.legend.yes : copy.legend.no}`;
        return (
          <span key={key} style={chipStyle(present)} title={title} aria-label={title}>
            <Icon size={13} strokeWidth={present ? 2.6 : 2.4} />
            {!present && (
              <>
                <span style={crossBar(45)} />
                <span style={crossBar(-45)} />
              </>
            )}
          </span>
        );
      })}
    </div>
  );
};
