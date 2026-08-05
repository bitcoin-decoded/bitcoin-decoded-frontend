// Set once the reader creates or restores an access on this device (Phase 4).
// Its presence is the cheap gate that tells the composite repository to try the
// API at all: a pure guest never triggers a network call.
export const HAS_ACCOUNT_KEY = "bd:hasAccount";
