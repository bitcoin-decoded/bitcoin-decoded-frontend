import { useCallback, useState } from "react";

type Options = {
  onComplete?: () => void;
};

export const useBitcoinNodeDemo = ({ onComplete }: Options = {}) => {
  const [isLaunched, setIsLaunched] = useState(false);

  const handleLaunch = useCallback(() => {
    setIsLaunched(true);
    onComplete?.();
  }, [onComplete]);
  const handleReset = useCallback(() => setIsLaunched(false), []);

  return { isLaunched, handleLaunch, handleReset };
};
