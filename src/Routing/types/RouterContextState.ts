import type { Language } from "../../I18n";

import type { RouteName } from "./";

export type RouterContextState = {
  currentPage: RouteName;
  /**
   * Read from the address, not from storage.
   *
   * The two language versions of a page are two pages to a search engine, so
   * each needs an address of its own. That also makes the URL the single
   * answer to "which language am I reading", where storage would have been a
   * second one that could disagree with it.
   */
  language: Language;
  /** Omitting the language keeps the one currently being read. */
  setCurrentPage: (page: RouteName, language?: Language) => void;
};
