import { useEffect } from "react";

import { useTranslation } from "../../I18n";
import { ROUTE_NAME, useRouterContext } from "../../Routing";
import { BRANDED_ROUTES, getPageSeo } from "../data";
import { buildAlternates, buildCanonicalUrl, buildPageTitle } from "../helpers";

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
  const withBrand = BRANDED_ROUTES.has(currentPage);
  // A static host serves one HTML file for every path, so an unclaimed
  // address still answers 200. This is what stops that being an indexable
  // soft 404.
  const noindex = currentPage === ROUTE_NAME.NotFound;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return {
    title: buildPageTitle(seo.title, withBrand),
    description: seo.description,
    locale: language === "fr" ? "fr_FR" : "en_US",
    noindex,
    // A page kept out of the index has no canonical address to name, and
    // claiming one while refusing to be indexed says two different things.
    canonical: noindex ? null : buildCanonicalUrl(currentPage, language),
    // A page kept out of the index has no alternates to offer either: the
    // pairing exists so a crawler can choose between versions it may index.
    alternates: noindex ? [] : buildAlternates(currentPage),
  };
};
