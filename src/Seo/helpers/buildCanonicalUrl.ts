import { ROUTE_PATH, type RouteName } from "../../Routing";
import { SITE } from "../data";

/**
 * The one address a page should be known by.
 *
 * Built from the same table the router and the build read, so the address in
 * the page, the address in the sitemap and the file on disk cannot disagree.
 * A search engine treats two spellings of one page as two pages, and then has
 * to guess which is the real one.
 */
export const buildCanonicalUrl = (route: RouteName): string => `${SITE.url}${ROUTE_PATH[route]}`;
