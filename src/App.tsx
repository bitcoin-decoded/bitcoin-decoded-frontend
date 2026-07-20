import { type FC } from "react";

import { BadgeNavButton, BadgeProvider, useBadges } from "./Achievements";
import { MainLayout, ThemeProvider } from "./Design";
import { LanguageProvider } from "./I18n";
import { BitcoinDonationFooter } from "./Interactive";
import { useChapterProgression } from "./Progression";
import { type RouteName, RouterProvider } from "./Routing";
import { AppRouter } from "./Routing/components";
import { PageHead } from "./Seo";

// Composition bridge: sits inside BadgeProvider so it can read badge state and
// inject "is this chapter finished?" into the layout — this is how the nav marks
// completed chapters without Design ever depending on Achievements. Sequential
// progression is injected the same way, and for the same reason.
const AppShell: FC = () => {
  const { isEarned } = useBadges();
  const { isOutOfSequence } = useChapterProgression();

  return (
    <MainLayout
      headerAction={<BadgeNavButton />}
      isChapterComplete={isEarned}
      /* The layout is typed on plain ids because completion also covers module
         quiz badges, which are not routes. Every id it hands back here comes
         from a NavigationItem, so it is a route. */
      isChapterOutOfSequence={(id) => isOutOfSequence(id as RouteName)}
      footerAside={<BitcoinDonationFooter display="footer" />}
    >
      {/* React 19 hoists what this renders into <head>. */}
      <PageHead />
      <AppRouter />
    </MainLayout>
  );
};

export const App: FC<{ route?: RouteName }> = ({ route }) => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <RouterProvider route={route}>
          <BadgeProvider>
            <AppShell />
          </BadgeProvider>
        </RouterProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};
