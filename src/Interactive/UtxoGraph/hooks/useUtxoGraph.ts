import { useState } from "react";

export const useUtxoGraph = () => {
  const [ran, setRan] = useState(false);
  return {
    ran,
    run: () => setRan(true),
    reset: () => setRan(false),
  };
};
