import { useTranslation } from "../../../I18n";
import { ROUTE_NAME, useRouterContext } from "../../../Routing";

/**
 * The two ways out of a dead address.
 *
 * Both are offered rather than one: someone who mistyped a URL wants the home
 * page, someone who followed a stale link to a chapter is usually here to read
 * and wants the course. Guessing which would be wrong half the time.
 */
export const useNotFoundPage = () => {
  const { t } = useTranslation();
  const { setCurrentPage } = useRouterContext();

  return {
    title: t("notFound.title"),
    body: t("notFound.body"),
    imageAlt: t("notFound.alt"),
    homeLabel: t("notFound.home"),
    startLabel: t("notFound.start"),
    goHome: () => setCurrentPage(ROUTE_NAME.HomePage),
    goStart: () => setCurrentPage(ROUTE_NAME.Banking_1),
  };
};
