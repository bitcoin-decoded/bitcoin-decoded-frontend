import { useCallback, useState } from "react";

import { sha256 } from "../../helpers";

export const useHashDemo = () => {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState<string | null>(null);
  const [hasHashed, setHasHashed] = useState(false);

  const handleHash = useCallback(async () => {
    setHash(await sha256(input));
    setHasHashed(true);
  }, [input]);

  const handleReset = useCallback(() => {
    setInput("");
    setHash(null);
  }, []);

  return { input, setInput, hash, hasHashed, handleHash, handleReset };
};
