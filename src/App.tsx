import { type FC } from "react";

import { BadgeNavButton, BadgeProvider } from "./Achievements";
import { MainLayout, ThemeProvider } from "./Design";
import { LanguageProvider } from "./I18n";
import { AppRouter, RouterProvider } from "./Routing";

export const App: FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <RouterProvider>
          <BadgeProvider>
            <MainLayout headerAction={<BadgeNavButton />}>
              <AppRouter />
            </MainLayout>
          </BadgeProvider>
        </RouterProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};
