import { type CSSProperties, type FC } from "react";

import { BRAND, getStableSeed } from "../../../Design";

type Props = {
  words: string[];
  color: string;
};

const SIZES = ["0.75rem", "0.82rem", "0.9rem"];

// The module's key concepts, thrown as a light keyword cloud: each word italic and
// tinted in the module colour, tilted and nudged off the baseline so the group reads
// as a scattered whole rather than a list.
export const NotionCloud: FC<Props> = ({ words, color }) => {
  // The gap is the guaranteed minimum spacing; because a rotate/translate is a
  // visual transform (it never pushes flow neighbours), the tilt and vertical nudge
  // are kept small enough that a word never reaches into that gap — so keywords stay
  // apart and the cloud reads evenly spread rather than clumped.
  const containerStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "1.15rem 1.1rem",
    maxWidth: "26rem",
    margin: "1.35rem 0",
  };

  // getStableSeed keeps the scatter deterministic: a word always lands at the same
  // angle/offset/size, identical between the prerendered HTML and the client.
  const wordStyle = (word: string): CSSProperties => {
    const h = getStableSeed(word);
    return {
      display: "inline-block",
      fontFamily: BRAND.fonts.body,
      fontStyle: "italic",
      fontSize: SIZES[(h >> 8) % SIZES.length],
      lineHeight: 1.2,
      color,
      whiteSpace: "nowrap",
      transform: `translateY(${((h >> 4) % 5) - 2}px) rotate(${(h % 11) - 5}deg)`,
    };
  };

  return (
    <div style={containerStyle}>
      {words.map((word) => (
        <span key={word} style={wordStyle(word)}>
          {word}
        </span>
      ))}
    </div>
  );
};
