# Automated Facebook → News Sync (currently disabled)

**Status: not wired up.** The sync engine below still exists, but the
scheduler workflow and homepage renderer that used it were removed —
BetterAborlan doesn't currently have Editor access to the official
Municipality of Aborlan Palawan Facebook Page, which the Graph API requires
before any of this can fetch real posts. This doc is kept as the setup guide
for whenever that access is arranged.

When re-enabling, pulls the latest posts from the official LGU Facebook
Page, categorizes them, and merges them into
[`data/news.json`](../data/news.json), meant to drive a homepage "Latest
Updates" feed.

- Engine (still present): [`scripts/sync-facebook.js`](../scripts/sync-facebook.js)
- Scheduler (removed): previously `.github/workflows/facebook-sync.yml` — recreate it (see git history) once a token exists
- Renderer (removed): previously `src/components/FbFeed.tsx` — recreate it (see git history) once real data exists to render

## The one prerequisite (activation gate)

Facebook only returns a page's posts to a caller holding a **Page access token**,
and that token requires a **role on the page**. No code can bypass this.

1. **Get an Editor role on the page.** Ask an admin of the Municipality of
   Aborlan Palawan Facebook Page (via Meta Business Suite → Settings →
   People) to add the BetterAborlan account/app as an **Editor**. Editor is
   enough for read access; full Admin is not required.
2. **Create a Meta app** at developers.facebook.com → add the **Facebook Login**
   / **Pages** products, request `pages_read_engagement`.
3. **Generate a long-lived Page access token.** Use Graph API Explorer to get a
   user token, exchange it for a long-lived one, then call `/me/accounts` to get
   the **Page** token. For a token that never expires, create a **System User**
   in Business Manager and generate its token. (A short-lived token works for
   testing but will stop the sync in ~1 hour.)
4. **Find the Page ID** — visible in the page's About section or via
   `/me/accounts`.

Until step 3 is done, the workflow runs but **stays dormant**: the engine logs
"skipping sync (dormant)" and never touches `news.json`. The homepage keeps
rendering its empty state in the meantime, and real posts appear automatically
once the token is added.

## Configure the repository

In **GitHub → Settings → Secrets and variables → Actions**:

| Name              | Type         | Value                                              |
| ----------------- | ------------ | --------------------------------------------------- |
| `FB_PAGE_ID`      | **Variable** | The page's numeric ID (public, safe as a variable)  |
| `FB_ACCESS_TOKEN` | **Secret**   | The Page / System User access token                 |

No FTP/cPanel setup is needed here. Note for whoever recreates the scheduler
workflow: `main` is protected (PR required, enforced for admins, no direct
push), so a bot token can't push `data/news.json` straight to it. The
workflow needs to open a PR instead (e.g. `peter-evans/create-pull-request`),
optionally auto-merged once `lint-and-build` passes.

## How it behaves (reliability guarantees)

- **Schedule:** every ~20 min (`workflow_dispatch` lets you trigger a test run).
- **Categorization:** deterministic keyword + `#hashtag` rules map each post to
  Announcement / Advisory / Project / Event and a badge color
  (`info` / `success` / `warning`). Editors can force a category by adding e.g.
  `#advisory` or `#project` to the post.
- **Merge:** manually-curated entries (any item whose `id` does **not** start with
  `fb-`) are always kept; Facebook items (`fb-…`) are refreshed each run. The
  combined list is sorted newest-first.
- **Never blanks the feed:** on a fetch error, an empty result, or zero valid
  items, the engine leaves the existing `news.json` untouched and exits without
  committing. Writes are atomic (temp file + rename).
- **Idempotent:** if nothing changed, no commit happens.
- **Token expiry:** an expired/invalid token (Graph error 190) fails the run
  loudly so it shows red in the Actions tab — your signal to refresh the token.

## Test it locally (no token needed)

The engine accepts a saved Graph response via `FB_FIXTURE`, bypassing the network:

```bash
# Save a sample Graph /posts response to fixture.json, then:
FB_FIXTURE=fixture.json NEWS_JSON_PATH=/tmp/news.json node scripts/sync-facebook.js
```

Once a real token exists, dry-run against the live API without deploying:

```bash
FB_PAGE_ID=<id> FB_ACCESS_TOKEN=<token> NEWS_JSON_PATH=/tmp/news.json \
  node scripts/sync-facebook.js
```

## The homepage feed component

`src/components/FbFeed.tsx` is a hybrid, progressive-enhancement widget:

1. It always renders a self-hosted list from `data/news.json` first — same-origin,
   no cookies, unblockable by ad/tracker blockers.
2. It then lazily loads the live Facebook Page Plugin (the embedded timeline
   iframe) off-screen and only swaps it in if the plugin proves it actually
   hydrated (via `postMessage`). Modern browsers routinely block the plugin's
   third-party cookies, so most visitors will see the self-hosted list — which
   is why step 1 always runs first and never depends on step 2 succeeding.

This means the "Latest Updates" section can never render blank, regardless of
whether a visitor's browser allows the Facebook embed.
