// Passed by BlockReader to a tool block authored as a render-prop, so the
// block's interactive component can signal when it reaches its completion
// state (the reader stays gated until then).
export type BlockApi = {
  markComplete: () => void;
};
