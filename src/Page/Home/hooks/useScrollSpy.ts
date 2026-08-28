import { useEffect, useState } from "react";

// Lights the rail rung whose section owns the viewport. Pass a stable `ids`
// array so the observer wires up once. Effect-only, so it stays inert during the
// static prerender and simply keeps the initial rung.
export const useScrollSpy = (ids: string[], initialId: string): string => {
  const [activeId, setActiveId] = useState(initialId);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { threshold: 0.5 },
    );

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
};
