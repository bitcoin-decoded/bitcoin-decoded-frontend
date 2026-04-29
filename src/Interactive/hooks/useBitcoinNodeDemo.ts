import { useState, useCallback } from "react";

export const useBitcoinNodeDemo = () => {
  const [isLaunched, setIsLaunched] = useState(false);

  const handleLaunch = useCallback(() => setIsLaunched(true), []);
  const handleReset = useCallback(() => setIsLaunched(false), []);

  return { isLaunched, handleLaunch, handleReset };
};
