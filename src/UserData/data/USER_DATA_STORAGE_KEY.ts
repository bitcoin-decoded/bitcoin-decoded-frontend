// The one key the localStorage repository writes the whole snapshot to. Reading
// falls back to the legacy per-concern keys when this is absent, so returning
// readers keep their progress across the migration.
export const USER_DATA_STORAGE_KEY = "bd:userdata";
