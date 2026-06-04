/** A config value is "real" once its TODO_ placeholder has been replaced. */
export const isDonationConfigured = (value: string): boolean =>
  Boolean(value) && !value.startsWith("TODO_");
