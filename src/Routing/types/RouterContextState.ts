import type { RouteName } from './';

export type RouterContextState = {
  currentPage: RouteName;
  setCurrentPage: (page: RouteName) => void;
};