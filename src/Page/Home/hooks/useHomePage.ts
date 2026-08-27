import { ROUTE_NAME, type RouteName, useRouterContext } from "../../../Routing";

// Section anchor ids, shared by the paliers, the descent rail and the in-page
// scroll actions. Kept generic since only one page is ever mounted at a time.
const SECTION_ID = {
  hero: "top",
  final: "final",
  programme: "programme",
};

const scrollToId = (id: string): void =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export const useHomePage = () => {
  const { setCurrentPage } = useRouterContext();

  return {
    sectionId: SECTION_ID,
    startJourney: () => setCurrentPage(ROUTE_NAME.Banking_1),
    openChapter: (route: RouteName) => setCurrentPage(route),
    openBadges: () => setCurrentPage(ROUTE_NAME.Badges),
    scrollToId,
    scrollToProgram: () => scrollToId(SECTION_ID.programme),
  };
};
