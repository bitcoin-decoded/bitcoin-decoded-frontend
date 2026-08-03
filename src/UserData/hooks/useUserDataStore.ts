import { useCallback, useEffect, useRef, useState } from "react";

import { USER_DATA_TIMEOUT_MS } from "../data";
import { withTimeout } from "../helpers";
import type {
  StoredChapterProgress,
  UserData,
  UserDataStatus,
  UserDataValue,
  UserRepository,
} from "../types";

const EMPTY: UserData = { badges: {}, readingProgress: {} };

export const useUserDataStore = (repository: UserRepository): UserDataValue => {
  const [status, setStatus] = useState<UserDataStatus>("loading");
  const [error, setError] = useState<Error | null>(null);
  const [badges, setBadges] = useState<Record<string, number>>({});
  const [celebrationQueue, setCelebrationQueue] = useState<string[]>([]);
  const [reloadNonce, setReloadNonce] = useState(0);

  // Reading progress is write-mostly persistence: only the active chapter's block
  // reader reads it, and only once as it seeds its own state. Keeping it in a ref
  // means saving a page's progress never re-renders the rest of the app.
  const readingRef = useRef<Record<string, StoredChapterProgress>>({});
  // The authoritative snapshot handed to `save`, kept in step with both stores so
  // a badge award and a reading save never clobber each other.
  const snapshotRef = useRef<UserData>(EMPTY);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    setStatus("loading");
    setError(null);

    withTimeout(repository.load(controller.signal), USER_DATA_TIMEOUT_MS, () => controller.abort())
      .then((data) => {
        if (cancelled) return;
        readingRef.current = data.readingProgress;
        snapshotRef.current = data;
        setBadges(data.badges);
        setStatus("ready");
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err);
        setStatus("error");
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [repository, reloadNonce]);

  const retry = useCallback(() => setReloadNonce((n) => n + 1), []);

  const awardBadge = useCallback(
    (id: string) => {
      if (snapshotRef.current.badges[id]) return;
      const nextBadges = { ...snapshotRef.current.badges, [id]: Date.now() };
      snapshotRef.current = { badges: nextBadges, readingProgress: readingRef.current };
      setBadges(nextBadges);
      setCelebrationQueue((queue) => [...queue, id]);
      repository.save(snapshotRef.current);
    },
    [repository],
  );

  const dismissCelebration = useCallback(() => setCelebrationQueue((queue) => queue.slice(1)), []);

  const getChapterReading = useCallback((chapterId: string) => readingRef.current[chapterId], []);

  const saveChapterReading = useCallback(
    (chapterId: string, progress: StoredChapterProgress) => {
      readingRef.current = { ...readingRef.current, [chapterId]: progress };
      snapshotRef.current = { badges: snapshotRef.current.badges, readingProgress: readingRef.current };
      repository.save(snapshotRef.current);
    },
    [repository],
  );

  return {
    status,
    error,
    retry,
    badges,
    awardBadge,
    celebrationQueue,
    dismissCelebration,
    getChapterReading,
    saveChapterReading,
  };
};
