import { neon } from "@neondatabase/serverless";

// One HTTP query function shared by every route. The Neon serverless driver
// speaks HTTP, so there is no pool to manage and a cold Neon compute wakes on
// the first query rather than failing on it (CDC cold-start case).
const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

export const sql = neon(url);
