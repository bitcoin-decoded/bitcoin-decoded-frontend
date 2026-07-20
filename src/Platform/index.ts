// What the application may not assume exists.
//
// The build renders every route under Node to produce indexable HTML, so a
// browser is not a given. Everything that reaches for one goes through here.
export { isBrowser, readStored, writeStored } from "./helpers";
