#!/usr/bin/env node
// Local operator tool only. It never creates an unauthenticated admin endpoint.
import { readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const STATUSES = ["new", "qualified", "contacted", "awaiting_info", "closed"];
const REFERENCE = /^PANO-[A-F0-9]{16}$/;
const HELP = `PANO inquiry follow-up (local operator use)

  node scripts/inquiries.mjs list [--status new] [--due] [--limit 20]
  node scripts/inquiries.mjs export --output /absolute/path/pano-inquiries.csv
  node scripts/inquiries.mjs set-status PANO-0123456789ABCDEF contacted --next-action "Review drawing with engineering" --follow-up 2026-11-01

Configuration: CLOUDFLARE_ACCOUNT_ID + PANO_D1_DATABASE_ID, or --config PATH
(default .pano-platform.local.json at the project root, with account_id/database_id).
Credentials are read locally from ~/.secrets/cf.env and are never printed.
No automatic notification is configured. Run list to collect and follow up leads.
Exports contain customer information; store them privately. Existing files are never overwritten.
`;

function parseArgs(args) {
  const positional = [];
  const options = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg.startsWith("--")) { positional.push(arg); continue; }
    if (arg === "--due" || arg === "--help") { options[arg.slice(2)] = true; continue; }
    if (!["--status", "--limit", "--output", "--config", "--next-action", "--follow-up"].includes(arg) || !args[i + 1] || args[i + 1].startsWith("--")) throw new Error("Invalid command option. Use --help.");
    options[arg.slice(2)] = args[++i];
  }
  return { positional, options };
}

export function csvCell(value) {
  let text = value == null ? "" : String(value);
  // Prevent spreadsheet formulas, including prefixes hidden by spaces/control characters.
  if (/^[\s\u0000-\u001f]*[=+@-]/.test(text) || /^[\t\r\n]/.test(text)) text = "'" + text;
  return '"' + text.replaceAll('"', '""') + '"';
}

