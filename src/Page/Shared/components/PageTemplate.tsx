import { type FC, type ReactNode, type CSSProperties } from "react";
import { usePageTheme } from "../../../Design";
import { PAGE_STYLES } from "../styles";
import { ChapterPrelude } from "./ChapterPrelude";
import { PageNavigation } from "./PageNavigation";
import { ReadingTimeBadge } from "./ReadingTimeBadge";

type Props = {
  title: string;
  prelude?: ReactNode;
  children: ReactNode;
};

export const PageTemplate: FC<Props> = ({ title, prelude, children }) => {
  const { colors, moduleTheme } = usePageTheme();
  const accentColor = colors[moduleTheme].border.secondary;

  return (
    <div style={PAGE_STYLES.container}>
      <header style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <h1 style={PAGE_STYLES.title}>{title}</h1>
        <ReadingTimeBadge />
      </header>
      {prelude && <ChapterPrelude>{prelude}</ChapterPrelude>}
      <section
        className="page-content"
        style={{ ...PAGE_STYLES.section, "--accent-color": accentColor } as CSSProperties}
      >
        {children}
      </section>
      <PageNavigation />
    </div>
  );
};
