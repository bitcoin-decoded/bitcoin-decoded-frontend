// Fill {token} placeholders in a translated string. The dictionaries hold the CDC
// copy verbatim, tokens included ({pseudo}/{username}/{n}/{date}/{key}); t() is a
// plain lookup, so the substitution happens here at the call-site. An unknown
// token is left untouched rather than blanked, so a typo is visible, not silent.
export const interpolate = (
  template: string,
  values: Record<string, string | number>,
): string => template.replace(/\{(\w+)\}/g, (match, key) => (key in values ? String(values[key]) : match));
