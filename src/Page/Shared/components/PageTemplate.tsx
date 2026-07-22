import { type CSSProperties, type FC, type ReactNode } from "react";

import {
  BRAND,
  getTypography,
  SectionLabel,
  useBreakpoint,
  usePageTheme,
  withOpacity,
} from "../../../Design";
import { FrText } from "../../../I18n";
import { OutOfSequenceNotice } from "../../../Progression";
import { useChapterKicker } from "../hooks";

import { ChapterPrelude } from "./ChapterPrelude";
import { ModuleProgress } from "./ModuleProgress";
import { PageNavigation } from "./PageNavigation";
import { ReadingTimeBadge } from "./ReadingTimeBadge";

type Props = {
  title: string;
  prelude?: ReactNode;
  showReadingTime?: boolean;
  children: ReactNode;
};

export const PageTemplate: FC<Props> = ({
  title,
  prelude,
  showReadingTime = true,
  children,
}) => {
  const { colors, moduleTheme } = usePageTheme();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";
  const typography = getTypography(breakpoint);
  const kicker = useChapterKicker();
  const accentColor =
    moduleTheme === "base" ? colors.base.text.secondary : colors[moduleTheme].text.secondary;
  const accentSoft = withOpacity(accentColor, 0.45);
  const titleColor =
    moduleTheme === "base" ? colors.base.text.primary : colors[moduleTheme].text.secondary;

  const pick = <T,>(m: T, ta: T, d: T): T => (isMobile ? m : isTablet ? ta : d);

  const space = {
    pageTop: pick("1.5rem", "2rem", "2.5rem"),
    pageBottom: pick("2rem", "2.5rem", "3rem"),

    titleToReadingTime: pick("0.85rem", "1rem", "1.15rem"),

    headerToPrelude: pick("2rem", "2.5rem", "3rem"),

    preludeToBody: pick("2rem", "2.5rem", "3rem"),

    headerToBodyNoPrelude: pick("2rem", "2.5rem", "3rem"),
  };

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "48rem",
    margin: "0 auto",
    padding: `${space.pageTop} 0.75rem ${space.pageBottom}`,
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space.titleToReadingTime,
    marginBottom: prelude ? space.headerToPrelude : space.headerToBodyNoPrelude,
  };

  const titleStyle: CSSProperties = {
    fontFamily: BRAND.fonts.display,
    fontSize: isMobile ? "1.85rem" : "2.75rem",
    lineHeight: 1.15,
    textAlign: "center",
    fontWeight: 400,
    letterSpacing: 0,
    color: titleColor,
    margin: 0, // spacing is now driven exclusively by the rhythm system above
  };

  const sectionStyle: CSSProperties = {
    ...typography.prose,
    "--accent-color": accentColor,
    "--accent-soft": accentSoft,
  } as CSSProperties;

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        {kicker && <SectionLabel marker={kicker.marker} label={kicker.label} />}
        <h1 style={titleStyle}>{title}</h1>
        {showReadingTime && <ReadingTimeBadge />}
      </header>
      <OutOfSequenceNotice />
      {prelude && (
        <ChapterPrelude marginBottom={space.preludeToBody}>
          <FrText>{prelude}</FrText>
        </ChapterPrelude>
      )}
      <ModuleProgress />
      <section className="page-content" style={sectionStyle}>
        <FrText>{children}</FrText>
      </section>
      <PageNavigation />
    </div>
  );
};
