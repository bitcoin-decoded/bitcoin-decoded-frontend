import { type FC } from "react";

import { BadgeNavButton, BadgeProvider, getBadgeIdForRoute, useBadges } from "./Achievements";
import { MainLayout, ThemeProvider } from "./Design";
import { type Language, LanguageProvider } from "./I18n";
import { BitcoinDonationFooter } from "./Interactive";
import { useChapterProgression } from "./Progression";
import { type RouteName, RouterProvider } from "./Routing";
import { AppRouter } from "./Routing/components";
import { PageHead } from "./Seo";

const AppShell: FC = () => {
  const { isEarned } = useBadges();
  const { isOutOfSequence } = useChapterProgression();

  return (
    <MainLayout
      headerAction={<BadgeNavButton />}
      isChapterComplete={(id) => isEarned(getBadgeIdForRoute(id))}
      isChapterOutOfSequence={(id) => isOutOfSequence(id as RouteName)}
      footerAside={<BitcoinDonationFooter display="footer" />}
    >
      <PageHead />
      <AppRouter />
    </MainLayout>
  );
};

export const App: FC<{ route?: RouteName; language?: Language }> = ({ route, language }) => {
  return (
    <RouterProvider route={route} language={language}>
      <LanguageProvider>
        <ThemeProvider>
          <BadgeProvider>
            <AppShell />
          </BadgeProvider>
        </ThemeProvider>
      </LanguageProvider>
    </RouterProvider>
  );
};
