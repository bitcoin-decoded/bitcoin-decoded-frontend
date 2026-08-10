// Username rules: 3 to 20 letters and digits only, no special characters (a name
// like "---" is rejected), case-insensitive uniqueness. Normalize before both
// validation and storage so the value on disk already matches the
// accounts_username_lower index. (Tightened from the CDC 6 charset at the product
// owner's request: hyphen and underscore are no longer allowed.)
export const normalizeUsername = (raw: string): string => raw.trim().toLowerCase();

export const isValidUsername = (username: string): boolean => /^[a-z0-9]{3,20}$/.test(username);
