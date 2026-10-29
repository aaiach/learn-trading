#!/bin/sh
# Run once in a new git worktree (Orca starts each session in one). Git-ignored files stay in the main checkout:
# the book (source/), the Vercel link (course/.vercel) and node_modules. Link the first two, install the third.
set -e
cd "$(git rev-parse --show-toplevel)"
MAIN="$(dirname "$(git rev-parse --path-format=absolute --git-common-dir)")"
if [ "$MAIN" != "$PWD" ]; then
  [ -e source ] || ln -s "$MAIN/source" source
  [ -e course/.vercel ] || ln -s "$MAIN/course/.vercel" course/.vercel
fi
[ -d source/chapters ] || echo "warning: no book text in $MAIN/source; quote checks will be skipped" >&2
[ -d course/node_modules ] || (cd course && npm ci --no-audit --no-fund)
echo "ready: $PWD (main checkout: $MAIN, branch: $(git branch --show-current))"
