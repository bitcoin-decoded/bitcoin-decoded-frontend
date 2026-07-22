import { useEffect } from "react";

import { useTranslation } from "../../I18n";
import { ROUTE_NAME, useRouterContext } from "../../Routing";
import { BRANDED_ROUTES, getPageSeo } from "../data";
import {
  buildAlternates,
  buildCanonicalUrl,
  buildPageTitle,
  buildStructuredData,
} from "../helpers";

export const usePageHead = () => {
  const { currentPage } = useRouterContext();
  const { t, language } = useTranslation();

  const seo = getPageSeo(currentPage, language);
  const withBrand = BRANDED_ROUTES.has(currentPage);
  const noindex = currentPage === ROUTE_NAME.NotFound;

  const canonical = noindex ? null : buildCanonicalUrl(currentPage, language);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return {
    title: buildPageTitle(seo.title, withBrand),
    description: seo.description,
    locale: language === "fr" ? "fr_FR" : "en_US",
    noindex,
    canonical,
    alternates: noindex ? [] : buildAlternates(currentPage),
    structuredData: canonical
      ? buildStructuredData({ route: currentPage, language, seo, canonical, t })
      : null,
  };
};
