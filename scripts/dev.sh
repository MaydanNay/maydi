#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

NODE=""
if command -v node >/dev/null 2>&1; then
  NODE="$(command -v node)"
else
  for candidate in \
    "$HOME"/.vscode-server/bin/*/node \
    "$HOME"/.antigravity-server/bin/*/node \
    "$HOME"/.cursor-server/bin/*/node; do
    if [ -x "$candidate" ]; then
      NODE="$candidate"
      break
    fi
  done
fi

if [ -z "$NODE" ]; then
  echo "Node.js not found in WSL. Install it: https://nodejs.org"
  exit 1
fi

exec "$NODE" node_modules/vite/bin/vite.js --port 5180 --strictPort --host
