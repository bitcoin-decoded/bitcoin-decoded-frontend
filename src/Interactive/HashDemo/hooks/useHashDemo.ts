import { useCallback, useEffect, useRef, useState } from "react";

import { sha256 } from "../../helpers";

export const useHashDemo = (onComplete?: () => void) => {
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

  // Fires once the reader has actually hashed something (the action this block
  // is built around). `hasHashed` is monotonic — reset clears the output but not
  // the signal — so the effect runs exactly once.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  useEffect(() => {
    if (hasHashed) onCompleteRef.current?.();
  }, [hasHashed]);

  return { input, setInput, hash, hasHashed, handleHash, handleReset };
};
