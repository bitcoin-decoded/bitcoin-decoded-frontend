import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  AuthError,
  authErrorKey,
  confirmationMatches,
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
import type { AuthFlowScreen, VaultContainer } from "../types/index.js";

import { useAuth } from "./useAuth.js";

type UsernameStatus = "idle" | "checking" | "available" | "taken" | "invalid";

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
  const { status, busy, error, clearError, createAccount, unlock, restore, importAccount, checkUsername } =
    useAuth();

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

  const autoOpenedRef = useRef(false);
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
    clearError();
  }, [clearError]);

  // CDC §7.2: a locked device (vault present, no session) lands on the unlock
  // screen, greeting the reader by the pseudo kept in cleartext in the vault. Shown
  // once per locked episode; dismissing it does not re-trigger until status changes.
  useEffect(() => {
    if (status === "locked") {
      if (autoOpenedRef.current) return;
      autoOpenedRef.current = true;
      setWrongPassword(false);
      void readVaultUsername().then(setUnlockUsername);
      setScreen("unlock");
    } else {
      autoOpenedRef.current = false;
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
          // Only the server saying "invalid" marks a well-formed pseudo invalid.
          // An unreachable or non-JSON response (offline, dev without /api) leaves
          // it idle rather than falsely rejecting it as "characters not allowed".
          setUsernameStatus(
            result.available
              ? "available"
              : result.reason === "taken"
                ? "taken"
                : result.reason === "invalid"
                  ? "invalid"
                  : "idle",
          );
        })
        .catch(() => {
          if (token === usernameTokenRef.current) setUsernameStatus("idle");
        });
    }, USERNAME_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [username, screen, checkUsername]);

  // Navigation ----------------------------------------------------------------
  const close = useCallback(() => {
    setScreen("closed");
    resetFields();
  }, [resetFields]);

  const open = useCallback(() => {
    // CDC §7.2: valid session asks nothing; account settings are Phase 4d-3.
    if (status === "authenticated") return;
    if (status === "locked") {
      setWrongPassword(false);
      setPassword("");
      void readVaultUsername().then(setUnlockUsername);
      setScreen("unlock");
      return;
    }
    resetFields();
    setScreen("landing");
  }, [status, resetFields]);

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

  const download = useCallback(() => downloadBackup(), []);

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
    setScreen("restore.setDevicePassword");
  }, [restoreWords]);

  // Restore sets a NEW local password on this device (it never asks for the old
  // one); the screen and this handler are named accordingly (restore.setDevicePassword).
  const submitSetDevicePassword = useCallback(async () => {
    if (!restoreMnemonic || password.length < 8) return;
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
  }, [restoreMnemonic, password, restore, close]);

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
  };
};
