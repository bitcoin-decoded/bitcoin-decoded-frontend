import { type CSSProperties, type FC } from "react";

import { useBreakpoint } from "../../../Design";

import { LogicianMethod } from "./LogicianMethod";
import { PhysicistMethod } from "./PhysicistMethod";

/**
 * The matched pair of method visuals for MoneyLaws4. Physicist first (a
 * horizontal, revisable timeline), logician second (a vertical deductive
 * tree) — the same order as the chapter's Callout. The opposition of forms is
 * the whole point: one story moving through time, one structure descending
 * from a single point.
 */
export const ScientificMethods: FC = () => {
  const isMobile = useBreakpoint() === "mobile";

  const wrap: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    margin: isMobile ? "1.5rem 0" : "2rem 0",
  };

  return (
    <div style={wrap}>
      <PhysicistMethod />
      <LogicianMethod />
    </div>
  );
};
