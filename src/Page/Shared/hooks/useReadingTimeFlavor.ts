import { useMemo } from "react";
import { useLanguageContext } from "../../../I18n";
import { useRouterContext } from "../../../Routing";
import { getReadingTimeFlavorAt, getReadingTimePoolSize } from "../helpers";

export const useReadingTimeFlavor = (minutes: number | null): string | null => {
  const { language } = useLanguageContext();
  const { currentPage } = useRouterContext();

  // Random index picked once per (page, minutes). Stable across language switches
  // so FR/EN display translations of the SAME phrase, not two different ones.
  const index = useMemo(() => {
    if (minutes === null) return 0;
    return Math.floor(Math.random() * getReadingTimePoolSize(minutes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, currentPage]);

  return useMemo(() => {
    if (minutes === null) return null;
    return getReadingTimeFlavorAt(minutes, language, index);
  }, [minutes, language, index]);
};
