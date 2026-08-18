import { useAuthFlow } from "../../../Auth/hooks";
import { ROUTE_NAME, type RouteName, useRouterContext } from "../../../Routing";

const CURRICULUM_SECTION_ID = "home-curriculum";

export const useHomePage = () => {
  const { setCurrentPage } = useRouterContext();
  const { open } = useAuthFlow();

  return {
    curriculumSectionId: CURRICULUM_SECTION_ID,
    startJourney: () => setCurrentPage(ROUTE_NAME.Banking_1),
    openChapter: (route: RouteName) => setCurrentPage(route),
    openAccessInfo: open,
    scrollToCurriculum: () =>
      document
        .getElementById(CURRICULUM_SECTION_ID)
        ?.scrollIntoView({ behavior: "smooth", block: "start" }),
  };
};
