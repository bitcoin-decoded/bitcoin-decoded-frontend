import { useCallback, useEffect, useRef, useState } from "react";

import { REVEAL_STEP_MS } from "../data";
import { generateSeed } from "../helpers";
import type { SeedData, SeedLength } from "../types";

export const useSeedGenerator = (onComplete?: () => void) => {
  const [length, setLengthState] = useState<SeedLength>(24);
  const [seed, setSeed] = useState<SeedData | null>(null);
  const [revealedCount, setRevealedCount] = useState(0);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const firedRef = useRef(false);
  useEffect(() => {
    if (!firedRef.current && seed !== null) {
      firedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [seed]);

  const timeoutsRef = useRef<number[]>([]);
  const clearTimeouts = () => {
    timeoutsRef.current.forEach((t) => window.clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    if (!seed) {
      setRevealedCount(0);
      return;
    }
    clearTimeouts();
    setRevealedCount(0);
    for (let i = 1; i <= seed.words.length; i++) {
      const id = window.setTimeout(() => setRevealedCount(i), i * REVEAL_STEP_MS);
      timeoutsRef.current.push(id);
    }
    return clearTimeouts;
  }, [seed]);

  const generate = useCallback(() => {
    setSeed(generateSeed(length));
  }, [length]);

  const setLength = useCallback((next: SeedLength) => {
    setLengthState(next);
    setSeed(null);
  }, []);

  return { length, seed, revealedCount, generate, setLength };
};
