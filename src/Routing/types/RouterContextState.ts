import type { RouteName } from './';

export type RouterContextState = {
  currentPage: RouteName;
  /**
   * `replace` swaps the current history entry instead of pushing a new one.
   * A redirect must use it: pushing would leave the refused URL behind, and
   * Back would land on it and be redirected again, with no way out.
   */
  setCurrentPage: (page: RouteName, options?: { replace?: boolean }) => void;
};