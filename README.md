# BetterAborlan.org

Civic transparency portal for LGU Aborlan, Palawan — government services directory, officials, ordinances/resolutions, and budget transparency data.

[![Created Badge](https://badges.pufler.dev/created/BetterAborlan/betteraborlan)](https://github.com/BetterAborlan/betteraborlan/)
[![Updated Badge](https://badges.pufler.dev/updated/BetterAborlan/betteraborlan)](https://github.com/BetterAborlan/betteraborlan/)
[![Visits Badge](https://badges.pufler.dev/visits/BetterAborlan/betteraborlan)](https://github.com/BetterAborlan/betteraborlan/)

![Version](https://img.shields.io/github/package-json/v/BetterAborlan/betteraborlan?color=green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)

Based on [BetterGov.ph](https://bettergov.ph): layout, design system (`@bettergov/kapwa`), and data-file conventions all follow it.

## Stack

- **Next.js 16** (App Router, TypeScript), deployed on **Vercel**
- **Tailwind v4** + **`@bettergov/kapwa`** (CC0 design system/component library)
- **`data/*.json`** for officials, services, news, ordinances/resolutions — no database; matches how BetterGov.ph and other BetterLGU sites store data
- Custom CSS (`public/assets/css`) for everything Kapwa doesn't componentize, layered alongside Tailwind — not a full Tailwind rewrite
- GitHub Actions → Vercel CLI for CI/CD (`.github/workflows/ci.yml`, `deploy.yml`, `release.yml`)
- Conventional Commits + semantic-release for versioning (see below)

## Getting started

```bash
npm install         # also installs the git hooks (husky "prepare" script)
cp .env.local.example .env.local
npm run dev          # http://localhost:3000
```

```bash
npm run build   # production build
npm run lint
```

## Commits & releases

Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat: ...`, `fix: ...`, `chore: ...`, etc.) — enforced locally by a commit-msg git hook (`.husky/commit-msg` + `commitlint.config.js`), so a bad commit message just won't go through.

Every merge to `main` runs [semantic-release](https://semantic-release.gitbook.io/) (`.releaserc.json`, `.github/workflows/release.yml`): it reads the commits since the last release, decides the next version (`fix` → patch, `feat` → minor, `BREAKING CHANGE:` in the body → major), bumps `package.json`, writes `CHANGELOG.md`, tags the release, opens a GitHub Release, then deploys the result to Vercel production. No manual version bumping, ever.

**Never hand-edit `package.json`'s version or push a tag directly to `main`.** If a version needs to jump outside normal bumping, do it as a real commit with a `BREAKING CHANGE:` footer through a normal PR instead, so semantic-release computes it.

## Branches & environments

Trunk-based — one long-lived branch:

- **`main`** → production. Protected: PRs only (enforced for admins too, no direct push), `lint-and-build` must pass against an up-to-date branch, no force-push/delete. Every merge here triggers a release (see above) and a prod deploy.
- Pull requests into `main` get their own ephemeral Vercel preview URL, commented on the PR — use it to sanity-check before merging.

Day to day: branch off `main`, open a PR into `main`, get the preview, merge → semantic-release cuts a version and ships it to production.

## Data policy — no fabricated civic data

**Never fabricate or guess values for officials, statistics, ordinances, or contact info.** Everything under `data/*.json` leaves unverified fields `null`, with a `_status`/`_note` explaining what's missing and where to source it from (COMELEC, PSA, the official Aborlan LGU, or the Sangguniang Bayan). The homepage renders explicit "Pending verification" / empty states rather than placeholder numbers.

## Deployment — Vercel + GitHub Actions

1. `vercel link` locally once to create the project, or create it in the Vercel dashboard.
2. **Turn off Vercel's automatic Git deployments** (Project → Settings → Git → Ignored Build Step → `exit 0`) so only the GitHub Actions below trigger deploys — otherwise every push deploys twice, and `main` risks deploying pre-version-bump code before `release.yml` finishes.
3. In the GitHub repo, add these secrets (Settings → Secrets and variables → Actions):
   - `VERCEL_TOKEN` — personal/team token from Vercel account settings
   - `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` — from `.vercel/project.json` after `vercel link`
   - `GITHUB_TOKEN` is automatic, no setup needed — semantic-release uses the one GitHub Actions injects.
4. Set the env vars from `.env.local.example` in Vercel (Project → Settings → Environment Variables), scoped per environment (Production / Preview) as needed. **Add them as non-sensitive** — Vercel's "Sensitive" var type only resolves to its real value on Vercel's own build infra, not when `vercel build` runs via CLI/token the way our GitHub Actions do. A sensitive var shows up as the literal string `"[SENSITIVE]"` at build time instead of erroring, so this fails silently.
5. Open a PR into `main` → gets an ephemeral preview. Merge → `release.yml` versions and deploys to production.

## Domains (Hostinger)

Once purchased on Hostinger:

1. Add the domain in Vercel (Project → Settings → Domains), assigned to Production.
2. In Hostinger's DNS zone editor, point it at Vercel per what the Vercel domain screen instructs (`A`/`CNAME` records, or delegate nameservers).
3. Update `NEXT_PUBLIC_SITE_URL` in Vercel's Production environment vars to the matching domain.

## Coming-soon mode

Production and PR previews run the exact same code — the only difference is `NEXT_PUBLIC_COMING_SOON`, set to `true` in Vercel's **Production** environment vars only. When set, the root layout (`src/app/layout.tsx`) skips the whole site shell and renders a standalone coming-soon page (`src/components/ComingSoon.tsx`) instead. Previews always show the full site regardless of this flag, so it's safe to build in the open while production shows coming-soon.

To launch for real: set `NEXT_PUBLIC_COMING_SOON` to `false` (or delete it) in Vercel's Production env vars and redeploy. No code or branch changes needed.

## Roadmap

- Government API integrations (PSA, data.gov.ph, PhilGEPS) to replace manual data entry where official APIs exist
- Server-side logic as Vercel Functions (form submissions, scheduled data syncs)
- Fill in `data/*.json` from verified sources
- i18n (English/Filipino) via `src/contexts/LanguageContext.tsx`

## Contributing

Want to help? See [CONTRIBUTING.md](CONTRIBUTING.md) for the branching model, commit conventions, and how to submit a PR. Also see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) and, if you find a security issue, [SECURITY.md](SECURITY.md) for how to report it responsibly.

## Community

Join our Discord server to hang out, ask questions, or help build BetterAborlan.org:

[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/Fsgdh7cJvw)

## Contributors
[![Contributors Display](https://badges.pufler.dev/contributors/BetterAborlan/betteraborlan?size=50&padding=5&perRow=10&bots=true)](https://github.com/BetterAborlan/betteraborlan)