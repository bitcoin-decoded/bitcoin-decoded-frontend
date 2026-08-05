// One normalized progress row as exchanged with the backend (CDC 6). The adapter
// (toProgressItems / fromProgressItems) maps the app's UserData snapshot to and
// from a list of these, so the rest of the app never sees this shape.
export type ProgressItem = {
  itemId: string;
  itemType: string;
  status: string;
  score: number | null;
  data: unknown;
};
