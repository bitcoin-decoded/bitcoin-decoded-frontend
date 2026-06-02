/**
 * Last year the time machine can travel to. Bitcoin's block subsidy rounds down
 * to zero around 2140 (the final satoshis are mined). 2150 lets curious users
 * travel past the end of issuance and see the reward sitting firmly at 0.
 * The lower bound is derived from BITCOIN_REFS.HALVING_SCHEDULE (genesis, 2009).
 */
export const TIME_MACHINE_MAX_YEAR = 2150;
