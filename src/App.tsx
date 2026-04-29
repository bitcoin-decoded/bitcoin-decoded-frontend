import { type FC } from "react";
import { MainLayout, ThemeProvider } from "./Design";
import { AppRouter, RouterProvider } from "./Routing";
import { LanguageProvider } from "./I18n";

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
