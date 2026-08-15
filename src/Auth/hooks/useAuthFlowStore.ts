import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  AuthError,
  authErrorKey,
  confirmationMatches,
  createVault,
  decryptVault,
  downloadBackup,
  generateMnemonic,
  normalizeMnemonicInput,
  parseVaultFile,
  passwordStrength,
  pickConfirmationIndices,
  readVaultUsername,
  validateMnemonic,
  validateUsername,
} from "../helpers/index.js";
import type { AuthFlowScreen, AuthStatus, BackupMeta, VaultContainer } from "../types/index.js";

import { useAuth } from "./useAuth.js";

type UsernameStatus = "idle" | "checking" | "available" | "taken" | "invalid" | "network";

// How the reader reached restore.seed. Only "landing" offers the import path (12
// words -> file); the recovery contexts hide it (the file needs the very password
// that was forgotten) and drive the back arrow (CDC §7.2 recovery, guard §5.1).
type RestoreOrigin = "landing" | "unlock" | "import";

// The 12-words display auto-hides after this idle delay (spec: dev's choice).
const REVEAL_AUTOHIDE_MS = 60_000;

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

  // Settings (CDC §7.11 / §14.11): the backup bookkeeping, loaded from the vault on
  // open, never mirrored auth state.
  const [backupMeta, setBackupMeta] = useState<BackupMeta | null>(null);

  // Reveal-my-12-words (spec): the decrypted phrase is held only while the reveal
  // screen shows it, then wiped (on hide, close, tab-away, idle timeout). Each view
  // re-asks the password — no "revealed once, visible all session".
  const [revealedMnemonic, setRevealedMnemonic] = useState<string | null>(null);
  const [revealError, setRevealError] = useState(false);

  // Which path led to restore.seed (drives the import link + the back arrow).
  const [restoreOrigin, setRestoreOrigin] = useState<RestoreOrigin>("landing");

  // Overwrite guard (§5.1): the pseudo of the existing vault, set when creating a
  // new access would replace it.
  const [overwriteUsername, setOverwriteUsername] = useState<string | null>(null);

  const prevStatusRef = useRef<AuthStatus>("checking");
  const usernameTokenRef = useRef(0);

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
    setBackupMeta(null);
    setRevealedMnemonic(null);
    setRevealError(false);
    setRestoreOrigin("landing");
    setOverwriteUsername(null);
    clearError();
  }, [clearError]);

  // The 12-words display never outlives its screen: a tab switch or an idle timeout
  // wipes it and drops back to settings, so re-viewing re-asks the password.
  useEffect(() => {
    if (screen !== "reveal.seed") return;
    const hide = () => {
      setRevealedMnemonic(null);
      setScreen("settings");
    };
    const onVisibility = () => {
      if (typeof document !== "undefined" && document.hidden) hide();
    };
    const timer = setTimeout(hide, REVEAL_AUTOHIDE_MS);
    if (typeof document !== "undefined") document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearTimeout(timer);
      if (typeof document !== "undefined") document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [screen]);

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

  // CDC §7.11: a valid session opens the account settings, its backup bookkeeping
  // loaded fresh from the vault each time they are opened.
  const loadSettings = useCallback(async () => {
    setBackupMeta(await createVault().getBackupMeta());
  }, []);

  const open = useCallback(() => {
    if (status === "authenticated") {
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
          // A reader who reached here to recover goes back where they came from (the
          // unlock screen, the import screen), not into the "create an access" flow.
          return restoreOrigin === "unlock" ? "unlock" : restoreOrigin === "import" ? "import" : "landing";
        case "restore.setDevicePassword":
          return "restore.seed";
        case "import":
          return "restore.seed";
        case "reveal.password":
          return "settings";
        default:
          return current;
      }
    });
  }, [fromRestore, restoreOrigin]);

  const canGoBack = [
    "create.username",
    "create.seed",
    "create.confirm",
    "create.password",
    "restore.seed",
    "restore.setDevicePassword",
    "import",
    "reveal.password",
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

  const doCreate = useCallback(async () => {
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

  // Overwrite guard (§5.1: IndexedDB holds a single `current` vault). Writing a new
  // one replaces whatever is there, so — whatever navigation led here — finalising a
  // creation while a vault exists first warns, offering the existing access back.
  const submitCreate = useCallback(async () => {
    if (!mnemonic || password.length < 8 || password !== passwordConfirm) return;
    if (await createVault().exists()) {
      setOverwriteUsername(await readVaultUsername());
      setScreen("create.overwrite");
      return;
    }
    await doCreate();
  }, [mnemonic, password, passwordConfirm, doCreate]);

  const confirmOverwriteCreate = useCallback(() => {
    void doCreate();
  }, [doCreate]);

  // The safe exit from the overwrite warning: abandon the new access and unlock the
  // one already on this device.
  const cancelOverwrite = useCallback(() => {
    resetFields();
    setWrongPassword(false);
    void readVaultUsername().then(setUnlockUsername);
    setScreen("unlock");
  }, [resetFields]);

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
    // CDC §7.2: "je n'ai plus mon mot de passe" leads straight to the 12 words — the
    // only password-free recovery. No import here: the file needs that same password.
    setPassword("");
    setWrongPassword(false);
    setRestoreOrigin("unlock");
    clearError();
    setScreen("restore.seed");
  }, [clearError]);

  // Restore (CDC §7.3) --------------------------------------------------------
  const startRestore = useCallback(() => {
    resetFields();
    setRestoreOrigin("landing");
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

  // From the import password wall (#221 recovery link): the reader forgot the
  // password the file needs, so send them to the 12 words with no import loop back.
  const goToRestoreSeed = useCallback(() => {
    setChecksumError(false);
    setUnknownAccount(false);
    setRestoreOrigin("import");
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

  // Reveal my 12 words (spec) -------------------------------------------------
  const startReveal = useCallback(() => {
    setPassword("");
    setRevealError(false);
    setRevealedMnemonic(null);
    setScreen("reveal.password");
  }, []);

  // Re-confirm the password even though the session is valid: decrypt the vault to
  // recover the phrase. A wrong password fails the GCM tag, mapped to a clean flag.
  const submitRevealPassword = useCallback(async () => {
    if (password.length < 1) return;
    setRevealError(false);
    const container = await createVault().load();
    if (!container) return;
    try {
      const mnemonicPhrase = await decryptVault(container, password);
      setRevealedMnemonic(mnemonicPhrase);
      setPassword("");
      setScreen("reveal.seed");
    } catch {
      setRevealError(true);
    }
  }, [password]);

  // Copying a seed is a clipboard leak vector, so wipe it a little later (best
  // effort; some browsers block a background clipboard write).
  const copyRevealed = useCallback(() => {
    if (!revealedMnemonic) return;
    void navigator.clipboard?.writeText(revealedMnemonic);
    setTimeout(() => void navigator.clipboard?.writeText("").catch(() => {}), 20_000);
  }, [revealedMnemonic]);

  const hideReveal = useCallback(() => {
    setRevealedMnemonic(null);
    setScreen("settings");
  }, []);

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
    // overwrite guard
    overwriteUsername,
    confirmOverwriteCreate,
    cancelOverwrite,
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
    restoreOrigin,
    // import
    importContainer,
    importError,
    selectFile,
    submitImport,
    goToImport,
    goToRestoreSeed,
    // settings
    accountUsername: sessionUsername,
    lastExportAt: backupMeta?.exportedAt ?? null,
    neverExported,
    exportBackup,
    signOut,
    // reveal 12 words
    startReveal,
    submitRevealPassword,
    revealError,
    revealedMnemonic,
    copyRevealed,
    hideReveal,
  };
};
