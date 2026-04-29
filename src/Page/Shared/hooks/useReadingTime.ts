import { useMemo } from "react";
import { useRouterContext } from "../../../Routing";
import { PAGE_METADATA } from "../data";
import { getReadingTime } from "../helpers";
import type { ReadingTimeEstimate } from "../helpers";

export const useReadingTime = (): ReadingTimeEstimate | null => {
  const { currentPage } = useRouterContext();

  return useMemo(() => {
    const metadata = PAGE_METADATA[currentPage];
    return metadata ? getReadingTime(metadata) : null;
  }, [currentPage]);
};
