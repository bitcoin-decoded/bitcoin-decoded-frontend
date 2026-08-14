import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  AuthError,
  authErrorKey,
  confirmationMatches,
  createVault,
  downloadBackup,
  generateMnemonic,
  normalizeMnemonicInput,
  parseVaultFile,
  passwordStrength,
  pickConfirmationIndices,
  probeStorageAvailable,
  readVaultPublicKey,
  readVaultUsername,
  validateMnemonic,
  validateUsername,
} from "../helpers/index.js";
import type { AuthFlowScreen, AuthStatus, BackupMeta, VaultContainer } from "../types/index.js";

import { useAuth } from "./useAuth.js";

type UsernameStatus = "idle" | "checking" | "available" | "taken" | "invalid" | "network";

// CDC §7.1 écran 2: the live username check is debounced.
const USERNAME_DEBOUNCE_MS = 400;

// Codes a screen already shows inline (CDC §14): everything else is a network or
// server problem and falls back to the generic banner (§14.12).
const INLINE_CODES = new Set(["wrong_password", "account_not_found", "invalid_phrase", "username_taken"]);

// The onboarding flow (CDC §7.1-§7.4). This owns only UI state — which screen is
// showing and the form fields. The single source of auth truth stays useAuth: the
// flow never mirrors status/username, it reads them and calls the store actions,
// whose results move the session state. `detectLocalProgress` is injected (never
// imported from UserData) so Auth keeps no dependency on UserData.
export const useAuthFlowStore = (detectLocalProgress: () => boolean) => {
  const {
    status,
    username: sessionUsername,
    busy,
    error,
    clearError,
    createAccount,
    unlock,
    restore,
    importAccount,
    checkUsername,
    logout,
    erase,
  } = useAuth();

  const [screen, setScreen] = useState<AuthFlowScreen>("closed");

  // Create wizard
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [fromRestore, setFromRestore] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>("idle");
  const [seedAcknowledged, setSeedAcknowledged] = useState(false);
  const [confirmIndices, setConfirmIndices] = useState<number[]>([]);
  const [confirmAnswers, setConfirmAnswers] = useState<string[]>(["", "", ""]);
  const [confirmError, setConfirmError] = useState(false);
  const [migrated, setMigrated] = useState(false);

  // Password entry, shared across the screens that ask for one (never shown at once)
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [revealPassword, setRevealPassword] = useState(false);

  // Restore: one field per word (CDC §7.3), so the phrase reads like a phrase
  const [restoreWords, setRestoreWords] = useState<string[]>(() => Array(12).fill(""));
  const [restoreMnemonic, setRestoreMnemonic] = useState<string | null>(null);
  const [checksumError, setChecksumError] = useState(false);
  const [unknownAccount, setUnknownAccount] = useState(false);

  // Import
  const [importContainer, setImportContainer] = useState<VaultContainer | null>(null);
  const [importError, setImportError] = useState<
    "auth.restore.file.formatError" | "auth.restore.file.versionError" | null
  >(null);

  // Unlock / password-decrypt failures (CDC §14.9 error, reused on import)
  const [unlockUsername, setUnlockUsername] = useState<string | null>(null);
  const [wrongPassword, setWrongPassword] = useState(false);

  // CDC v1.4 §9: with IndexedDB unavailable (private browsing), no device access can
  // persist, so the landing blocks create/restore rather than half-succeed. Probed
  // once at startup, defaulting to available until the probe settles.
  const [storageAvailable, setStorageAvailable] = useState(true);

  // Settings (CDC §7.11 / §14.11): loaded from the vault on open, never mirrored
  // auth state. The erase step is a two-click confirmation held here.
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [backupMeta, setBackupMeta] = useState<BackupMeta | null>(null);
  const [eraseConfirming, setEraseConfirming] = useState(false);

  const prevStatusRef = useRef<AuthStatus>("checking");
  const usernameTokenRef = useRef(0);

  // Probe persistence once (§9): a defined indexedDB is not proof it works.
  useEffect(() => {
    void probeStorageAvailable().then(setStorageAvailable);
  }, []);

  const resetFields = useCallback(() => {
    setMnemonic(null);
    setFromRestore(false);
    setUsername("");
    setUsernameStatus("idle");
    setSeedAcknowledged(false);
    setConfirmIndices([]);
    setConfirmAnswers(["", "", ""]);
    setConfirmError(false);
    setMigrated(false);
    setPassword("");
    setPasswordConfirm("");
    setRevealPassword(false);
    setRestoreWords(Array(12).fill(""));
    setRestoreMnemonic(null);
    setChecksumError(false);
    setUnknownAccount(false);
    setImportContainer(null);
    setImportError(null);
    setWrongPassword(false);
    setPublicKey(null);
    setBackupMeta(null);
    setEraseConfirming(false);
    clearError();
  }, [clearError]);

  // CDC §7.2: a locked device found at startup (vault present, no session) lands on
  // the unlock screen, greeting the reader by the pseudo kept in cleartext in the
  // vault. Gated on the *initial* checking->locked transition only: an in-app sign
  // out (authenticated->locked) must not bounce the reader onto unlock — it closes
  // to the header, from which they can unlock deliberately.
  useEffect(() => {
    const previous = prevStatusRef.current;
    prevStatusRef.current = status;
    if (status === "locked" && previous === "checking") {
      setWrongPassword(false);
      void readVaultUsername().then(setUnlockUsername);
      setScreen("unlock");
    }
  }, [status]);

  // CDC §7.1 écran 2: validate the format locally, then confirm availability with
  // the server after a debounce. A token guards against a stale response landing
  // after the reader has typed on.
  useEffect(() => {
    if (screen !== "create.username") return;
    const value = username.trim().toLowerCase();
    if (value === "") {
      setUsernameStatus("idle");
      return;
    }
    if (!validateUsername(value)) {
      setUsernameStatus("invalid");
      return;
    }
    setUsernameStatus("checking");
    const token = ++usernameTokenRef.current;
    const id = setTimeout(() => {
      void checkUsername(value)
        .then((result) => {
          if (token !== usernameTokenRef.current) return;
          // Three explicit outcomes plus a network one: the server tells taken vs
          // invalid; a reachable-but-unexpected body (offline, dev without /api,
          // a failing function) surfaces as "network" rather than a false
          // "characters not allowed".
          setUsernameStatus(
            result.available
              ? "available"
              : result.reason === "taken"
                ? "taken"
                : result.reason === "invalid"
                  ? "invalid"
                  : "network",
          );
        })
        .catch(() => {
          if (token === usernameTokenRef.current) setUsernameStatus("network");
        });
    }, USERNAME_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [username, screen, checkUsername]);

  // Navigation ----------------------------------------------------------------
  const close = useCallback(() => {
    setScreen("closed");
    resetFields();
  }, [resetFields]);

  // CDC §7.11: a valid session opens the account settings, loaded fresh from the
  // vault (public key + backup bookkeeping) each time they are opened.
  const loadSettings = useCallback(async () => {
    const [key, meta] = await Promise.all([readVaultPublicKey(), createVault().getBackupMeta()]);
    setPublicKey(key);
    setBackupMeta(meta);
  }, []);

  const open = useCallback(() => {
    if (status === "authenticated") {
      setEraseConfirming(false);
      void loadSettings();
      setScreen("settings");
      return;
    }
    if (status === "locked") {
      setWrongPassword(false);
      setPassword("");
      void readVaultUsername().then(setUnlockUsername);
      setScreen("unlock");
      return;
    }
    resetFields();
    setScreen("landing");
  }, [status, resetFields, loadSettings]);

  const back = useCallback(() => {
    setScreen((current) => {
      switch (current) {
        case "create.seed":
          return "create.username";
        case "create.confirm":
          return "create.seed";
        case "create.password":
          return fromRestore ? "create.username" : "create.seed";
        case "create.username":
          return fromRestore ? "restore.seed" : "landing";
        case "restore.seed":
          return "landing";
        case "restore.setDevicePassword":
          return "restore.seed";
        case "import":
          return "restore.seed";
        default:
          return current;
      }
    });
  }, [fromRestore]);

  const canGoBack = [
    "create.username",
    "create.seed",
    "create.confirm",
    "create.password",
    "restore.seed",
    "restore.setDevicePassword",
    "import",
  ].includes(screen);

  // Create (CDC §7.1) ---------------------------------------------------------
  const startCreate = useCallback(() => {
    resetFields();
    setMnemonic(generateMnemonic());
    setScreen("create.username");
  }, [resetFields]);

  const submitUsername = useCallback(() => {
    if (usernameStatus !== "available") return;
    // A restored phrase is already backed up by the reader, so skip the seed
    // display and confirmation and go straight to setting a device password.
    setScreen(fromRestore ? "create.password" : "create.seed");
  }, [usernameStatus, fromRestore]);

  const copySeed = useCallback(() => {
    if (mnemonic) void navigator.clipboard?.writeText(mnemonic);
  }, [mnemonic]);

  const goToConfirm = useCallback(() => {
    if (!seedAcknowledged) return;
    setConfirmError(false);
    setConfirmAnswers(["", "", ""]);
    setConfirmIndices(pickConfirmationIndices());
    setScreen("create.confirm");
  }, [seedAcknowledged]);

  const setConfirmAnswer = useCallback(
    (index: number, value: string) =>
      setConfirmAnswers((prev) => prev.map((word, i) => (i === index ? value : word))),
    [],
  );

  const submitConfirm = useCallback(() => {
    if (!mnemonic) return;
    if (confirmationMatches(mnemonic, confirmIndices, confirmAnswers)) {
      setScreen("create.password");
      return;
    }
    // CDC §7.1 écran 4: send back to the word list, re-lock the acknowledgement,
    // never reveal which word was wrong.
    setConfirmError(true);
    setSeedAcknowledged(false);
    setScreen("create.seed");
  }, [mnemonic, confirmIndices, confirmAnswers]);

  const strength = useMemo(() => passwordStrength(password), [password]);
  const passwordMismatch = passwordConfirm.length > 0 && password !== passwordConfirm;
  const canSubmitCreate = password.length >= 8 && password === passwordConfirm;

  const submitCreate = useCallback(async () => {
    if (!mnemonic || password.length < 8 || password !== passwordConfirm) return;
    const hadProgress = detectLocalProgress();
    try {
      await createAccount({ mnemonic, username: username.trim().toLowerCase(), password });
      setMigrated(hadProgress);
      setScreen("create.success");
    } catch {
      // A generic failure is surfaced through the shared error banner.
    }
  }, [mnemonic, password, passwordConfirm, username, createAccount, detectLocalProgress]);

  // Downloading the backup is the last step: trigger the file, then close — the
  // reader should not have to click "later" after they have just saved it.
  const download = useCallback(async () => {
    await downloadBackup();
    close();
  }, [close]);

  const toggleReveal = useCallback(() => setRevealPassword((value) => !value), []);

  // Unlock (CDC §7.2) ---------------------------------------------------------
  const submitUnlock = useCallback(async () => {
    setWrongPassword(false);
    try {
      await unlock(password);
      close();
    } catch (err) {
      if (err instanceof AuthError && err.code === "wrong_password") setWrongPassword(true);
    }
  }, [unlock, password, close]);

  const forgotPassword = useCallback(() => {
    // CDC §7.2: "je n'ai plus mon mot de passe" leads to recovery by phrase.
    setPassword("");
    setWrongPassword(false);
    clearError();
    setScreen("restore.seed");
  }, [clearError]);

  // Restore (CDC §7.3) --------------------------------------------------------
  const startRestore = useCallback(() => {
    resetFields();
    setScreen("restore.seed");
  }, [resetFields]);

  const setRestoreWord = useCallback(
    (index: number, value: string) =>
      setRestoreWords((prev) => prev.map((word, i) => (i === index ? value : word))),
    [],
  );

  const restoreComplete = restoreWords.every((word) => word.trim().length > 0);

  const submitRestoreSeed = useCallback(() => {
    // CDC §7.3: validate the BIP39 checksum before anything else.
    const normalized = normalizeMnemonicInput(restoreWords.join(" "));
    if (!validateMnemonic(normalized)) {
      setChecksumError(true);
      return;
    }
    setChecksumError(false);
    setUnknownAccount(false);
    setRestoreMnemonic(normalized);
    setPassword("");
    setPasswordConfirm("");
    setScreen("restore.setDevicePassword");
  }, [restoreWords]);

  // Restore sets a NEW local password on this device (it never asks for the old
  // one); the screen and this handler are named accordingly (restore.setDevicePassword).
  const submitSetDevicePassword = useCallback(async () => {
    if (!restoreMnemonic || password.length < 8 || password !== passwordConfirm) return;
    try {
      await restore({ mnemonic: restoreMnemonic, password });
      close();
    } catch (err) {
      // CDC §7.3: an unknown account is an offer to create with this phrase, not a
      // dead end. Any other failure stays on the generic banner.
      if (err instanceof AuthError && err.code === "account_not_found") {
        setUnknownAccount(true);
        setScreen("restore.seed");
      }
    }
  }, [restoreMnemonic, password, passwordConfirm, restore, close]);

  const createFromRestore = useCallback(() => {
    setMnemonic(restoreMnemonic);
    setFromRestore(true);
    setUnknownAccount(false);
    setUsername("");
    setUsernameStatus("idle");
    setPassword("");
    setPasswordConfirm("");
    clearError();
    setScreen("create.username");
  }, [restoreMnemonic, clearError]);

  // Import (CDC §7.4) ---------------------------------------------------------
  const selectFile = useCallback(async (file: File) => {
    setImportError(null);
    setImportContainer(null);
    setWrongPassword(false);
    try {
      const container = parseVaultFile(await file.text());
      setImportContainer(container);
      setPassword("");
    } catch (err) {
      setImportError(
        (err as Error).message === "newer-version"
          ? "auth.restore.file.versionError"
          : "auth.restore.file.formatError",
      );
    }
  }, []);

  const submitImport = useCallback(async () => {
    if (!importContainer || password.length < 1) return;
    setWrongPassword(false);
    try {
      await importAccount(importContainer, password);
      close();
    } catch (err) {
      if (err instanceof AuthError && err.code === "wrong_password") setWrongPassword(true);
    }
  }, [importContainer, password, importAccount, close]);

  const goToImport = useCallback(() => {
    setImportError(null);
    setImportContainer(null);
    setPassword("");
    clearError();
    setScreen("import");
  }, [clearError]);

  const goToRestoreSeed = useCallback(() => {
    setChecksumError(false);
    setUnknownAccount(false);
    clearError();
    setScreen("restore.seed");
  }, [clearError]);

  // Settings actions (CDC §7.5-§7.7) -----------------------------------------
  // Export copies the already-encrypted container as-is; no password re-ask (§7.5).
  const exportBackup = useCallback(async () => {
    await downloadBackup();
    setBackupMeta(await createVault().getBackupMeta());
  }, []);

  // Sign out clears the cookie and the in-memory key; the vault stays (§7.7). Close
  // to the header rather than the unlock screen — see the locked effect's gate.
  const signOut = useCallback(async () => {
    await logout();
    close();
  }, [logout, close]);

  const askErase = useCallback(() => setEraseConfirming(true), []);
  const cancelErase = useCallback(() => setEraseConfirming(false), []);
  const confirmErase = useCallback(async () => {
    await erase();
    close();
  }, [erase, close]);

  const neverExported = !backupMeta?.exportedAt;

  const genericErrorKey = error && !INLINE_CODES.has(error) ? authErrorKey(error) : null;

  return {
    screen,
    isOpen: screen !== "closed",
    busy,
    canGoBack,
    genericErrorKey,
    // navigation
    open,
    close,
    back,
    startCreate,
    startRestore,
    storageAvailable,
    // create
    mnemonic,
    fromRestore,
    username,
    setUsername,
    usernameStatus,
    submitUsername,
    seedAcknowledged,
    setSeedAcknowledged,
    copySeed,
    goToConfirm,
    confirmIndices,
    confirmAnswers,
    setConfirmAnswer,
    confirmError,
    submitConfirm,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    revealPassword,
    toggleReveal,
    strength,
    passwordMismatch,
    canSubmitCreate,
    submitCreate,
    migrated,
    download,
    // unlock
    unlockUsername,
    wrongPassword,
    submitUnlock,
    forgotPassword,
    // restore
    restoreWords,
    setRestoreWord,
    restoreComplete,
    checksumError,
    submitRestoreSeed,
    submitSetDevicePassword,
    unknownAccount,
    createFromRestore,
    // import
    importContainer,
    importError,
    selectFile,
    submitImport,
    goToImport,
    goToRestoreSeed,
    // settings
    accountUsername: sessionUsername,
    publicKey,
    lastExportAt: backupMeta?.exportedAt ?? null,
    neverExported,
    eraseConfirming,
    exportBackup,
    signOut,
    askErase,
    cancelErase,
    confirmErase,
  };
};
