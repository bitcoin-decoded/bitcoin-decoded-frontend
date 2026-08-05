// Username rules (CDC 6): 3 to 20 chars, lowercase letters, digits, hyphen and
// underscore, case-insensitive uniqueness. Normalize before both validation and
// storage so the value on disk already matches the accounts_username_lower index.
export const normalizeUsername = (raw: string): string => raw.trim().toLowerCase();

export const isValidUsername = (username: string): boolean => /^[a-z0-9_-]{3,20}$/.test(username);
