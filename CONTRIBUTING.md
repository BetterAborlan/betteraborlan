# Contributing to BetterAborlan.org

Thanks for wanting to help. This is a volunteer-built civic transparency portal for the Municipality of Aborlan, Palawan — contributions from developers, designers, translators, and residents who just know the town well are all welcome.

## Branching model

Two long-lived branches:

| Branch    | Environment                                              | Purpose                                                 |
| --------- | --------------------------------------------------------- | -------------------------------------------------------- |
| `develop` | Preview — https://betteraborlan-dev.vercel.app             | Default branch. All feature/fix branches target this.   |
| `main`    | Production — https://betteraborlan.org                     | Only receives merges from `develop` once it's release-ready. |

Workflow:

1. Branch off `develop`: `git checkout -b feat/short-description`
2. Open a PR into `develop`. CI (`npm run lint` + `npm run build`) must pass — see `.github/workflows/ci.yml`.
3. Merging to `develop` runs [semantic-release](https://semantic-release.gitbook.io/) in prerelease mode first (`.releaserc.json` — `develop` is a prerelease channel of `main`, e.g. `0.3.1-develop.1`), then deploys to `betteraborlan-dev.vercel.app` (see `.github/workflows/deploy.yml`).
4. When `develop` is ready to ship, open a PR from `develop` into `main`. Merging triggers semantic-release again, this time as a stable release: bumps the version, writes `CHANGELOG.md`, tags a GitHub Release, and deploys to production (see `.github/workflows/release.yml`).

No manual version bumping, on either branch — versions derive entirely from commit messages (see below).

## Getting started

Prerequisites: Node.js 22+, npm.

```bash
git clone https://github.com/BetterAborlan/betteraborlan.git
cd betteraborlan
npm install          # also installs git hooks (husky "prepare" script)
cp .env.local.example .env.local
npm run dev          # http://localhost:3000
```

```bash
npm run build   # production build
npm run lint     # ESLint
```

## How to contribute

### Reporting bugs

1. Check existing [issues](https://github.com/BetterAborlan/betteraborlan/issues) to avoid duplicates.
2. Open a new issue with a clear title, steps to reproduce, expected vs. actual behavior, and a screenshot if it's visual.

### Suggesting features

Open an issue describing the feature, who it helps, and why. Mockups or examples are a bonus, not a requirement.

### Submitting code

1. **Fork** the repository.
2. **Branch** off `develop`:
   ```bash
   git checkout develop && git pull
   git checkout -b feat/your-feature-name
   ```
3. **Make** your changes.
4. **Commit** using Conventional Commits — this is enforced locally by a commit-msg git hook (`.husky/commit-msg` + `commitlint.config.js`), so a badly-formatted commit just won't go through.
   ```bash
   git commit -m "feat: add brief description of your change"
   ```
5. **Push** to your fork and **open a Pull Request into `develop`** (not `main`).

### Commit message format (Conventional Commits)

```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

The subject must start lowercase (no sentence-case, start-case, or PascalCase).

| Type       | Effect on version              | Use for                                |
| ---------- | ------------------------------- | ---------------------------------------- |
| `feat`     | minor bump (`1.2.0` → `1.3.0`) | New feature or page                     |
| `fix`      | patch bump (`1.2.0` → `1.2.1`) | Bug fix                                 |
| `perf`     | patch bump                      | Performance improvement                 |
| `docs`     | no bump                         | Documentation only                      |
| `style`    | no bump                         | Formatting/CSS, no logic change         |
| `refactor` | no bump                         | Code restructuring, no behavior change  |
| `test`     | no bump                         | Adding or fixing tests                  |
| `build`    | no bump                         | Build tooling, dependencies             |
| `ci`       | no bump                         | GitHub Actions / CI config              |
| `chore`    | no bump                         | Maintenance, no production code change  |
| `revert`   | patch bump                      | Reverting a previous commit             |

Add `BREAKING CHANGE: <description>` in the footer (or `!` after the type, e.g. `feat!:`) for a **major** bump.

Examples:

```
feat(services): add online business permit renewal page
fix(footer): correct social icon alignment on mobile
docs: explain the develop/main branch split in the README
```

## Contribution areas

| Area          | Description                                                        |
| -------------- | -------------------------------------------------------------------- |
| Bug fixes      | Fix reported issues                                                 |
| Features       | New pages, components, or functionality                             |
| Content        | Update municipal service info (fees, offices, processing times)     |
| Translations   | English/Filipino strings live in `src/contexts/LanguageContext.tsx` |
| Design         | UI/UX and accessibility improvements                                |
| Data           | Verify and update the `data/*.json` files                           |
| Documentation  | Improve this guide, the README, or code comments                    |

## Data policy — read this before touching `data/*.json`

**Never fabricate or guess civic data** — official names, statistics, fees, ordinances, contact info. Every file under `data/` follows the same pattern: unverified fields are left `null`, with a `_status`/`_note` explaining what's missing and where to source it from (COMELEC, PSA, the official Aborlan LGU, the Sangguniang Bayan, or the Citizen's Charter). Pages render an explicit "pending verification" state instead of a placeholder value — keep that behavior when adding new data.

When you do add a real value, cite the source in the file's `_note` field, the same way the existing entries do.

## Code guidelines

- **TypeScript/React**: match the existing style in the file you're editing — Server Components by default, `'use client'` only when the component needs interactivity or browser APIs.
- **Styling**: legacy CSS lives in `public/assets/css/*.css` (loaded as plain `<link>` tags, not through Tailwind's `@layer`, so it always wins over Tailwind utility classes — see the comment in `src/app/globals.css` before changing that). New content pages that need a Kapwa-`<Card>`-like look but can't use the real component (see below) should use the `.surface-card` class instead.
- **Kapwa gotcha**: `@bettergov/kapwa` components (`<Card>`, `<Input>`, etc.) require `'use client'` in dev mode. A page that needs a static `metadata` export (a Server Component requirement) can't also be a Client Component, so such pages use plain `<div className="surface-card">` instead of `<Card>`.
- **Accessibility**: semantic HTML, `aria-label`s on icon-only buttons/links, keyboard-navigable interactive elements.
- **Mobile**: check your change at a narrow viewport (≤ 400px) before opening a PR — this is a civic site many residents will hit on a phone.

## Pull request process

1. Make sure `npm run lint` and `npm run build` pass locally.
2. Fill out the PR description — what changed and why, and link any related issue.
3. PRs into `main` get an ephemeral Vercel preview URL commented automatically; use it to sanity-check the change live.
4. Wait for review and address feedback.

## Review criteria

- Correctness and no regressions
- Data accuracy and sourcing (for `data/*.json` changes)
- Accessibility and mobile responsiveness
- Code style consistency with the surrounding file

## Community

- **Discord:** https://discord.gg/Fsgdh7cJvw
- **Facebook:** https://facebook.com/betteraborlan.org
- **LinkedIn:** https://linkedin.com/company/betteraborlan
- **Email:** info@betteraborlan.org

## Questions?

Open an issue or ask on Discord — happy to help.

---

Thank you for helping make Aborlan's local government more transparent and accessible.
