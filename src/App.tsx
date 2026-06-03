import { type FC } from "react";

import { MainLayout, ThemeProvider } from "./Design";
import { LanguageProvider } from "./I18n";
import { AppRouter, RouterProvider } from "./Routing";

export const App: FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <RouterProvider>
          <MainLayout>
            <AppRouter />
          </MainLayout>
        </RouterProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};
