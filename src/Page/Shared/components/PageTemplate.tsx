import { type CSSProperties, type FC, type ReactNode } from "react";

import { BRAND, useBreakpoint, usePageTheme } from "../../../Design";
import { FrText } from "../../../I18n";

import { ChapterPrelude } from "./ChapterPrelude";
import { PageNavigation } from "./PageNavigation";
import { ReadingTimeBadge } from "./ReadingTimeBadge";

type Props = {
  title: string;
  prelude?: ReactNode;
  /**
   * Show the "X min" reading-time badge under the title.
   * Default `true`. Pass `false` for chapters that aren't a read (quizzes).
   */
  showReadingTime?: boolean;
  /**
   * Render the chapter prev/next navigation at the foot of the page.
   * Default `true`. Block-reading chapters pass `false` and let `BlockReader`
   * surface it only once the chapter is finished.
   */
  showChapterNav?: boolean;
  children: ReactNode;
};

export const PageTemplate: FC<Props> = ({
  title,
  prelude,
  showReadingTime = true,
  showChapterNav = true,
  children,
}) => {
  const { colors, moduleTheme } = usePageTheme();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";
  const accentColor = colors[moduleTheme].border.secondary;
  // Chapter title carries the module identity color (violet on MoneyLaws,
  // blue on Banking, amber on Bitcoin), falling back to ink on neutral pages.
  const titleColor =
    moduleTheme === "base" ? colors.base.text.primary : colors[moduleTheme].text.secondary;

  // ── Vertical rhythm - single source of truth for the page header.
  // Three tiers (mobile / tablet / desktop). Same philosophy as HomePage:
  // tight coupling within a semantic group, generous breathing between groups.
  const pick = <T,>(m: T, ta: T, d: T): T => (isMobile ? m : isTablet ? ta : d);

  const space = {
    // Container chrome - comfortable top breathing before the title lands.
    pageTop: pick("1.5rem", "2rem", "2.5rem"),
    pageBottom: pick("2rem", "2.5rem", "3rem"),

    // Header internals - title and reading time form a tight "page header"
    // group. They belong together, so the gap is small enough to read as
    // a couplet but wide enough to breathe.
    titleToReadingTime: pick("0.85rem", "1rem", "1.15rem"),

    // Header → prelude - clear semantic break (page identity → abstract).
    headerToPrelude: pick("2rem", "2.5rem", "3rem"),

    // Prelude → body - second clear break (abstract → development).
    preludeToBody: pick("2rem", "2.5rem", "3rem"),

    // No-prelude case: header → body needs the equivalent total breathing.
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
    // 17px desktop / 16px mobile with a tighter line-height: reduces the
    // height of text blocks without losing reading comfort (Patrick Hand at
    // 19px read too tall). Line-height trimmed from 1.75 to 1.62.
    fontSize: isMobile ? "1rem" : "1.0625rem",
    letterSpacing: "0.005em",
    lineHeight: 1.62,
    "--accent-color": accentColor,
  } as CSSProperties;

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>{title}</h1>
        {showReadingTime && <ReadingTimeBadge />}
      </header>
      {prelude && (
        <ChapterPrelude marginBottom={space.preludeToBody}>
          <FrText>{prelude}</FrText>
        </ChapterPrelude>
      )}
      <section className="page-content" style={sectionStyle}>
        <FrText>{children}</FrText>
      </section>
      {showChapterNav && <PageNavigation />}
    </div>
  );
};
