import { type FC } from "react";

import { BadgeCelebration, BadgeNavButton, getBadgeIdForRoute, useBadges } from "./Achievements";
import { AuthEntryButton, AuthFlowProvider, AuthProvider } from "./Auth/components";
import { MainLayout, ThemeProvider } from "./Design";
import { type Language, LanguageProvider } from "./I18n";
import { BitcoinDonationFooter } from "./Interactive";
import { useChapterProgression } from "./Progression";
import { type RouteName, RouterProvider } from "./Routing";
import { AppRouter } from "./Routing/components";
import { PageHead } from "./Seo";
import { hasLocalProgress, UserDataProvider } from "./UserData";

const AppShell: FC = () => {
  const { isEarned } = useBadges();
  const { isOutOfSequence } = useChapterProgression();

  return (
    <>
      <MainLayout
        headerAction={
          <>
            <BadgeNavButton />
            <AuthEntryButton />
          </>
        }
        isChapterComplete={(id) => isEarned(getBadgeIdForRoute(id))}
        isChapterOutOfSequence={(id) => isOutOfSequence(id as RouteName)}
        footerAside={<BitcoinDonationFooter display="footer" />}
      >
        <PageHead />
        <AppRouter />
      </MainLayout>
      <BadgeCelebration />
    </>
  );
};

export const App: FC<{ route?: RouteName; language?: Language }> = ({ route, language }) => {
  return (
    <RouterProvider route={route} language={language}>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <AuthFlowProvider detectLocalProgress={hasLocalProgress}>
              <UserDataProvider>
                <AppShell />
              </UserDataProvider>
            </AuthFlowProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </RouterProvider>
  );
};
