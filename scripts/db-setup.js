#!/usr/bin/env node
/**
 * Applies db/schema.sql to the Neon database in DATABASE_URL. The schema is
 * idempotent (CREATE ... IF NOT EXISTS), so this is safe to re-run.
 *
 * Usage: npm run db:setup   (reads DATABASE_URL from .env.local)
 */
const fs = require('fs');
const path = require('path');
const { neon } = require('@neondatabase/serverless');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Run `vercel env pull .env.local` first.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const schema = fs.readFileSync(path.join(__dirname, '..', 'db', 'schema.sql'), 'utf8');

// The HTTP driver runs one statement per query, so split on the semicolons
// that end each statement (the schema has none inside strings or bodies).
const statements = schema
  .split(/;\s*$/m)
  .map((s) => s.replace(/^\s*--.*$/gm, '').trim())
  .filter(Boolean);

(async () => {
  for (const statement of statements) {
    await sql.query(statement);
  }
  console.log(`Applied ${statements.length} statement(s) from db/schema.sql.`);
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
