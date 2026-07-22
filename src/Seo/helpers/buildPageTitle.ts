import { SITE } from "../data";

export const buildPageTitle = (pageTitle: string, withBrand: boolean): string =>
  withBrand ? `${SITE.name} · ${pageTitle}` : pageTitle;
