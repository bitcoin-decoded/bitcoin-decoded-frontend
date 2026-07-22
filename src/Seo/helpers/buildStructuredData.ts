import type { Language, TranslationFn } from "../../I18n";
import { getNavigationTree, getRoutePath, ROUTE_NAME, type RouteName } from "../../Routing";
import { SITE } from "../data";
import type { PageSeo } from "../types";

type Input = {
  route: RouteName;
  language: Language;
  seo: PageSeo;
  canonical: string;
  t: TranslationFn;
};

export const buildStructuredData = ({ route, language, seo, canonical, t }: Input): string => {
  const home = `${SITE.url}${getRoutePath(ROUTE_NAME.HomePage, language)}`;

  const trail: { name: string; item: string }[] = [{ name: SITE.name, item: home }];

  for (const module of getNavigationTree(t)) {
    const child = module.children?.find((item) => item.id === route);
    if (!child) continue;
    trail.push({ name: module.label, item: home });
    break;
  }

  if (route !== ROUTE_NAME.HomePage) trail.push({ name: seo.title, item: canonical });

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: step.item,
    })),
  };

  const article = {
    "@context": "https://schema.org",
    "@type": route === ROUTE_NAME.HomePage ? "WebSite" : "Article",
    name: seo.title,
    headline: seo.title,
    description: seo.description,
    inLanguage: language,
    url: canonical,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: home },
  };

  return JSON.stringify([breadcrumb, article]);
};
