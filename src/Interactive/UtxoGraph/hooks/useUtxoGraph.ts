import { useState } from "react";

/** Drives the consume→recreate animation: idle → ran (and back on reset). */
export const useUtxoGraph = () => {
  const [ran, setRan] = useState(false);
  return {
    ran,
    run: () => setRan(true),
    reset: () => setRan(false),
  };
};
