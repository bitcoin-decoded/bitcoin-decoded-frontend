// Localised day for the "last backup" line (CDC §14.11 {date}). Long form, no
// time — the reader only needs to know which day, in their language.
export const formatBackupDate = (iso: string, language: "fr" | "en"): string =>
  new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "en-US", { dateStyle: "long" }).format(
    new Date(iso),
  );