async function connection(options) {
  let config = {};
  const configPath = options.config || process.env.PANO_INQUIRY_CONFIG || fileURLToPath(new URL("../.pano-platform.local.json", import.meta.url));
  try { config = JSON.parse(await readFile(configPath, "utf8")); }
  catch (error) { if (options.config || (error && error.code !== "ENOENT")) throw new Error("Cannot read local PANO configuration."); }
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || config.accountId || config.account_id;
  const databaseId = process.env.PANO_D1_DATABASE_ID || config.databaseId || config.database_id;
  if (!/^[a-f0-9]{32}$/i.test(accountId || "") || !/^[a-f0-9-]{36}$/i.test(databaseId || "")) throw new Error("Set a valid PANO account and database in the local configuration or environment.");
  const secrets = {};
  const raw = await readFile(join(homedir(), ".secrets/cf.env"), "utf8").catch(() => { throw new Error("Cannot read local Cloudflare credential file."); });
  for (const line of raw.split(/\r?\n/)) {
    const match = line.trim().match(/^(?:export\s+)?([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    else value = value.replace(/\s+#.*$/, "").trim();
    secrets[match[1]] = value;
  }
  const headers = { "Content-Type": "application/json", "User-Agent": "PANO-local-inquiries/1.0" };
  if (secrets.CLOUDFLARE_API_TOKEN || secrets.CF_API_TOKEN) headers.Authorization = `Bearer ${secrets.CLOUDFLARE_API_TOKEN || secrets.CF_API_TOKEN}`;
  else if (secrets.CF_API_KEY && secrets.CF_EMAIL) { headers["X-Auth-Key"] = secrets.CF_API_KEY; headers["X-Auth-Email"] = secrets.CF_EMAIL; }
  else throw new Error("Cloudflare credentials are missing from the local credential file.");
  return (statements) => queryDatabase(accountId, databaseId, headers, statements);
}

export async function queryDatabase(accountId, databaseId, headers, statements) {
  let response;
  try {
    response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`, {
      method: "POST", headers, body: JSON.stringify({ batch: statements }), signal: AbortSignal.timeout(30000),
    });
  } catch { throw new Error("Cannot reach Cloudflare. No customer data was printed."); }
  if (!response.ok) throw new Error(`Cloudflare request failed (HTTP ${response.status}).`);
  const body = await response.json().catch(() => { throw new Error("Invalid Cloudflare response."); });
  if (!body.success || !Array.isArray(body.result) || body.result.some((item) => !item.success)) throw new Error("PANO database query failed. Check the database binding and migration.");
  return body.result;
}

async function main() {
  const { positional, options } = parseArgs(process.argv.slice(2));
  const command = positional[0];
  if (!command || command === "help" || options.help) { process.stdout.write(HELP); return; }
  if (!["list", "export", "set-status"].includes(command)) throw new Error("Unknown command. Use --help.");
  if (command === "list") {
    if (positional.length !== 1) throw new Error("list takes no positional arguments.");
    const limit = Number(options.limit || 20);
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) throw new Error("--limit must be between 1 and 100.");
    if (options.status && !STATUSES.includes(options.status)) throw new Error("Invalid --status.");
    const predicates = [];
    const params = [];
    if (options.status) { predicates.push("status = ?"); params.push(options.status); }
    if (options.due) { predicates.push("status <> 'closed' AND followup_at <= ?"); params.push(new Date().toISOString()); }
    const query = await connection(options);
    const [result] = await query([{ sql: `SELECT reference, kind, company, status, created_at, followup_at FROM inquiries ${predicates.length ? "WHERE " + predicates.join(" AND ") : ""} ORDER BY created_at DESC, reference DESC LIMIT ?`, params: [...params, limit] }]);
    process.stdout.write(JSON.stringify({ inquiries: result.results, notification: "Not configured. Check this list for new inquiries." }, null, 2) + "\n");
  } else if (command === "export") {
    if (positional.length !== 1 || !options.output) throw new Error("export requires --output PATH.");
    const query = await connection(options);
    const rows = [];
    for (let offset = 0; offset <= 10000; offset += 1000) {
      const [result] = await query([{ sql: "SELECT reference, kind, locale, company, contact, email, country, product_type, partnership_type, message, details_json, source_path, source_json, consent_at, created_at, status, followup_at, note FROM inquiries ORDER BY created_at, reference LIMIT 1000 OFFSET ?", params: [offset] }]);
      rows.push(...result.results);
      if (rows.length > 10000) throw new Error("Export exceeds 10,000 rows; use an approved bounded database export instead.");
      if (result.results.length < 1000) break;
    }
    const columns = ["reference", "kind", "locale", "company", "contact", "email", "country", "product_type", "partnership_type", "message", "details_json", "source_path", "source_json", "consent_at", "created_at", "status", "followup_at", "note"];
    const csv = [columns.map(csvCell).join(","), ...rows.map((row) => columns.map((key) => csvCell(row[key])).join(","))].join("\r\n") + "\r\n";
    const output = resolve(options.output);
    await writeFile(output, "\uFEFF" + csv, { flag: "wx", mode: 0o600 }).catch(() => { throw new Error("Cannot create export file; choose a new private file path."); });
    process.stdout.write(`Exported ${rows.length} inquiry record(s) to ${output}. Keep this file private.\n`);
  } else {
    const [, reference, status] = positional;
    if (positional.length !== 3 || !REFERENCE.test(reference || "") || !STATUSES.includes(status)) throw new Error("Use set-status PANO-REFERENCE STATUS with a valid reference and status.");
    const nextAction = typeof options["next-action"] === "string" ? options["next-action"].trim() : "";
    if (!nextAction || nextAction.length > 1000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(nextAction)) throw new Error("Provide --next-action with 1–1000 characters.");
    let followup = null;
    if (options["follow-up"]) {
      const date = options["follow-up"];
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) throw new Error("--follow-up must be a real YYYY-MM-DD date.");
      if (status === "closed") throw new Error("Closed inquiries cannot have a follow-up date.");
      followup = new Date(date + "T00:00:00.000Z").toISOString();
    }
    const query = await connection(options);
    const now = new Date().toISOString();
    const results = await query([
      { sql: "INSERT INTO inquiry_audit (reference, action, actor, previous_status, next_status, note, created_at) SELECT reference, 'status_changed', 'local-cli', status, ?, ?, ? FROM inquiries WHERE reference = ?", params: [status, nextAction, now, reference] },
      { sql: "UPDATE inquiries SET status = ?, followup_at = ?, note = ?, updated_at = ? WHERE reference = ? RETURNING reference, status, followup_at", params: [status, followup, nextAction, now, reference] },
    ]);
    const row = results[1]?.results?.[0];
    if (!row) throw new Error("Inquiry reference was not found; nothing was updated.");
    process.stdout.write(JSON.stringify({ updated: row, audit: "Status change recorded." }, null, 2) + "\n");
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { process.stderr.write(`${error.message}\n`); process.exitCode = 1; });
}
