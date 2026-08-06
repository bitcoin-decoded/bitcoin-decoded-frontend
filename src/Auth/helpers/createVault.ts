import type { BackupMeta, VaultContainer } from "../types/index.js";

// The device-side home of the encrypted identity (CDC §5.1): IndexedDB base
// `bitcoin-decoded`, one `vault` entry under `current`, plus a `meta` entry that
// remembers the last export. Uses the IndexedDB globals directly (no Platform
// dependency, so src/Auth stays free of app code and safe to reuse server-side);
// every method is a no-op / null where IndexedDB does not exist.
const DB_NAME = "bitcoin-decoded";
const DB_VERSION = 1;
const VAULT_STORE = "vault";
const META_STORE = "meta";
const CURRENT = "current";
const BACKUP = "backup";

const available = (): boolean => typeof indexedDB !== "undefined";

const openDb = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(VAULT_STORE)) db.createObjectStore(VAULT_STORE);
      if (!db.objectStoreNames.contains(META_STORE)) db.createObjectStore(META_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

// A fresh connection per operation, closed as soon as its transaction commits:
// no lingering handle means an "erase this access" (or a test reset) is never
// blocked by an open connection. Resolves on commit, so a saved value is durable.
const request = <T>(
  store: string,
  mode: IDBTransactionMode,
  run: (s: IDBObjectStore) => IDBRequest<T>,
): Promise<T> =>
  openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const tx = db.transaction(store, mode);
        const req = run(tx.objectStore(store));
        tx.oncomplete = () => {
          db.close();
          resolve(req.result);
        };
        tx.onabort = () => {
          db.close();
          reject(tx.error ?? req.error);
        };
      }),
  );

export const createVault = () => ({
  save: (container: VaultContainer): Promise<void> =>
    available()
      ? request(VAULT_STORE, "readwrite", (s) => s.put(container, CURRENT)).then(() => {})
      : Promise.resolve(),

  load: (): Promise<VaultContainer | null> =>
    available()
      ? request<VaultContainer | undefined>(VAULT_STORE, "readonly", (s) => s.get(CURRENT)).then(
          (v) => v ?? null,
        )
      : Promise.resolve(null),

  // The single source of truth for "does this device hold an account" — replaces
  // the Phase 3 HAS_ACCOUNT_KEY placeholder (wired into the composite in 4c).
  exists: (): Promise<boolean> =>
    available()
      ? request<IDBValidKey | undefined>(VAULT_STORE, "readonly", (s) => s.getKey(CURRENT)).then(
          (key) => key !== undefined,
        )
      : Promise.resolve(false),

  // "Erase this access from this device" (CDC §7.7): the container goes, nothing
  // on the server is touched.
  clear: (): Promise<void> =>
    available()
      ? request(VAULT_STORE, "readwrite", (s) => s.delete(CURRENT)).then(() => {})
      : Promise.resolve(),

  getBackupMeta: (): Promise<BackupMeta | null> =>
    available()
      ? request<BackupMeta | undefined>(META_STORE, "readonly", (s) => s.get(BACKUP)).then(
          (m) => m ?? null,
        )
      : Promise.resolve(null),

  setBackupMeta: (meta: BackupMeta): Promise<void> =>
    available()
      ? request(META_STORE, "readwrite", (s) => s.put(meta, BACKUP)).then(() => {})
      : Promise.resolve(),
});
