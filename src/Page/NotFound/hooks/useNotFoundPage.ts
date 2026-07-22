import { useTranslation } from "../../../I18n";
import { ROUTE_NAME, useRouterContext } from "../../../Routing";

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
