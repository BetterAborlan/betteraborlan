#!/usr/bin/env node
/**
 * Exports the opt-in chat research log (chat_events) to CSV for analysis.
 *
 * Usage: npm run chat:export -- [output.csv] [--since 2026-11-01] [--env preview]
 *   Writes to chat-logs-<date>.csv by default. Only production rows are
 *   exported unless --env says otherwise (--env all for every row). Reads DATABASE_URL from
 *   .env.local. Output files are gitignored — they contain residents'
 *   questions and must not be committed.
 */
const fs = require('fs');
const { neon } = require('@neondatabase/serverless');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Run `vercel env pull .env.local` first.');
  process.exit(1);
}

const args = process.argv.slice(2);
const sinceIdx = args.indexOf('--since');
const since = sinceIdx >= 0 ? args.splice(sinceIdx, 2)[1] : '1970-01-01';
const envIdx = args.indexOf('--env');
const env = envIdx >= 0 ? args.splice(envIdx, 2)[1] : 'production';
const outPath = args[0] || `chat-logs-${new Date().toISOString().slice(0, 10)}.csv`;

const COLUMNS = [
  'id',
  'created_at',
  'environment',
  'tier',
  'ui_language',
  'turn',
  'question',
  'answer',
  'model',
  'retrieved_service_ids',
  'latency_ms',
  'finish_reason',
  'rating',
  'rated_at',
];

function csvCell(value) {
  if (value === null || value === undefined) return '';
  if (Array.isArray(value)) value = value.join(';');
  if (value instanceof Date) value = value.toISOString();
  const s = String(value);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const rows = await sql.query(
    `SELECT ${COLUMNS.join(', ')} FROM chat_events
     WHERE created_at >= $1 AND ($2 = 'all' OR environment = $2)
     ORDER BY created_at`,
    [since, env],
  );
  const lines = [COLUMNS.join(','), ...rows.map((r) => COLUMNS.map((c) => csvCell(r[c])).join(','))];
  // BOM so Excel opens the Filipino text and ₱ signs as UTF-8.
  fs.writeFileSync(outPath, '﻿' + lines.join('\r\n') + '\r\n', 'utf8');
  console.log(`Wrote ${rows.length} row(s) to ${outPath}.`);
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
