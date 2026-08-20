import { type CSSProperties, type FC, Fragment } from "react";

import { getBrandGold, HighlightText, useThemeContext } from "../../../Design";

import { DoodleSmileyCheeky, DoodleSmileyDizzy } from "@doodle";

type Props = {
  text: string;
};

// Splits an i18n string on its inline markers and renders each: <hl>…</hl> → a gold
// HighlightText (base hue, same wherever the modal opens from), <dizzy/> / <cheeky/>
// → the matching Streamline smiley. Never keyed on hardcoded indices.
const MARKER = /(<hl>[\s\S]*?<\/hl>|<dizzy\/>|<cheeky\/>)/g;

export const AboutRichText: FC<Props> = ({ text }) => {
  const { theme } = useThemeContext();

  const doodleStyle: CSSProperties = {
    display: "inline-block",
    verticalAlign: "middle",
    marginLeft: "0.3em",
    color: getBrandGold(theme),
  };

  return (
    <>
      {text.split(MARKER).map((part, i) => {
        const marked = part.match(/^<hl>([\s\S]*)<\/hl>$/);
        if (marked) {
          return (
            <HighlightText key={i} hue="base">
              {marked[1]}
            </HighlightText>
          );
        }
        if (part === "<dizzy/>") return <DoodleSmileyDizzy key={i} size={22} style={doodleStyle} aria-hidden />;
        if (part === "<cheeky/>") return <DoodleSmileyCheeky key={i} size={22} style={doodleStyle} aria-hidden />;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
};
