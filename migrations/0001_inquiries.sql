-- PANO-only lead intake. Never expose these tables through a public read API.
CREATE TABLE IF NOT EXISTS inquiries (
  reference TEXT PRIMARY KEY,
  request_key TEXT NOT NULL UNIQUE,
  request_fingerprint TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('quote', 'partnership')),
  locale TEXT NOT NULL CHECK (locale IN ('en', 'zh')),
  company TEXT NOT NULL,
  contact TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT '',
  product_type TEXT NOT NULL DEFAULT '',
  partnership_type TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  details_json TEXT NOT NULL DEFAULT '{}',
  source_path TEXT NOT NULL DEFAULT '',
  source_json TEXT NOT NULL DEFAULT '{}',
  consent_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'qualified', 'contacted', 'awaiting_info', 'closed')),
  followup_at TEXT,
  note TEXT NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS inquiries_followup ON inquiries(status, followup_at, created_at);

CREATE TABLE IF NOT EXISTS inquiry_rate_limits (
  bucket_key TEXT NOT NULL,
  window_start INTEGER NOT NULL,
  count INTEGER NOT NULL CHECK (count >= 0),
  expires_at INTEGER NOT NULL,
  PRIMARY KEY (bucket_key, window_start)
);
CREATE INDEX IF NOT EXISTS inquiry_rate_expiry ON inquiry_rate_limits(expires_at);

CREATE TABLE IF NOT EXISTS inquiry_audit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference TEXT NOT NULL REFERENCES inquiries(reference),
  action TEXT NOT NULL,
  actor TEXT NOT NULL,
  previous_status TEXT,
  next_status TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS inquiry_audit_reference ON inquiry_audit(reference, created_at);
