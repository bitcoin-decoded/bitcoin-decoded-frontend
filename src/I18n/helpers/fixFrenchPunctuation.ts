/**
 * Inserts French-typography no-break spaces into text:
 *   - U+202F (narrow NBSP) before !  ?  :  ;  »  and after «
 *   - U+00A0 (NBSP) inside number groups (1 000 000) and before €
 * URLs (http://, https://, etc.) are protected and never modified.
 * Idempotent: running it twice yields the same result.
 */

const NBSP_THIN = String.fromCharCode(0x202f);
const NBSP = String.fromCharCode(0xa0);

// Placeholders use the Unicode Private Use Area so they cannot collide
// with user content.
const PH_OPEN = String.fromCharCode(0xe000);
const PH_CLOSE = String.fromCharCode(0xe001);

const URL_REGEX = /\b[a-z][a-z0-9+.-]*:\/\/[^\s<>"'`]+/gi;
const PLACEHOLDER_REGEX = new RegExp(`${PH_OPEN}(\\d+)${PH_CLOSE}`, "g");

const OPT_SPACE = "[ \\u00A0\\u202F]?";
const NOT_SPACE = "[^\\s]";
const COLON_NEXT = "[\\s!?;\\u00BB,.)\\]}]|$";

const AFTER_OPEN_GUILLEMET = new RegExp(`\\u00AB${OPT_SPACE}(?=\\S)`, "g");
const BEFORE_HIGH_PUNCT = new RegExp(`(${NOT_SPACE})${OPT_SPACE}([!?;\\u00BB])`, "g");
const BEFORE_COLON = new RegExp(`(${NOT_SPACE})${OPT_SPACE}:(?=${COLON_NEXT})`, "g");
// Closing guillemet preceded by a breaking space (regular space or NBSP).
// Needed because `BEFORE_HIGH_PUNCT` consumes the char before each mark, so in
// "créée ? »" the "?" is eaten matching the preceding letter and the " »" is
// never reached — the guillemet then orphans onto the next line. A lookbehind
// would fix it in one pass but crashes Safari < 16.4, so this targeted mop-up
// runs after the main pass instead.
const BEFORE_CLOSE_GUILLEMET = new RegExp(`[ \\u00A0]\\u00BB`, "g");

const THOUSANDS_SPACE = /(\d) (?=\d{3}(?!\d))/g;
const NUMBER_BEFORE_EURO = new RegExp(`(\\d)${OPT_SPACE}\\u20AC`, "g");

export const fixFrenchPunctuation = (text: string): string => {
  if (!text) return text;

  const urls: string[] = [];
  let work = text.replace(URL_REGEX, (match) => {
    urls.push(match);
    return `${PH_OPEN}${urls.length - 1}${PH_CLOSE}`;
  });

  work = work.replace(AFTER_OPEN_GUILLEMET, `«${NBSP_THIN}`);
  work = work.replace(BEFORE_HIGH_PUNCT, `$1${NBSP_THIN}$2`);
  work = work.replace(BEFORE_COLON, `$1${NBSP_THIN}:`);
  work = work.replace(BEFORE_CLOSE_GUILLEMET, `${NBSP_THIN}»`);

  let prev: string;
  do {
    prev = work;
    work = work.replace(THOUSANDS_SPACE, `$1${NBSP}`);
  } while (work !== prev);

  work = work.replace(NUMBER_BEFORE_EURO, `$1${NBSP}€`);

  return work.replace(PLACEHOLDER_REGEX, (_, i) => urls[Number(i)]);
};
