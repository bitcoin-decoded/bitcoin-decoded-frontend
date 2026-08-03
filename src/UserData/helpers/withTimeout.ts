// Resolves with the promise, or rejects once `ms` has elapsed. On timeout it
// fires `onTimeout` (used to abort the underlying request) so a hung load cannot
// leave the app spinning forever.
export const withTimeout = <T>(promise: Promise<T>, ms: number, onTimeout: () => void): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      onTimeout();
      reject(new Error("User data load timed out"));
    }, ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error instanceof Error ? error : new Error(String(error)));
      },
    );
  });
