import type { UserData } from "./UserData";

// The single seam between the app and where user data actually lives. Today an
// implementation over localStorage; tomorrow one over the backend. Swapping it
// is the whole migration: nothing above this type changes.
//
// `load` may reject or honour the abort signal (used by the init timeout).
// `save` persists the whole snapshot; each implementation owns its own strategy
// (an immediate write for localStorage, a debounced request for an API).
export type UserRepository = {
  load: (signal: AbortSignal) => Promise<UserData>;
  save: (data: UserData) => void;
};
