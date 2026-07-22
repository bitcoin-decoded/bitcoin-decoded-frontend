export const isDonationConfigured = (value: string): boolean =>
  Boolean(value) && !value.startsWith("TODO_");
