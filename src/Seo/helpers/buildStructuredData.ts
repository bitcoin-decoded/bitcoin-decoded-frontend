import type { Language, TranslationFn } from "../../I18n";
import { getNavigationTree, getRoutePath, ROUTE_NAME, type RouteName } from "../../Routing";
import { SITE } from "../data";
import type { PageSeo } from "../types";

type Input = {
  route: RouteName;
  language: Language;
  seo: PageSeo;
  canonical: string;
  /** Reads the navigation tree, which needs the current translation. */
  t: TranslationFn;
};

/**
 * The JSON-LD a page publishes about itself.
 *
 * Two things only, both of which a search engine does something visible with.
 * The breadcrumb is what turns a bare address in a result into a readable path,
 * "Bitcoin.Decoded > Bitcoin > Proof of work", which is worth more on a site
 * whose value is that its pages sit in an order. The article states what the
 * page is and in which language.
 *
 * `Course` is deliberately absent: its rich result is meant for course
 * providers and carries eligibility rules about pricing and instructors that
 * this does not meet. Claiming it would be a claim, not a description.
 */
export const buildStructuredData = ({ route, language, seo, canonical, t }: Input): string => {
  const home = `${SITE.url}${getRoutePath(ROUTE_NAME.HomePage, language)}`;

  const trail: { name: string; item: string }[] = [{ name: SITE.name, item: home }];

  // A chapter sits inside a module; standalone pages sit directly under the
  // site, so their trail is just the site and themselves.
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
