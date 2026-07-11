import { type FC } from "react";

import { BadgeNavButton, BadgeProvider, useBadges } from "./Achievements";
import { MainLayout, ThemeProvider } from "./Design";
import { LanguageProvider } from "./I18n";
import { AppRouter, RouterProvider } from "./Routing";

// Composition bridge: sits inside BadgeProvider so it can read badge state and
// inject "is this chapter finished?" into the layout — this is how the nav marks
// completed chapters without Design ever depending on Achievements.
const AppShell: FC = () => {
  const { isEarned } = useBadges();
  return (
    <MainLayout headerAction={<BadgeNavButton />} isChapterComplete={isEarned}>
      <AppRouter />
    </MainLayout>
  );
};

export const App: FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <RouterProvider>
          <BadgeProvider>
            <AppShell />
          </BadgeProvider>
        </RouterProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};
