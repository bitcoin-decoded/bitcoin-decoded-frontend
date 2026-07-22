import type { Language } from "../../I18n";

import type { RouteName } from "./";

export type RouterContextState = {
  currentPage: RouteName;
  language: Language;
  setCurrentPage: (page: RouteName, language?: Language) => void;
};
