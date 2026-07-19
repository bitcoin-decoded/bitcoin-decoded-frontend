import { useEffect } from "react";

import { useTranslation } from "../../I18n";
import { ROUTE_NAME, useRouterContext } from "../../Routing";
import { getPageSeo } from "../data";
import { buildPageTitle } from "../helpers";

/**
 * What the current route should tell a search engine about itself.
 *
 * The `lang` attribute is applied here rather than rendered, because it lives on
 * `<html>` and React only hoists head elements. It was hardcoded to "en" on a
 * French-first application, which is a wrong signal rather than a missing one.
 */
export const usePageHead = () => {
  const { currentPage } = useRouterContext();
  const { language } = useTranslation();

  const seo = getPageSeo(currentPage, language);
  const isHome = currentPage === ROUTE_NAME.HomePage;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return {
    title: buildPageTitle(seo.title, isHome),
    description: seo.description,
    locale: language === "fr" ? "fr_FR" : "en_US",
  };
};
