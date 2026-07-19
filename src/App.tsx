import { type FC } from "react";

import { BadgeNavButton, BadgeProvider, useBadges } from "./Achievements";
import { MainLayout, ThemeProvider } from "./Design";
import { LanguageProvider } from "./I18n";
import { useChapterLock, useLockedRouteGuard } from "./Progression";
import { AppRouter, type RouteName, RouterProvider } from "./Routing";
import { PageHead } from "./Seo";

// Composition bridge: sits inside BadgeProvider so it can read badge state and
// inject "is this chapter finished?" into the layout — this is how the nav marks
// completed chapters without Design ever depending on Achievements. Sequential
// progression is injected the same way, and for the same reason.
const AppShell: FC = () => {
  const { isEarned } = useBadges();
  const { isLocked } = useChapterLock();
  const isRedirecting = useLockedRouteGuard();

  return (
    <MainLayout
      headerAction={<BadgeNavButton />}
      isChapterComplete={isEarned}
      /* The layout is typed on plain ids because completion also covers module
         quiz badges, which are not routes. Every id it hands back here comes
         from a NavigationItem, so it is a route. */
      isChapterLocked={(id) => isLocked(id as RouteName)}
    >
      {/* React 19 hoists what this renders into <head>. */}
      <PageHead />
      {/* A refused chapter is never rendered, not even for the frame it would
          take the guard to redirect. */}
      {isRedirecting ? null : <AppRouter />}
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
