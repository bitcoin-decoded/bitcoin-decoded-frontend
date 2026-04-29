import { useState, useMemo } from "react";

type BeforeAfter<T> = { before: T; after: T };

export const useToggleSimulator = <T = undefined>(dataset?: BeforeAfter<T>) => {
  const [isActive, setIsActive] = useState(false);

  const activate = () => setIsActive(true);
  const reset = () => setIsActive(false);

  const data = useMemo(
    () => (dataset ? (isActive ? dataset.after : dataset.before) : undefined),
    [isActive, dataset]
  ) as T | undefined;

  return { isActive, activate, reset, data };
};
