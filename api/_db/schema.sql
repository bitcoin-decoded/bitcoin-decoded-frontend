-- Bitcoin.Decoded backend schema (CDC 5.3). Postgres, Neon.
-- Idempotent: safe to paste into the Neon SQL Editor more than once.
--
-- Privacy invariant: no email, password, recovery phrase, private key, ip,
-- user_agent or country. Ever. Only public key, username, progress, timestamps.

create table if not exists accounts (
  public_key   text primary key,
  username     text unique not null,
  created_at   timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);
create unique index if not exists accounts_username_lower on accounts (lower(username));

create table if not exists progress (
  public_key  text not null references accounts(public_key) on delete cascade,
  item_id     text not null,
  item_type   text not null,
  status      text not null,
  score       integer,
  data        jsonb,
  updated_at  timestamptz not null default now(),
  primary key (public_key, item_id)
);

create table if not exists auth_challenges (
  nonce      text primary key,
  public_key text not null,
  issued_at  timestamptz not null default now(),
  expires_at timestamptz not null,
  used_at    timestamptz
);

-- Challenges are purged opportunistically at each challenge creation
-- (delete where expires_at < now() - interval '1 hour'), so no cron is required
-- for this table; the row count stays bounded on its own.
