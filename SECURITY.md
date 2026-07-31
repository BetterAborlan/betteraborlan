# Security Policy

## Supported Versions

BetterAborlan.org is a single continuously-deployed website, not a versioned library — only the version currently live on `main` (production) is supported. Older tagged releases are not patched retroactively.

## Reporting a Vulnerability

We take security seriously. If you discover a vulnerability, please report it responsibly.

### How to report

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, email: **info@betteraborlan.org**

Include in your report:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response timeline

| Action              | Timeframe              |
| -------------------- | ------------------------ |
| Acknowledgment       | Within 48 hours          |
| Initial assessment   | Within 7 days            |
| Resolution target    | Within 30 days           |
| Public disclosure    | After a fix is deployed  |

## Security measures

**Hosting & transport:**

- Hosted on Vercel — HTTPS/TLS and HSTS are enforced by the platform, not custom server config
- Deploys are gated behind CI (`.github/workflows/ci.yml`) and, for production, [semantic-release](https://semantic-release.gitbook.io/) on `main`

**Application security:**

- No user authentication and no user accounts
- No database — content comes from static `data/*.json` files committed to the repo
- Next.js Server Components render most pages server-side; the few client components that call external APIs do so directly from the browser (see below)
- No forms that collect or store personal data

**Data security:**

- All civic/municipal data is sourced from official government sources (PSA, COMELEC, the Aborlan LGU, the Citizen's Charter) — see the `_note` field in each `data/*.json` file for sourcing
- No personally identifiable information (PII) is collected or stored by the site itself

### Third-party services

| Service                          | Purpose                          | Data shared              |
| ---------------------------------- | ----------------------------------- | --------------------------- |
| Open-Meteo API                    | Weather widget                     | Fixed lat/lon (no user data) |
| open.er-api.com                   | Currency exchange rates            | None                        |
| OpenStreetMap / CARTO             | Map tiles for the Aborlan map      | None                        |
| Google Fonts / Bootstrap Icons CDN | Fonts and icons                    | Standard request metadata (IP, user agent) |

The site currently has no analytics or tracking script of any kind.

## Best practices for contributors

1. **Never commit secrets** — API keys, tokens, or credentials. Environment variables belong in `.env.local` (gitignored), not in code.
2. **Validate inputs** — sanitize anything rendered from user-controllable input (currently minimal, since there are no forms, but keep this in mind for future features).
3. **HTTPS only** — all external resources (fonts, tiles, APIs) must be loaded over HTTPS.
4. **Review dependencies** — check `npm audit` before adding new packages.
5. **Don't bypass CI** — never use `--no-verify` to skip git hooks or force a lint/build failure through.

## Scope

This policy covers:

- The BetterAborlan.org website and its GitHub repository
- Associated build tooling and GitHub Actions workflows

Out of scope:

- Third-party services listed above (report to them directly)
- Vercel's own platform infrastructure
- Social media accounts

## Contact

Security concerns: **info@betteraborlan.org**

General inquiries: open a GitHub issue or join our [Discord](https://discord.gg/Fsgdh7cJvw).

---

Thank you for helping keep BetterAborlan.org secure for the people of Aborlan.
