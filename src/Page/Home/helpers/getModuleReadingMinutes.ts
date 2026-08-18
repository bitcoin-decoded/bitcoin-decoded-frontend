import type { RouteName } from "../../../Routing";
import { getReadingTime, PAGE_METADATA } from "../../Shared";

// Sum the per-chapter reading times (CDC §5: "somme des chapitres"). Each chapter
// is rounded exactly as its own badge shows it, so a module total always equals
// what the reader would get by adding up the chapters one by one.
export const getModuleReadingMinutes = (chapters: RouteName[]): number =>
  chapters.reduce((total, id) => {
    const metadata = PAGE_METADATA[id];
    return metadata ? total + getReadingTime(metadata).minutes : total;
  }, 0);
